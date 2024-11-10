import { useFonts } from "expo-font";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { useEffect } from "react";
import { fetchLocalTransactions } from "@/store/slices/transaction.slice";

const useLoadResources = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const transactionsLoading = useAppSelector(
    (state) => state.transactions.loading
  );
  const dispatch = useAppDispatch();
  const isReady = loaded && !transactionsLoading;

  useEffect(() => {
    dispatch(fetchLocalTransactions());
  }, []);

  return {
    isReady,
  };
};

export default useLoadResources;
