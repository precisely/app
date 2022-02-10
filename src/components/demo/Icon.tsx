import * as React from "react";

import { getColorFromTailwind } from "./common";

import Bell from "jsx:~/assets/icons/bell.svg";
import ChevronDown from "jsx:~/assets/icons/chevron-down.svg";
import FolderPlus from "jsx:~/assets/icons/folder-plus.svg";
import Integrations from "jsx:~/assets/icons/integrations.svg";
import Search from "jsx:~/assets/icons/search.svg";
import Settings from "jsx:~/assets/icons/settings.svg";
import UpDownArrows from "jsx:~/assets/icons/up-down-arrows.svg";
import User from "jsx:~/assets/icons/user.svg";

// Patient Icons
import Bell2 from "jsx:~/assets/icons/patient/bell.svg";
import Settings2 from "jsx:~/assets/icons/patient/settings.svg";
import Data from "jsx:~/assets/icons/patient/data.svg";
import Home from "jsx:~/assets/icons/patient/home.svg";
import ChevronRight from "jsx:~/assets/icons/patient/chevron-right.svg";
import ChevronLeft from "jsx:~/assets/icons/patient/chevron-left.svg";

interface Props {
  name: string;
  color: string;
  size: number;
  family?: "web" | "mobile";
}

const iconMap = {
  web: {
    bell: Bell,
    chevronDown: ChevronDown,
    folderPlus: FolderPlus,
    integrations: Integrations,
    search: Search,
    settings: Settings,
    upDownArrows: UpDownArrows,
    user: User,
  },
  mobile: {
    bell: Bell2,
    settings: Settings2,
    data: Data,
    home: Home,
    chevronRight: ChevronRight,
    chevronLeft: ChevronLeft,
  },
};

export const Icon = ({ name, color, size, family = "web" }: Props) => {
  return React.createElement(iconMap[family][name], {
    className: `stroke-${color}`,
    height: size,
    width: size,
    style: { color: getColorFromTailwind(color) },
  });
};
