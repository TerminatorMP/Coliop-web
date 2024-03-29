import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import AceEditor from "react-ace";

import { useEditorContext } from '../contexts/EditorContext';

import styles from './Editor.module.scss';
 
import "../ace-modifier/cmpl-mode";
import "ace-builds/src-noconflict/theme-monokai";

import EditorCompiler from '../helper/EditorCompiler';
 

export default function Editor({ displayed }) {
  const { setEditorRef } = useEditorContext();
  const aceRef = useRef(null);
  
  const compiler = new EditorCompiler();
  
  useEffect(() => {
    setEditorRef(aceRef.current.editor);
  });

  useEffect(() => {
    console.log('Editor mounted');
  }, [])
  
  const onChange = (newValue) => {
    console.log("change", newValue);
    compiler.check(newValue);
  }

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
Editor.propTypes = {
  displayed: PropTypes.bool.isRequired,
}