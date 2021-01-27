import React, { useEffect } from 'react';

import { convertXmlToJson } from '../api/request-formatter';
import GeneralInformation from './GeneralInformation/GeneralInformation';

import styles from './Solution.module.css';


export default function Solution({ solutionXmlString }) {
  const solutionJson = convertXmlToJson(solutionXmlString);
  const data = JSON.parse(solutionJson);
  console.log(data);
  
  
  return(
    <div className={styles["solution"]}>
      <GeneralInformation 
        generalInformationsObj={data.CmplSolutions.general}
      />
    </div>
  )
}