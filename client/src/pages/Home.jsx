import { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { LANGUAGE_VERSIONS } from "../constants/utils";
import Button from "../components/Button";
import { FaPlay, FaSave, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import SideBar from "../components/SideBar";
import Modal from "../components/Modal";

const Home = () => {
  const [files, setFiles] = useState([]);
  const [editorLanguage, setEditorLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [author, setAuthor] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFileId, setSelectedFileId] = useState(null);

  const handleLanguageChange = (language) => {
    setEditorLanguage(language);
    setCode("");
    setOutput("");
  };

  const executeCode = async () => {
    try {
      setOutput("Executing...");
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: editorLanguage,
          version: LANGUAGE_VERSIONS[editorLanguage],
          files: [
            {
              name: "main",
              content: code,
            },
          ],
        }
      );

      response.data.run.stderr ? setIsError(true) : setIsError(false);
      setOutput(response.data.run.output);
    } catch (error) {
      setOutput("An error occurred while executing the code");
      console.error(error);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/code");
      const codes = response.data.codes;
      setFiles(codes);

      if (codes.length > 0) {
        const firstCode = codes[0];
        setCode(firstCode.code);
        setEditorLanguage(firstCode.language);
        setAuthor(firstCode.author);
        setCreatedAt(new Date(firstCode.createdAt).toLocaleDateString());
        setFileName(firstCode.fileName);
        setSelectedFileId(firstCode._id);
      }
    } catch (error) {
      console.log("Error fetching file names", error);
    }
  };

  const handleFileClick = async (fileId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/code/${fileId}`
      );
      const file = response.data.code;
      setCode(file.code);
      setEditorLanguage(file.language);
      setAuthor(file.author);
      setFileName(file.fileName);
      setCreatedAt(new Date(file.createdAt).toLocaleDateString());
      setSelectedFileId(fileId);
      setOutput("");
    } catch (error) {
      console.log("Error fetching file", error);
    }
  };

  const saveCode = async () => {
    if (!selectedFileId) {
      console.error("No file selected for saving");
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/v1/code/save/${selectedFileId}`,
        {
          code,
        }
      );
      alert("Code saved successfully!");
    } catch (error) {
      console.log("Error saving code", error);
    }
  };

  const handleDeleteCode = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/code/delete/${selectedFileId}`
      );
      fetchFiles();
    } catch (error) {
      console.log("error deleting code", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <main className="w-full h-screen flex flex-col bg-[#1e1e1e]">
      <header>
        <nav className="w-full p-5 border-b border-neutral-700 mb-3 flex justify-between items-center">
          <div className="flex flex-row gap-4">
            <select
              onChange={(e) => {
                handleLanguageChange(e.target.value);
              }}
              value={editorLanguage}
              className="cursor-pointer border border-neutral-700 px-4 py-3 rounded-lg outline-none font-medium bg-transparent text-white appearance-none hover:bg-neutral-800"
            >
              {Object.keys(LANGUAGE_VERSIONS).map((language) => (
                <option
                  key={language}
                  value={language}
                  className="bg-neutral-800 text-white"
                >
                  {language}
                </option>
              ))}
            </select>
            <Button
              onClick={executeCode}
              type={"button"}
              className="flex justify-center items-center gap-2"
            >
              <FaPlay />
              Run Code
            </Button>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <Button
              className="flex justify-center items-center gap-2"
              type={"button"}
              onClick={saveCode}
            >
              <FaSave /> Save Code
            </Button>
            <Modal fetchFiles={fetchFiles} />
          </div>
        </nav>
      </header>
      <div className="h-full flex flex-col gap-2 md:flex-row bg-[#1e1e1e]">
        <SideBar files={files} onFileClick={handleFileClick} />
        <div className="w-full flex flex-col">
          <div className="mb-5 flex justify-between px-8 pb-3 border-b border-neutral-800">
            <h1 className="text-neutral-500 italic">file name - {fileName}</h1>
            <h1 className="text-neutral-500 italic">author - {author}</h1>
            <h1 className="text-neutral-500 italic">
              created at - {createdAt}
            </h1>
            <button onClick={handleDeleteCode} className="text-red-600">
              <FaTrashAlt />
            </button>
          </div>
          <Editor
            theme="vs-dark"
            language={editorLanguage}
            className="border-r border-neutral-700 w-full"
            value={code}
            onChange={(newValue) => setCode(newValue)}
          />
        </div>
        <div className="text-white border border-neutral-700 rounded-lg p-3 mr-2 mb-2 overflow-auto md:w-[60%]">
          <div className="flex gap-2">
            <h1>Output /</h1>
            <h1 className="text-green-400 italic">{editorLanguage}</h1>
          </div>
          <hr className="my-3 border-neutral-800" />
          <pre className={isError ? "text-red-600" : ""}>{output}</pre>
        </div>
      </div>
    </main>
  );
};

export default Home;
