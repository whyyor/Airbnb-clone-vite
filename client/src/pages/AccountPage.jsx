import { useContext, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null)
  const { ready, user, setUser } = useContext(UserContext)
  let { subpage } = useParams()
  //this helps us log the subpage on which we are on
  //this is provided to us by react
  if (subpage === undefined) {
    subpage = 'profile'
    //if we are not on subpage then subpage will be undefined
  }

  async function logout() {
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }

  if (!ready) {
    return 'Loading...'
  }

  if (ready && !user && !redirect) {
    ///we use ready because getting user takes some milliseconds
    //because of that we even if user exist person is redirected to
    //login page so we use ready until user is found in context
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  function linkClasses(type = null) {
    let classes = 'py-2 px-6'
    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full'
    }
    return classes
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-4 mb-8 ">
        <Link className={linkClasses('profile')} to={'/account'}>
          My Profile
        </Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>
          My Bookings
        </Link>
        <Link className={linkClasses('places')} to={'/account/places'}>
          My accomodations
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name}({user.email})
          <button onClick={logout} className="primary max-w-sm mt-6">
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
