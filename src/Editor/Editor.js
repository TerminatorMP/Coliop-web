import {useRef, useEffect} from 'react';
import AceEditor from "react-ace";
import * as Ace from 'ace-builds';

import { useEditorContext } from '../contexts/EditorContext';

import styles from './Editor.module.css';
 
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
 
function onChange(newValue) {
  console.log("change", newValue);
}

export default function Editor() {
  const { setEditorRef } = useEditorContext();
  const aceRef = useRef(null);

  useEffect(() => {
    setEditorRef(aceRef);
  });

  return(
    <div className={styles.editor}>
      <AceEditor
        ref={aceRef}
        mode="java"
        theme="monokai"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        width={'100%'}
        height={'100%'}
      />
    </div>
  )
}