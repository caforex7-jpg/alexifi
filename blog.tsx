import Header from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for a Productive Home Office Setup",
    date: "March 15, 2024",
    excerpt: "Create the perfect workspace with our guide to essential equipment and organization tips that will boost your productivity...",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "Productivity"
  },
  {
    id: 2,
    title: "Latest Tech Trends You Should Know About",
    date: "March 12, 2024",
    excerpt: "Stay ahead of the curve with our comprehensive overview of emerging technologies that will shape the future...",
    image: "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "Technology"
  },
  {
    id: 3,
    title: "Sustainable Shopping: Making Better Choices",
    date: "March 10, 2024",
    excerpt: "Learn how to make more environmentally conscious purchasing decisions and support sustainable brands...",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "Sustainability"
  },
  {
    id: 4,
    title: "The Future of E-commerce: What to Expect",
    date: "March 8, 2024",
    excerpt: "Explore the latest innovations in online shopping and how they're changing the retail landscape...",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "E-commerce"
  },
  {
    id: 5,
    title: "Essential Gadgets for Digital Nomads",
    date: "March 5, 2024",
    excerpt: "Discover the must-have tech accessories for working remotely from anywhere in the world...",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "Travel Tech"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-6 text-foreground" data-testid="heading-blog">
          Blog & News
        </h2>
        
        <div className="space-y-6" data-testid="blog-posts">
          {blogPosts.map((post) => (
            <Card 
              key={post.id}
              className="bg-card shadow-sm border border-border overflow-hidden"
              data-testid={`card-blog-post-${post.id}`}
            >
              <img 
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
                data-testid={`img-blog-post-${post.id}`}
              />
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium" data-testid={`text-category-${post.id}`}>
                    {post.category}
                  </span>
                  <span className="text-muted-foreground text-xs" data-testid={`text-date-${post.id}`}>
                    {post.date}
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2" data-testid={`text-title-${post.id}`}>
                  {post.title}
                </h3>
                <p className="text-foreground text-sm leading-relaxed mb-3" data-testid={`text-excerpt-${post.id}`}>
                  {post.excerpt}
                </p>
                <Button 
                  variant="ghost" 
                  className="text-primary text-sm font-medium p-0 h-auto hover:bg-transparent hover:text-primary/80"
                  data-testid={`button-read-more-${post.id}`}
                >
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            className="px-6 py-2"
            data-testid="button-load-more"
          >
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
}
