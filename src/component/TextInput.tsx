"use client";

import React from "react";

interface TextInputProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const TextInput: React.FC<TextInputProps> = ({ text, setText }) => {
  return (
    <div className="mb-6">
      <label className="block mb-3 text-gray-800 font-semibold text-lg">
        Enter Text
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        rows={6}
        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow-sm hover:shadow-md resize-none bg-gray-50 text-gray-800"
      />
      <p className="mt-1 text-sm text-gray-500 italic">
        You can input text directly or upload a document above.
      </p>
    </div>
  );
};

export default TextInput;
