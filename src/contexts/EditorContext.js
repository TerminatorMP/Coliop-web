import React, { useContext } from 'react';

const EditorContext = React.createContext();
const { Provider } = EditorContext;

const EditorCon = ({ children }) => {
  let editor = "undefined start";
  let fontSize = 18;

  const setEditorRef = (ref) => {
    editor = ref;
    ref.setFontSize(fontSize);
    ref.setShowPrintMargin(false);
  }

  const setActiveEditorSession = (sessionObject) => {
    if(editor) {
      editor.setSession(sessionObject);
    }
  }

  const updateSize = () => {
    editor.resize();
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
      updateSize,
      setActiveEditorSession,
    }}>
      {children}
    </Provider>
  )
}
const useEditorContext = () => useContext(EditorContext);

export { EditorCon, useEditorContext }