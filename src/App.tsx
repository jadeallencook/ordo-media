import { useState } from "react";
import "./App.css";

function App() {
  // path of directory
  const [path, setPath] = useState<string>();
  const pathInputRef = (input: HTMLInputElement | null) =>
    input?.setAttribute("webkitdirectory", "true");
  const handlePathForm = () => console.log(true);

  return (
    <main className="container">
      {!path ? (
        <form onSubmit={handlePathForm}>
          <h1>Select Folder To Organize</h1>
          <input type="file" multiple ref={pathInputRef} />
          <input type="submit" value="Analyize" />
        </form>
      ) : (
        <div>Organize Media</div>
      )}
    </main>
  );
}

export default App;
