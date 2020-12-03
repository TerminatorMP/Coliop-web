
import { useFilesContext } from '../contexts/FilesContext';

import NavigationItem from './NavigationItem/NavigationItem';

import styles from './Navigation.module.css';

export default function Navigation() {
  const { files, activeFile, changeActiveFile } = useFilesContext();

  return(
    <div className={styles.nav}>
      <div className={styles.heading}>
        Dateien
      </div>
      <div className={styles.files}>
        {files.map((file, index) => {
          return(
            <NavigationItem 
              key={index} 
              fileName={file.name} 
              selected={file.name === activeFile} 
              setSelected={changeActiveFile}
            />
          );
        })}
      </div>
    </div>
  )
}