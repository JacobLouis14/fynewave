import { ArticleModel } from "@/models/article";
import React, { useState } from "react";

interface Props {
  value: ArticleModel;
  saveChangedValue: React.Dispatch<React.SetStateAction<ArticleModel>>;
}

const InputTags = ({ value, saveChangedValue }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");

  // handle key down
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      saveChangedValue((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, inputValue.trim()],
      }));
      setInputValue("");
    }
  };

  //   Tag remove Handler
  const handleRemoveTag = (index: number) => {
    saveChangedValue({
      ...value,
      tags: value.tags.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={inputValue}
        className="outline-none border px-4 py-2 rounded-lg"
        placeholder="press enter to add tags"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value.tags.length > 0 && (
        <div className="flex flex-wrap w-full gap-4">
          {value.tags.map((tag, index) => (
            <div
              key={index}
              className="px-3 py-2 flex gap-2 border border-darkRed rounded-lg"
            >
              <p>{tag}</p>
              <button onClick={() => handleRemoveTag(index)}>
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputTags;
