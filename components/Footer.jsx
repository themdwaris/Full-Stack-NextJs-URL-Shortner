import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="w-full border-t border-gray-600 h-16 flex items-center justify-center">
      <p className="text-center text-slate-200 text-sm ">
        <span>sl.vercel.app | &copy; {year} | All Rights Reserved</span>
      </p>
    </div>
  );
};

export default Footer;
