import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { NotFound } from "~/src/components/errors/NotFound";
import { Main } from "~/src/components/demo/Main";
import { Clinic } from "~/src/components/demo/clinic/Main";
import { Patient } from "~/src/components/demo/patient/Main";
import { GenericEndpoint } from "~/src/components/demo/generic-endpoint/GenericEndpoint";

import "react-toastify/dist/ReactToastify.css";
import "~/assets/css/toast.css";
import "~/assets/css/common.css";

const Root = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Main />} />
            <Route path="/clinic" element={<Clinic />} />
            <Route path="/patient/:patientId" element={<Patient />} />
            <Route path="/:endpointType/:endpointId/*" element={<GenericEndpoint />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        autoClose={3500}
        position="top-right"
        hideProgressBar={true}
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Root />);