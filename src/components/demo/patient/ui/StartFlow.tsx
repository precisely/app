import * as React from "react";
import * as PIAUtils from "~/src/utils/pia";
import { Button } from "~/src/components/Button";

interface StartFlowProps {
  patientId: number;
  refreshRuns: () => void;
}

const flows = ["depression", "frailty"];

export const StartFlow = ({ patientId, refreshRuns }: StartFlowProps) => {
  const [flow, setFlow] = React.useState("depression");
  const start = async () => {
    console.log(patientId);
    await PIAUtils.startRun(flow, [patientId]);
    refreshRuns();
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFlow(e.target.value);
  };

  return (
    <div>
      <select value={flow} onChange={handleChange}>
        {flows.map((obj) => (
          <option key={obj} value={obj}>
            {obj}
          </option>
        ))}
      </select>
      <Button text="Start" callback={start} />
    </div>
  );
};
