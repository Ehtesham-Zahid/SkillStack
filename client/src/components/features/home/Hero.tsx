import Lottie from "lottie-react";

import { Badge } from "@/src/shadcn/ui/badge";
import { Button } from "@/src/shadcn/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/src/shadcn/ui/avatar";

import SearchInput from "../../ui/SearchInput";
import { useGetLayoutByTypeQuery } from "@/src/redux/features/layout/layoutApi";

import animationData from "@/public/lotties/hero.json";
import Link from "next/link";
import Spinner from "../../ui/Spinner";

const Hero = () => {
  const { data: bannerData, isLoading: bannerLoading } =
    useGetLayoutByTypeQuery({ type: "Banner" });

  return bannerLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="w-11/12  lg:w-11/12 2xl:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 items-start my-10 2xl:my-16">
        <div className="flex flex-col gap-5 lg:gap-8  2xl:gap-10  ">
          <div className="flex flex-col gap-5">
            <Badge
              variant="default"
              className="bg-orange-100 text-primary font-medium rounded-full py-2 px-3 text-sm flex items-center gap-2 mx-auto lg:mx-0"
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Learn from Experts
            </Badge>

            <p className="text-[clamp(28px,5vw,65px)]  font-bold text-center lg:text-left  text-text1 dark:text-text1-dark">
              {bannerData?.layout?.banner?.title}
              <span className=" text-primary ml-4 border-b-2 border-primary border-dashed  -rotate-5 inline-block ">
                Skill
                <span className="text-text1 dark:text-text1-dark">Stack</span>
              </span>
            </p>
          </div>

          <p className="text-text1 dark:text-text1-dark text-center lg:text-left font-medium text-base sm:text-lg   mx-auto  lg:mx-0 lg:text-lg xl:text-xl  sm:w-2/3 lg:w-4/5 2xl:w-3/4">
            {bannerData?.layout?.banner?.subtitle}
          </p>
          <div className=" flex flex-col  sm:flex-row gap-2 sm:gap-5 justify-center lg:justify-start">
            <Button
              className="text-white text-base lg:text-lg w-full sm:w-auto cursor-pointer hover:bg-primary/90 sm:p-6"
              size="lg"
            >
              <Link href="/courses">Start Learning</Link>
            </Button>
            <Button
              className="text-base lg:text-lg w-full sm:w-auto cursor-pointer hover:bg-surface sm:p-6 dark:bg-surface-dark dark:text-text1-dark dark:hover:bg-surface-dark/80 dark:border-0"
              size="lg"
              variant="outline"
            >
              <Link href="/courses">View Courses</Link>
            </Button>
          </div>
          <SearchInput />
          <div className="flex items-center gap-2 w-full justify-center lg:justify-start">
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2  ">
              <Avatar className="  w-10 h-10">
                <AvatarImage
                  src="/images/client1.webp"
                  alt="John Doe"
                  className="object-cover"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="  w-10 h-10">
                <AvatarImage
                  src="/images/client2.webp"
                  alt="Jane Doe"
                  className="object-cover"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="  w-10 h-10">
                <AvatarImage
                  src="/images/client3.webp"
                  alt="Jane Doe"
                  className="object-cover"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-text2 text-sm font-semibold">
              Trusted by
              <br /> <span className="text-primary">10000+</span> students
            </p>
          </div>
        </div>
        <div className=" max-w-[700px] max-h-[700px] mx-auto">
          <Lottie animationData={animationData} loop={true} autoPlay={true} />
        </div>
      </div>
    </>
  );
};

export default Hero;
