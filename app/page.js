'use client'
import Hero from "@/components/Hero";
import { useURL } from "@/context/urlContext";
import React, { useEffect } from "react";

const App = () => {
  const {getCurrentUser}=useURL()

  useEffect(()=>{
    getCurrentUser()
  },[])
  return <div className="w-full text-slate-100 ">
    <div className="px-5 sm:px-10 md:px-14 lg:px-32">
      <Hero/>
    </div>
  </div>;
};

export default App;
