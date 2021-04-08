import React, { useContext } from 'react';
import * as ace from 'ace-builds';

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

  const selectLine = (line) => {
    editor.selection.moveCursorToPosition({row: line, column: 0});
    editor.selection.selectLine();
  }

  const selectRange = ({ startLine, startChar, endLine, endChar }) => {
    if(!endLine && !endChar) {
      selectLine(startLine);
    }
    const Range = ace.Range;
    editor.selection.setRange(new Range(startLine -1, startChar -1, endLine -1, endChar));
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
      selectRange,
      updateSize,
      setActiveEditorSession,
    }}>
      {children}
    </Provider>
  )
}
const useEditorContext = () => useContext(EditorContext);

export { EditorCon, useEditorContext }