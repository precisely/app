import a1 from "~/assets/images/avatars/1.jpeg";
import a2 from "~/assets/images/avatars/2.jpeg";
import a3 from "~/assets/images/avatars/3.jpeg";
import a4 from "~/assets/images/avatars/4.jpeg";
import a5 from "~/assets/images/avatars/5.jpeg";
import a6 from "~/assets/images/avatars/6.jpeg";
import a7 from "~/assets/images/avatars/7.jpeg";
import a8 from "~/assets/images/avatars/8.jpeg";
import a9 from "~/assets/images/avatars/9.jpeg";
import a10 from "~/assets/images/avatars/10.jpeg";
import a11 from "~/assets/images/avatars/11.jpeg";
import a12 from "~/assets/images/avatars/12.jpeg";
import a13 from "~/assets/images/avatars/13.jpeg";
import a14 from "~/assets/images/avatars/14.jpeg";
import a15 from "~/assets/images/avatars/15.jpeg";
import a16 from "~/assets/images/avatars/16.jpeg";
import a17 from "~/assets/images/avatars/17.jpeg";

const avatarList = [
  a1,
  a2,
  a3,
  a4,
  a5,
  a6,
  a7,
  a8,
  a9,
  a10,
  a11,
  a12,
  a13,
  a14,
  a15,
  a16,
  a17,
];

export const getAvatarSrc = (id: number) => {
  return avatarList[id % avatarList.length];
};
