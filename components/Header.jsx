'use client'
import Link from "next/link";
import React from "react";
import { MdOutlineDatasetLinked } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { RiFileList2Fill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { useURL } from "@/context/urlContext";

const Header = () => {
  
  const {user,logout,openMenu,setOpenMenu}=useURL()

  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur-sm">
      <div className="h-16 px-5 sm:px-10 md:px-14 lg:px-32 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="text-slate-100">
            <MdOutlineDatasetLinked size={35} />
          </Link>
        </div>
        <div>
          {user?.name ? (
            <div className="relative">
              <div className="w-9 h-9 text-xl select-none font-bold  text-slate-100 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-900 cursor-pointer transition transform active:scale-90" onClick={()=>setOpenMenu(!openMenu)}>
                {user?.name&&user.name[0]}
              </div>
              
              {openMenu && (
                <div className="w-36 px-4 py-3 rounded-lg bg-gradient-to-b from-slate-950 to-slate-800 flex flex-col items-start gap-3 overflow-hidden absolute right-6 z-40">
                  <div className="flex items-center gap-2.5">
                    <span className="text-slate-100">
                      <TiHome size={20} />
                    </span>
                    <Link
                      href="/"
                      className="text-sm font-semibold cursor-pointer text-slate-100 hover:underline"
                      onClick={()=>setOpenMenu(false)}
                    >
                      Home
                    </Link>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-slate-100">
                      <RiFileList2Fill size={20} />
                    </span>
                    <Link
                      href="/urlList"
                      className="text-sm font-semibold cursor-pointer text-slate-100 hover:underline"
                      onClick={()=>setOpenMenu(false)}
                    >
                      URL List
                    </Link>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-slate-100">
                      <IoLogOut size={20} />
                    </span>
                    <button className="text-sm font-semibold cursor-pointer text-slate-100 hover:underline" onClick={logout}>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="px-2.5 py-1 select-none rounded-full bg-gradient-to-r from-slate-200 to-slate-300 text-black font-bold cursor-pointer text-sm transition transform active:scale-90">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
