"use client";
import axios from "axios";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { IoCopy } from "react-icons/io5";
import { toPng } from "html-to-image";
import QRCode from "react-qr-code";
import { MdOutlineFileDownload } from "react-icons/md";
import { useURL } from "@/context/urlContext";
import Loader from "./Loader";

const Hero = () => {
  const { user,router } = useURL();
  const [url, setUrl] = useState("");
  const [shortUrl, setShorUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const qrRef = useRef(null);

  const shortenURLHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Login first");
      router.push('/login')
      return;
    }

    if (shortUrl && shortUrl.length > 0) {
      setShorUrl("");
      setUrl("");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/api/shorten", { originalUrl: url });
      if (res?.data?.success) {
        setLoading(false);
        toast.success("URL Shortened Successfully");
        setShorUrl(res.data.shortUrl);
      } else {
        setLoading(false);
        console.log(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("Failed to short URL::", error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied");
      })
      .catch(() => {
        toast.error("Failed to copy.");
      });
  };

  const downloadQR = () => {
    if (qrRef.current === null) return;

    toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `short-url-qr.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("QR download failed", err);
        toast.error("Download failed");
      });
  };

  return (
    <div className="w-full min-h-screen ">
      <div className="w-full max-w-xl mx-auto text-center text-slate-100 pt-24 md:pt-32">
        <h1 className="text-5xl md:text-6xl font-bold">
          Simplify and Clean Your Links
        </h1>
        <p className="text-base pt-6">
          Shorten your long urls and make them sharable link and share them
          easily
        </p>
        <div className="flex items-center gap-5 justify-center">
          <button className="mt-10 select-none px-6 py-2 rounded-full bg-gradient-to-r from-slate-200 to-slate-400 text-black font-semibold border-none outline-none cursor-pointer transition transform active:scale-90">
            Get Started
          </button>
          <button className="mt-10 select-none px-6 py-2 rounded-full border border-slate-200 text-slate-200 font-semibold outline-none cursor-pointer transition transform active:scale-90">
            Try Now
          </button>
        </div>
      </div>
      <form
        onSubmit={shortenURLHandler}
        className="w-full max-w-[550px] mx-auto flex items-center gap-2 mt-16"
      >
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2.5 rounded-full bg-white/10 outline-none border-none"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-3 py-[7px] select-none rounded-full bg-gradient-to-l from-emerald-500 to-emerald-900 text-slate-100 font-semibold border-none outline-none cursor-pointer transition transform active:scale-90 ${
            loading && "opacity-65"
          }`}
        >
          {shortUrl.length > 0 ? "Clear" : loading?<Loader/>:"Shorten"}
        </button>
      </form>

      {shortUrl && shortUrl?.length > 0 && (
        <div className="w-full max-w-[550px] mt-6 mx-auto p-3 rounded-full bg-white/15 text-slate-100 flex items-center justify-between gap-1">
          <span className="text-ellipsis truncate">{shortUrl}</span>
          <span
            className="cursor-pointer select-none transition transform active:scale-90"
            onClick={() => copyToClipboard(shortUrl)}
          >
            <IoCopy size={20} />
          </span>
        </div>
      )}
      {shortUrl && shortUrl.length && (
        <div className="w-full max-w-[150px] mx-auto my-8 ">
          <div ref={qrRef}>
            <QRCode value={shortUrl} size={128} />
          </div>
          <button
            className="mt-3 px-3 py-2 w-[128px] select-none flex items-center gap-3 rounded-lg bg-gradient-to-l from-emerald-500 to-emerald-900 text-slate-100 cursor-pointer transition transform active:scale-90"
            title="Download QR Code"
            onClick={downloadQR}
          >
            <span className="text-sm font-semibold text-slate-100">
              Download
            </span>
            <MdOutlineFileDownload size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Hero;
