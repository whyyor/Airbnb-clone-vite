import { Link, Navigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { setUser } = useContext(UserContext)

  async function handleLoginSubmit(ev) {
    ev.preventDefault()
    try {
      //   const userInfo = await axios.post('/login', { email, password })
      //userinfo will have all sorts of info but we only need data so
      const response = await axios.post('/login', { email, password })
      //we can also do {data} directly that will destrcuture data
      // /login is returning userDoc which is stored in our mongodb database
      setUser(response.data)
      alert('login successfull')
      setRedirect(true)
    } catch (e) {
      alert('login failed')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="text"
            typeof="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{' '}
            <Link className="underline text-black" to={'/register'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
