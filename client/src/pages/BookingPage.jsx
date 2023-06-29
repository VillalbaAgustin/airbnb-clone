import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const BookingPage = () => {
  const {id} = useParams();
  const [booking, setBooking] = useState(null)
  
  useEffect(() => {
    axios.get('/bookings').then(response => {
      const foundBooking = response.data.find(({_id}) => _id === id);
      if (foundBooking) {
        setBooking(foundBooking);
      }
    })
  }, [id]);
  
  if (!booking) {
    return '';
  }

  return (
    <div>single BookingPage: {id}</div>
  )
}
