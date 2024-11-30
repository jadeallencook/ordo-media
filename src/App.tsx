import { useState } from "react";
import "./App.css";
import { open } from "@tauri-apps/plugin-dialog";

function App() {
  // path of directory
  const [path, setPath] = useState<string | null>(null);

  const file = async () => {
    const directory = await open({
      multiple: false,
      directory: true,
    });
    setPath(directory);
  };

  return (
    <main className="container">
      {!path ? (
        <section>
          <h1>Select Folder To Organize</h1>
          <button onClick={file}>Choose Directory</button>
        </section>
      ) : (
        <div>Organize Media</div>
      )}
    </main>
  );
}

export default App;
