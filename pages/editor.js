import React, { useState, useEffect } from "react";
import Editor from '../components/Editor';

export default function editor() {
  const [editorLoaded, setEditorLoaded] = useState(false);
 

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div className="App w-1/2" title="Editor">
      

      <Editor
        name="description"
        onChange={(data) => {
          setData(data);
        }}
        editorLoaded={editorLoaded}
      />

    
    </div>
  );
}