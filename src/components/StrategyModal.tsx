import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  Shield, 
  Globe, 
  Zap, 
  Settings, 
  Pause, 
  Play,
  RotateCcw,
  ExternalLink 
} from "lucide-react";

interface Strategy {
  name: string;
  value: string;
  yield: string;
  apy: string;
  risk: string;
  chains: string[];
  status: string;
  modules: string[];
}

interface StrategyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  strategy: Strategy | null;
  mode: 'view' | 'configure';
}

export const StrategyModal = ({ open, onOpenChange, strategy, mode }: StrategyModalProps) => {
  if (!strategy) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-gradient-card border-primary/20 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              {strategy.name}
            </div>
            <Badge className={getStatusColor(strategy.status)}>
              {strategy.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {mode === 'view' ? 'Strategy performance and details' : 'Configure strategy settings'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Performance Overview */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-gradient-success border-success/20">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-success-foreground">{strategy.value}</div>
                <div className="text-xs text-success-foreground/80">Total Value</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-primary border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-primary-foreground">{strategy.yield}</div>
                <div className="text-xs text-primary-foreground/80">Total Yield</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-accent border-accent/20">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-accent-foreground">{strategy.apy}</div>
                <div className="text-xs text-accent-foreground/80">Current APY</div>
              </CardContent>
            </Card>
          </div>

          {/* Strategy Details */}
          <Card className="bg-background/50 border-border/20">
            <CardHeader>
              <CardTitle className="text-lg">Strategy Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Risk Level</span>
                <span className={`font-medium ${getRiskColor(strategy.risk)}`}>{strategy.risk}</span>
              </div>
              
              <Separator />
              
              <div>
                <span className="text-muted-foreground block mb-2">Active Chains</span>
                <div className="flex gap-2 flex-wrap">
                  {strategy.chains.map(chain => (
                    <Badge key={chain} variant="outline" className="text-xs">
                      <Globe className="w-3 h-3 mr-1" />
                      {chain}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <span className="text-muted-foreground block mb-2">ADO Modules</span>
                <div className="grid grid-cols-2 gap-2">
                  {strategy.modules.map(module => (
                    <Badge key={module} className="text-xs bg-primary/10 text-primary border-primary/20 justify-center">
                      {module}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            {mode === 'view' ? (
              <>
                <Button variant="glow" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Explorer
                </Button>
                <Button variant="outline" className="flex-1">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline">
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Strategy
                </Button>
                <Button variant="hero">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Rebalance Now
                </Button>
                <Button variant="success">
                  <Play className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </>
            )}
          </div>

          {/* AI Insights */}
          <Card className="bg-accent/10 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-accent mb-2">
                <Zap className="w-4 h-4" />
                <span className="font-medium">AI Insight</span>
              </div>
              <p className="text-sm text-muted-foreground">
                This strategy is performing above average. Consider increasing allocation 
                or duplicating the strategy across additional chains for higher returns.
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};