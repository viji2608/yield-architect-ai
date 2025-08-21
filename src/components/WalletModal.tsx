import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, CheckCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const wallets = [
  {
    name: "Keplr Wallet",
    description: "The most popular Cosmos wallet",
    icon: "🔗",
    supported: true
  },
  {
    name: "Leap Wallet", 
    description: "Fast & secure Cosmos wallet",
    icon: "🦘",
    supported: true
  },
  {
    name: "Cosmostation",
    description: "Multi-chain Cosmos wallet",
    icon: "🚀", 
    supported: true
  },
  {
    name: "MetaMask",
    description: "Popular Ethereum wallet (via IBC)",
    icon: "🦊",
    supported: false
  }
];

export const WalletModal = ({ open, onOpenChange }: WalletModalProps) => {
  const [connecting, setConnecting] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnect = async (walletName: string) => {
    setConnecting(walletName);
    
    // Simulate wallet connection
    setTimeout(() => {
      setConnecting(null);
      onOpenChange(false);
      toast({
        title: "Wallet Connected! 🎉",
        description: `Successfully connected to ${walletName}`,
      });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Wallet className="w-6 h-6 text-primary" />
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to AI Yield Architect
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <Card 
              key={wallet.name}
              className={`cursor-pointer transition-all hover:shadow-card ${
                !wallet.supported ? 'opacity-50' : ''
              } ${connecting === wallet.name ? 'border-primary shadow-glow-primary' : ''}`}
              onClick={() => wallet.supported && !connecting && handleConnect(wallet.name)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{wallet.icon}</span>
                  <div>
                    <div className="font-medium">{wallet.name}</div>
                    <div className="text-sm text-muted-foreground">{wallet.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {wallet.supported ? (
                    connecting === wallet.name ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                    ) : (
                      <CheckCircle className="w-5 h-5 text-success" />
                    )
                  ) : (
                    <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground mb-3">
            New to Cosmos wallets?
          </p>
          <Button variant="link" size="sm" className="text-primary">
            <ExternalLink className="w-4 h-4 mr-2" />
            Learn about Cosmos wallets
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};