
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import all components
import Main from './Components/Home/Main'

function App() {
  return (


    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Main />} />


      </Routes>
    </BrowserRouter>

  );
}

export default App;
