import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/src/shadcn/ui/accordion";

type FaqAccordianProps = {
  id: string | number;
  question: string;
  answer: string;
};

const FaqAccordian = ({ id, question, answer }: FaqAccordianProps) => {
  return (
    <AccordionItem
      value={`faq-${id}`}
      className="rounded-md border dark:border-text2-dark border-text2 bg-surface dark:bg-surface-dark last:!border last:!border-text2 last:dark:!border-text2-dark"
    >
      <AccordionTrigger className="px-6 py-5 text-left text-lg sm:text-xl font-semibold text-text1 dark:text-text1-dark">
        {question}
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 text-text2 dark:text-text2-dark">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FaqAccordian;
