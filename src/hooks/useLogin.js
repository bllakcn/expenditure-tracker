import { useState, useEffect } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { signInWithEmailAndPassword } from "firebase/auth"

export const useLogin = () => {
  const [isCancalled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const {dispatch} = useAuthContext()
  
  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    //sign out
    try{
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if(!userCredential){
          throw new Error('Could not complete login')
        }
        dispatch({type:'LOGIN', payload: userCredential.user})
      })
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

  return {login, error, isPending}
}
