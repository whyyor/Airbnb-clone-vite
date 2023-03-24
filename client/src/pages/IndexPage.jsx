import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([
        ...response.data,
        ...response.data,
        ...response.data,
        ...response.data,
      ]);
    });
  }, []);
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-6">
      {places.length > 0 &&
        places.map((place) => (
          <div>
            <div className="bg-gray-500 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt=""
                  srcset=""
                />
              )}
            </div>
            <h2 className="text-sm truncate mt-2 leading-4">{place.title}</h2>
            <h3 className="font-bold">{place.address}</h3>
          </div>
        ))}
    </div>
  );
}
