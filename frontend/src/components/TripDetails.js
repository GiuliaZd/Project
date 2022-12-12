import { useTripsContext } from '../hooks/useTripsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TripDetails = ({ trip }) => {
  const { dispatch } = useTripsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/trips/' + trip._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_TRIP', payload: json})
    }
  }

  return (
    <div className="trip-details">
      <h4>{trip.title}</h4>
      <p><strong>Period: </strong>{trip.period}</p>
      <p><strong>Details: </strong>{trip.details}</p>
      <p>{formatDistanceToNow(new Date(trip.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default TripDetails