import React from 'react';

import styles from './GeneralInformation.module.css';

export default function GeneralInformation({generalInformationsObj}) {

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
  ]

  const GeneralColumn = ({desc, val}) => {
    return(
      <tr>
        <th>{desc}</th>
        <th className={styles["value"]}>{val}</th>
      </tr>
    )
  }

  return(
    <>
      <div>Solution fuer {instanceName}</div>
        <table className={styles["generalTable"]}>
          {generalInformationDataObj.map(({desc, val}) =>
            <GeneralColumn 
              desc={desc}
              val={val}
            />
          )}
        </table>
    </>
  )
}