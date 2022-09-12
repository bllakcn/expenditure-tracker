import { useAuthContext } from '../../hooks/useAuthContext'

import TransactionForm from './TransactionForm'

import styles from './Home.module.css'

export default function Home() {
  const { user } = useAuthContext()

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.content}>
          
        </div>
        <div className={styles.sidebar}>
          <TransactionForm uid={user.uid}/>
        </div>
      </div>
    </div>
  )
}
