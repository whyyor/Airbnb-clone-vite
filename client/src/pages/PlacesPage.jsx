import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Perks from '../Perks'

export default function PlacesPage() {
  const { action } = useParams()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)

  function inputHeader(text) {
    return <h2 className="text-2xl -mt4">{text}</h2>
  }

  function inputDescription(text) {
    return <p className="text-gray-500">{text}</p>
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }

  async function addPhotoByLink(ev){
    ev.preventDefault()
   //this will disable automatic reload on adding photo
    const {data:filename} = await axios.post('/upload-by-link', {link:photoLink});
    //because we are return photoname in res.json
    setAddedPhotos(prev=>{
        return [...prev, filename];
        //will store all previous photos and new photo
    })
    setPhotoLink('');
  }

  return (
    <div>
      {action !== 'new' && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={'/account/places/new'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
          Add new place
        </div>
      )}
      {action === 'new' && (
        <div>
          <form>
            {preInput(
              'Title',
              'Title for your place should be short and catchy',
            )}
            <input
              type="text"
              value={title}
             onChange={ev=>setTitle(ev.target.value)}
              placeholder="title, for example my lovely apartment"
            />
            {preInput('Address','Address to this place')}
            <input type="text"
            value={address}
           onChange={ev=>setAddress(ev.target.value)}
             placeholder="address" />
            {preInput('Photos','More = better')}
            <div className="flex gap-2">
              <input type="text" value={photoLink} onChange={ev=>setPhotoLink(ev.target.value)} placeholder={'Add using a link... jpg'} />
              <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;Photo
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length>0 && addedPhotos.map(link=>(
                <div>
                    {link}
                </div>
            ))}
              <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </button>
            </div>
            {preInput('Description','description of the place')}
            <textarea value={description} onChange={ev=>setDescription(ev.target.value)} />
            {preInput('Perks','select all the perks of your place')}
            <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-6 mt-2">
                <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput('Extra','house rules, etc')}
            <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)} />
            {preInput('Check in& out timests','add check in and out times, remember to have some time window for cleaning the room betbween guests')}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-2">Check in time</h3>
                <input type="text"
                placeholder="14"
                value={checkIn}
                onChange={ev=>setCheckIn(ev.target.value)} />
              </div>
              <div>
                <h3 className="mt-2 -mb-2">Check out time</h3>
                <input type="text"
                placeholder='11'
                value={checkOut}
                onChange={ev=>setCheckOut(ev.target.value)} />
              </div>
              <div>
                <h3 className="mt-2 -mb-2">Max number of guests</h3>
                <input type="number" value={maxGuests}
                onChange={ev => setMaxGuests(ev.target.value)} />
              </div>
            </div>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
