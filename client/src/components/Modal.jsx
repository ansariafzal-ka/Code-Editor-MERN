import React, { useState } from "react";
import Button from "./Button";
import { FaPlusSquare } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import InputField from "./InputField";
import axios from "axios";

const Modal = ({ code }) => {
  const [modal, setModal] = useState(false);
  const [author, setAuthor] = useState("");
  const [fileName, setFileName] = useState("");

  const createNewCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/code/new-code",
        {
          author: author,
          fileName: fileName,
          code: code,
        }
      );
      toggleModal();
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
