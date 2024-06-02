import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import Header from "../components/hearder";
const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is palliative care?",
      answer: "Palliative care is specialized medical care focused on providing relief from the symptoms and stress of a serious illness.",
    },
    {
      question: "Who can benefit from palliative care?",
      answer: "Anyone with a serious illness, regardless of age or stage of the illness, can benefit from palliative care.",
    },
    {
      question: "How can I access palliative care services?",
      answer: "You can access our services by contacting us through our website or calling our support line.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="">
  <Header title={'Frequently Asked Questions'}></Header>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b-2 border-gray-200 pb-2 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <Typography
              variant="h6"
              className="flex justify-between items-center"
            >
              {faq.question}
              <span>
                {openIndex === index ? "-" : "+"}
              </span>
            </Typography>
            <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${openIndex === index ? "max-h-40" : "max-h-0"}`}>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
