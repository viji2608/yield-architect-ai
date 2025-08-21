import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StrategyModal } from "@/components/StrategyModal";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Shield, 
  Globe,
  Zap,
  Eye,
  Settings,
  BarChart3,
  PieChart
} from "lucide-react";

const portfolioData = {
  totalValue: "$47,523.67",
  totalYield: "+$3,247.89",
  yieldPercentage: "+7.33%",
  activeStrategies: 5,
  chains: ["Cosmos", "Osmosis", "Terra", "Juno"],
  strategies: [
    {
      name: "Conservative Staking Pool",
      value: "$15,420.00",
      yield: "+$892.34",
      apy: "12.4%",
      risk: "Low",
      chains: ["Cosmos", "Osmosis"],
      status: "Active",
      modules: ["CW20", "Staking", "Splitter"]
    },
    {
      name: "Multi-Chain Liquidity",
      value: "$18,750.50", 
      yield: "+$1,234.56",
      apy: "15.8%",
      risk: "Medium",
      chains: ["Terra", "Juno"],
      status: "Rebalancing",
      modules: ["Vault", "Weighted Distribution", "Auction"]
    },
    {
      name: "AI Yield Optimizer",
      value: "$13,353.17",
      yield: "+$1,120.99",
      apy: "18.2%",
      risk: "Medium-High",
      chains: ["Cosmos", "Terra", "Osmosis"],
      status: "Active",
      modules: ["CW20", "Conditional Splitter", "Crowdfund v2.0"]
    }
  ]
};

export const Portfolio = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<typeof portfolioData.strategies[0] | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'configure'>('view');
  const [isApplyingRecommendations, setIsApplyingRecommendations] = useState(false);
  const { toast } = useToast();

  const handleViewStrategy = (strategy: typeof portfolioData.strategies[0]) => {
    setSelectedStrategy(strategy);
    setModalMode('view');
    setModalOpen(true);
  };

  const handleConfigureStrategy = (strategy: typeof portfolioData.strategies[0]) => {
    setSelectedStrategy(strategy);
    setModalMode('configure');
    setModalOpen(true);
  };

  const handleApplyRecommendations = async () => {
    setIsApplyingRecommendations(true);
    
    // Simulate applying AI recommendations
    setTimeout(() => {
      setIsApplyingRecommendations(false);
      toast({
        title: "AI Recommendations Applied! 🤖✨",
        description: "Your portfolio has been optimized for better performance",
      });
    }, 3000);
  };
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-success";
      case "Medium": return "text-warning";
      case "Medium-High": return "text-warning";
      case "High": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success/20 text-success border-success/20";
      case "Rebalancing": return "bg-warning/20 text-warning border-warning/20";
      case "Paused": return "bg-muted text-muted-foreground border-border";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div id="portfolio-dashboard" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-accent text-accent-foreground border-0">
            <Activity className="w-4 h-4 mr-2" />
            Live Portfolio Dashboard
          </Badge>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
            Your DeFi Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time tracking of your AI-managed cross-chain yield strategies
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-card border-success/20 shadow-glow-success">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold text-success mb-1">{portfolioData.totalValue}</div>
              <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-primary/20 shadow-glow-primary">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">{portfolioData.totalYield}</div>
              <div className="text-sm text-muted-foreground">Total Yield Generated</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20 shadow-glow-accent">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-accent mb-1">{portfolioData.yieldPercentage}</div>
              <div className="text-sm text-muted-foreground">Average APY</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-warning/20">
            <CardContent className="p-6 text-center">
              <Globe className="w-8 h-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold text-warning mb-1">{portfolioData.activeStrategies}</div>
              <div className="text-sm text-muted-foreground">Active Strategies</div>
            </CardContent>
          </Card>
        </div>

        {/* Strategy Cards */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {portfolioData.strategies.map((strategy, index) => (
            <Card key={index} className="bg-gradient-card border-border/20 shadow-elegant hover:shadow-card transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{strategy.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {strategy.modules.length} ADO modules active
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(strategy.status)}>
                    {strategy.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Value & Yield */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">{strategy.value}</div>
                    <div className="text-success text-sm font-medium">{strategy.yield} ({strategy.apy})</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Risk Level</div>
                    <div className={`font-medium ${getRiskColor(strategy.risk)}`}>{strategy.risk}</div>
                  </div>
                </div>

                {/* Chains */}
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Active Chains</div>
                  <div className="flex gap-2 flex-wrap">
                    {strategy.chains.map(chain => (
                      <Badge key={chain} variant="outline" className="text-xs">
                        {chain}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* ADO Modules */}
                <div>
                  <div className="text-sm text-muted-foreground mb-2">ADO Modules</div>
                  <div className="flex gap-2 flex-wrap">
                    {strategy.modules.map(module => (
                      <Badge key={module} className="text-xs bg-primary/10 text-primary border-primary/20">
                        {module}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="glow" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewStrategy(strategy)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleConfigureStrategy(strategy)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Insights Panel */}
        <Card className="bg-gradient-card border-primary/20 shadow-glow-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-primary" />
              AI Portfolio Insights
            </CardTitle>
            <CardDescription>
              Real-time analysis and optimization recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-success mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">Optimization Found</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Rebalancing Conservative Pool could increase APY by 2.1%
                </p>
              </div>
              
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-warning mb-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Risk Alert</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Consider diversifying Terra exposure across more chains
                </p>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">New Opportunity</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Neutron chain integration available - 16.5% APY potential
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button 
                variant="ai" 
                size="lg"
                onClick={handleApplyRecommendations}
                disabled={isApplyingRecommendations}
              >
                {isApplyingRecommendations ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent-foreground mr-2"></div>
                    Applying Recommendations...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Apply AI Recommendations
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <StrategyModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        strategy={selectedStrategy}
        mode={modalMode}
      />
    </div>
  );
};