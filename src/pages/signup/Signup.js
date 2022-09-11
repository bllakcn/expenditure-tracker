import { useEffect, useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

import styles from './Signup.module.css'

export default function Signup() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [matchPassword , setMatchPassword] = useState(false)
  const {signup, isPending, error} = useSignup()
  
  useEffect(()=>{
    if(confirmPassword === password || confirmPassword.length < password.length/2){
      setMatchPassword(true)
    } else {
      setMatchPassword(false)
    }
  }, [password, confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(matchPassword)
    signup(email, password, displayName)
  }

  return (
    <form className={styles['signup-form']} onSubmit={handleSubmit}>
    <h2>Signup</h2>
    <label>
      <span>display name:</span>
      <input
        type="text"
        onChange={(e) => setDisplayName(e.target.value)}  
        value={displayName}
      />
    </label>
    <label>
      <span>email:</span>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
    </label>
    <label>
      <span>password:</span>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
    </label>
    <label>
      <span className={styles[`${matchPassword ? '' : 'unmatch'}`]}>confirm password:</span>
      <input
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />
    </label>
    {!isPending && <button className='btn'>Signup</button>}
    {isPending && <button className='btn' disabled>Loading</button>}
    {error && <p>{error}</p>}
  </form>
  )
}
