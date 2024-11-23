import Logo from "@/components/section/punchline/Logo";
import PunchlineText from "@/components/section/punchline/PunchlineText";

export default function Home() {
  return (
    <section>
      <div className="flex flex-col justify-center min-h-screen gap-3 md:gap-12 -mt-12">
        <Logo />
        <PunchlineText />
      </div>
    </section>
  );
}
