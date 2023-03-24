import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
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
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="my-2 block font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>
      <div className="grid gap-2 md:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr] lg:flex items-center justify-center">
        <div>
          {place.photos?.[0] && (
            <div>
              <img
                src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                className="aspect-square object-cover"
                alt=""
              />
            </div>
          )}
          {place.photos?.[4] && (
            <div className="md:hidden sm:hidden lg:inline-block mt-2">
              <img
                src={"http://localhost:4000/uploads/" + place.photos?.[4]}
                className="aspect-square object-cover"
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img
              src={"http://localhost:4000/uploads/" + place.photos?.[1]}
              className="aspect-square object-cover"
              alt=""
            />
          )}
          <div className="border-red-500 overflow-hidden">
            {place.photos?.[2] && (
              <img
                src={"http://localhost:4000/uploads/" + place.photos?.[2]}
                className="aspect-square object-cover relative top-2"
                alt=""
              />
            )}
          </div>
        </div>
        <div className="sm:hidden md:hidden lg:inline-block">
          {place.photos?.[3] && (
            <img
              src={"http://localhost:4000/uploads/" + place.photos?.[3]}
              className="aspect-square object-cover"
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
}
