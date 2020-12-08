import React, { useState, useContext, useEffect } from 'react';
import * as Ace from 'ace-builds';

import { useEditorContext } from './EditorContext';



const FilesContext = React.createContext();
const { Provider } = FilesContext;

const Files = ({ children }) => {
  const { setActiveEditorSession, destroyEditor } = useEditorContext();
  const [activeFile, setActiveFile] = useState('');
  const [files, setFiles] = useState([]);
  const [fileCounter, setFileCounter] = useState(1);

  useEffect(() => {
    const sessionForFilename = getSessionFromFile(activeFile);
    setActiveEditorSession(sessionForFilename);
  })

  const getSessionFromFile = (fileName) => {
    console.log(files, fileName);

    for(let i = 0; i < files.length; i++ ) {
      if(files[i].name === fileName) {
        return files[i].session;
      }
    }
  }

  const changeActiveFile = (fileName) => {
    setActiveFile(fileName);
  }

  const createFile = () => {
    let fileName = 'Datei' + fileCounter + '.cmpl';
    let fileSession = Ace.createEditSession("Neue Datei", 'ace/mode/cmpl');
    let newFileObject = {
      name: fileName,
      session: fileSession,
    }

    setFileCounter(fileCounter + 1);
    setFiles([...files, newFileObject]);

    setActiveFile(fileName);
  }

  const createSolutionFile = (solutionAsString) => {
    const fileName = 'Solution';
    const fileSession = Ace.createEditSession(solutionAsString);

    let newFileObject = {
      name: fileName,
      session: fileSession,
    }
    setFiles([...files, newFileObject]);
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
      getSessionFromFile,
      createSolutionFile,
    }}>
      {children}
    </Provider>
  )
}
const useFilesContext = () => useContext(FilesContext);

export { Files, useFilesContext }