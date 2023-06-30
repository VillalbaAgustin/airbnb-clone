import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookingWidget } from "../components/BookingWidget";
import { PlaceGallery } from "../components/PlaceGallery";
import { AddressLink } from "../components/AddressLink";

export const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  

  return (
    <div className="mt-4 bg-gray-100 -mx-12 px-12 pt-8">
      <h1 className="text-3xl">{place?.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place}/>
        
        <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          
          <div>
            <div className="mb-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place?.description}
            </div>
            <b>Max number of guests: </b> {place.maxGuests} <br /> 
            <b>Check-in: </b> {place.checkIn}  <br /> 
            <b>Check-Out: </b> {place.checkOut} <br /> 
          </div>
          
          <BookingWidget place={place}/>
        </div>
        <div className="bg-white -mx-12 px-8 py-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl">Extra info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
        </div>
      </div>
  );
};
