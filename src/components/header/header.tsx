import { FC } from 'react'

import styles from './header.module.scss'

export const Header: FC<HeaderPropsType> = ({ title }) => {
  return <div className={styles.container}>{title}</div>
}

type HeaderPropsType = {
  title: string
}
