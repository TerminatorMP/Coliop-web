import React from "react";

import { useEditorContext } from '../contexts/EditorContext';

import styles from "./Messages.module.css";

export default function Messages({ parentRef }) {
  const { updateSize } = useEditorContext();

  const [height, setHeight] = React.useState(200);
  const draggerRef = React.useRef(null);

  const draggerHeight = 30;

  const style = {
    height: height + "px"
  };

  const handleDrag = (event) => {
    const boundryBottom = parentRef.current.getBoundingClientRect().bottom;
    const loc = event.clientY;
    const calculatedHeight = boundryBottom - loc;
    setHeight(calculatedHeight < draggerHeight ? draggerHeight : calculatedHeight);
    updateSize();
  };

  const handleMouseDown = (event) => {
    console.log("down");
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", handleDrag);
      console.log("up");
    }, { once: true });
  }

  React.useEffect(() => {
    const draggerElement = draggerRef.current;
    draggerElement.addEventListener("mousedown", handleMouseDown);

    return () => draggerElement.removeEventListener("mousedown", handleMouseDown);
  });

  return (
    <div style={style} className={styles["resizer"]}>
      <div ref={draggerRef} className={styles["dragger"]}>
        Konsole
      </div>
      <div className={styles["content"]}>
        Resizer
        <p>Mehr Inhalt</p>
        <p>Mehr Inhalt</p>
        <p>Mehr Inhalt</p>
        <p>Mehr Inhalt</p>
      </div>
    </div>
  );
}