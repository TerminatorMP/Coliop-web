import React from "react";
import PropTypes from 'prop-types';
import Content from './Content';
import { useEditorContext } from '../contexts/EditorContext';
import { useMessageContext } from '../contexts/MessageContext';

import styles from "./Messages.module.css";

export default function Messages({ parentRef }) {
  const { updateSize } = useEditorContext();
  const { messages, clearMessages, hightCache, updateHightCache } = useMessageContext();

  const [height, setHeight] = React.useState(hightCache);
  const draggerRef = React.useRef(null);


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
  
  const handleDragLogic = () => {
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

  React.useEffect(() => {
    return () => { updateHightCache(height) }
  }, [updateHightCache, height])

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

  return (
    <div style={style} className={styles["resizer"]}>
      <Dragger />
      <Content messageData={messages}/>
    </div>
  );
}

Messages.propTypes = {
  parentRef: PropTypes.node.isRequired,
}