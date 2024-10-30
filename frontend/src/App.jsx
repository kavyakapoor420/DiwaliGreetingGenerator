
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DisplayGreeting from   './Components2/DisplayGreeting/DisplayGreeting.jsx'
import HomePage from './Components2/HomePage/HomePage.jsx';

function App() {
  return (
    <>
        <Router>
          <Routes>
           <Route path='/' element={<HomePage/>}></Route>
          <Route path="/greeting/:uniqueUrl" element={<DisplayGreeting/>} />
          </Routes>
        </Router>
    </>
  );
}

export default App;

