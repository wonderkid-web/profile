import Image from "next/image";
import profile from "/public/teach.jpeg";

function ProfilePicture() {
  return (
    <div className="relative md:min-h-screen min-h-[20vh] md:w-1/2 mx-auto overflow-hidden pt-2 md:rounded-none w-[93vw] rounded-2xl ">
      <Image
        className="absolute left-0 bottom-0"
        src={profile}
        alt="Profile" 
        objectFit="cover"
        fill
      />
    </div>
  );
}

export default ProfilePicture;
