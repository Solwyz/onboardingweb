import React, { useState } from 'react';
import arrowUp from '../../../Assets/HrTas/Help/arrowUp.svg'
import arrowDown from '../../../Assets/HrTas/Help/arrowDown.svg'


function HelpPage() {
    const [open, setOpen] = useState(null);

    const toggleAccordion = (index) => {
        setOpen(open === index ? null : index); // Toggle open/close
    };

    const faqs = [
        {
            question: "What is Lorem Ipsum?",
            answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        },
        {
            question: "Why do we use it?",
            answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        },
        {
            question: "Where does it come from?",
            answer: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
        },
        {
            question: "Where can I get some?",
            answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
        },
    ];

    return (
        <div className="p-6">
            <div className="w-full bg-white h-[860px] p-6">
                {/* FAQ Section */}
                <h2 className="text-[16px] text-[#373737] font-medium mt-[40px]">Frequently Asked Questions</h2>

                <div className="mt-[24px]">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-[#B9B9B9]">
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="flex justify-between items-center w-full py-4 text-left text-[#373737] text-[16px] font-light focus:outline-none"
                            >
                                <span>{faq.question}</span>
                                <img src={open === index ? arrowUp : arrowDown} alt="Toggle Icon" className="w-4 h-4" />
                            </button>
                            <div className={`overflow-hidden transition-max-height duration-300 ${open === index ? 'max-h-40' : 'max-h-0'}`}>
                                <p className="text-[#373737] font-light text-[16px] py-2">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Help Section */}
                <div className="mt-12">
                    <h3 className="text-base font-medium text-[#373737]">Need More Help?</h3>
                    <p className="text-sm text-[#373737] font-normal mt-2">Contact us for any additional questions or support regarding our products.</p>
                    <button className="bg-[#2B2342]  item-center w-[142px] h-[48px] font-normal text-sm mt-[24px] text-white px-8 py-4 rounded-lg">
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HelpPage;
