import React from 'react';
import { useFilesContext } from '../contexts/FilesContext';

import NavigationItem from './NavigationItem/NavigationItem';

import styles from './Navigation.module.scss';

export default function Navigation() {
  const { files, activeFile, changeActiveFile } = useFilesContext();

  const NavigationItemList = ({ fileData }) => {
    return(
      fileData.map((file, index) => {
        return(
          <NavigationItem 
            key={index} 
            fileName={file.name} 
            selected={file.name === activeFile} 
            setSelected={changeActiveFile}
          />
        );
      })
    )
  }

  return(
    <div className={styles["nav"]}>
      <div className={styles["heading"]}>
        Dateien
      </div>
      <div className={styles["files"]}>
        <NavigationItemList fileData={files} />
      </div>
    </div>
  )
}