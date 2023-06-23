import React, { useEffect, useState } from 'react'
import { AccountNav } from '../components/AccountNav'
import axios from 'axios'

export const BookingsPage = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    })
  },[])

  return (
    <div>
      <AccountNav/>
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
          <div>
            {booking.checkIn}  {booking.checkOut}
          </div>
        ))}
      </div>
    </div>
  )
}
