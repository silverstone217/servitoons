"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectOptionType } from "@/types/contentTypes";

type SelectContentType = {
  placeholder: string;
  options: SelectOptionType[];
  onChange: (value: string) => void;
  value: string;
};

const SelectComponent = ({
  placeholder,
  options,
  onChange,
  value,
}: SelectContentType) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>{"Tout"}</SelectItem>
        {options.map((option, idx) => (
          <SelectItem key={idx} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
