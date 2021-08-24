import React from 'react';

import { createXmlForRequest, convertXmlToJson } from '../api/request-formatter';
import { fetchJobId, fetchMessages, fetchSolution, fetchSolutionStatus, sendCmplProblem } from '../api/api';
import { useFilesContext } from '../contexts/FilesContext';
import { useEditorContext } from '../contexts/EditorContext';
import { useMessageContext } from '../contexts/MessageContext';

import Button from '../components/Button/Button';
import Downloader from '../components/Downloader/Downloader';

import { ReactComponent as Add } from '../assets/images/plus.svg'; 
import { ReactComponent as Back } from '../assets/images/arrow_back.svg';
import { ReactComponent as Forth } from '../assets/images/arrow_forth.svg';
import { ReactComponent as ZoomIn } from '../assets/images/zoom_inc.svg';
import { ReactComponent as ZoomOut } from '../assets/images/zoom_dec.svg'; 

import styles from './Toolbar.module.scss';


type IconPropTypes = {
  children: React.ReactNode,
  onClickFunction: React.MouseEventHandler<HTMLDivElement>,
}

export default function Toolbar() {
  const { increaseZoom, decreaseZoom, undo, redo } = useEditorContext();
  const { createFile, activeFile, getContentFromFile, createOrUpdateSolutionFile } = useFilesContext();
  const { addTextMessage, addErrorMessage } = useMessageContext();

  const convertToArray = (object: object | Array<any>) => {
    if(Array.isArray(object)) {
      return object;
    }
    return [object];
  }

  const handleErrorMessages = (messageResponse: Array<number | string>) => {
    const messageDataObj = JSON.parse(convertXmlToJson(messageResponse[2]));
    const generalData = messageDataObj.CmplMessages.general;

    if(generalData.generalStatus._text === "error") {
      const messagesData = convertToArray(messageDataObj.CmplMessages.messages.message);
      messagesData.forEach((message) => {
        const errorDataObj = {
          description: message._attributes.description,
          location: message._attributes.location
        }
        addErrorMessage(errorDataObj);
      })
    }
  }
      
  const makeRequest = async () => {
    const fileName = activeFile;
    const fileSession = getContentFromFile(fileName);
    const problemString = fileSession.getValue();
    
    const { jobId } = await fetchJobId(fileName);
    const xmlFile = createXmlForRequest(fileName, jobId, problemString);
    sendCmplProblem(xmlFile);

    const checker = await setInterval(async () => {
      let { solutionStatus } = await fetchSolutionStatus(jobId);
      addTextMessage(solutionStatus[2]);
      
      if(solutionStatus[0] === 12) {
        clearInterval(checker);
        let { message } = await fetchMessages(jobId);
        handleErrorMessages(message);
        let { solution } = await fetchSolution(jobId);
        if(solution[0] !== 7) {
          createOrUpdateSolutionFile(solution[2]);
        }
      }
    }, 300);
  }

  function Icon ({ children, onClickFunction }: IconPropTypes) {
    return(
      <div className={styles["icon"]} role="button" onClick={onClickFunction}>
        {children}
      </div>
    )
  }

  const LeftSide = () => {
    return(
      <>
        <div className={styles["group"]}>
          <Icon onClickFunction={createFile}><Add /></Icon>
        </div>
        <div className={styles["group"]}>
          <Icon onClickFunction={undo}><Back /></Icon>
          <Icon onClickFunction={redo}><Forth /></Icon>
        </div>
        <div className={styles["group"]}>
          <Icon onClickFunction={increaseZoom}><ZoomIn /></Icon>
          <Icon onClickFunction={decreaseZoom}><ZoomOut /></Icon>
        </div>
        <Downloader />
      </>
    )
  }

  return(
    <div className={styles.toolbar}>
      <div className={styles["left"]}>
        <LeftSide />
      </div>
      <div className={styles["right"]}>
        <Button onClick={makeRequest}>
          <span>Lösen &gt;</span>
        </Button>
      </div>
    </div>
  )
}