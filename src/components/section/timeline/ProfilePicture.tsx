import Image from 'next/image'
import profile from "/public/profile.jpg";

function ProfilePicture() {
  return (
    <div className="relative md:min-h-screen min-h-[20vh] md:w-1/2 w-1/3 mx-auto overflow-hidden pt-2 md:rounded-none rounded-full">
    <Image
      className="absolute left-0 bottom-0"
      objectPosition="20px"
      src={profile}
      alt="Profile"
      objectFit="cover"
    />
  </div>
  )
}

export default ProfilePicture