"use client";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/src/shadcn/ui/dropzone";

import { z } from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/src/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/shadcn/ui/form";
import { Input } from "@/src/shadcn/ui/input";
import { Textarea } from "@/src/shadcn/ui/textarea";
import { PlusIcon, XIcon } from "lucide-react";

type CourseOptionsProps = {
  currentStep: number;
  onStepChange: (nextStepIndex: number) => void;
  benefits: any;
  prerequisites: any;
  setBenefits: (data: any) => void;
  setPrerequisites: (data: any) => void;
};

const CourseOptions = ({
  currentStep,
  onStepChange,
  benefits,
  prerequisites,
  setBenefits,
  setPrerequisites,
}: CourseOptionsProps) => {
  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handleRemoveBenefit = (index: number) => {
    if (benefits.length > 1) {
      setBenefits(benefits.filter((benefit: any, i: number) => i !== index));
    }
  };

  const handleRemovePrerequisite = (index: number) => {
    if (prerequisites.length > 1) {
      setPrerequisites(
        prerequisites.filter((prerequisite: any, i: number) => i !== index)
      );
    }
  };

  return (
    <div className="w-full bg-surface dark:bg-surface-dark p-8 rounded-lg shadow-sm shadow-text1 dark:shadow-none">
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-4xl font-bold dark:text-text1-dark text-text1">
          Course Benefits & Prerequisites
        </p>
        <p className=" dark:text-text2-dark text-text2 font-medium">
          Add benefits and prerequisites to your course. These will be shown to
          the students.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {/* ----BENEFITS---- */}
        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium dark:text-text1-dark text-text1">
            What are the benefits of taking this course?
          </p>
          <div className="flex flex-col gap-3">
            {benefits.map((benefit: any, index: number) => (
              <div key={index} className="flex flex-row gap-2">
                <Input placeholder="Benefit" value={benefit.title} />
                {benefits.length > 1 && (
                  <p
                    onClick={() => handleRemoveBenefit(index)}
                    className="text-sm  font-semibold text-destructive cursor-pointer flex items-center gap-2 "
                  >
                    <XIcon className="w-4 h-4 inline-block" />
                  </p>
                )}
              </div>
            ))}
            <p
              onClick={handleAddBenefit}
              className="text-sm  font-semibold text-orange-400 cursor-pointer flex items-center gap-2 "
            >
              Add Benefit <PlusIcon className="w-4 h-4 inline-block" />
            </p>
          </div>
        </div>

        {/* ----PREREQUISITES---- */}
        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium dark:text-text1-dark text-text1">
            What are the prerequisites for taking this course?
          </p>
          <div className="flex flex-col gap-3">
            {prerequisites.map((prerequisite: any, index: number) => (
              <div key={index} className="flex flex-row gap-2">
                <Input placeholder="Prerequisite" value={prerequisite.title} />
                {prerequisites.length > 1 && (
                  <p
                    onClick={() => handleRemovePrerequisite(index)}
                    className="text-sm  font-semibold text-destructive cursor-pointer flex items-center gap-2 "
                  >
                    <XIcon className="w-4 h-4 inline-block" />
                  </p>
                )}
              </div>
            ))}
            <p
              onClick={handleAddPrerequisite}
              className="text-sm  font-semibold text-orange-400 cursor-pointer flex items-center gap-2 "
            >
              Add Prerequisite <PlusIcon className="w-4 h-4 inline-block" />
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          onClick={() => onStepChange(currentStep - 1)}
          className=" cursor-pointer mt-2 dark:text-text1-dark text-text1  text-base w-32  border dark:border-text2-dark border-text2   hover:border-primary dark:hover:border-primary-dark bg-transparent hover:bg-transparent"
          size="lg"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={() => onStepChange(currentStep + 1)}
          className=" cursor-pointer mt-2 text-white text-base w-32"
          size="lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CourseOptions;
