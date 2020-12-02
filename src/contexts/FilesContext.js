import React, { useState, useContext } from 'react';
import * as Ace from 'ace-builds';

import { useEditorContext } from './EditorContext';


const FilesContext = React.createContext();
const { Provider } = FilesContext;

const Files = ({ children }) => {
  const { setActiveEditorSession } = useEditorContext();
  const [activeFile, setActiveFile] = useState('');
  const [files, setFiles] = useState([]);
  const [fileCounter, setFileCounter] = useState(1);

  

  const getSessionFromFile = (fileName) => {
    console.log(files, fileName);

    for(let i = 0; i < files.length; i++ ) {
      if(files[i].name === fileName) {
        return files[i].session;
      }
    }
  }

  const changeActiveFile = (fileName) => {
    let sessionForFilename = getSessionFromFile(fileName);
    setActiveEditorSession(sessionForFilename);
    setActiveFile(fileName);
  }

  const createFile = () => {
    let fileName = 'Datei' + fileCounter + '.cmpl';
    let fileSession = Ace.createEditSession("Neue Datei");
    let newFileObject = {
      name: fileName,
      session: fileSession,
    }

    setFileCounter(fileCounter + 1);
    setFiles([...files, newFileObject]);

    setActiveEditorSession(fileSession);
    setActiveFile(fileName);
  }


  const changeFilename = (currentFilename, newFilename) => {
    let newFiles = files.map((file) => {
      if(file.name === currentFilename) {
        return {
          name: newFilename,
          session: file.session,
        }
      };
      return file;
    });
    setFiles(newFiles);
    changeActiveFile(newFilename);
  }

  return (
    <Provider value={{
      files,
      setFiles,
      createFile,
      activeFile,
      changeActiveFile,
      changeFilename,
    }}>
      {children}
    </Provider>
  )
}
const useFilesContext = () => useContext(FilesContext);

export { Files, useFilesContext }