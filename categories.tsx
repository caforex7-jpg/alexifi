import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import ProductCard from "@/components/product/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import type { Category, Product } from "@shared/schema";

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const categoryProducts = selectedCategory === "All Categories" 
    ? products.slice(0, 6) // Show trending products when "All" is selected
    : products.filter(p => p.category === selectedCategory);

  const categoryList = [
    { id: "all", name: "All Categories", description: "", image: "", itemCount: products.length },
    ...categories
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <div className="w-1/3 bg-card border-r border-border p-4 overflow-y-auto" data-testid="categories-sidebar">
          <h2 className="font-semibold mb-4 text-foreground" data-testid="heading-categories">Categories</h2>
          <ul className="space-y-2">
            {categoriesLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <li key={i}>
                  <Skeleton className="h-10 w-full rounded-md" />
                </li>
              ))
            ) : (
              categoryList.map((category) => (
                <li key={category.id || category.name}>
                  <button
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                      selectedCategory === category.name
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary text-foreground"
                    }`}
                    data-testid={`button-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {category.name}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto" data-testid="categories-content">
          <h2 className="text-lg font-semibold mb-4 text-foreground" data-testid="heading-browse">
            Browse Categories
          </h2>
          
          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {categoriesLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))
            ) : (
              categories.map((category) => (
                <Card 
                  key={category.id}
                  className="bg-card shadow-sm border border-border overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedCategory(category.name)}
                  data-testid={`card-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <img 
                    src={`${category.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200`}
                    alt={`${category.name} Category`}
                    className="w-full h-24 object-cover"
                    data-testid={`img-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm text-foreground" data-testid={`text-category-name-${category.id}`}>
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground" data-testid={`text-category-count-${category.id}`}>
                      {category.itemCount} items
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          <h3 className="text-md font-semibold mb-4 text-foreground" data-testid="heading-trending-category">
            {selectedCategory === "All Categories" ? "Trending Products" : `Trending in ${selectedCategory}`}
          </h3>
          
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="category-products">
              {categoryProducts.slice(0, 4).map((product) => (
                <Card key={product.id} className="bg-card shadow-sm border border-border">
                  <CardContent className="p-4 flex space-x-4">
                    <img 
                      src={`${product.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150`}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-md"
                      data-testid={`img-product-${product.id}`}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground" data-testid={`text-product-name-${product.id}`}>
                        {product.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2" data-testid={`text-product-description-${product.id}`}>
                        {product.description}
                      </p>
                      <p className="text-primary font-semibold" data-testid={`text-product-price-${product.id}`}>
                        ${product.price}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
