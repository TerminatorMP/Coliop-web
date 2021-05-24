import React from 'react';

import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import Content from './Content/Content';

import { Files } from './contexts/FilesContext';
import { EditorCon } from './contexts/EditorContext';


const Main = () => (
  <div className="main">
    <Navigation />
    <Content />
  </div>
);


function App() {
  return (
    <div className="app">
      <Header />
      <EditorCon>
        <Files>
          <Main />
        </Files>
      </EditorCon>
    </div>
  );
}

export default App;
