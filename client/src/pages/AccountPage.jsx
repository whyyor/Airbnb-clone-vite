import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

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

  return <div>Account page for {user?.name}</div>
  //In the given code snippet, user is an object that may or may not exist. The ?. operator after user ensures that if user is null or undefined, the expression will short-circuit and return undefined without trying to access the name property. This prevents a runtime error from occurring if user does not exist.
}
