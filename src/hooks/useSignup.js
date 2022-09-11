import { useState, useEffect } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../firebase/config"
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancalled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const {dispatch} = useAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

      //signup
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if(!userCredential){
            throw new Error('Could not complete signup')
          }
          updateProfile(userCredential.user, {displayName})
          dispatch({type:'LOGIN', payload: userCredential.user})
        })
        .then(() => {
          if(!isCancalled){
            setIsPending(false)
            setError(null)
          }
        })
        .catch((err) => {
          if(!isCancalled){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
          }
        })
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return {error, isPending, signup}
}

