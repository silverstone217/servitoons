"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, TriangleAlert } from "lucide-react";

type Props = {
  message: string;
  title: string;
  type: "info" | "warning";
};
const AlertMessage = ({ message, title, type = "info" }: Props) => {
  return (
    <Alert>
      {type === "info" ? (
        <Info className="h-4 w-4" />
      ) : (
        <TriangleAlert className="h-4 w-4" />
      )}
      <AlertTitle>{title}!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default AlertMessage;
