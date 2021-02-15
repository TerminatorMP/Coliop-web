import React from 'react';

import Editor from '../Editor/Editor';
import Toolbar from '../Toolbar/Toolbar';
import Solution from '../Solution/Solution';
import Messages from '../Messages/Messages';
import { convertXmlToJson } from '../api/request-formatter';
import { useFilesContext } from '../contexts/FilesContext';

import styles from './Content.module.css';


export default function Content() {
  const { activeFile, getContentFromFile } = useFilesContext();
  const contentRef = React.useRef(null);
  const [messagesObj, setMessageObj] = React.useState('');

  const setMessageObjFromXmlString = (xml) => {
    const json = convertXmlToJson(xml);
    const obj = JSON.parse(json);
    setMessageObj(obj);
  } 
  
  const displayComponetsBasedOnActiveFile = () => {
    switch(activeFile) {
      case 'Solution':
        return(
          <Solution solutionXmlString={getContentFromFile(activeFile)} />
        )
      case 'Ausgabe':
        return(
          <div style={{color: 'red'}}>Ausgabe: {getContentFromFile(activeFile)}</div>
        )
      default:
        return(
          <Toolbar setMessageObjFromXmlString={setMessageObjFromXmlString}/>
        )
    }
  }
  
  return(
    <div ref={contentRef} className={styles["content"]}>
      {displayComponetsBasedOnActiveFile()}
      <Editor displayed={activeFile !== 'Solution'} />
      <div className={styles["spacer"]}/>

      {activeFile !== 'Solution' && 
        <Messages parentRef={contentRef} messageObj={messagesObj} />
      }
    </div>
  )
}