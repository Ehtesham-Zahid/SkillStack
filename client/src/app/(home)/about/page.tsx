import Heading from "@/src/utils/Heading";
import AboutSection from "@/src/components/features/about/AboutSection";

const page = () => {
  return (
    <>
      <Heading
        title="SkillStack | About Us"
        description="Learn about SkillStack's mission to democratize education through quality online courses and expert instruction"
        keywords="About SkillStack, Online Education, Learning Platform, Our Mission, Educational Technology, Online Learning"
      />
      <div>
        <AboutSection />
      </div>
    </>
  );
};

export default page;
