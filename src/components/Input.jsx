import React from "react";
import PropTypes from "prop-types";

const inputsClassNames =
  "border-solid border-2 border-slate-300 p-2 w-full rounded-sm mt-2 placeholder:text-slate-300";

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  color,
  colorHover,
  isLoading,
}) => {
  if (type === "checkbox")
    return (
      <label
        htmlFor={label}
        className="text-slate-400 flex gap-2 cursor-pointer"
      >
        <input id={label} type="checkbox" />
        {label}
      </label>
    );

  if (type === "submit") {
    let isLoadingClass = "cursor-pointer";
    if (isLoading)
      isLoadingClass = `cursor-not-allowed ${colorHover} opacity-75`;
    return (
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full ${color} text-white p-3 rounded-lg mt-4  hover:${colorHover} flex items-center justify-center transition ease-in-out duration-150 peer ${isLoadingClass}`}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white peer"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-0"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {value}
      </button>
    );
  }

  return (
    <section>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={inputsClassNames}
      />
    </section>
  );
};

Input.prototype = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number, PropTypes.bool]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  color: PropTypes.string,
  colorHover: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Input;
