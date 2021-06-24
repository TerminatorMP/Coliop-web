import React from 'react';

import { ReactComponent as Logo } from '../assets/images/coliop-icon.svg';

import styles from './Header.module.scss';

export default function Header() {
  return(
    <div className={styles.header}>
      <Logo className={styles.logo} />
    </div>
  )
}