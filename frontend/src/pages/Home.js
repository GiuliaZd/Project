import { useEffect }from 'react'
import { useTripsContext } from "../hooks/useTripsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import TripDetails from '../components/TripDetails'
import TripForm from '../components/TripForm'

const Home = () => {
  const {trips, dispatch} = useTripsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch('/api/trips', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_TRIPS', payload: json})
      }
    }

    if (user) {
      fetchTrips()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="trips">
        {trips && trips.map((trip) => (
          <TripDetails key={trip._id} trip={trip} />
        ))}
      </div>
      <TripForm />
    </div>
  )
}

export default Home