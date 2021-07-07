import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ChangeFileName from './ChangeFileName';

import { ReactComponent as FileImage } from '../../assets/images/file.svg';
import { ReactComponent as CheckMark } from '../../assets/images/check.svg';
import { ReactComponent as Pen } from '../../assets/images/pen.svg'; 
import styles from './NavigationItem.module.scss';

export default function NavigationItem({ fileName, selected, setSelected }) {
  const [editable, setEditable] = useState(false);

  const handleClick = () => {
    setSelected(fileName);
  }

  return(
    <div 
      className={selected ? `${styles["item"]} ${styles["active"]}` : `${styles["item"]}`}
      onClick={handleClick}
    >
      {(editable) ? 
        <ChangeFileName 
          fileName={fileName}
          setEditable={setEditable}
        />
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
          <div className={styles["edit"]} onClick={() => {setEditable(true)}}>
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