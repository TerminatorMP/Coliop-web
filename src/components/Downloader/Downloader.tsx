/* eslint no-unused-vars: 0 */
import React from 'react';

import { useFilesContext } from '../../contexts/FilesContext';

import styles from './Downloader.module.scss';

import { File, FileTypes } from '../../types/FileType';
export default function Downloader (){
  const { files } = useFilesContext();

  const [downloadURL, setDownloadURL] = React.useState<string>('');
  const doFileDownload = React.useRef<HTMLAnchorElement>(null);


  React.useEffect(() => {
    if(downloadURL !== '') {
      doFileDownload?.current?.click();
      URL.revokeObjectURL(downloadURL);
      setDownloadURL('');
    }
  }, [downloadURL]);


  const convertFileSessions = () => {
    const downloadableArrayOfFiles = files.map((file: File) => {
      if(file.type === FileTypes.CMPL) {
        const newFile: File = { ...file, content: file.content.getValue() }
        return newFile;
      }
      return file;
    })
    return downloadableArrayOfFiles;
  }
  
  const handleClick = (event:any) => {
    event.preventDefault();
    const data = convertFileSessions();
    const filesAsJson = JSON.stringify({files: data}, null, 4);
    const blob = new Blob([filesAsJson]);
    const url = URL.createObjectURL(blob);
    setDownloadURL(url);
    console.log('clicked');
  }

  return(
    <>
      <div 
        className={styles["downloader"]}
        onClick={handleClick}
      >
        download now
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