import React, { useEffect } from 'react';

import { convertXmlToJson } from '../api/request-formatter';

import styles from './Solution.module.css';


export default function Solution({ solutionXmlString }) {
  const solutionJson = convertXmlToJson(solutionXmlString);
  const data = JSON.parse(solutionJson);
  console.log(data);
  
  return(
    <div className={styles["solution"]}>
      {solutionJson}
    </div>
  )
}