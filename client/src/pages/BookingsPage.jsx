import React, { useEffect, useState } from "react";
import axios from "axios";
import {format} from'date-fns';
import { AccountNav } from "../components/AccountNav";
import { PlaceImg } from "../components/PlaceImg";

export const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      {bookings?.length > 0 &&
        bookings.map((booking) => (
          <div
            key={booking.place._id}
            className="flex gap bg-gray-200 rounded-2xl  overflow-hidden"
          >
            <div className="w-48">
              <PlaceImg place={booking.place} />
            </div>
            <div className="py-3">
              <h2 className="text-xl">{booking.place.title}</h2>
              {format(new Date(booking.checkIn),'yyyy-MM-dd')}  {'-->'} {format(new Date(booking.checkOut),'yyyy-MM-dd')}
            </div>
          </div>
        ))}
    </div>
  );
};
