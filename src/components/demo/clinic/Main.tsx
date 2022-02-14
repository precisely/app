import * as React from "react";
import * as PIAUtils from "~/src/utils/pia";

import { useTitle } from "~/src/utils/react";

import { Button } from "~/src/components/Button";
import * as Common from "~/src/components/demo/common";

import { ClinicTable } from "~/src/components/demo/clinic/ClinicTable";
import { Icon } from "~/src/components/demo/Icon";
import { Layout } from "~/src/components/demo/clinic/ui/Layout";
import { PageTitle } from "~/src/components/demo/clinic/ui/PageTitle";
import { Input } from "~/src/components/demo/Input";

export const Clinic = () => {
  useTitle("Precise.ly: Clinic UI");

  const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);
  const [patientId, setPatientId] = React.useState<number>();

  React.useEffect(
    Common.findRunsEffect("doctor", setRuns),
    // TODO: Change the empty list dependencies argument (below) to useEffect so it
    // forces a refresh when the server informs the client that an invalidation of
    // the run list has occurred.
    []
  );

  const setNewPatient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value) {
      setPatientId(parseInt(value));
    } else {
      setPatientId(null);
    }
  };

  const newPatient = async () => {
    console.log("newPatient:", patientId);
    const newRun = await PIAUtils.startRun("anticoagulation", [patientId]);
    console.log("newPatient => newRun =", newRun);
    setRuns(await Common.findActiveRuns("doctor"));
    setPatientId(null);
  };

  return (
    <Layout>
      <PageTitle
        title="Patients"
        actions={
          <div className="flex items-center space-x-2">
            <div className="w-72">
              <Input
                type="number"
                value={patientId}
                onChange={setNewPatient}
                placeholder="Patient Id"
              />
            </div>
            <Button color="brick" callback={newPatient}>
              <div className="flex items-center space-x-2">
                <Icon name="folderPlus" size={24} color={"blush"} />
                <span className="font-medium text-cloud">New Patient</span>
              </div>
            </Button>
          </div>
        }
      />
      <div className="flex flex-1">
        <ClinicTable data={runs} />
      </div>
    </Layout>
  );
};
