/* eslint no-unused-vars: 0 */
import React from 'react';
import * as Ace from 'ace-builds';

import { useFilesContext } from '../../contexts/FilesContext';

import styles from './Uploader.module.scss';
import { File, FileTypes } from '../../types/FileType';

type UploaderPropTypes = {
  children: React.ReactNode,
}

export default function Uploader({ children }: UploaderPropTypes) {
  const doFileUpload = React.useRef<HTMLInputElement>(null);

  const { setFiles } = useFilesContext();

  const importUploadedFiles = (loadedFiles: File[]) => {
    const convertedFiles = loadedFiles.map((file) => {
      if(file.type === FileTypes.CMPL) {
        //@ts-ignore
        return {...file, content: Ace.createEditSession(file.content, 'ace/mode/cmpl')}
      }
      return file;
    })
    console.log(convertedFiles);
    setFiles(convertedFiles);
  }

  const handleClick = (event: any) => {
    event.preventDefault();
    doFileUpload?.current?.click();
  }

  const handleFileUpload = (event: any) => {
    const firstFile = event.target.files[0];
    
    const reader = new FileReader();

    let loadFile = (ev: any) => {
      const fileContent = ev.target.result;
      const { files } = JSON.parse(fileContent);
      importUploadedFiles(files);

    }

    reader.onload = loadFile;
    reader.readAsText(firstFile);
  }

  return(
    <>
      <div 
        className={styles["uploader"]}
        onClick={handleClick}
      >
      {children}
      </div>
      <input 
        ref={doFileUpload}
        style={{display: 'none'}}
        type="file"
        accept=".json"
        multiple={false}
        onChange={handleFileUpload}
      />
    </>
  )  
}