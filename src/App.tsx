import React from "react";
import "./App.css";
import { FontsProvider } from "./components/fonts-provider/fonts-provider";

function App() {
  return (
    <div className="App">
      <FontsProvider />
    </div>
  );
}

export default App;
