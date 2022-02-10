import * as React from "react";
import { Header } from "~/src/components/demo/patient/ui/Header";
import { NotificationBell } from "~/src/components/demo/patient/ui/NotificationBell";
import { TabbarLayout } from "~/src/components/demo/patient/ui/TabbarLayout";
import { ActivityList } from "~/src/components/demo/patient/ActivityList";

export const HomePage = () => {
  return (
    <TabbarLayout>
      <Header action={<NotificationBell hasNotifications={true} />} />
      <ActivityList />
    </TabbarLayout>
  );
};
