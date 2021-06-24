import React from 'react';

import Editor from '../Editor/Editor';
import Toolbar from '../Toolbar/Toolbar';
import Solution from '../Solution/Solution';
import Messages from '../Messages/Messages';
import { useFilesContext } from '../contexts/FilesContext';
import { MessageProvider } from '../contexts/MessageContext';

import styles from './Content.module.scss';


export default function Content() {
  const { activeFile, getContentFromFile } = useFilesContext();
  const contentRef = React.useRef(null);
  
  const displayComponetsBasedOnActiveFile = () => {
    switch(activeFile) {
      case 'Solution':
        return(
          <Solution solutionXmlString={getContentFromFile(activeFile)} />
        )
      default:
        return(
          <Toolbar />
        )
    }
  }
  
  return(
    <div ref={contentRef} className={styles["content"]}>
      <MessageProvider>
        {displayComponetsBasedOnActiveFile()}
        <Editor displayed={activeFile !== 'Solution'} />
        <div className={styles["spacer"]}/>

        {activeFile !== 'Solution' && 
          <Messages parentRef={contentRef} />
        }
      </MessageProvider>
    </div>
  )
}