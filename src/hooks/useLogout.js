import { useState, useEffect } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { signOut } from "firebase/auth"

export const useLogout = () => {
  const [isCancalled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const {dispatch} = useAuthContext()
  
  const logout = async () => {
    setError(null)
    setIsPending(true)

    //sign out
    try{
      await signOut(auth)
      dispatch({type:'LOGOUT'})

      if(!isCancalled){
        setIsPending(false)
        setError(null)
      }
    }
    catch(err) {
      if(!isCancalled){
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return {logout, error, isPending}
}
