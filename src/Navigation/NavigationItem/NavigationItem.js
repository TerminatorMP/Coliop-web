import { useState, useEffect } from 'react';

import { useFilesContext } from '../../contexts/FilesContext';

import styles from './NavigationItem.module.css';

export default function NavigationItem({ fileName, selected, setSelected }) {
  const { changeActiveFile, changeFilename } = useFilesContext();
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(fileName);
  }, []);

  const handleClick = () => {
    changeActiveFile(fileName);
    setSelected(fileName);
  }

  const handleSubmit = (event) => {
    changeFilename(fileName, value);
    setEditable(!editable);
    event.preventDefault();
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  return(
    <div className={selected ? `${styles["item"]} ${styles["active"]}` : `${styles["item"]}`}>
      {(editable) ? 
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" value={value} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        :
        <div 
          className={styles["file"]} 
          onClick={handleClick}
        >
          {fileName}
          <div className={styles["edit"]} onClick={() => {setEditable(!editable)}}>
            edit
          </div>
        </div>
      }
    </div>
  )
}