
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Sample data for demonstration
const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    category: "Electronics",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=headphones"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    category: "Electronics",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=watch"
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 89.99,
    category: "Fashion",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=shoes"
  },
  {
    id: 4,
    name: "Coffee Maker",
    price: 59.99,
    category: "Kitchen",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=coffee"
  }
];

const categories = [
  { name: "Electronics", count: 243, icon: "💻" },
  { name: "Fashion", count: 156, icon: "👕" },
  { name: "Home & Kitchen", count: 98, icon: "🏠" },
  { name: "Beauty", count: 76, icon: "💄" },
  { name: "Sports", count: 65, icon: "🏀" },
];

const BuyerDashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hello, {user?.name}</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back to your buyer dashboard
          </p>
        </div>
        
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-9 rounded-full w-full md:w-[260px] bg-white"
          />
        </div>
      </div>
      
      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="h-32 w-32 object-contain" 
                />
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-lg font-bold text-buyer mt-1">
                  ${product.price}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Categories */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Browse Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.name} 
              className="hover:border-buyer hover:shadow-md cursor-pointer transition-all"
            >
              <CardHeader className="text-center pb-2">
                <div className="text-3xl mb-1">{category.icon}</div>
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-4">
                <CardDescription>{category.count} products</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BuyerDashboard;
