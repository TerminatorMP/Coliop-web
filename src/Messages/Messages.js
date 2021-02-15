import React from "react";
import { useEditorContext } from '../contexts/EditorContext';

import styles from "./Messages.module.css";

export default function Messages({ parentRef, messageObj = undefined }) {
  const { updateSize } = useEditorContext();
  const [height, setHeight] = React.useState(200);
  const draggerRef = React.useRef(null);

  const draggerHeight = 30;

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

  return (
    <div style={style} className={styles["resizer"]}>
      <div ref={draggerRef} className={styles["dragger"]}>
        Konsole
      </div>
      <div className={styles["content"]}>
       { messageObj ? messageObj.CmplMessages.general.message._text : 'keine Messages'}
      </div>
    </div>
  );
}