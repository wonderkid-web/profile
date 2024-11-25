import Logo from "@/components/section/punchline/Logo";
import PunchlineText from "@/components/section/punchline/PunchlineText";
import Container from "@/components/layout/Container";
import TimeLine from "@/components/section/timeline/TimeLine";
import ProfilePicture from "@/components/section/timeline/ProfilePicture";
import Profile from "@/components/section/aboutme/Profile";
import Aboutme from "@/components/section/aboutme/Aboutme";

export default function Home() {
  return (
    <section>
      <Container>
        <div className="flex flex-col  justify-center gap-3 md:gap-12 min-h-screen">
          <Logo />
          <PunchlineText />
        </div>
      </Container>

      <div className="flex flex-col lg:flex-row justify-center gap-0 md:gap-24 min-h-screen p-4">
        <Profile />
        <Aboutme />
      </div>

      <div className="flex flex-col md:flex-row overflow-hidden border-y-2 border-customSecondaryText">
        <ProfilePicture />
        <TimeLine />
      </div>

      {/* 
      
      Adding Achievement Section

      */}
    </section>
  );
}
