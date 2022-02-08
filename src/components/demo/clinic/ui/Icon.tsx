import * as React from "react";

import Bell from "jsx:~/assets/icons/bell.svg";
import FolderPlus from "jsx:~/assets/icons/folder-plus.svg";
import Integrations from "jsx:~/assets/icons/integrations.svg";
import Settings from "jsx:~/assets/icons/settings.svg";
import UpDownArrows from "jsx:~/assets/icons/up-down-arrows.svg";
import User from "jsx:~/assets/icons/user.svg";

interface Props {
  name: string;
  color: string;
  size: number;
}

const iconMap = {
  bell: Bell,
  folderPlus: FolderPlus,
  integrations: Integrations,
  settings: Settings,
  upDownArrows: UpDownArrows,
  user: User,
};

// TODO: replace this with Tailwind vars
// copied from tailwind.config.js
const colorMap = {
  // primary:
  // - black and white
  ink: "#191818",
  lightgrey: "#EAEAEA",
  grey: "#8D8D8D",
  cloud: "#F2F2F2",
  coconut: "#FEFEFE",
  // - reds and pinks
  brick: "#D43857",
  cardinal: "#E71F54",
  blush: "#F28599",
  puff: "#FDEDF2",
  // - blues
  cobalt: "#1A73E8",
  peppermint: "#F3F8FE",
  // - green
  parakeet: "#1EC69C",
  // secondary:
  clover: "#20C882",
  monarch: "#FA6400", // warning messages
  flame: "#E74C3C", // error messages
  proton: "#7451F0",
  butterscotch: "#F7B500",
  lapis: "#0080FF", // info messages
  salamander: "#FF4400",
  royal: "#7700F4",
  bubblegum: "#FF14B0",
  aqua: "#00DFEC",
};

export const Icon = ({ name, color, size }: Props) => {
  return (
    <div>
      {name in iconMap
        ? React.createElement(iconMap[name], {
            className: `stroke-${color}`,
            height: size,
            width: size,
            style: { color: colorMap[color] },
          })
        : null}
    </div>
  );
};
