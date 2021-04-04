import React from "react";
import { useEditorContext } from '../contexts/EditorContext';
import { useMessageContext } from '../contexts/MessageContext';

import styles from "./Messages.module.css";

const initialConsoleHeightInPx = 200;

export default function Messages({ parentRef }) {
  const { updateSize, selectRange } = useEditorContext();
  const { messages, clearMessages } = useMessageContext();

  const [height, setHeight] = React.useState(initialConsoleHeightInPx);
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

  const extractSelectionRange = (location) => {
    const regExcludeFileName = /:.*/g;
    const locationWithoutFileName = location.match(regExcludeFileName)[0].slice(1);
    const regGetAllNumbers = /\d+/g;
    const locationNumbers = locationWithoutFileName.match(regGetAllNumbers);
    return locationNumbers;
  }

  const createRangeObject = (sLine, sChar, eLine, eChar) => {
    return {
      startLine: sLine,
      startChar: sChar,
      endLine: eLine,
      endChar: eChar,
    }
  }

  const markErrorLocation = (location) => {
    const rangeNumbers = extractSelectionRange(location);
    let range = {};
    if(rangeNumbers.length === 3) {
      range = createRangeObject(rangeNumbers[0], rangeNumbers[1], rangeNumbers[0], rangeNumbers[2]);
    }
    if(rangeNumbers.length === 4) {
      range = createRangeObject(rangeNumbers[0], rangeNumbers[1], rangeNumbers[2], rangeNumbers[3]);
    }
    console.log(range); 
    selectRange(range);
  }

  const TextMessage = ({ messageObj }) => {
    return(
      <div className={styles["text-message"]}>
        {messageObj.content}
      </div>
    )
  }

  const ErrorMessage = ({ messageObj }) => {
    const { description, location } = messageObj.content;
    const handleOnClick = () => {
      markErrorLocation(location);
    }
    return(
      <div 
        onClick={handleOnClick} 
        className={styles["error-message"]}
      >
        <p>Error: {description}</p>
        {location}
      </div>
    )
  }

  const Dragger = () => {
    return(
      <div ref={draggerRef} className={styles["dragger"]}>
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
    )
  }

  return (
    <div style={style} className={styles["resizer"]}>
      <Dragger />
      <Content />
    </div>
  );
}