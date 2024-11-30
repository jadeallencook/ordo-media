import { useState } from "react";
import "./App.css";

function App() {
  // path of directory
  const [path, setPath] = useState<string>();
  const pathInputRef = (input: HTMLInputElement | null) =>
    input?.setAttribute("webkitdirectory", "true");
  const handlePathForm = ({ target }: any) => {
    console.log({ target: target.getValue() });
  };

  return (
    <main className="container">
      {!path ? (
        <form onChange={handlePathForm}>
          <h1>Select Folder To Organize</h1>
          <input type="file" multiple ref={pathInputRef} />
          {path && <input type="submit" value="Analyize" />}
        </form>
      ) : (
        <div>Organize Media</div>
      )}
    </main>
  );
}

export default App;
