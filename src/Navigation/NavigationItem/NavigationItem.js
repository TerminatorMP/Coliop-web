import { useFilesContext } from '../../contexts/FilesContext';

import styles from './NavigationItem.module.css';

export default function NavigationItem({ fileName, selected, setSelected }) {
  const { changeActiveFile } = useFilesContext();

  const handleClick = () => {
    changeActiveFile(fileName);
    setSelected(fileName);
  }

  return(
    <div 
      className={ selected ? `${styles["file"]} ${styles["active"]}` : `${styles["file"]}` } 
      onClick={handleClick}
    >
      {fileName}
    </div>
  )
}