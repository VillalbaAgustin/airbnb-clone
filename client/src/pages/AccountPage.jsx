import React, { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

export const AccountPage = () => {
  const { user, setUser, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  if (!ready) "Loading...";

  if (ready && !user && !redirect) return <Navigate to={"/login"} />;

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "account";
  }

  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const linkClasses = (type = null) => {
    let classes = "py-2 px-6";
    if (
      type === subpage /* || (type === "account" && subpage === undefined) */
    ) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  };

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 mb-8 gap-2">
        <Link className={linkClasses("account")} to={"/account"}>
          My profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My accommodations
        </Link>
      </nav>
      {subpage === "account" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user?.name} ({user?.email}) <br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
