import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 w-full bg-black text-white min-h-screen">
        <div className="p-8 grid gap-4 bg-black">
          <div>
            <h2 className="text-3xl">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex right-12 top-8 gap-1 py-2 px-4 rounded-2xl fixed  bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img
                  className="w-full"
                  src={"http://localhost:4000/uploads/" + photo}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="flex gap-1 my-3 font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        {place.address}
      </a>
      <div className="relative">
        <div className="rounded-2xl overflow-hidden grid gap-1 grid-cols-[2fr_1fr]">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  className="aspect-square object-cover cursor-pointer"
                  alt=""
                />
              </div>
            )}
          </div>

          <div className="grid">
            {place.photos?.[1] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                src={"http://localhost:4000/uploads/" + place.photos?.[1]}
                className="aspect-square object-cover cursor-pointer"
                alt=""
              />
            )}
            <div>
              {place.photos?.[2] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  src={"http://localhost:4000/uploads/" + place.photos?.[2]}
                  className="aspect-square object-cover cursor-pointer relative bottom-20"
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button
          className=" gap-1 flex absolute top-80 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
          onClick={() => setShowAllPhotos(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Show more photos
        </button>
        <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] ">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            Check-in: {place.checkIn}
            Check-out: {place.checkOut}
            Max number of guests: {place.maxGuests}
          </div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 pt-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
