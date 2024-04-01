import { useState } from "react";

const LinkConfirm = ({ onSetLink }) => {
  const [link, setLink] = useState("");

  return (
    <div className="absolute top-[70px] z-50 pt-3">
      <div className="flex flex-row p-3 rounded-xl border border-slate-200 bg-white w-80 shadow-md gap-x-1.5">
        {link ? (
          <button
            className="w-9 h-9 rounded bg-slate-100 p-1.5"
            onClick={() => {
              console.log("s");
              onSetLink(link);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.2835 6.21967C20.5722 6.51256 20.5722 6.98744 20.2835 7.28033L9.93569 17.7803C9.64704 18.0732 9.17905 18.0732 8.8904 17.7803L3.71649 12.5303C3.42784 12.2374 3.42784 11.7626 3.71649 11.4697C4.00513 11.1768 4.47313 11.1768 4.76177 11.4697L9.41304 16.1893L19.2382 6.21967C19.5269 5.92678 19.9949 5.92678 20.2835 6.21967Z"
                fill="#171717"
              />
            </svg>
          </button>
        ) : null}

        <input
          placeholder="لینک را اینجا بنویسید."
          onChange={(e) => setLink(e.target.value)}
          className="placeholder:text-slate-400 text-sm px-3 py-1 rounded-lg border border-slate-200 w-full outline-none"
        />
      </div>
    </div>
  );
};

export default LinkConfirm;
