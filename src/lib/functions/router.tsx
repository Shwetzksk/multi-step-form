import React from "react";
import {createRoutesFromElements, createBrowserRouter, Route} from "react-router-dom";
import * as paths from "@lib/constants/route-paths";
import * as Pages from "@pages/index";
import App from "@/App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={paths.HOME} element={<App />} errorElement={<Pages.Error />}>
      <Route errorElement={<Pages.Error />}>
        <Route index element={<Pages.Home />} />
        <Route errorElement={<Pages.Error />}>
          <Route path={paths.MULTI_STEP_FORM} element={<Pages.MultiStepForm />} />
        </Route>
      </Route>
    </Route>,
  ),
);
export default router;
