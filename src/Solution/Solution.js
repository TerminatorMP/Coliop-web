import React, { useEffect } from 'react';

import { convertXmlToJson } from '../api/request-formatter';
import GeneralInformation from './GeneralInformation/GeneralInformation';

import styles from './Solution.module.css';


export default function Solution({ solutionXmlString }) {
  const solutionJson = convertXmlToJson(solutionXmlString);
  const data = JSON.parse(solutionJson);
  console.log("data", data);

  const variableDataArray = data.CmplSolutions.solution.variables.variable;
  const constraintsDataArray = data.CmplSolutions.solution.linearConstraints.constraint;
  
  
  return(
    <div className={styles["solution"]}>
      <GeneralInformation 
        generalInformationsObj={data.CmplSolutions.general}
      />
      <table className={styles["table-values"]}>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th className={styles["activity"]}>Activity</th>
          <th>Lower bound</th>
          <th>Upper bound</th>
          <th>Marginal</th>
        </tr>
        {variableDataArray.map((variable) =>
          <tr>
            <td>{variable._attributes.name}</td>
            <td>{variable._attributes.type}</td>
            <td className={styles["activity"]}>{variable._attributes.activity}</td>
            <td>{variable._attributes.lowerBound}</td>
            <td>{variable._attributes.upperBound}</td>
            <td>{variable._attributes.marginal}</td>
          </tr>
        )}
      </table>
      <table className={styles["table-values"]}>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th className={styles["activity"]}>Activity</th>
          <th>Lower bound</th>
          <th>Upper bound</th>
          <th>Marginal</th>
        </tr>
        {constraintsDataArray.map((constraint) =>
          <tr>
            <td>{constraint._attributes.name}</td>
            <td>{constraint._attributes.type}</td>
            <td className={styles["activity"]}>{constraint._attributes.activity}</td>
            <td>{constraint._attributes.lowerBound}</td>
            <td>{constraint._attributes.upperBound}</td>
            <td>{constraint._attributes.marginal}</td>
          </tr>
        )}
      </table>
      <div className={styles["scroll-spacer"]}/>
    </div>
  )
}