import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PerksLabels } from "../components/PerksLabels";
import { PhotoUploader } from "../components/PhotoUploader";
import axios from "axios";

export const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState('')

  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  };

  const inputDescription = (text) => {
    return <p className="text-gray-500 text-sm">{text}</p>;
  };

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  const addNewPlace = async (e) => {
    e.preventDefault();

    await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    setRedirect('/account/places')
  };

  if (redirect) return <Navigate to={redirect} />

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form onSubmit={addNewPlace}>
            {preInput(
              "Title",
              "Title for your place. Should be short and catchy as inadvertisement"
            )}
            <input
              type="text"
              placeholder="title, for example: My lovely apt"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {preInput("Addres", "Addres to this place")}
            <input
              type="text"
              placeholder="addres"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            {preInput("Photo", "more = better")}
            <PhotoUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />
            {preInput("Description", "Description of the place")}
            <textarea
              cols="30"
              rows="6"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            {preInput("Perks", "Select all the perks of your place")}
            <PerksLabels selected={perks} onChange={setPerks} />
            {preInput("Extra info", "House rules, etc")}
            <textarea
              cols="30"
              rows="6"
              value={extraInfo}
              onChange={(e) => {
                setExtraInfo(e.target.value);
              }}
            />
            {preInput(
              "Check in&out times",
              "Add check in and out times, remember to have some time window for cleaning the room between guests"
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type="text"
                  placeholder="14:00"
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                  }}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  type="text"
                  placeholder="10:00"
                  value={checkOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                  }}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => {
                    setMaxGuests(e.target.value);
                  }}
                />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};
