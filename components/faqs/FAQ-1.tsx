"use client";
import React, { useState } from "react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  const faq = [
    {
      question: "What is the purpose of this platform?",
      answer:
        "This platform is designed to provide users with a seamless experience in managing their tasks and improving productivity.",
    },
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking on the 'Sign Up' button on the homepage and following the instructions.",
    },
    {
      question: "What are the system requirements for this platform?",
      answer:
        "Our platform is web-based and can be accessed from any device with an internet connection and a modern web browser.",
    },
    {
      question: "How can I reset my password?",
      answer:
        "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we prioritize user data security and have implemented robust security measures to protect your information.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact our customer support team via the 'Contact Us' page or by sending an email to support@ourplatform.com.",
    },
    // Add more questions as needed
  ];

  const toggleOpenIndex = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-24">
      <div className="mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8 relative lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="font-bold text-sm text-accent">FAQ</p>
          <h2
            id="faq-title"
            className="text-3xl font-semibold leading-tight tracking-tight text-base-primary"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-4 leading-7 text-base-primary">
            Here you'll find answers to common questions about our company.
          </p>
        </div>
        <div className="lg:col-span-1"></div>
        <ul className="mt-10 space-y-4 sm:space-y-0 sm:divide-y sm:divide-base-200 lg:col-span-7 lg:-mt-6">
          {faq.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => toggleOpenIndex(index)}
                className="relative flex gap-2 items-center w-full py-5 text-base font-medium text-left border-t md:text-lg border-base-content/10"
                type="button"
              >
                <span>{item.question}</span>
                <svg
                  className={`flex-shrink-0 w-4 h-4 ml-auto ${
                    openIndex === index ? "" : "rotate-90"
                  } text-base-primary`}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor" // This uses the current text color for the fill color.
                >
                  <rect y="7" width="16" height="2" rx="1"></rect>
                  <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    transform={`rotate(${
                      openIndex === index ? "0" : "90"
                    } 8 8)`}
                  ></rect>
                </svg>
              </button>
              <div
                className="px-4 text-base-primary transition-all duration-300 ease-in-out overflow-hidden"
                style={{
                  maxHeight: openIndex === index ? "100%" : "0px",
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <div className="leading-relaxed pb-4">{item.answer}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
