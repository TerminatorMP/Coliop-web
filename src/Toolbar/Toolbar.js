import React from 'react';

import { createXmlForRequest, convertXmlToJson } from '../api/request-formatter';
import { fetchJobId, fetchMessages, fetchSolution, fetchSolutionStatus, sendCmplProblem } from '../api/api';
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
  const { createFile, activeFile, getContentFromFile, createSolutionFile } = useFilesContext();
      
      
  const makeRequest = async () => {
    const fileName = activeFile;
    const fileSession = getContentFromFile(fileName);
    const problemString = fileSession.getValue();
    
    const { jobId } = await fetchJobId(fileName);
    const xml = createXmlForRequest(fileName, jobId, problemString);

    sendCmplProblem(xml);

    let checker = await setInterval(async () => {
      console.log('checked');

      let { solutionStatus } = await fetchSolutionStatus(jobId);

      let { message } = await fetchMessages(jobId);
      console.log("message", message);

      if(solutionStatus[0] === 12) {
          clearInterval(checker);
          let { solution } = await fetchSolution(jobId);
          console.log(solution);
          createSolutionFile(solution[2]);
      };
    }, 300);
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
};