import { useState } from "react"
import { useTripsContext } from "../hooks/useTripsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const TripForm = () => {
  const { dispatch } = useTripsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [period, setPeriod] = useState('')
  const [details, setDetails] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const trip = {title, period, details}

    const response = await fetch('/api/trips', {
      method: 'POST',
      body: JSON.stringify(trip),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setPeriod('')
      setDetails('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_TRIP', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Trip</h3>

      <label>Trip Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Period:</label>
      <input 
        type="text"
        onChange={(e) => setPeriod(e.target.value)}
        value={period}
        className={emptyFields.includes('period') ? 'error' : ''}
      />

      <label>Details:</label>
      <input 
        type="textr"
        onChange={(e) => setDetails(e.target.value)}
        value={details}
        className={emptyFields.includes('details') ? 'error' : ''}
      />

      <button>Add Trip</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TripForm