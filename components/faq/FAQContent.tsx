"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQContent() {
  return (
    <section className="max-w-screen-md mx-auto px-4 md:px-8 py-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is the Million Pixel Wall?</AccordionTrigger>
          <AccordionContent>
            The Million Pixel Wall is a digital canvas where you can buy and own pixels. You upload an image, add a message, and your pixel becomes part of internet history.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How much does it cost to buy pixels?</AccordionTrigger>
          <AccordionContent>
            Each pixel costs $1. The minimum purchase is 10 pixels, and you can purchase them in a grid of your chosen size.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What kind of content is allowed?</AccordionTrigger>
          <AccordionContent>
            No offensive, hateful, or inappropriate content is allowed. All pixels are moderated, and users can report problematic pixels for review.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Can I edit or delete my pixel later?</AccordionTrigger>
          <AccordionContent>
            No. Once your pixel is purchased, it becomes a permanent part of the wall. Please double-check your content before confirming the purchase.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>How can I contact the admin?</AccordionTrigger>
          <AccordionContent>
            You can reach us via the contact link in the footer or through our official social media accounts.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
