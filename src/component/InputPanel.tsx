import React from "react";
import TextInput from "./TextInput";
import FileUpload from "./FileUpload";
import ModeToggle from "./ModeToggle";
import SummaryLengthSlider from "./SummaryLengthSlider";
import { motion } from "framer-motion";
import SummaryButton from "./SummarizeButton";

interface InputPanelProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  mode: "paragraph" | "bullet";
  setMode: React.Dispatch<React.SetStateAction<"paragraph" | "bullet">>;
  length: "short" | "medium" | "long";
  setLength: React.Dispatch<React.SetStateAction<"short" | "medium" | "long">>;
  setSummary: React.Dispatch<React.SetStateAction<string>>;
}

const InputPanel: React.FC<InputPanelProps> = ({
  text,
  setText,
  file,
  setFile,
  mode,
  setMode,
  length,
  setLength,
  setSummary,
}) => {
  return (
    <motion.div
      className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md flex flex-col justify-between gap-3"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Summarize Text</h2>
        <TextInput text={text} setText={setText} />
        <FileUpload file={file} setFile={setFile} />
        <ModeToggle mode={mode} setMode={setMode} />
        <SummaryLengthSlider length={length} setLength={setLength} />
      </div>

      <SummaryButton
        text={text}
        file={file}
        mode={mode}
        length={length}
        setSummary={setSummary}
      />
    </motion.div>
  );
};

export default InputPanel;
