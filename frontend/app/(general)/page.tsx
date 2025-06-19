import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import HowItWorksSection from "@/components/home/HowItworksSection";
import HomeCta from "@/components/home/HomeCta";

const Home = () => {
    return (
        <div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 pb-16">
                <HeroSection />
                <StatsSection />
            </div>
            <HowItWorksSection />
            <HomeCta />
        </div>
    );
};

export default Home;
