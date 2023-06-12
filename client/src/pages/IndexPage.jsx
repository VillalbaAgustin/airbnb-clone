import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(response =>{
      setPlaces(response.data)
    })
  }, [])
  // console.log(places)
  

  return (
    <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-8">
      {places.length > 0 && places.map( place => (
        <Link to={'/place/' + place._id} key={place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place.photos[0]} alt={place.addres} />
            )}
          </div>
          <h2 className="font-bold leading-4 mb-1">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-0.5 text-sm"> <span className="font-bold">${place.price}</span> /night</div>
        </Link>
      ))}
    </div>
  )
}
