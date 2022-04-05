import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../types/redux";


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector