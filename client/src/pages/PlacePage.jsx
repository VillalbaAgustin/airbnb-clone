import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const PlacePage = () => {
  const {id} = useParams();
  const [place, setPlace] = useState({});

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    })
  }, [id])
  

  return (
    <div className='mt-8'>
      <h1>{place?.title}</h1>
    </div>
  )
}
