import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const ContactFaq = () => {
    const faqs = [
        {
            question: "How do I report a civic issue?",
            answer: "Simply go to our 'Submit Report' page, take a photo of the issue, add location details, and describe the problem. Your report will be visible to the community and relevant authorities.",
        },
        {
            question: "How long does it take to get a response?",
            answer: "We typically respond to contact inquiries within 24-48 hours. For civic issue reports, response times depend on the local authorities and the nature of the issue.",
        },
        {
            question: "Is SochNepal free to use?",
            answer: "Yes! SochNepal is completely free for all citizens. Our mission is to make civic engagement accessible to everyone in Nepal.",
        },
        {
            question: "Can I track the status of my report?",
            answer: "Absolutely! Once you submit a report, you can track its status as it moves from 'pending' to 'in progress' to 'resolved'. You'll also receive updates when there are changes.",
        },
        {
            question: "How can local authorities join the platform?",
            answer: "We work directly with municipalities and local government offices to onboard them to our platform. Contact us if you're representing a local authority interested in joining.",
        },
    ];

    return (
        <div className="bg-white py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Find answers to common questions about SochNepal
                    </p>
                </div>
                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border rounded-lg px-6"
                        >
                            <AccordionTrigger className="text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default ContactFaq;
