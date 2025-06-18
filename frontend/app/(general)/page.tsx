import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import HowItWorksSection from "@/components/home/HowItworksSection";
import HomeCta from "@/components/home/HomeCta";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <StatsSection />
            <HowItWorksSection />
            <HomeCta />
        </div>
    );
};

export default Home;
