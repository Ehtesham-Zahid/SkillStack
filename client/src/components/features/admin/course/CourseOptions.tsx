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
import { toast } from "react-hot-toast";
import { Separator } from "@/src/shadcn/ui/separator";

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
  const [benefitError, setBenefitError] = useState(false);
  const [prerequisiteError, setPrerequisiteError] = useState(false);

  const handleAddBenefit = () => {
    if (benefits[benefits.length - 1]?.title === "") {
      setBenefitError(true);
    } else {
      setBenefitError(false);
      setBenefits([...benefits, { title: "" }]);
    }
  };

  const handleAddPrerequisite = () => {
    if (prerequisites[prerequisites.length - 1]?.title === "") {
      setPrerequisiteError(true);
    } else {
      setPrerequisiteError(false);
      setPrerequisites([...prerequisites, { title: "" }]);
    }
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

  const handleBenefitChange = (e: any, index: number) => {
    setBenefitError(false);
    setBenefits(
      benefits.map((benefit: any, i: number) =>
        i === index ? { ...benefit, title: e.target.value } : benefit
      )
    );
  };

  const handlePrerequisiteChange = (e: any, index: number) => {
    setPrerequisiteError(false);
    setPrerequisites(
      prerequisites.map((prerequisite: any, i: number) =>
        i === index ? { ...prerequisite, title: e.target.value } : prerequisite
      )
    );
  };

  const handlePrev = () => {
    onStepChange(currentStep - 1);
    setBenefitError(false);
    setPrerequisiteError(false);
  };

  const handleNext = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      onStepChange(currentStep + 1);
    } else {
      toast.error("Please fill the fields to continue!");
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
                <Input
                  type="text"
                  placeholder="Benefit"
                  value={benefit.title}
                  onChange={(e) => handleBenefitChange(e, index)}
                />
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
            {benefitError && (
              <p className="text-sm text-destructive">
                Please fill the last field to continue!
              </p>
            )}
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
                <Input
                  type="text"
                  placeholder="Prerequisite"
                  value={prerequisite.title}
                  onChange={(e) => handlePrerequisiteChange(e, index)}
                />
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
            {prerequisiteError && (
              <p className="text-sm text-destructive">
                Please fill the last field to continue!
              </p>
            )}
            <p
              onClick={handleAddPrerequisite}
              className="text-sm  font-semibold text-orange-400 cursor-pointer flex items-center gap-2 "
            >
              Add Prerequisite <PlusIcon className="w-4 h-4 inline-block" />
            </p>
          </div>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          onClick={handlePrev}
          className=" cursor-pointer mt-2 dark:text-text1-dark text-text1  text-base w-32  border dark:border-text2-dark border-text2   hover:border-primary dark:hover:border-primary-dark bg-transparent hover:bg-transparent"
          size="lg"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleNext}
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
