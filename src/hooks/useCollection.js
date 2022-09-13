import { useEffect, useState, useRef } from 'react'
import { db } from '../firebase/config'
import { onSnapshot, collection, query, where, orderBy } from 'firebase/firestore'

export const useCollection = (col, q, o) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  //to prevent infinte loop in useEffect
  const queryRef = useRef(q).current
  const orderByRef = useRef(o).current

  useEffect(() => {
    let colRef = collection(db, col)
    if(queryRef){
      colRef = query(colRef, where(...queryRef), orderBy(...orderByRef))
    }
    // if(orderByRef){
    //   colRef = query
    // }

    const unsub = onSnapshot(colRef, (snapshot) => {
      let results = []
      snapshot.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      })

      setDocuments(results)
      setError(null)
    
    }, (error) => {
      console.log(error)
      setError('Could not fetch the data')
    })

    return () => unsub()

  }, [col, queryRef, orderByRef])

  return { documents, error }
}