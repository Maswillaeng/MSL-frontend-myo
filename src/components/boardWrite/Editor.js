import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Editor = () => {
  return (
    <div>
      <ReactQuill className="w-4/5 mx-auto h-80 " />
    </div>
  );
};

export default Editor;
