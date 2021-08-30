import React from 'react';

import { createXmlForRequest, convertXmlToJson } from '../api/request-formatter';
import { fetchJobId, fetchMessages, fetchSolution, fetchSolutionStatus, sendCmplProblem } from '../api/api';
import { useFilesContext } from '../contexts/FilesContext';
import { useEditorContext } from '../contexts/EditorContext';
import { useMessageContext } from '../contexts/MessageContext';

import Button from '../components/Button/Button';
import Downloader from '../components/Downloader/Downloader';
import Uploader from '../components/Uploader/Uploader';

import { icons } from './icons';
import styles from './Toolbar.module.scss';

type IconPropTypes = {
  children: React.ReactNode,
  action?: React.MouseEventHandler<HTMLDivElement>,
}

type GroupPropTypes = {
  children: React.ReactNode,
}

const Icon = ({ children, action }: IconPropTypes) => {
  return(
    <div className={styles["icon"]} role="button" onClick={action}>
      {children}
    </div>
  )
}

const Group = ({ children }: GroupPropTypes) => {
  return(
    <div className={styles["group"]}>
      {children}
    </div>
  )
}

export default function Toolbar() {
  const { Add, Back, Forth, ZoomIn, ZoomOut, Download, Upload } = icons;
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

  

  const LeftSide = () => {
    return(
      <div className={styles["left"]}>
        <Group>
          <Icon action={createFile}><Add /></Icon>
        </Group>
        <Group>
          <Icon action={undo}><Back /></Icon>
          <Icon action={redo}><Forth /></Icon>
        </Group>
        <Group>
          <Icon action={increaseZoom}><ZoomIn /></Icon>
          <Icon action={decreaseZoom}><ZoomOut /></Icon>
        </Group>
        <Group>
          <Downloader><Icon><Download /></Icon></Downloader>
          <Uploader><Icon><Upload /></Icon></Uploader>
        </Group>
      </div>
    )
  }

  const RightSide = () => {
    return(
      <div className={styles["right"]}>
        <Button onClick={makeRequest}>
          <span>Lösen &gt;</span>
        </Button>
      </div>
    )
  }

  return(
    <div className={styles.toolbar}>
      <LeftSide />
      <RightSide />
    </div>
  )
}