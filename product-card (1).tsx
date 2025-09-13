import { ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "trending";
}

export default function ProductCard({ product, variant = "grid" }: ProductCardProps) {
  const { addToCart, isAddingToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ productId: product.id });
  };

  if (variant === "trending") {
    return (
      <Card className="flex-shrink-0 w-44 bg-card shadow-sm border border-border" data-testid={`card-product-${product.id}`}>
        <CardContent className="p-3">
          <img 
            src={`${product.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300`}
            alt={product.name}
            className="w-full h-32 object-cover rounded-md mb-2"
            data-testid={`img-product-${product.id}`}
          />
          <h3 className="font-medium text-sm text-foreground mb-1" data-testid={`text-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-primary font-semibold text-sm mb-2" data-testid={`text-price-${product.id}`}>
            ${product.price}
          </p>
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full bg-accent text-accent-foreground py-1.5 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
            data-testid={`button-add-cart-${product.id}`}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card shadow-sm border border-border overflow-hidden" data-testid={`card-product-${product.id}`}>
      <img 
        src={`${product.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300`}
        alt={product.name}
        className="w-full h-40 object-cover"
        data-testid={`img-product-${product.id}`}
      />
      <CardContent className="p-3">
        <h3 className="font-medium text-sm text-foreground mb-1" data-testid={`text-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-2" data-testid={`text-description-${product.id}`}>
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-semibold" data-testid={`text-price-${product.id}`}>
            ${product.price}
          </span>
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            size="sm"
            className="bg-accent text-accent-foreground p-2 rounded-md hover:bg-accent/90 transition-colors"
            data-testid={`button-add-cart-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
