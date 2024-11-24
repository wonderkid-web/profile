import WordPullUp from "@/components/ui/word-pull-up";
import { socialUrls } from "@/static";
import { SocialIcon } from "react-social-icons";

function Aboutme() {
  return (
    <div className="flex gap-2  md:gap-4  flex-col p-4 max-w-lg">
      <h2 className="font-bold text-3xl lg:text-[4rem] text-center lg:text-left">
        About Me
      </h2>
      <WordPullUp
        className="text-xl lg:text-2xl text-customSecondaryText font-semibold w-full md:text-left "
        words="Hi! I’m Muhammad Wahyu Ramadhan"
      />
      <p className="text-base lg:text-xl text-customSecondaryText font-medium text-justify leading-snug">
        A web developer with expertise in frontend and backend technologies like
        React, Next.js, and Laravel. I’ve led teams to build impactful
        applications and founded KitaKale Course, an education platform focused
        on practical programming skills.
      </p>
      {/* Social Icons */}
      <div className="flex justify-center lg:justify-start gap-4 mt-4">
        {socialUrls.map((url) => (
          <SocialIcon key={url} url={url} />
        ))}
      </div>
    </div>
  );
}

export default Aboutme;
