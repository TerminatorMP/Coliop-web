import React from 'react';
import * as ace from 'ace-builds';

import { createXmlForRequest } from '../api/request-formatter';
import { fetchJobId, fetchSolution } from '../api/api';
import { useFilesContext } from '../contexts/FilesContext';
import { useEditorContext } from '../contexts/EditorContext';
import Button from '../components/Button/Button';
import { ServerStatuscodes as status } from '../MagicNumbers';

import { ReactComponent as Add } from '../assets/images/plus.svg'; 
import { ReactComponent as Back } from '../assets/images/arrow_back.svg';
import { ReactComponent as Forth } from '../assets/images/arrow_forth.svg';
import { ReactComponent as ZoomIn } from '../assets/images/zoom_inc.svg';
import { ReactComponent as ZoomOut } from '../assets/images/zoom_dec.svg'; 

import styles from './Toolbar.module.css';

export default function Toolbar() {
  const { increaseZoom, decreaseZoom, undo, redo } = useEditorContext();
  const { createFile, activeFile, getSessionFromFile, createSolutionFile } = useFilesContext();
      
      
  const makeRequest = async () => {
    const fileName = activeFile;
    const fileSession = getSessionFromFile(fileName);
    const problemString = fileSession.getValue();
    
    const { jobId } = await fetchJobId(fileName);
    const xml = createXmlForRequest(fileName, jobId, problemString);
    console.log(jobId);
    const { solution } = await fetchSolution(jobId, xml);


    if(solution[0] === status.PROBLEM_FINISHED) {
      console.log(solution);
      createSolutionFile(solution[2]);
    }
    else {
      console.log('Error:', solution[1]);
    }
  }

  return(
    <div className={styles.toolbar}>
      <div className={styles["left"]}>
        <div className={styles["group"]}>
          <div className={styles["icon"]} role="button" onClick={createFile}><Add /></div>
        </div>
        <div className={styles["group"]}>
          <div className={styles["icon"]} role="button" onClick={undo}><Back /></div>
          <div className={styles["icon"]} role="button" onClick={redo}><Forth /></div>
        </div>
        <div className={styles["group"]}>
          <div className={styles["icon"]} role="button" onClick={increaseZoom}><ZoomIn /></div>
          <div className={styles["icon"]} role="button" onClick={decreaseZoom}><ZoomOut /></div>
        </div>
      </div>
      <div className={styles["right"]}>
        <Button onClick={makeRequest}>
          Lösen >
        </Button>
      </div>

    </div>
  )
}