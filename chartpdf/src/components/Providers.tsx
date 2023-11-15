"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

//since we are wrapping the entire application so we will take the children to be ReactNode.
type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

//we will then destructure the children from the props itself
const Providers = ({ children }: Props) => {
  return (
    //we will wrap the children in the query provider
    <QueryClientProvider client={queryClient}>
      {children}</QueryClientProvider>
  );
};

export default Providers;
