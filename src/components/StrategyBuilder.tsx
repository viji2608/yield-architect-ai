import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Coins, 
  Layers, 
  Shuffle, 
  Target, 
  Zap, 
  ArrowRight,
  DollarSign,
  TrendingUp,
  Shield,
  RotateCcw,
  Brain,
  Sparkles
} from "lucide-react";

const adoModules = [
  {
    id: "cw20",
    name: "CW20 Token",
    icon: Coins,
    description: "Create and manage custom tokens",
    category: "Core"
  },
  {
    id: "staking",
    name: "Staking",
    icon: Target,
    description: "Stake tokens for rewards",
    category: "Yield"
  },
  {
    id: "splitter",
    name: "Splitter",
    icon: Shuffle,
    description: "Split funds across multiple strategies",
    category: "Distribution"
  },
  {
    id: "vault",
    name: "Vault",
    icon: Shield,
    description: "Secure asset storage with access controls",
    category: "Security"
  },
  {
    id: "crowdfund",
    name: "Crowdfund v2.0",
    icon: DollarSign,
    description: "Raise funds for DeFi strategies",
    category: "Fundraising"
  },
  {
    id: "auction",
    name: "Auction",
    icon: TrendingUp,
    description: "Automated asset auctions",
    category: "Trading"
  }
];

export const StrategyBuilder = () => {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [userGoal, setUserGoal] = useState("");
  const [riskLevel, setRiskLevel] = useState("medium");
  const [targetInvestment, setTargetInvestment] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const { toast } = useToast();

  const generateAIStrategy = async () => {
    if (!userGoal.trim()) {
      toast({
        title: "Please describe your goal 🎯",
        description: "Tell us about your financial objectives to generate a strategy",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // AI suggests modules based on goal and risk level
      const aiSuggestions = {
        low: ['cw20', 'staking', 'vault'],
        medium: ['cw20', 'staking', 'splitter', 'vault'],
        high: ['cw20', 'splitter', 'auction', 'crowdfund']
      };
      
      setSelectedModules(aiSuggestions[riskLevel as keyof typeof aiSuggestions]);
      setIsGenerating(false);
      
      toast({
        title: "AI Strategy Generated! 🤖✨",
        description: `Created a ${riskLevel}-risk strategy with ${aiSuggestions[riskLevel as keyof typeof aiSuggestions].length} ADO modules`,
      });
    }, 3000);
  };

  const handleDeploy = async () => {
    if (selectedModules.length === 0) {
      toast({
        title: "No modules selected 📋",
        description: "Please select ADO modules or generate an AI strategy first",
        variant: "destructive",
      });
      return;
    }

    setIsDeploying(true);
    
    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false);
      toast({
        title: "Strategy Deployed Successfully! 🚀",
        description: "Your cross-chain DeFi strategy is now live and auto-rebalancing",
      });
    }, 4000);
  };

  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <div id="strategy-builder" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-primary text-primary-foreground border-0">
            <Layers className="w-4 h-4 mr-2" />
            Interactive Strategy Builder
          </Badge>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Build Your DeFi Strategy
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Describe your financial goals and drag ADO modules to create your perfect yield strategy
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* AI Input Panel */}
          <Card className="bg-gradient-card border-primary/20 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-primary" />
                AI Strategy Generator
              </CardTitle>
              <CardDescription>
                Tell us your goals and let our AI suggest the perfect ADO combination
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Financial Goal</label>
                <Textarea
                  placeholder="e.g., I want passive yield with low risk, targeting 8-12% APY across multiple chains..."
                  value={userGoal}
                  onChange={(e) => setUserGoal(e.target.value)}
                  className="min-h-32 bg-background/50 border-border/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Risk Tolerance</label>
                <div className="grid grid-cols-3 gap-3">
                  {["low", "medium", "high"].map(risk => (
                    <Button
                      key={risk}
                      variant={riskLevel === risk ? "hero" : "outline"}
                      size="sm"
                      onClick={() => setRiskLevel(risk)}
                      className="capitalize"
                    >
                      {risk} Risk
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Target Investment</label>
                <Input 
                  placeholder="10,000 USDC" 
                  className="bg-background/50 border-border/20"
                  value={targetInvestment}
                  onChange={(e) => setTargetInvestment(e.target.value)}
                />
              </div>

              <Button 
                variant="ai" 
                className="w-full" 
                size="lg"
                onClick={generateAIStrategy}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent-foreground mr-2"></div>
                    Generating Strategy...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Generate AI Strategy
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* ADO Module Selector */}
          <Card className="bg-gradient-card border-accent/20 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Layers className="w-6 h-6 text-accent" />
                Available ADO Modules
              </CardTitle>
              <CardDescription>
                Drag and drop modules to build your custom strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {adoModules.map(module => {
                  const Icon = module.icon;
                  const isSelected = selectedModules.includes(module.id);
                  
                  return (
                    <Card 
                      key={module.id}
                      className={`cursor-pointer transition-all hover:shadow-card ${
                        isSelected 
                          ? 'bg-gradient-primary border-primary shadow-glow-primary' 
                          : 'bg-secondary/50 border-border/20 hover:border-primary/40'
                      }`}
                      onClick={() => toggleModule(module.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <Icon className={`w-8 h-8 mx-auto mb-2 ${
                          isSelected ? 'text-primary-foreground' : 'text-primary'
                        }`} />
                        <div className={`font-medium mb-1 ${
                          isSelected ? 'text-primary-foreground' : 'text-foreground'
                        }`}>
                          {module.name}
                        </div>
                        <div className={`text-xs ${
                          isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                        }`}>
                          {module.category}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {selectedModules.length > 0 && (
                <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2 text-success mb-2">
                    <Target className="w-4 h-4" />
                    <span className="font-medium">Strategy Preview</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Selected {selectedModules.length} modules for your strategy
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedModules.map(moduleId => {
                      const module = adoModules.find(m => m.id === moduleId);
                      return (
                        <Badge key={moduleId} variant="outline" className="text-xs">
                          {module?.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Deploy Section */}
        {(userGoal || selectedModules.length > 0) && (
          <Card className="mt-12 bg-gradient-card border-success/20 shadow-glow-success">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-success">Ready to Deploy?</h3>
              <p className="text-muted-foreground mb-6">
                Your strategy will be deployed across multiple chains using aOS workflows and Pulsar
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="success" 
                  size="lg"
                  onClick={handleDeploy}
                  disabled={isDeploying}
                >
                  {isDeploying ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-success-foreground mr-2"></div>
                      Deploying Strategy...
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Deploy & Auto-Rebalance
                    </>
                  )}
                </Button>
                <Button variant="glow" size="lg">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View Strategy Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};