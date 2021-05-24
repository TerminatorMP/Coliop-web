import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFilesContext } from '../../contexts/FilesContext';

import { ReactComponent as FileImage } from '../../assets/images/file.svg';
import { ReactComponent as CheckMark } from '../../assets/images/check.svg';
import { ReactComponent as Pen } from '../../assets/images/pen.svg'; 
import styles from './NavigationItem.module.css';

export default function NavigationItem({ fileName, selected, setSelected }) {
  const { changeFilename } = useFilesContext();
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(fileName);
  }, []);

  const handleClick = () => {
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

  const ChangeFileName = () => {
    return(
      <form className={styles["filename_form"]} onSubmit={handleSubmit}>
        <input 
          className={styles["filename_input"]}
          type="text" 
          value={value} 
          onChange={handleChange} 
        />
        <input 
          className={styles["filename_submit"]} 
          type="submit" 
          value="Fertig" 
        />
      </form>
    )
  }

  return(
    <div 
      className={selected ? `${styles["item"]} ${styles["active"]}` : `${styles["item"]}`}
      onClick={handleClick}
    >
      {(editable) ? 
        <ChangeFileName />
        :
        <div className={styles["file"]}>
          <div className={styles["flex"]}>
            <div className={selected ? `${styles["icon"]} ${styles["active"]}` : `${styles["icon"]}`}>
              {fileName === 'Solution' ? 
                <CheckMark />
                :
                <FileImage />
              }
            </div>
            <div className={styles["name"]}>{fileName}</div>
          </div>
          <div className={styles["edit"]} onClick={() => {setEditable(!editable)}}>
            <Pen />
          </div>
        </div>
      }
    </div>
  )
}

NavigationItem.propTypes = {
  fileName: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  setSelected: PropTypes.func.isRequired,
}