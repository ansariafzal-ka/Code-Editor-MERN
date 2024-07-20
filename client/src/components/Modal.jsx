import React, { useState } from "react";
import Button from "./Button";
import { FaPlusSquare } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import InputField from "./InputField";
import axios from "axios";
import { LANGUAGE_VERSIONS } from "../constants/utils";

const Modal = ({ fetchFiles }) => {
  const [modal, setModal] = useState(false);
  const [author, setAuthor] = useState("");
  const [editorLanguage, setEditorLanguage] = useState("javascript");
  const [fileName, setFileName] = useState("");

  const createNewCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/code/new-code",
        {
          author: author,
          fileName: fileName,
          code: "",
          language: editorLanguage,
        }
      );
      fetchFiles();
      toggleModal();
      setAuthor("");
      setFileName("");
      setEditorLanguage("javascript");
      console.log(response.data);
    } catch (error) {
      console.log("error creating new code : ", error);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="z-50">
      <Button
        className="flex justify-center items-center gap-2"
        onClick={toggleModal}
      >
        <FaPlusSquare /> New Code
      </Button>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[350px] p-5 text-white border border-neutral-700 rounded-lg bg-[#1e1e1e]">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-medium">New Code</h1>
              <button
                onClick={() => {
                  toggleModal(), setAuthor(""), setFileName("");
                }}
              >
                <IoClose className="text-xl" />
              </button>
            </div>
            <form onSubmit={createNewCode} className="flex flex-col gap-y-3">
              <label>Author</label>
              <InputField
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
                value={author}
                type={"text"}
              />
              <label>File Name</label>
              <InputField
                onChange={(e) => {
                  setFileName(e.target.value);
                }}
                value={fileName}
                type={"text"}
              />
              <label>Language</label>
              <select
                required
                onChange={(e) => {
                  setEditorLanguage(e.target.value);
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
              <Button type={"submit"} className="mt-3">
                create
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
