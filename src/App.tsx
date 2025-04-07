import React from "react";
import "./App.css";
import {
  DEF_MODEL,
  DEF_PARAMS,
  ParamEditor,
} from "./components/ModelComponent";

function App() {
  const editorRef = React.useRef<ParamEditor>(null);

  const handleGetModel = () => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      alert(JSON.stringify(model));
    }
  };

  return (
    <div className="App">
      <div className="base_page-align_center">
        <div className="container_list">
          <ParamEditor ref={editorRef} model={DEF_MODEL} params={DEF_PARAMS} />
          <button style={{ marginTop: "20px" }} onClick={handleGetModel}>
            Получить модель
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
