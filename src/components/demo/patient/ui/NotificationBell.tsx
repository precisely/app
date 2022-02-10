import * as React from "react";

import { Icon } from "~/src/components/demo/Icon";

interface Props {
  hasNotifications?: boolean;
}

export const NotificationBell = ({ hasNotifications = false }: Props) => {
  return (
    <div className="relative bg-white rounded-full p-2">
      <Icon name="bell" family="mobile" size={24} color="ink" />
      {hasNotifications && (
        <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-brick" />
      )}
    </div>
  );
};
