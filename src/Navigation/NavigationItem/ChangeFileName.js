import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useFilesContext } from '../../contexts/FilesContext';

import styles from './NavigationItem.module.scss';

export default function ChangeFileName({ fileName, setEditable }) {
  const { changeFilename } = useFilesContext();
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(fileName);
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    changeFilename(fileName, value);
    setEditable(false);
    event.preventDefault();
  }

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
ChangeFileName.propTypes = {
  fileName: PropTypes.string.isRequired,
  setEditable: PropTypes.func.isRequired,
}