/* eslint no-unused-vars: 0 */
import React, { useEffect, useRef }from 'react';

import { useFilesContext } from '../../contexts/FilesContext';

import { File, FileTypes } from '../../types/FileType';

import styles from './Downloader.module.scss';

type DownloaderPropTypes = {
  children: React.ReactNode,
}

export default function Downloader ({ children }: DownloaderPropTypes){
  const { files } = useFilesContext();

  const [downloadURL, setDownloadURL] = React.useState<string>('');
  const doFileDownload = useRef<HTMLAnchorElement>(null);


  useEffect(() => {
    if(downloadURL !== '') {
      doFileDownload?.current?.click();
      URL.revokeObjectURL(downloadURL);
      setDownloadURL('');
    }
  }, [downloadURL]);

  const convertFileSessionsToStrings = () => {
    const downloadableArrayOfFiles = files.map((file: File) => {
      if(file.type === FileTypes.CMPL) {
        const newFile: File = { ...file, content: file.content.getValue() }
        return newFile;
      }
      return file;
    })
    return downloadableArrayOfFiles;
  }
  
  const handleClick = (event: any) => {
    event.preventDefault();

    const data = convertFileSessionsToStrings();
    const filesAsJson = JSON.stringify({files: data}, null, 4);

    const blob = new Blob([filesAsJson], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    setDownloadURL(url);
  }

  return(
    <>
      <div
        className={styles["downloader"]}
        onClick={handleClick}
      >
        {children}
      </div>
      <a 
        ref={doFileDownload}
        style={{display: 'none'}}
        download="project.json"
        href={downloadURL}
      />
    </>
  )
}