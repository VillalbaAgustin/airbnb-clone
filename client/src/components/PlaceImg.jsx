import React from "react";

export const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover";
  }

  return (
    <img
      src={"http://localhost:4000/uploads/" + place.photos[0]}
      alt={place.title}
      className="object-cover rounded"
    />
  );
};
