
import Logo from "@/components/section/punchline/Logo";
import PunchlineText from "@/components/section/punchline/PunchlineText";
import Container from "@/components/layout/Container";
import React from "react";
import TimeLine from "@/components/section/timeline/TimeLine";
import ProfilePicture from "@/components/section/timeline/ProfilePicture";

export default function Home() {
  return (
    <section>
      <Container>
        <div className="flex flex-col  justify-center gap-3 md:gap-12 min-h-screen">
          <Logo />
          <PunchlineText />
        </div>
      </Container>

      <div className="flex flex-col md:flex-row overflow-hidden">
        <ProfilePicture />
        <div className="flex p-2 md:p-24 flex-col gap-6 w-full md:w-1/2 md:max-h-screen max-h-[80vh] overflow-auto pt-4 md:pt-6">
          <TimeLine />
        </div>
      </div>
    </section>
  );
}
