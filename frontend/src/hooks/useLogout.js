import { useAuthContext } from './useAuthContext'
import { useTripsContext } from './useTripsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchTrips } = useTripsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchTrips({ type: 'SET_TRIPS', payload: null })
  }

  return { logout }
}