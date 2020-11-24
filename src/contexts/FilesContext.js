import React, { useState, useContext } from 'react';
import * as Ace from 'ace-builds';

import { useEditorContext } from './EditorContext';


const FilesContext = React.createContext();
const { Provider } = FilesContext;

const Files = ({ children }) => {
  const { setActiveSession } = useEditorContext();
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState("");

  const getSessionFromFile = (fileName) => {
    for(let i = 0; i < files.length; i++ ) {
      if(files[i].name === fileName) {
        return files[i].session;
      }
    }
  }

  const createFile = (fileName) => {
    let newFileObject = {
      name: `${fileName}`,
      session: Ace.createEditSession("Neue Datei"),
    }
    setFiles([...files, newFileObject]);
    setActiveSession(newFileObject.session);
  }

  const changeActiveFile = (fileName) => {
    let session = getSessionFromFile(fileName);
    setActiveFile(fileName);
    setActiveSession(session);
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
  }

  return (
    <Provider value={{
      files,
      setFiles,
      createFile,
      changeActiveFile,
      changeFilename,
    }}>
      {children}
    </Provider>
  )
}
const useFilesContext = () => useContext(FilesContext);

export { Files, useFilesContext }