import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Globe, TrendingUp, ShieldCheck, Cpu } from "lucide-react";
import { WalletModal } from "@/components/WalletModal";
import { useScrollTo } from "@/hooks/useScrollTo";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-ai-defi.jpg";

export const HeroSection = () => {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const { scrollToElement } = useScrollTo();
  const { toast } = useToast();

  const handleLaunchApp = () => {
    scrollToElement('strategy-builder');
    toast({
      title: "Welcome to AI Yield Architect! 🚀",
      description: "Start building your DeFi strategy below",
    });
  };

  const handleViewDemo = () => {
    scrollToElement('portfolio-dashboard');
    toast({
      title: "Live Portfolio Demo 📊",
      description: "Explore our real-time portfolio tracking",
    });
  };
  return (
    <div className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full animate-float"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Navigation Header */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <Brain className="w-10 h-10 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Yield Architect
            </h1>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="glow" 
              size="sm"
              onClick={() => setWalletModalOpen(true)}
            >
              Connect Wallet
            </Button>
            <Button 
              variant="hero" 
              size="sm"
              onClick={handleLaunchApp}
            >
              Launch App
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="text-center max-w-6xl mx-auto">
          <Badge className="mb-6 bg-gradient-accent text-accent-foreground border-0 px-6 py-2">
            <Cpu className="w-4 h-4 mr-2" />
            Powered by Andromeda ADO + aOS
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
            Automated Cross-Chain
            <br />
            DeFi Strategy Builder
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            AI-powered DeFi strategy creation using modular ADOs. Describe your financial goals, 
            and our AI builds, deploys, and rebalances cross-chain yield strategies automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => scrollToElement('strategy-builder')}
            >
              <Brain className="w-5 h-5 mr-2" />
              Start Building Strategies
            </Button>
            <Button 
              variant="glow" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={handleViewDemo}
            >
              <Zap className="w-5 h-5 mr-2" />
              View Live Demo
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: TrendingUp, label: "Total Value Locked", value: "$12.5M" },
              { icon: Globe, label: "Chains Supported", value: "15+" },
              { icon: ShieldCheck, label: "Strategies Active", value: "2,847" },
              { icon: Zap, label: "Auto Rebalances", value: "50K+" }
            ].map((stat, index) => (
              <Card key={index} className="bg-gradient-card border-border/20 shadow-card">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Features Showcase */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-primary/20 shadow-glow-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-primary" />
                  AI Strategy Engine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Describe your goals and risk tolerance. Our AI suggests optimal ADO combinations 
                  for maximum yield generation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-accent/20 shadow-glow-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-accent" />
                  Cross-Chain Deployment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Seamless deployment across 15+ chains using Pulsar. 
                  No gas fees, automated execution via aOS workflows.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-success/20 shadow-glow-success">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-success" />
                  Auto Rebalancing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI monitors market conditions 24/7 and automatically rebalances 
                  your strategies for optimal performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <WalletModal 
        open={walletModalOpen}
        onOpenChange={setWalletModalOpen}
      />
    </div>
  );
};