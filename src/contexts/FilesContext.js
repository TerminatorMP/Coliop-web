import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    createFile();
  }, [])

  useEffect(() => {
    if(activeFile !== 'Solution' && activeFile !== 'Ausgabe') {
      const sessionForFilename = getContentFromFile(activeFile);
      setActiveEditorSession(sessionForFilename);
      console.log('cmpl Session set')
    }
  }, [activeFile])

  const addFile = (newFile) => {
    setFiles((prevState) => [...prevState, newFile]);
  }

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
    const fileType = 'cmpl'
    const newFileObject = createFileObject(fileName, fileContent, fileType);

    setFileCounter(fileCounter + 1);
    setFiles([...files, newFileObject]);

    setActiveFile(fileName);
  }

  const createOrUpdateSolutionFile = (solutionContent) => {
    if(getIndexForFilename('Solution')) {
      changeFilecontent('Solution', solutionContent);
      setActiveFile('Solution');
      return;
    }

    const newFileObject = createFileObject('Solution', solutionContent, 'solutionFile');
    addFile(newFileObject);
    setActiveFile('Solution');
  }

  const changeFilename = (currentFilename, newFilename) => {
    let updatedFiles = files.map((file) => {
      if(file.name === currentFilename) {
        return createFileObject(newFilename, file.content, file.type);
      }
      return file;
    });
    setFiles(updatedFiles);
    changeActiveFile(newFilename);
  }

  const changeFilecontent = (fileName, newFileContent) => {
    let newFiles = files.map((file) => {
      if(file.name === fileName) {
        return createFileObject(fileName, newFileContent, file.type);
      }
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
      createOrUpdateSolutionFile,
    }}>
      {children}
    </Provider>
  )
}
Files.propTypes = {
  children: PropTypes.element,
}
const useFilesContext = () => useContext(FilesContext);

export { Files, useFilesContext }