import * as React from "react";
import * as PIAUtils from "~/src/utils/pia";

export const PatientContext = React.createContext<PIAUtils.Patient>(null);
export const PatientProvider = PatientContext.Provider;
