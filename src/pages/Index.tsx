import { HeroSection } from "@/components/HeroSection";
import { StrategyBuilder } from "@/components/StrategyBuilder";
import { Portfolio } from "@/components/Portfolio";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <StrategyBuilder />
      <Portfolio />
    </div>
  );
};

export default Index;