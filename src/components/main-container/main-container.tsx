import { PropsWithChildren } from 'react'

import styles from './main-container.module.scss'

export const MainContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
