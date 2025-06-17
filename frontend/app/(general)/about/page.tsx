import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import OurStory from "@/components/about/OurStory";
import OurValues from "@/components/about/OurValues";
import TeamSection from "@/components/about/TeamSection";
import AboutCta from "@/components/about/AboutCta";

const About = () => {
    return (
        <div className="min-h-screen">
            <AboutHero />
            <MissionVision />
            <OurStory />
            <OurValues />
            <TeamSection />
            <AboutCta />
        </div>
    );
};

export default About;
