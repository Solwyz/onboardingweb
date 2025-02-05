import React, { useState } from "react";
import arrowUp from "../../../Assets/HrTas/Help/arrowUp.svg";
import arrowDown from "../../../Assets/HrTas/Help/arrowDown.svg";

function HelpPage() {
  const [open, setOpen] = useState(null);

  const toggleAccordion = (index) => {
    setOpen(open === index ? null : index); // Toggle open/close
  };

  const faqs = [
    {
      question: "How does the pharmacy application manage prescriptions?",
      answer:
        "The pharmacy application enables digital prescription management by allowing customers to upload prescriptions, which pharmacists can verify and process. It cross-checks prescribed medicines against available stock and provides alternative recommendations if necessary. The system ensures compliance with drug regulations, prevents dispensing errors, and maintains records for future reference. Additionally, it can integrate with doctors’ systems for e-prescription processing.",
    },
    {
      question:
        "How does the pharmacy application handle inventory management?",
      answer:
        "The system continuously tracks stock levels, automatically updates quantities upon sales, and alerts pharmacists when stock is running low or nearing expiry. It helps prevent overstocking and stockouts by predicting demand based on past sales data. Additionally, it manages supplier orders, tracks batch numbers, and ensures medicines are stored within their recommended shelf life.",
    },
    {
      question:
        "How does the pharmacy application ensure drug safety and compliance?",
      answer:
        "The system includes a built-in drug database that checks for potential interactions, contraindications, and dosage limits before dispensing medicines. It complies with healthcare regulations such as HIPAA, FDA, and local pharmacy licensing rules. Pharmacists receive alerts for restricted drugs, ensuring controlled substances are dispensed only with proper authorization.",
    },
    {
      question:
        "Can the pharmacy application manage customer records and health data?",
      answer:
        "Yes, it maintains customer profiles, including purchase history, medical conditions, allergies, and prescription details. This data helps pharmacists provide personalized recommendations and ensure safe medication use. The application follows strict data security protocols, ensuring patient confidentiality and regulatory compliance.",
    },
  ];

  return (
    <div className="p-6">
      <div className="w-full bg-white h-[860px] p-6">
        {/* FAQ Section */}
        <h2 className="text-[16px] text-[#373737] font-medium mt-[40px]">
          Frequently Asked Questions
        </h2>

        <div className="mt-[24px]">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-[#B9B9B9]">
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full py-4 text-left text-[#373737] text-[16px] font-light focus:outline-none"
              >
                <span>{faq.question}</span>
                <img
                  src={open === index ? arrowUp : arrowDown}
                  alt="Toggle Icon"
                  className="w-4 h-4"
                />
              </button>
              <div
                className={`overflow-hidden transition-max-height duration-300 ${
                  open === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <p className="text-[#373737] font-light text-[16px] py-2">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-12">
          <h3 className="text-base font-medium text-[#373737]">
            Need More Help?
          </h3>
          <p className="text-sm text-[#373737] font-normal mt-2">
            Contact us for any additional questions or support regarding our
            products.
          </p>
          <div className="mt-2">
            <a
              href="mailto:medocpharmacy24@gmail.com"
              className="text-base hover:text-[#2B2342] font-medium text-[#373737]"
            >
              medocpharmacy24@gmail.com
            </a>
          </div>
          {/* <button className="bg-[#2B2342]  item-center w-[142px] h-[48px] font-normal text-sm mt-[24px] text-white px-8 py-4 rounded-lg">
            Contact Us
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
