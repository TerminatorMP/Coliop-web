import React from 'react';

import styles from './Messages.module.css';

function TextMessage({ messageObj }){
  return(
    <div className={styles["text-message"]}>
      {messageObj.content}
    </div>
  )
}

export default React.memo(TextMessage);