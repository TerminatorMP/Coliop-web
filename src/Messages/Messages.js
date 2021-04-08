import React, { useCallback } from "react";
import ErrorMessage from './ErrorMessage/ErrorMessage';
import { useEditorContext } from '../contexts/EditorContext';
import { useMessageContext } from '../contexts/MessageContext';

import styles from "./Messages.module.css";

export default function Messages({ parentRef }) {
  const { updateSize } = useEditorContext();
  const { messages, clearMessages, hightCache, updateHightCache } = useMessageContext();

  const [height, setHeight] = React.useState(hightCache);
  const draggerRef = React.useRef(null);
  const contentRef = React.useRef(null);


  const draggerHeight = 28;
  const style = {
    height: height + "px"
  };

  const calculateHeight = (event) => {
    const boundryBottom = parentRef.current.getBoundingClientRect().bottom;
    const loc = event.clientY;
    const calculatedHeight = boundryBottom - loc;
    setHeight(calculatedHeight < draggerHeight ? draggerHeight : calculatedHeight);
    updateSize();
  };
  
  const handleDragLogic = (event) => {
    document.addEventListener("mousemove", calculateHeight);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", calculateHeight);
      scrollToBottom();
    }, { once: true });
  }

  React.useEffect(() => {
    const draggerElement = draggerRef.current;
    draggerElement.addEventListener("mousedown", handleDragLogic);

    return () => draggerElement.removeEventListener("mousedown", handleDragLogic);
  });

  React.useEffect(() => {
    return () => { updateHightCache(height) }
  }, [updateHightCache, height])


  const scrollToBottom = () => {
    const content = contentRef.current;
    content.scrollTo(0, content.scrollHeight);
  }

  React.useEffect(() => {
    console.log('mounted')

  }, [])

  React.useEffect(() => {
    scrollToBottom();
  }, [messages])

  const TextMessage = ({ messageObj }) => {
    return(
      <div className={styles["text-message"]}>
        {messageObj.content}
      </div>
    )
  }

  const Dragger = () => {
    return(
      <div ref={draggerRef} className={styles["dragger"]} >
        <div>
          Konsole
        </div>
        <div onClick={clearMessages}>
          Clear
        </div>
      </div>
    )
  }

  const Content = () => {
    return(
      <div ref={contentRef} className={styles["content"]}>
        {messages.map((messageObj, index) => {
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

  return (
    <div style={style} className={styles["resizer"]}>
      <Dragger />
      <Content />
    </div>
  );
}