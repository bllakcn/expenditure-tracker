import { useReducer, useEffect, useState } from "react";
import { db, timestamp } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true,  error: false }
    case 'ERROR':
      return { isPending: false, document: null, success:false, error: action.payload}
    default:
      return state
  }
}

export const useFirestore = (col) => {
  const [response, dispatch] = useReducer(initialState, firestoreReducer)
  const [isCancalled, setIsCancelled] = useState(false)

  // collection reference
  const colRef = collection(db, col)

  // dispatch only if not cancalled
  const dispatchIfNotCancelled = (action) => {
    if(!isCancalled){
      dispatch(action)
    }
  }

  // add document
  const addDocument = async (doc) => {
    try{
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await addDoc(colRef, { ...doc, createdAt})
      dispatchIfNotCancelled({ type:'ADDED_DOCUMENT', payload:addedDocument})
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  // delete document
  const deleteDocument = async () => {

  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}