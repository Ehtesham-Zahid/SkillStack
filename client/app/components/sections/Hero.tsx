import { Button } from "@/app/shadcn/ui/button";
import SearchInput from "../SearchInput";
import { Avatar, AvatarImage, AvatarFallback } from "@/app/shadcn/ui/avatar";
import { ArrowRightIcon } from "lucide-react";

const Hero = () => {
  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="flex flex-col gap-5 mt-10">
        <p className="text-3xl font-black text-center lg:text-left">
          Master Top Notch Skills from{" "}
          <span className="text-primary border-b-2 border-primary border-dashed  -rotate-5 inline-block ">
            Skill<span className="text-black">Stack</span>
          </span>
        </p>
        <p className="text-text1 text-center lg:text-left font-medium">
          Learn from experts and build real-world projects. Start your learning
          journey today with our modern LMS platform.
        </p>
        <Button className="text-white text-base" size="lg">
          Start Learning
        </Button>
        <Button className="text-base" size="lg" variant="outline">
          View Courses
        </Button>
        <SearchInput />
        <div className="flex items-center gap-2 w-full justify-center">
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
    </div>
  );
};

export default Hero;
