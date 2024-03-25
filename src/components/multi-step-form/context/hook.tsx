import {useContext} from "react";
import {ReadContext, DispatchContext} from "./context";

export function useReadContext() {
  return useContext(ReadContext);
}
export function useDispatchContext() {
  return useContext(DispatchContext);
}
