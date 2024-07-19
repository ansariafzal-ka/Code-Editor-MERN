import SideBarFile from "./SideBarFile";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import axios from "axios";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/code");
        const filenames = response.data.codes.map((code) => code.fileName);
        setFiles(filenames);
      } catch (error) {
        console.log("Error fetching file names", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="min-w-[200px] px-5 flex flex-col gap-y-2 border-r border-neutral-700">
      <div className="text-white flex justify-between items-center">
        <h1>Files</h1>
      </div>
      <hr className="border-neutral-800 mt-1 mb-2" />
      {files.map((fileName, index) => (
        <SideBarFile key={index} filename={fileName} />
      ))}
    </div>
  );
};

export default SideBar;
