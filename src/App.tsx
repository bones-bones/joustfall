import { BrowserRouter, useRoutes } from "react-router-dom";
import { WizardJoust } from "./WizardJoust";

export const App = () => {
  return (
    <div>
      <BrowserRouter basename="joustfall">
        <ApplicationRoutes />
      </BrowserRouter>
    </div>
  );
};

const ApplicationRoutes = () => {
  return useRoutes([{ path: "/", element: <WizardJoust /> }]);
};
