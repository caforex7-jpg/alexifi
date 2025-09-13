import Header from "@/components/layout/header";
import CartItemComponent from "@/components/cart/cart-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLocation } from "wouter";

export default function Cart() {
  const { cartItems, cartTotal, isLoading, clearCart } = useCart();
  const [, setLocation] = useLocation();

  const subtotal = cartTotal;
  const tax = cartTotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    alert("Proceeding to checkout... (This would integrate with a payment processor)");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Shopping Cart</h2>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-6 text-foreground" data-testid="heading-cart">
            Shopping Cart
          </h2>
          
          {/* Empty Cart State */}
          <div className="text-center py-12" data-testid="empty-cart">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2" data-testid="text-empty-title">
              Your cart is empty
            </h3>
            <p className="text-muted-foreground mb-6" data-testid="text-empty-description">
              Add some products to get started
            </p>
            <Button
              onClick={() => setLocation("/")}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-start-shopping"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground" data-testid="heading-cart">
            Shopping Cart
          </h2>
          <Button
            variant="outline"
            onClick={() => clearCart()}
            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            data-testid="button-clear-cart"
          >
            Clear Cart
          </Button>
        </div>
        
        {/* Cart Items */}
        <div className="space-y-4 mb-8" data-testid="cart-items">
          {cartItems.map((item) => (
            <CartItemComponent key={item.id} item={item} />
          ))}
        </div>
        
        {/* Cart Summary */}
        <Card className="bg-card shadow-sm border border-border" data-testid="cart-summary">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground" data-testid="text-subtotal">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground" data-testid="text-shipping">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-foreground" data-testid="text-tax">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground" data-testid="text-total">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full mt-4 bg-accent text-accent-foreground py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
              data-testid="button-checkout"
            >
              Proceed to Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
