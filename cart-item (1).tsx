import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import type { CartItem, Product } from "@shared/schema";

interface CartItemProps {
  item: CartItem & { product: Product };
}

export default function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, isUpdating, isRemoving } = useCart();

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity({ id: item.id, quantity: newQuantity });
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const totalPrice = (parseFloat(item.product.price) * item.quantity).toFixed(2);

  return (
    <Card className="bg-card shadow-sm border border-border" data-testid={`cart-item-${item.id}`}>
      <CardContent className="p-4 flex items-center space-x-4">
        <img 
          src={`${item.product.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100`}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded-md"
          data-testid={`img-cart-item-${item.id}`}
        />
        <div className="flex-1">
          <h3 className="font-medium text-foreground" data-testid={`text-name-${item.id}`}>
            {item.product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-1" data-testid={`text-description-${item.id}`}>
            {item.product.description}
          </p>
          <p className="text-primary font-semibold" data-testid={`text-price-${item.id}`}>
            ${item.product.price} × {item.quantity} = ${totalPrice}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-secondary rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
              className="p-2 text-foreground hover:bg-muted rounded-l-lg"
              data-testid={`button-decrease-${item.id}`}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span 
              className="px-3 py-2 text-foreground font-medium min-w-[2rem] text-center"
              data-testid={`text-quantity-${item.id}`}
            >
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              disabled={isUpdating}
              className="p-2 text-foreground hover:bg-muted rounded-r-lg"
              data-testid={`button-increase-${item.id}`}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={isRemoving}
            className="p-2 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors"
            data-testid={`button-remove-${item.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
