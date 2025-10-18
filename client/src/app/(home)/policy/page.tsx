import Heading from "@/src/utils/Heading";
import PolicySection from "@/src/components/features/policy/PolicySection";

const page = () => {
  return (
    <>
      <Heading
        title="SkillStack | Privacy Policy & Terms"
        description="Read SkillStack's privacy policy, terms of service, and user agreement to understand your rights and our commitment to your data"
        keywords="Privacy Policy, Terms of Service, User Agreement, Data Protection, Legal Terms, SkillStack Policies"
      />
      <div>
        <PolicySection />
      </div>
    </>
  );
};

export default page;
