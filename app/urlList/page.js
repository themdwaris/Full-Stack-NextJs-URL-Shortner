"use client";
import AuthLoader from "@/components/AuthLoader";
import URLCard from "@/components/URLCard";
import { useURL } from "@/context/urlContext";
import React, { useEffect } from "react";

const UrlList = () => {
  const { allURLs, loading, getAllURLs } = useURL();

  useEffect(() => {
    getAllURLs();
  }, []);
  return (
    <div className="w-full min-h-screen">
      <div className="px-5 sm:px-10 md:px-14 lg:px-32 pb-10">
        <h1 className="text-3xl md:text-4xl font-bold py-16 bg-gradient-to-r from-slate-100 to-slate-400 inline-block text-transparent bg-clip-text">
          Your Shortened URLs
        </h1>

        {loading && (
          <div className="w-full flex items-center justify-center h-[40vh]">
            <AuthLoader className={"w-12 h-12"} />
          </div>
        )}
        {allURLs?.length === 0 && (
          <div className="w-full flex items-center justify-center h-[40vh] text-xl text-slate-100 ">
            No URLs found yet
          </div>
        )}
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-center gap-x-3.5 gap-y-5">
          {allURLs &&
            allURLs?.length > 0 &&
            allURLs?.map((url) => <URLCard key={url?._id} url={url} />)}
        </div>
      </div>
    </div>
  );
};

export default UrlList;
