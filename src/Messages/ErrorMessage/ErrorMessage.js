import React, { useEffect } from 'react';
import { useEditorContext } from '../../contexts/EditorContext';

import styles from './ErrorMessage.module.css';


const extractSelectionRange = (location) => {
  const regGetLocation = /:\d*\.\d*(-\d*(\.\d*)?)?/g;
  const locationString = location.match(regGetLocation)[0];
  const regExtractNumbers = /\d+/g;
  const locationNumbers = locationString.match(regExtractNumbers);
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

export default function ErrorMessage({ messageObj }) {
  const { selectRange } = useEditorContext();
  const { description, location } = messageObj.content;
  
  const markErrorLocation = () => {
    const rangeNumbers = extractSelectionRange(location);
    let range = {};
    if(rangeNumbers.length === 2) {
      range = createRangeObject(rangeNumbers[0]);
    }
    if(rangeNumbers.length === 3) {
      range = createRangeObject(rangeNumbers[0], rangeNumbers[1], rangeNumbers[0], rangeNumbers[2]);
    }
    if(rangeNumbers.length === 4) {
      range = createRangeObject(rangeNumbers[0], rangeNumbers[1], rangeNumbers[2], rangeNumbers[3]);
    }
    selectRange(range);
  }

  return(
    <div 
      onClick={markErrorLocation} 
      className={styles["error-message"]}
    >
      <p>Error: {description}</p>
      {location}
    </div>
  )
}