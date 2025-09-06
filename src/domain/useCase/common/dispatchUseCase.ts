import { useDispatch as useReduxDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/index.ts";

export const useDispatch = () => useReduxDispatch<AppDispatch>();
