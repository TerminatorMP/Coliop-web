import Editor from './Editor/Editor';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';
import Toolbar from './Toolbar/Toolbar';

import { Files } from './contexts/FilesContext';
import { EditorCon } from './contexts/EditorContext';

function App() {

  return (
    <div className="app">
      <Header />
        <EditorCon>
          <Files>
              <div className="main">
                <Navigation />
                <div className="content">
                  <Toolbar />
                  <Editor />
                </div>
              </div>
          </Files>
        </EditorCon>
      <Footer />
    </div>
  );
}

export default App;
