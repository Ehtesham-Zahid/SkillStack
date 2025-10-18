import { Card, CardContent } from "@/src/shadcn/ui/card";
import {
  Shield,
  Database,
  UserCheck,
  CheckCircle2,
  Eye,
  Settings,
  Mail,
  Globe,
} from "lucide-react";

const PolicySection = () => {
  const policyData = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "What We Collect",
      items: [
        "Personal details (name, email, etc.)",
        "Course progress and feedback",
        "Internet Protocol (IP) info",
      ],
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "How We Use It",
      items: [
        "To deliver and improve your learning experience",
        "To personalize content and recommendations",
        "To keep you informed and supported",
      ],
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Your Data, Protected",
      items: [
        "Secure storage, never sold to third parties",
        "Industry-standard security measures",
      ],
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Your Rights",
      items: [
        "Access, update, or delete your info anytime",
        "Contact us for privacy questions",
      ],
    },
  ];

  return (
    <section className="overflow-hidden py-16 w-11/12 lg:w-11/12 2xl:w-5/6 mx-auto">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-[clamp(28px,5vw,52px)] font-extrabold tracking-tight text-primary dark:text-primary-dark">
          Privacy{" "}
          <span className="text-text1 dark:text-text1-dark">Policy</span>
        </h1>
        <p className="mt-4 text-text2 dark:text-text2-dark text-base sm:text-lg">
          We value your privacy. Here&apos;s how{" "}
          <span className="text-primary dark:text-primary-dark font-semibold">
            Skill<span className="text-text1 dark:text-text1-dark">Stack</span>
          </span>{" "}
          protects your data and respects your rights as a learner.
        </p>
      </div>

      {/* Policy Cards Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 max-w-6xl mx-auto">
        {policyData.map((section, index) => (
          <Card
            key={index}
            className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <CardContent className="p-8 flex flex-col items-center text-center gap-6">
              {/* Icon */}
              <div className="h-16 w-16 rounded-xl bg-primary/10 text-primary dark:text-primary-dark flex items-center justify-center">
                {section.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-text1 dark:text-text1-dark">
                {section.title}
              </h3>

              {/* Items List */}
              <div className="space-y-3 w-full">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center gap-3 text-left"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary dark:text-primary-dark flex-shrink-0 mt-0.5" />
                    <p className="text-text2 dark:text-text2-dark text-sm sm:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Privacy Information */}
      <div className="mt-16 px-4">
        <div className="bg-surface/50 dark:bg-surface-dark/50 rounded-2xl p-8 max-w-4xl mx-auto border border-text2/20 dark:border-text2-dark/20">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <Settings className="h-8 w-8 text-primary dark:text-primary-dark" />
              <h3 className="text-2xl font-bold text-text1 dark:text-text1-dark">
                Data Control
              </h3>
            </div>

            <p className="text-text2 dark:text-text2-dark text-base sm:text-lg leading-relaxed">
              You have complete control over your personal information. Update
              your preferences, export your data, or delete your account at any
              time through your profile settings.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-text2 dark:text-text2-dark">
                <Mail className="h-5 w-5" />
                <span>privacy@skillstack.com</span>
              </div>
              <div className="flex items-center gap-2 text-text2 dark:text-text2-dark">
                <Globe className="h-5 w-5" />
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-12 text-center px-4">
        <p className="text-text2 dark:text-text2-dark text-sm max-w-3xl mx-auto leading-relaxed">
          By using{" "}
          <span className="text-primary dark:text-primary-dark font-semibold">
            Skill<span className="text-text1 dark:text-text1-dark">Stack</span>
          </span>
          , you agree to this privacy policy. We may update this policy as
          needed; please check back for changes.
        </p>
      </div>
    </section>
  );
};

export default PolicySection;
