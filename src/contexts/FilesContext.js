import React, { useState, useContext, useEffect } from 'react';
import * as Ace from 'ace-builds';

import { useEditorContext } from './EditorContext';

const FilesContext = React.createContext();
const { Provider } = FilesContext;

const Files = ({ children }) => {
  const { setActiveEditorSession } = useEditorContext();
  const [activeFile, setActiveFile] = useState('');
  const [files, setFiles] = useState([]);
  const [fileCounter, setFileCounter] = useState(1);

  useEffect(() => {
    if(activeFile !== 'Solution' && activeFile !== 'Ausgabe') {
      const sessionForFilename = getContentFromFile(activeFile);
      setActiveEditorSession(sessionForFilename);
      console.log('cmpl Session set')
    }
  }, [activeFile])

  const createFileObject = (name, content, type) => {
    return {
      name: name,
      content: content,
      type: type,
    }
  }

  const getIndexForFilename = (fileName) => {
    for(let i = 0; i < files.length; i++ ) {
      if(fileName === files[i].name) {
        return i;
      }
    }
    return undefined;
  }
  
  const getContentFromFile = (fileName) => {
    const fileIndex = getIndexForFilename(fileName);
    if(fileIndex !== undefined) {
      return files[fileIndex].content;
    }
    return undefined;
  }
  
  const changeActiveFile = (fileName) => {
    setActiveFile(fileName);
  }

  const createFile = () => {
    const fileName = 'Datei' + fileCounter + '.cmpl';
    const fileContent = Ace.createEditSession("Neue Datei", 'ace/mode/cmpl');
    const fileType = 'editorFile'
    const newFileObject = createFileObject(fileName, fileContent, fileType);

    setFileCounter(fileCounter + 1);
    setFiles([...files, newFileObject]);

    setActiveFile(fileName);
  }

  const createSolutionFile = (solutionContent) => {
    const newFileObject = createFileObject('Solution', solutionContent, 'solutionFile');

    setFiles([...files, newFileObject]);
    setActiveFile('Solution');
  }

  const createOrUpdateAusgabeFile = (ausgabeContent) => {
    const newFileObject = createFileObject('Ausgabe', ausgabeContent, 'ausgabeFile');

    setFiles([...files, newFileObject]);
    setActiveFile('Ausgabe');
  }

  const changeFilename = (currentFilename, newFilename) => {
    let newFiles = files.map((file) => {
      if(file.name === currentFilename) {
        return createFileObject(newFilename, file.content, file.type);
      };
      return file;
    });
    setFiles(newFiles);
    changeActiveFile(newFilename);
  }

  const changeFilecontent = (fileName, newFileContent) => {
    let newFiles = files.map((file) => {
      if(file.name === fileName) {
        return createFileObject(fileName, newFileContent, file.type);
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
      activeFile,
      changeActiveFile,
      changeFilename,
      getContentFromFile,
      createSolutionFile,
      createOrUpdateAusgabeFile,
    }}>
      {children}
    </Provider>
  )
}
const useFilesContext = () => useContext(FilesContext);

export { Files, useFilesContext }