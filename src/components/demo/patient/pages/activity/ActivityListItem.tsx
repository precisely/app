import * as React from "react";
import * as RouterDOM from "react-router-dom";

import { Icon } from "~/src/components/demo/Icon";
import { Run } from "~/src/utils/pia";
import { PatientContext } from "~/src/components/demo/patient/common";

interface Props {
  run: Run;
}

export const ActivityListItem = ({ run }: Props) => {
  const patient = React.useContext(PatientContext);

  return (
    <RouterDOM.Link
      to={{ pathname: `/demo/patient/${patient.id}/${run.id}`, state: { run } }}
    >
      <div className="flex bg-white rounded-md items-center p-4 shadow-lg shadow-ink/5">
        <div className="flex-1">
          <h4 className="font-semibold">{run.index.title.toString()}</h4>
          <p>{run.index.subtitle ?? "Waiting for update"}</p>
        </div>
        <Icon name="chevronRight" family="mobile" size={24} color="grey300" />
      </div>
    </RouterDOM.Link>
  );
};
