import { useEffect, useState } from "react";
import "./App.css";
import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

function App() {
  const [path, setPath] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  const file = async () => {
    const directory = await open({
      multiple: false,
      directory: true,
    });
    setPath(directory);
  };

  useEffect(() => {
    if(!path) return;
    
    invoke("get_media_types", {
      path
    }).then(console.log).catch(console.error);
  }, [path]);

  listen('image-found', (event) => {
    setCurrentPath(event.payload as string);
  });

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
      {currentPath && <p>{currentPath}</p>}
    </main>
  );
}

export default App;
