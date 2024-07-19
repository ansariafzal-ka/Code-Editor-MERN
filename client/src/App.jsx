import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { LANGUAGE_VERSIONS, CODE_SNIPPETS } from "./constants/utils";
import Button from "./components/Button";
import { FaPlay, FaSave, FaPlusSquare } from "react-icons/fa";
import axios from "axios";
import SideBar from "./components/SideBar";

const App = () => {
  const [editorLanguage, setEditorLanguage] = useState("javascript");
  const [code, setCode] = useState(CODE_SNIPPETS[editorLanguage]);
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLanguageChange = (language) => {
    setEditorLanguage(language);
    setCode(CODE_SNIPPETS[language]);
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
      setOutput("An error occured while executing the code");
      console.error(error);
    }
  };

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
              className="cursor-pointer border border-neutral-700 p-3 rounded-lg outline-none font-medium bg-transparent text-white appearance-none hover:bg-neutral-800"
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
              className="flex justify-center items-center gap-2"
            >
              <FaPlay />
              Run Code
            </Button>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <Button className="flex justify-center items-center gap-2">
              <FaSave /> Save Code
            </Button>
            <Button className="flex justify-center items-center gap-2">
              <FaPlusSquare /> New Code
            </Button>
          </div>
        </nav>
      </header>
      <div className="h-full flex flex-col gap-2 md:flex-row bg-[#1e1e1e]">
        <SideBar />
        <Editor
          theme="vs-dark"
          language={editorLanguage}
          className="border-r border-neutral-700 w-full"
          value={CODE_SNIPPETS[editorLanguage]}
          onChange={(newValue) => setCode(newValue)}
        />
        <div className="text-white border border-neutral-700 rounded-lg p-3 mr-2 mb-2 overflow-auto md:w-[50%]">
          <h1>Output</h1>
          <hr className="my-3 border-neutral-800" />
          <pre className={isError ? "text-red-600" : ""}>{output}</pre>
        </div>
      </div>
    </main>
  );
};

export default App;
