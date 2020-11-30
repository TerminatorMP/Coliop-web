import React from 'react';

import { createXmlForRequest } from '../api/request-formatter';
import { fetchJobId, fetchSolution } from '../api/api';

import { useFilesContext } from '../contexts/FilesContext';
import { useEditorContext } from '../contexts/EditorContext';

import { ReactComponent as Add } from '../assets/images/plus.svg'; 
import { ReactComponent as Back } from '../assets/images/arrow_back.svg';
import { ReactComponent as Forth } from '../assets/images/arrow_forth.svg';
import { ReactComponent as ZoomIn } from '../assets/images/zoom_inc.svg';
import { ReactComponent as ZoomOut } from '../assets/images/zoom_dec.svg'; 

import styles from './Toolbar.module.css';

import * as Ace from 'ace-builds';

export default function Toolbar() {
  const { increaseZoom, decreaseZoom, undo, redo } = useEditorContext();
  const { createFile, files } = useFilesContext();

  const makeRequest = async () => {
    let problemString = files[0].session.getValue();

    let { jobId } = await fetchJobId('diet.cmpl');
    console.log(jobId);
    let xml = createXmlForRequest(jobId, problemString);
    console.log(xml);
    let solution = await fetchSolution(jobId, xml);
    console.log(solution);

  }

  return(
    <div className={styles.toolbar}>
      <div className={styles["left"]}>
        <div className={styles["icon"]} role="button" onClick={createFile}><Add /></div>
        <div className={styles["icon"]} role="button" onClick={undo}><Back /></div>
        <div className={styles["icon"]} role="button" onClick={redo}><Forth /></div>
        <div className={styles["icon"]} role="button" onClick={increaseZoom}><ZoomIn /></div>
        <div className={styles["icon"]} role="button" onClick={decreaseZoom}><ZoomOut /></div>
      </div>
      <div className={styles["right"]}>
        <button onClick={makeRequest}>
          Senden
        </button>
      </div>

    </div>
  )
}