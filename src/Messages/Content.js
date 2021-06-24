import React, { useEffect, useRef } from 'react';
import Proptypes from 'prop-types';

import ErrorMessage from './ErrorMessage/ErrorMessage';
import TextMessage from './TextMessage';

import styles from './Messages.module.scss';

function Content({ messageData }) {
  const contentRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messageData])

  const scrollToBottom = () => {
    const content = contentRef.current;
    content.scrollTo(0, content.scrollHeight);
  }

  return(
    <div ref={contentRef} className={styles["content"]}>
      {messageData.map((messageObj, index) => {
        if(messageObj.type === 'text') {
          return <TextMessage key={index} {...{ messageObj }} />
        }
        if(messageObj.type === 'error') {
          return <ErrorMessage key={index} {...{ messageObj }} />
        }
        return 'undefined Messagetype'
      })}
    </div>
  )
}

Content.propTypes = {
  messageData: Proptypes.array.isRequired,
}

export default Content;