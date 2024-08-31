import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Canvas from './Pages/Canvas';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/canvas' element={<Canvas/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
