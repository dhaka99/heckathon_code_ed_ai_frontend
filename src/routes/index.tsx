import { Route, Routes } from "react-router";
import { lazy } from "react";
import { ROUTES } from "../constants/index.ts";
import Layout from "../presentation/orgransims/layout/index.tsx";

const NotFoundPage = lazy(() => import("../presentation/pages/404/index.tsx"));
const SalesLeads = lazy(
  () => import("../presentation/pages/SalesLeads/index.tsx"),
);

const AllRoutes = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
    </Route>
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);
export default AllRoutes;
