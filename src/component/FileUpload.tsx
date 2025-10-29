import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { FileText, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

interface FileUploadProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ file, setFile }) => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-in-out" });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Format",
        text: "Only PDF or DOCX files are allowed.",
        confirmButtonColor: "#6d28d9",
      });
      return;
    }

    setFile(selectedFile);

    Swal.fire({
      icon: "success",
      title: "File Selected",
      text: selectedFile.name,
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const removeFile = () => setFile(null);

  return (
    <motion.div
      data-aos="fade-up"
      className="mb-4 bg-[#0f0f1a] border border-gray-800 rounded-2xl p-5 text-gray-200 shadow-[0_0_15px_rgba(0,0,0,0.6)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(88,28,135,0.4)]"
    >
      <label className="flex items-center gap-2 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-3">
        <FileText size={22} /> Upload File
      </label>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-300 border border-gray-700 rounded-lg cursor-pointer bg-[#1a1a2e] hover:bg-[#1e1e35] focus:outline-none p-2 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-600 file:to-blue-500 file:text-white file:hover:opacity-90 transition-all"
      />

      {file && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 flex justify-between items-center bg-[#1f1f30] p-3 rounded-lg border border-gray-700"
        >
          <span className="truncate text-gray-300">{file.name}</span>
          <button
            onClick={removeFile}
            className="flex items-center gap-1 text-red-400 hover:text-red-500 transition-colors duration-200"
          >
            <Trash2 size={18} /> Remove
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FileUpload;
