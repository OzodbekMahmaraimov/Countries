import React from "react";
import Weather from "./components/weather";
import { Routes, Route } from "react-router-dom"; 
import Country from "./components/Country";

function App() {
  return (
    <>
    <Routes>
      <Route path="/weather" Component={Weather} />
      <Route path="/" Component={Country} />
    </Routes>
    </>
  );
}

export default App;
