import { Route, Routes } from "react-router";
import { lazy } from "react";
import Layout from "../presentation/orgransims/layout/index.tsx";
import { ROUTES } from "../constants/index.ts";
import Questions from "../presentation/pages/Questions/index.tsx";
import QuestionDetails from "../presentation/pages/QuestionDetails/index.tsx";
import Quizes from "../presentation/pages/Quizes/index.tsx";
import QuizesDetails from "../presentation/pages/QuizesDetails/index.tsx";
import Content from "../presentation/pages/Content/index.tsx";
import MicroLearning from "../presentation/pages/MicroLearning/index.tsx";
import ContentToReel from "../presentation/pages/ContentToReel/index.tsx";
import ContentCreation from "../presentation/pages/ContentCreation/index.tsx";
import ContentDetails from "../presentation/pages/ContentDetails/index.tsx";
import HowToUse from "../presentation/pages/HowToUse/index.tsx";

const NotFoundPage = lazy(() => import("../presentation/pages/404/index.tsx"));


const AllRoutes = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route path={ROUTES.CONTENT} element={<Content />} />
      <Route path={ROUTES.CONTENT_CREATION} element={<ContentCreation />} />
      <Route path={ROUTES.CONTENT_DETAILS} element={<ContentDetails />} />
      <Route path={ROUTES.MICRO_LEARNING} element={<MicroLearning />} />
      <Route path={ROUTES.CONTENT_TO_REEL} element={<ContentToReel />} />
      <Route path={ROUTES.QUESTIONS} element={<Questions />} />
      <Route path={ROUTES.QUESTION_DETAILS} element={<QuestionDetails />} />
      <Route path={ROUTES.QUIZES} element={<Quizes />} />
      <Route path={ROUTES.QUIZ_DETAILS} element={<QuizesDetails />} />
      <Route path={ROUTES.HOW_TO_USE} element={<HowToUse />} />

    </Route>
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);
export default AllRoutes;
