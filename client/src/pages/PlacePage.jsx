import { Link } from 'react-router-dom'

export default function PlacesPage() {
  return (
    <div>
      <div className="text-center">
        <Link
          className="bg-primary text-white py-2 px-6 rounded-full "
          to={'/account/places/new'}
        >
          Add new place
        </Link>
      </div>{' '}
      my places
    </div>
  )
}
