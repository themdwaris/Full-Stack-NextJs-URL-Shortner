// /app/[shortCode]/page.js
import connectToDB from "@/config/db";
import URL from "@/model/urlModel";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }) {
  await connectToDB();

  const { shortCode } = await params; // ✅ Automatically mil jaata hai
//   console.log(shortCode);
  
  const url = await URL.findOne({ shortCode });
//   console.log(url);
   

  if (!url) {
    return redirect("/not-found"); // Or show a 404 page
  }

  const headersList = headers();
      let ip =
        headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        headersList.get("x-real-ip") ||
        "unknown";
  
      // 👇 fallback for localhost testing
      if (ip === "::1" || ip === "127.0.0.1" || ip === "unknown") {
        ip = "8.8.8.8"; // or any valid IP
      }
  
      // 📍 Get location from IP using ipapi.co
      let city = "unknown",
        region = "unknown";
      try {
        const res = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await res.json();
        city = data.city || "unknown";
        region = data.region || "unknown";
      } catch (err) {
        console.error("IP location fetch failed:", err.message);
      }
  
      // 📝 Update clickStats + totalClicks
      await URL.updateOne(
        { _id: url?._id },
        {
          $push: {
            clickStats: {
              time: new Date(),
              ip,
              city,
              region,
              clickCount:1
            },
          },
          $inc: { totalClicks: 1 },
        }
      );
  
  // ✅ Redirect to the original long URL
  return redirect(url.originalUrl);
}
