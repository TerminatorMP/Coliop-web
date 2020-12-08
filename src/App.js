import React from 'react';

import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';
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
      <Footer />
    </div>
  );
}

export default App;
