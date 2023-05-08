import "./App.css";
import { Route, Routes } from "react-router-dom";
import { IndexPage, LoginPage, RegisterPage, AccountPage} from "./pages";
import { Layout } from "./layout/Layout";
import axios from "axios";
import { UserContextProvider } from "./UserContext";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};
