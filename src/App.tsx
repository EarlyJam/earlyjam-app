import { Button } from "@/components/ui/button";
import "./App.css";

import reactLogo from "./assets/logo.svg";

function App() {
  return (
    <div className="flex flex-col justify-center items-center">
      <a href="https://react.dev" target="_blank" rel="noreferrer">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <Button>Shad Button</Button>
    </div>
  );
}

export default App;
