import Header from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Settings, 
  LogOut,
  User,
  Mail,
  Phone
} from "lucide-react";

export default function Account() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  };

  const stats = {
    orders: 12,
    wishlist: 8,
    addresses: 3,
    points: 150
  };

  const menuItems = [
    { icon: Package, label: "My Orders", description: "Track your orders", testId: "my-orders" },
    { icon: Heart, label: "Wishlist", description: "Your saved items", testId: "wishlist" },
    { icon: MapPin, label: "Addresses", description: "Manage delivery addresses", testId: "addresses" },
    { icon: CreditCard, label: "Payment Methods", description: "Cards and payment options", testId: "payment-methods" },
    { icon: Settings, label: "Settings", description: "Account preferences", testId: "settings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-6 text-foreground" data-testid="heading-account">
          My Account
        </h2>
        
        {/* User Profile */}
        <Card className="bg-card shadow-sm border border-border mb-6" data-testid="user-profile">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={user.avatar}
                alt="User Avatar"
                className="w-16 h-16 rounded-full object-cover"
                data-testid="img-avatar"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground" data-testid="text-user-name">
                  {user.name}
                </h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Mail className="h-4 w-4" />
                  <span data-testid="text-user-email">{user.email}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Phone className="h-4 w-4" />
                  <span data-testid="text-user-phone">{user.phone}</span>
                </div>
              </div>
            </div>
            <Button 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-edit-profile"
            >
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>
        
        {/* Account Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" data-testid="account-stats">
          <Card className="bg-card shadow-sm border border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1" data-testid="stat-orders">
                {stats.orders}
              </div>
              <div className="text-sm text-muted-foreground">Orders</div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-sm border border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent mb-1" data-testid="stat-wishlist">
                {stats.wishlist}
              </div>
              <div className="text-sm text-muted-foreground">Wishlist</div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-sm border border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1" data-testid="stat-addresses">
                {stats.addresses}
              </div>
              <div className="text-sm text-muted-foreground">Addresses</div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-sm border border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent mb-1" data-testid="stat-points">
                {stats.points}
              </div>
              <div className="text-sm text-muted-foreground">Points</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Account Menu */}
        <div className="space-y-3" data-testid="account-menu">
          {menuItems.map((item) => (
            <Card 
              key={item.testId}
              className="bg-card shadow-sm border border-border cursor-pointer hover:bg-secondary transition-colors"
            >
              <CardContent className="p-4">
                <button 
                  className="w-full text-left flex items-center justify-between"
                  data-testid={`button-${item.testId}`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-foreground font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                  <div className="text-muted-foreground">
                    →
                  </div>
                </button>
              </CardContent>
            </Card>
          ))}
          
          {/* Logout Button */}
          <Card className="bg-card shadow-sm border border-border cursor-pointer hover:bg-destructive/10 transition-colors">
            <CardContent className="p-4">
              <button 
                className="w-full text-left flex items-center justify-between"
                data-testid="button-logout"
              >
                <div className="flex items-center space-x-3">
                  <LogOut className="h-5 w-5 text-destructive" />
                  <div>
                    <div className="text-destructive font-medium">Logout</div>
                    <div className="text-sm text-muted-foreground">Sign out of your account</div>
                  </div>
                </div>
                <div className="text-muted-foreground">
                  →
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
