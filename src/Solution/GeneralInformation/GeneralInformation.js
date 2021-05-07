import React from 'react';
import PropTypes from 'prop-types';

import styles from './GeneralInformation.module.css';

export default function GeneralInformation({ generalInformationsObj, generalSolutionObj }) {

  const instanceName = generalInformationsObj.instanceName._text;
  const generalInformationDataObj = [
    {
      desc: "Anzahl der Constraints:",
      val: generalInformationsObj.nrOfConstraints._text,
    },
    {
      desc: "Anzahl der Loesungen:",
      val: generalInformationsObj.nrOfSolutions._text,
    },
    {
      desc: "Anzahl der Variablen:",
      val: generalInformationsObj.nrOfVariables._text,
    },
    {
      desc: "Objective Name:",
      val: generalInformationsObj.objectiveName._text,
    },
    {
      desc: "Objective Sense:",
      val: generalInformationsObj.objectiveSense._text,
    },
    {
      desc: "Solver Nachricht:",
      val: generalInformationsObj.solverMsg._text,
    },
    {
      desc: "Solver Name:",
      val: generalInformationsObj.solverName._text,
    },
    {
      desc: "Variablen Anzeigeoptionen:",
      val: generalInformationsObj.variablesDisplayOptions._text,
    },
    {
      desc: "Objekt Status:",
      val: generalSolutionObj.status,
    },
    {
      desc: "Objekt Wert:",
      val: generalSolutionObj.value,
    },
  ]

  function GeneralColumn ({desc, val}){
    return(
      <tr>
        <th>{desc}</th>
        <th className={styles["value"]}>{val}</th>
      </tr>
    )
  }
  GeneralColumn.propTypes = {
    desc: PropTypes.string.isRequired,
    val: PropTypes.string.isRequired
  }

  return(
    <>
      <h2>{instanceName}</h2>
        <table className={styles["generalTable"]}>
          {generalInformationDataObj.map(({desc, val}, index) =>
            <GeneralColumn 
              key={index}
              desc={desc}
              val={val}
            />
          )}
        </table>
    </>
  )
}
GeneralInformation.propTypes = {
  generalInformationsObj: PropTypes.object.isRequired,
  generalSolutionObj: PropTypes.object.isRequired,
}