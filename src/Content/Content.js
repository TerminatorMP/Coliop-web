import React from 'react';

import Editor from '../Editor/Editor';
import Toolbar from '../Toolbar/Toolbar';
import Solution from '../Solution/Solution';

import { useFilesContext } from '../contexts/FilesContext';

import styles from './Content.module.css';


export default function Content() {
  const { activeFile, getContentFromFile } = useFilesContext();
  
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
          <Toolbar />
        )
    }
  }
  
  return(
    <div className={styles["content"]}>
      {displayComponetsBasedOnActiveFile()}
      <Editor displayed={activeFile !== 'Solution' && activeFile !== 'Ausgabe'} />
    </div>
  )
}