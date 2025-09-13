import { Home, Grid3X3, ShoppingCart, BookOpen, User } from "lucide-react";
import { useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Grid3X3, label: "Categories", path: "/categories" },
  { icon: ShoppingCart, label: "Cart", path: "/cart" },
  { icon: BookOpen, label: "Blog", path: "/blog" },
  { icon: User, label: "Account", path: "/account" },
];

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();
  const { cartCount } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card shadow-lg border-t border-border z-50" data-testid="bottom-navigation">
      <div className="flex justify-around py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location === path;
          const isCart = label === "Cart";
          
          return (
            <button
              key={path}
              onClick={() => setLocation(path)}
              className={`flex flex-col items-center py-2 px-4 relative transition-colors ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              }`}
              data-testid={`nav-${label.toLowerCase()}`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{label}</span>
              {isCart && cartCount > 0 && (
                <span 
                  className="absolute top-0 right-2 bg-accent text-accent-foreground text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
                  data-testid="cart-badge"
                >
                  {cartCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
