import React, { useState, createRef, useContext } from 'react';

import * as Ace from 'ace-builds';

const EditorContext = React.createContext();
const { Provider } = EditorContext;

const EditorCon = ({ children }) => {
  let editor;
  let fontSize = 18;

  const setEditorRef = (ref) => {
    editor = ref.current.editor;
    editor.setFontSize(fontSize);
    editor.setShowPrintMargin(false);
  }

  const setActiveEditorSession = (sessionObject) => {
    editor.setSession(sessionObject);
  }

  const increaseZoom = () => {
    fontSize += 2;
    editor.setFontSize(fontSize);
  }

  const decreaseZoom = () => {
    fontSize -= 2;
    editor.setFontSize(fontSize);
  }

  const undo = () => {
    editor.undo();
  }

  const redo = () => {
    editor.redo();
  }

  return (
    <Provider value={{
      setEditorRef,
      increaseZoom,
      decreaseZoom,
      undo,
      redo,
      setActiveEditorSession,
    }}>
      {children}
    </Provider>
  )
}
const useEditorContext = () => useContext(EditorContext);

export { EditorCon, useEditorContext }