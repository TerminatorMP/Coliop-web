import React from 'react';
import PropTypes from 'prop-types';

import styles from './Messages.module.scss';

function TextMessage({ messageObj }){
  return(
    <div className={styles["text-message"]}>
      {messageObj.content}
    </div>
  )
}
TextMessage.propTypes = {
  messageObj: PropTypes.shape({
    content: PropTypes.string,
  })
}

export default TextMessage;