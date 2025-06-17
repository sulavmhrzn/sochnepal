import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFaq from "@/components/contact/ContactFaq";

const Contact = () => {
    return (
        <div className="min-h-screen">
            <ContactHero />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <ContactForm />
                <ContactInfo />
            </div>
            <ContactFaq />
        </div>
    );
};

export default Contact;
