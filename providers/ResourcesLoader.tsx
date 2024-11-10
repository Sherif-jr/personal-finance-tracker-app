import { StyleSheet, Text, View } from "react-native";
import React, { FC, PropsWithChildren, useEffect } from "react";
import useLoadResources from "@/hooks/useLoadResources";
interface ResourcesLoaderProps {
  onReady?: () => void;
}
const ResourcesLoader: FC<PropsWithChildren<ResourcesLoaderProps>> = ({
  onReady,
  children,
}) => {
  const { isReady } = useLoadResources();
  useEffect(() => {
    if (isReady) onReady?.();
  }, [isReady]);
  if (!isReady) return null;
  return children;
};

export default ResourcesLoader;

const styles = StyleSheet.create({});
