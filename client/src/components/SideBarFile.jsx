import { FaRegFileAlt } from "react-icons/fa";

const SideBarFile = ({ filename }) => {
  return (
    <div className="text-white p-2 border border-neutral-700 flex justify-between items-center rounded cursor-pointer hover:bg-neutral-800">
      <div className="flex justify-start items-center gap-2">
        <FaRegFileAlt />
        <h1>{filename}</h1>
      </div>
    </div>
  );
};

export default SideBarFile;
