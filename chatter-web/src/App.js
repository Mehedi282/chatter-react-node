import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import {ChatRoom, Home, Login} from "./pages";
import useDimensions from "./utils/useDimensions";
import {Layout} from "./components";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {height} = useDimensions();

  return (
    <div className="App" style={{height}}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="app" element={<Layout/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="chat" element={<ChatRoom/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
