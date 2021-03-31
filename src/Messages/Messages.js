import React from "react";
import { useEditorContext } from '../contexts/EditorContext';
import { useMessageContext } from '../contexts/MessageContext';

import styles from "./Messages.module.css";

const initialConsoleHeightInPx = 200;

export default function Messages({ parentRef }) {
  const { updateSize } = useEditorContext();
  const [height, setHeight] = React.useState(initialConsoleHeightInPx);
  const draggerRef = React.useRef(null);

  const { messages } = useMessageContext();

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
    }, { once: true });
  }

  React.useEffect(() => {
    const draggerElement = draggerRef.current;
    draggerElement.addEventListener("mousedown", handleDragLogic);

    return () => draggerElement.removeEventListener("mousedown", handleDragLogic);
  });

  const TextMessage = ({ messageObj }) => {
    return(
      <div className={styles["text-message"]}>
        {messageObj.content}
      </div>
    )
  }

  const ErrorMessage = ({ messageObj }) => {
    const { description, location } = messageObj.content;
    return(
      <div className={styles["error-message"]}>
        <p>Error: {description}</p>
        {location}
      </div>
    )
  }

  return (
    <div style={style} className={styles["resizer"]}>
      <div ref={draggerRef} className={styles["dragger"]}>
        Konsole
      </div>
      <div className={styles["content"]}>
        {messages.map((messageObj) => {
          if(messageObj.type === 'text') {
            return <TextMessage {...{ messageObj }} />
          }
          if(messageObj.type === 'error') {
            return <ErrorMessage {...{ messageObj }} />
          }
          return 'undefined Messagetype'
        })}
      </div>
    </div>
  );
}