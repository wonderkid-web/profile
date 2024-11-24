"use client";
import { timelineData } from "@/static";
import { useEffect, useState } from "react";
import { Chrono } from "react-chrono";

function TimeLine() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Cek apakah ini dijalankan di browser
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Atau return loading state jika perlu
  }

  return (
    <div className="flex p-2 md:p-24 flex-col gap-6 w-full md:w-1/2 md:max-h-screen max-h-[80vh] overflow-auto pt-4 md:pt-6">
      <div className="timeline-container">
        <h2 className="text-center text-3xl md:text-4xl font-semibold mb-4 md:mb-8">
          My Career Timeline
        </h2>
        <Chrono
          items={timelineData}
          mode="VERTICAL_ALTERNATING"
          theme={{
            primary: "#F4A261", // Customize primary color
            secondary: "white", // Customize secondary color
            cardBgColor: "#fff", // Customize card background color
            titleColor: "#222428", // Customize title color
          }}
        />
      </div>
    </div>
  );
}

export default TimeLine;
