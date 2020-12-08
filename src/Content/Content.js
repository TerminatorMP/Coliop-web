import React, { useEffect } from 'react';

import Editor from '../Editor/Editor';
import Toolbar from '../Toolbar/Toolbar';

import { useFilesContext } from '../contexts/FilesContext';

import styles from './Content.module.css';

export default function Content() {

  return(
    <div className={styles["content"]}>
      <Toolbar />
      <Editor />
    </div>
  )
}