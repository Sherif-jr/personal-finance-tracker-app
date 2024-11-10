import { AppDispatch } from "@/store";
import { StoreState } from "@/store/slices";
import { useDispatch, useSelector } from "react-redux";

export const useAppSelector = useSelector.withTypes<StoreState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
