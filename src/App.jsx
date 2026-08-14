import { useEffect } from "react";
import "./storageShim.js";
import "./firebaseBridge.js";

export default function App() {
  useEffect(() => {
    import("./legacyApp.js");
  }, []);

  return (
    <div id="shell">
      <div id="app"></div>
    </div>
  );
}
