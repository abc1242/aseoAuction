import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage.js";
import "bootstrap/dist/css/bootstrap.min.css";

import RecipePage from "./components/RecipePage/RecipePage.js";


function App() {
  return (
    <div className="App">
      <LandingPage />
      <RecipePage />
    </div>
  );
}

export default App;
