import {useRef, useEffect} from 'react';
import AceEditor from "react-ace";

import { useEditorContext } from '../contexts/EditorContext';

import styles from './Editor.module.css';
 
import "../ace-modifier/cmpl-mode";
import "ace-builds/src-noconflict/theme-monokai";
 
function onChange(newValue) {
  console.log("change", newValue);
}

export default function Editor({ displayed }) {
  const { setEditorRef } = useEditorContext();
  const aceRef = useRef(null);

  useEffect(() => {
    setEditorRef(aceRef.current.editor);
  });

  return(
    <div 
      style={displayed ? {display: 'block'} : {display: 'none'}} 
      className={styles.editor}
    >
      <AceEditor
        ref={aceRef}
        mode="cmpl"
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