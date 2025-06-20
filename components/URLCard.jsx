"use client";

import React, { useState } from "react";
import { RiLinkM } from "react-icons/ri";
import StatsPopup from "./StatsPopup";
import Stats from "./Stats";
import axios from "axios";
import toast from "react-hot-toast";
import { useURL } from "@/context/urlContext";

const URLCard = ({ url }) => {
  const [openStats, setOpenStats] = useState(false);
  const { shortCode, originalUrl, totalClicks, clickStats } = url;
  const {getAllURLs}=useURL()

  const deleteHandler=async(shortCode)=>{
    try {
      console.log("before");
      
      const res = await axios.delete(`/api/${shortCode}`)
      if(res?.data?.success){
        console.log("after");
        
        toast.success(res.data.message)
        getAllURLs()
      }
    } catch (error) {
      console.log("Failed to delete URL::",error);
      
    }
  }
  return (
    <div className="p-4 rounded-lg border border-white/20">
      <div className="flex items-center">
        
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/${shortCode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pb-3 text-base font-semibold text-blue-300 cursor-pointer transition transform active:scale-90 hover:underline"
        >
          {`mymd.vercel.app/${shortCode}`}
        </a>
      </div>
      <div className="flex items-center">
        <p className="text-slate-100 font-semibold text-sm flex items-center gap-0.5">
          Original URL <RiLinkM size={18} />
        </p>
        &nbsp;
        <a
          href={originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-200 text-sm text-ellipsis truncate hover:underline hover:text-blue-400"
        >
          {originalUrl}
        </a>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-slate-100">
          <span className="text-sm font-semibold" title="Total Clicks on this URL">Clicks</span>
          <span className="text-sm ml-3 font-bold text-green-400">{totalClicks}</span>
        </p>
        <button
          className="text-sm font-semibold text-blue-400 cursor-pointer transition transform active:scale-90"
          onClick={() => setOpenStats(true)}
          title="Stats"
        >
          View Stats
        </button>
        <button
          className="text-sm font-semibold text-red-400 cursor-pointer transition transform active:scale-90"
          onClick={() => deleteHandler(shortCode)}
          title="Delete"
        >
          Delete
        </button>
      </div>
      <>
        {openStats && (
          <StatsPopup setOpenStats={setOpenStats}>
            <Stats
              stats={clickStats}
              shortCode={shortCode}
              originalUrl={originalUrl}
              totalClicks={totalClicks}
              setOpenStats={setOpenStats}
            />
          </StatsPopup>
        )}
      </>
    </div>
  );
};

export default URLCard;
