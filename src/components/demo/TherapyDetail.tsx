/**
 * Shows standard elements of a therapeutic program
 *   - The patient being treated
 *   - Current activities
 */
import * as React from "react";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";

import type { Run, Patient } from "~/src/utils/pia";

interface Props {
  run: Run
}

export const TherapyDetail = (props: Props) => {

  const [run, setRun] = React.useState<PIAUtils.Run>(props.run);

  return (
    <div>
      Therapy Overview:

      <div>

        <div>
          <div>Lab Activities:</div>
        </div>

      </div>

    </div>
  );

};
