import React from "react";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Show from "./components/Show";
import Add from "./components/Add";
import Update from "./components/Update";
import Nav from "./components/Nav";
export default function App(){
    return(
        <>
        
        <BrowserRouter>
        <Nav/>
          <Routes>
             <Route path="/"  element={ <Show/> } />
             <Route path="/add"  element={ <Add/> } />
             <Route path="/update/:id"  element={ <Update/> } />
          </Routes>
        </BrowserRouter>
        </>
    )
}