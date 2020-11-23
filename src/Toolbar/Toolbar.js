import React from 'react';

import { useFilesContext } from '../contexts/FilesContext';
import { useEditorContext } from '../contexts/EditorContext';


import * as Ace from 'ace-builds';


import styles from './Toolbar.module.css';

export default function Toolbar() {
  const { increaseZoom, decreaseZoom } = useEditorContext();
  const { createFile, setFiles } = useFilesContext();

  const addNewFile = () => {
    const data = [
      {
        name: "diet.cmpl",
        session: Ace.createEditSession('1Session'),
      },
      {
        name: "diet.cdat",
        session: Ace.createEditSession('2Session'),
      }
    ];
    setFiles(data);
  }

  return(
    <div className={styles.toolbar}>
      <button onClick={addNewFile}>Add File</button>
      <button onClick={increaseZoom}>Zoom +</button>
      <button onClick={decreaseZoom}>Zoom -</button>
    </div>
  )
}