import { useDispatch } from "react-redux";
import { AppDispatch } from "../types/action-types";

import type {} from "redux-thunk/extend-redux";

export const useTypedDispatch: () => AppDispatch = useDispatch;