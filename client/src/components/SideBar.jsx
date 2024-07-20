import SideBarFile from "./SideBarFile";

const SideBar = ({ files, onFileClick }) => {
  return (
    <div className="min-w-[200px] px-5 flex flex-col gap-y-2 border-r border-neutral-700">
      <div className="text-white flex justify-between items-center">
        <h1>Files</h1>
      </div>
      <hr className="border-neutral-800 mt-1 mb-2" />
      {files.length > 0 ? (
        files.map((file) => (
          <SideBarFile
            key={file._id} // Assuming `_id` is the unique identifier
            fileName={file.fileName}
            fileId={file._id}
            onClick={onFileClick}
          />
        ))
      ) : (
        <p className="text-neutral-500">No files</p>
      )}
    </div>
  );
};

export default SideBar;
