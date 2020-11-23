
import { useState } from 'react';
import { useFilesContext } from '../contexts/FilesContext';

import NavigationItem from './NavigationItem/NavigationItem';

import styles from './Navigation.module.css';

export default function Navigation() {
  const { files } = useFilesContext();
  const [selected, setSelected] = useState("");

  return(
    <div className={styles.nav}>
      <div className={styles.heading}>
        Projekt
      </div>
      <div className={styles.line} />
      <div className={styles.files}>
        {files.map((file, index) => {
          return(
            <NavigationItem 
              key={index} 
              fileName={file.name} 
              selected={file.name === selected} 
              setSelected={setSelected}
            />
          );
        })}
      </div>
    </div>
  )
}