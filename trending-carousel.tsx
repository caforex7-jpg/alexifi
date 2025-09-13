import { useQuery } from "@tanstack/react-query";
import ProductCard from "./product-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

export default function TrendingCarousel() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/trending'],
  });

  if (isLoading) {
    return (
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-44">
              <Skeleton className="h-44 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scrollbar-hide" data-testid="trending-carousel">
      <div className="flex space-x-4 pb-2">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            variant="trending"
          />
        ))}
      </div>
    </div>
  );
}
