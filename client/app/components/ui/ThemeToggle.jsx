"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/app/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/shadcn/ui/dropdown-menu";

const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="dark:bg-surface-dark dark:text-text1-dark cursor-pointer bg-white hover:bg-zinc-300 ring-0 focus:ring-0 rounded-sm "
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className=" bg-surface dark:bg-surface-dark text-black dark:text-text1-dark"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer hover:bg-zinc-300 dark:hover:bg-white dark:hover:text-black "
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer hover:bg-zinc-300 dark:hover:bg-white dark:hover:text-black"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer hover:bg-zinc-300 dark:hover:bg-white dark:hover:text-black"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
