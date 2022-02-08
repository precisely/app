import * as React from "react";
import { Button } from "~/src/components/Button";

export const Layout = () => {
  return (
    <div>
      <div className="flex">
        <div className="">

        </div>
        <div className="">
          
        </div>
      </div>
      <div className="grid grid-cols-3 content-center">
        <div className="flex items-center justify-center col-start-2 col-span-1">
          Anticoagulation Therapy
        </div>
      </div>

      <div className="pt-6 grid grid-cols-6">
        <div className="col-start-3 col-span-1 pr-2">
          <input
            className="w-full h-full"
            type="number"
            value={patientId}
            onChange={(event) => setPatientId(parseInt(event.target.value))}
            min="1"
          />
        </div>
        <div className="col-start-4">
          <Button
            text="Start Patient"
            color="cardinal"
            classes="w-full py-2 pr-2"
            callback={() => newPatient(patientId)}
          />
        </div>
      </div>

      <div>
        <div className="pt-6 grid grid-cols-6">
          <div className="col-start-2 col-span-4 pr-2">{mainTable()}</div>
        </div>
      </div>
    </div>
  );
};
