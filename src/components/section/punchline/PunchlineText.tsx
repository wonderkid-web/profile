import Link from "next/link";
import React from "react";

export default function PunchlineText() {
  return (
    <section className="flex justify-center items-center flex-col mt-3 md:mt-0 gap-2 md:gap-4 px-4">
      <h1 className="text-4xl md:text-[4rem] font-semibold leading-snug">
        Hi there! {"I'm"} Wahyu
      </h1>
      <p className="text-lg text-center md:text-3xl text-customSecondaryText mt-2 md:mt-4">
        A web developer, admin, and programming mentor.
      </p>
      <p className="text-md text-center md:text-2xl text-customSecondaryText mt-1 md:mt-3 leading-relaxed">
        {"Let’s"} bring <span className="underline font-bold">ideas</span> to
        life, the fun and focused way.
      </p>
      <Link
        href={"/"}
        className="px-6 bg-customSecondaryText font-semibold text-center rounded-full py-3 md:py-4 text-md md:text-2xl text-customPrimaryBg mt-1 md:mt-3 mb-4 
    motion-scale-in-[0.5] motion-rotate-in-[-10deg] motion-blur-in-[10px] motion-delay-[0.75s]/rotate motion-delay-[0.75s]/blur motion-ease-bounce
        "
      >
        {"Let’s"} Collaborate!
      </Link>
    </section>
  );
}
