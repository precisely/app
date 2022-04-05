import * as React from "react";
import * as PIAUtils from "~/src/utils/pia";

import { toast } from "react-toastify";
import { Header } from "~/src/components/demo/patient/ui/Header";
import { NotificationBell } from "~/src/components/demo/patient/ui/NotificationBell";
import { TabbarLayout } from "~/src/components/demo/patient/ui/TabbarLayout";
import { ActivityList } from "~/src/components/demo/patient/pages/activity/ActivityList";
import { PatientContext } from "~/src/components/demo/patient/common";
import { StartFlow } from "../../ui/StartFlow";

export const HomePage = () => {
  const patient = React.useContext(PatientContext);
  const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);

  const getActivities = async () => {
    try {
      const resp = await PIAUtils.findRuns(
        `state=running&index.patient-id=${patient.id}&index.roles$contains=patient`
      );
      setRuns(resp);
    } catch (error) {
      // TODO: Add proper error handling.
      toast.error("PIA request broke!");
    }
  };

  React.useEffect(
    () => {
      getActivities();
    },
    // TODO: Change the empty list dependencies argument (below) to useEffect so it
    // forces a refresh when the server informs the client that an invalidation of
    // the run list has occurred.
    []
  );

  return (
    <TabbarLayout>
      <Header action={<NotificationBell hasNotifications={true} />} />
      <StartFlow patientId={patient.id} refreshRuns={getActivities} />
      <ActivityList runs={runs} />
    </TabbarLayout>
  );
};
