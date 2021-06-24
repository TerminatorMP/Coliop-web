import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

export default function Button({ children, onClick }) {
  return(
    <div 
      role="button" 
      className={styles["button"]}
      onClick={onClick}
    >
      {children}
    </div>
  )
} 
Button.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.onClick.isRequired,
}