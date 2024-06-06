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
    {
        question: "How is palliative care different from curative treatment?",
        answer: "While curative treatment aims to cure the underlying illness, palliative care focuses on improving quality of life by managing symptoms, relieving pain, and addressing emotional and spiritual needs. Palliative care can be provided alongside curative treatment.",
      },
      {
        question: "Who provides palliative care?",
        answer: "Palliative care is provided by a multidisciplinary team of healthcare professionals, which may include doctors, nurses, social workers, chaplains, and other specialists, depending on the needs of the patient.",
      },
      {
        question: "Can I receive palliative care in a hospital or nursing facility?",
        answer: "Yes, palliative care can be provided in various settings, including hospitals, nursing homes, assisted living facilities, and hospice centers. The location of care depends on the patient's preferences and needs.",
      },
      {
        question: "What if I change my mind about palliative care?",
        answer: "Patients have the right to change their mind about palliative care at any time. You can discuss your preferences with your healthcare provider and make adjustments to your care plan accordingly.",
      },
      {
        question: "How does palliative care support caregivers and family members?",
        answer: "Palliative care not only focuses on the patient but also provides support and resources to caregivers and family members. This may include counseling, education, and assistance with navigating the healthcare system.",
      },
      {
        question: "Are there any limitations to palliative care?",
        answer: "While palliative care aims to improve quality of life, it does not guarantee a cure or prevent disease progression. The focus is on managing symptoms and addressing holistic needs to enhance comfort and well-being.",
      },
      {
        question: "What types of services are typically offered in palliative care?",
        answer: "Palliative care services often include pain management, symptom relief, emotional support, and assistance with making medical decisions.",
      },
      {
        question: "Is palliative care the same as hospice care?",
        answer: "While both palliative care and hospice care focus on improving the quality of life for patients with serious illnesses, palliative care can be provided at any stage of illness and alongside curative treatment, whereas hospice care is typically provided to patients with a terminal illness with a prognosis of six months or less to live.",
      },
      {
        question: "Do I need a referral from my doctor to receive palliative care?",
        answer: "In many cases, a referral from your primary care physician or specialist is required to initiate palliative care services. However, you can also inquire directly with palliative care providers to understand their specific requirements.",
      },
      {
        question: "Are palliative care services covered by insurance?",
        answer: "Many insurance plans, including Medicare and Medicaid, cover palliative care services. It's advisable to check with your insurance provider to understand the extent of coverage and any potential out-of-pocket costs.",
      },
      {
        question: "Can I receive palliative care at home?",
        answer: "Yes, palliative care can often be provided in the comfort of your own home, depending on your specific needs and circumstances. Home-based palliative care services may include visits from nurses, social workers, and other healthcare professionals.",
      },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="">
  <Header title={'Frequently Asked Questions'}></Header>

      <div className="px-2 pt-20 mb-3 mt-10">
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
