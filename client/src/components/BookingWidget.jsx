import React, { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from'date-fns';
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export const BookingWidget = ({place}) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  },[user])
  
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  const bookThisPlace = async () => {
    const response = await axios.post('/bookings', {
      place: place._id, checkIn, 
      checkOut, numberOfGuests, name, 
      phone, price: numberOfNights * place?.price})
    
    const bookingsId = response.data._id;
    setRedirect(`/account/bookings/${bookingsId}`)
  }

  if (redirect) {
    return <Navigate to={redirect}/>
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-xl text-center">
        <b>Price: </b> ${place?.price} /per night
        <br />
      </div>

      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="px-3 py-4">
            <label>Check in: </label>
            <input type="date" value={checkIn} onChange={(e) => {setCheckIn(e.target.value)}} />
          </div>

          <div className="px-3 py-4 border-l">
            <label>Check out: </label>
            <input type="date" value={checkOut} onChange={(e) => {setCheckOut(e.target.value)}} />
          </div>
        </div>

        <div className="px-3 py-4 border-t">
          <label>Number of guests: </label>
          <input type="number" value={numberOfGuests} onChange={(e) => {setNumberOfGuests(e.target.value)}} placeholder="1" />
        </div>
        {numberOfNights > 0 && (
          <div>
            <div className="px-3 py-4 border-t">
              <label>Your full name: </label>
              <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Jhon Doe" />
            </div>
            <div className="px-3 py-4 border-t">
              <label>Phone number: </label>
              <input type="tel" value={phone} onChange={(e) => {setPhone(e.target.value)}} placeholder="3413504558" />
            </div>
          </div>
        )}
      </div>
      <button className="primary mt-4" onClick={bookThisPlace}>
        Book this place
        {numberOfNights > 0 && (
          <>
            <span> ${numberOfNights * place?.price}</span>
          </>
        )}
      </button>
    </div>
  );
};
