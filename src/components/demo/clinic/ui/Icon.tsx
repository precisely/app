import * as React from "react";

import Bell from "jsx:~/assets/icons/bell.svg";
import FolderPlus from "~/assets/icons/folder-plus.svg";
import Integrations from "~/assets/icons/integrations.svg";
import Settings from "~/assets/icons/settings.svg";
import UpDownArrows from "~/assets/icons/up-down-arrows.svg";
import User from "~/assets/icons/user.svg";

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

export const Icon = ({ name, color, size }: Props) => {
  return (
    <div>
      {name in iconMap ?
        React.createElement(iconMap[name], {
          height: size,
          width: size,
          style: { color: color }
        }) : null}
    </div>
  );
};
