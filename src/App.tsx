import React, { Suspense } from "react";
import FullScreenLoader from "./common/molecules/FullScreenLoader/index.tsx";
import AllRoutes from "./routes/index";

const App: React.FC = () => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <AllRoutes />
    </Suspense>
  );
};

export default App;
