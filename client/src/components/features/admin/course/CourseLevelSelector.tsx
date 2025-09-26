import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/shadcn/ui/select";

type CourseLevelSelectorProps = {
  currentLevel: string;
  setCurrentLevel: (level: string) => void;
};

const CourseLevelSelector = ({
  currentLevel,
  setCurrentLevel,
}: CourseLevelSelectorProps) => {
  return (
    <Select value={currentLevel} onValueChange={setCurrentLevel}>
      <SelectTrigger className="w-full dark:border-text2-dark border-text2 dark:text-text1-dark text-text1 py-5">
        <SelectValue placeholder="Select a Level" />
      </SelectTrigger>
      <SelectContent className="dark:bg-background-dark bg-background">
        <SelectGroup>
          <SelectItem
            value="beginner"
            className="dark:hover:bg-surface-dark hover:bg-surface  "
          >
            Beginner
          </SelectItem>
          <SelectItem
            value="intermediate"
            className="dark:hover:bg-surface-dark hover:bg-surface  "
          >
            Intermediate
          </SelectItem>
          <SelectItem
            value="advance"
            className="dark:hover:bg-surface-dark hover:bg-surface  "
          >
            Advance
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CourseLevelSelector;
