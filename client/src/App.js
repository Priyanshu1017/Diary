
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { useState } from 'react';
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{

    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 9500);
  }

  return (
   <>
   <NoteState>

   <BrowserRouter>
   <Navbar/>
   <Alert alert={alert}/>
   <div className="container">
          
   <Routes>
    <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
              <Route exact path="/about" element={<About showAlert={showAlert} />}/>
              <Route exact path="/login" element={<Login showAlert={showAlert} />}/>
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />}/>
   </Routes>
   </div>
   </BrowserRouter>
   </NoteState>
   </>
  );
}

export default App;
