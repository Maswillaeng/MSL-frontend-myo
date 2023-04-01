import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ value, onChange, onImageUpload }) => {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, "link"],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
              "custom-color",
            ],
          },
          { background: [] },
        ],
        ["image", "video"],
        ["clean"],
      ],
      image: {
        uploadCallback: onImageUpload, // 이미지가 업로드될 때마다 onImageUpload 함수 호출
      },
    },
  };
  const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  return (
    <ReactQuill
      placeholder="내용을 입력해주세요"
      className="w-5/6  mx-auto h-96"
      theme="snow"
      modules={modules}
      formats={formats}
      value={value || ""}
      onChange={(content, delta, sosurce, editor) => onChange(editor.getHTML())}
    />
  );
};

export default Editor;
