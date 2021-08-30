import React from 'react';
import PropTypes from 'prop-types';

import { convertXmlToJson } from '../api/request-formatter';
import GeneralInformation from './GeneralInformation/GeneralInformation';

import styles from './Solution.module.css';

export default function Solution({ solutionXmlString }) {
  const solutionJson = convertXmlToJson(solutionXmlString);
  const data = JSON.parse(solutionJson);

  const variableDataArray = data?.CmplSolutions.solution.variables.variable;
  const constraintsDataArray = data.CmplSolutions.solution.linearConstraints.constraint;

  function Table ({ data }) {
    return(
      <table className={styles["table-values"]}>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th className={styles["activity"]}>Activity</th>
          <th>Lower bound</th>
          <th>Upper bound</th>
          <th>Marginal</th>
        </tr>
        {data.map((obj, index) =>
          <tr key={index}>
            <td>{obj._attributes.name}</td>
            <td>{obj._attributes.type}</td>
            <td className={styles["activity"]}>{obj._attributes.activity}</td>
            <td>{obj._attributes.lowerBound}</td>
            <td>{obj._attributes.upperBound}</td>
            <td>{obj._attributes.marginal}</td>
          </tr>
        )}
      </table>
    )
  }
  Table.propTypes = {
    data: PropTypes.array.isRequired,
  }
  
  return(
    <div className={styles["solution"]}>
      <GeneralInformation 
        generalInformationsObj={data.CmplSolutions.general}
        generalSolutionObj={data.CmplSolutions.solution._attributes}
      />
      <Table data={variableDataArray} />
      <Table data={constraintsDataArray} />
      <div className={styles["scroll-spacer"]}/>
    </div>
  )
}
Solution.propTypes = {
  solutionXmlString: PropTypes.string.isRequired,
}