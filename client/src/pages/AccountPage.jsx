import { useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'

export default function AccountPage() {
  const { ready, user } = useContext(UserContext)

  if (!ready) {
    return 'Loading...'
  }

  if (ready && !user) {
    ///we use ready because getting user takes some milliseconds
    //because of that we even if user exist person is redirected to
    //login page so we use ready until user is found in context
    return <Navigate to={'/login'} />
  }

  const { subpage } = useParams()
  //this helps us log the subpage on which we are on
  console.log(subpage)

  function linkClasses(type = null) {
    let classes = 'py-2 px-6'
    if (type === subpage || (subpage === undefined && type === 'profile')) {
      classes += ' bg-primary text-white rounded-full'
    }
    return classes
  }
  //here we pass in type and that type will help us use classes
  //for profile in our subpage we get undefined as it's not a subpage
  //so if subpage is undefined and type=== profile

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-4 ">
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
    </div>
  )
}
