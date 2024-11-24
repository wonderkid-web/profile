import Image from 'next/image'
import React from 'react'
import profile from "/public/profile.jpg";

function Profile() {
  return (
    <div className="relative w-full h-64 lg:w-1/4 lg:h-[45vh] rounded-2xl overflow-hidden">
    <Image
      alt="me"
      fill
      src={profile}
      objectFit="cover"
      className="object-custom-position"
    />
  </div>
  )
}

export default Profile