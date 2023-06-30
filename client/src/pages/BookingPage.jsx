import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AddressLink } from '../components/AddressLink';
import { PlaceGallery } from '../components/PlaceGallery';
import { BookingDates } from '../components/BookingDates';

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
    <div className='my-8'>
      <h1 className="text-3xl">{booking.place?.title}</h1>
      <AddressLink className='my-2 block'>{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-2 my-5 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className='text-xl mb-2'>Your booking information:</h2>
          <BookingDates booking={booking}/>
        </div>
        <div className='bg-primary p-3 text-white rounded-2xl'>
          <div>Total price:</div>
          <div className='text-2xl'>${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place}/>
    </div>
  )
}
