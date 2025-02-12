import React from "react";

const LogoApp = () => {
  return (
    <div className="font-bold text-2xl flex gap-1 group">
      <span
        className="group-hover:text-primary transition-all duration-500 ease-in-out
"
      >
        Servi
      </span>
      <span
        className="text-primary group-hover:text-black dark:group-hover:text-white
transition-all duration-500 ease-in-out font-serif font-extrabold
"
      >
        Toons
      </span>
    </div>
  );
};

export default LogoApp;
