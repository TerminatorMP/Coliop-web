import React, { useContext, useState, useEffect } from 'react';

const EditorContext = React.createContext();
const { Provider } = EditorContext;

const EditorCon = ({ children }) => {
  const [editor, setEditor] = useState(undefined);
  let fontSize = 18;

  const setEditorRef = (ref) => {
    setEditor(ref);
    ref.setFontSize(fontSize);
    ref.setShowPrintMargin(false);
  }

  const setActiveEditorSession = (sessionObject) => {
    if(editor) {
      editor.setSession(sessionObject);
    }
  }

  const increaseZoom = () => {
    fontSize += 3;
    editor.setFontSize(fontSize);
  }

  const decreaseZoom = () => {
    fontSize -= 3;
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