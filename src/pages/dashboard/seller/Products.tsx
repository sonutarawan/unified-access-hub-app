
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Search, Plus, Edit, Trash2, Grid, List } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ProductModal from "@/components/products/ProductModal";
import DeleteConfirmDialog from "@/components/products/DeleteConfirmDialog";

// Sample product data for demonstration
const sampleProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 129.99,
    inventory: 45,
    category: "Electronics",
    status: "active",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=headphones",
    description: "High-quality wireless headphones with noise cancellation."
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    inventory: 32,
    category: "Electronics",
    status: "active",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=watch",
    description: "Feature-rich smart watch with heart rate monitoring."
  },
  {
    id: "3",
    name: "Running Shoes",
    price: 89.99,
    inventory: 0,
    category: "Fashion",
    status: "out_of_stock",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=shoes",
    description: "Comfortable running shoes for athletes."
  },
  {
    id: "4",
    name: "Coffee Maker",
    price: 59.99,
    inventory: 28,
    category: "Kitchen",
    status: "active",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=coffee",
    description: "Automatic coffee maker for your morning brew."
  },
  {
    id: "5",
    name: "Smartphone Case",
    price: 24.99,
    inventory: 120,
    category: "Accessories",
    status: "active",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=case",
    description: "Protective case for the latest smartphone models."
  },
  {
    id: "6",
    name: "Bluetooth Speaker",
    price: 79.99,
    inventory: 18,
    category: "Electronics",
    status: "active",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=speaker",
    description: "Portable Bluetooth speaker with excellent sound quality."
  },
  {
    id: "7",
    name: "Fitness Tracker",
    price: 49.99,
    inventory: 5,
    category: "Electronics",
    status: "low_stock",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=tracker",
    description: "Track your daily activity and fitness goals."
  },
  {
    id: "8",
    name: "Laptop Bag",
    price: 34.99,
    inventory: 42,
    category: "Accessories",
    status: "active",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=bag",
    description: "Stylish and functional laptop bag for professionals."
  }
];

const Products: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [products, setProducts] = useState(sampleProducts);
  
  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  
  // Delete confirmation dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  
  // Filter products based on search term and current tab
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (currentTab === "all") return matchesSearch;
    if (currentTab === "active") return matchesSearch && product.status === "active";
    if (currentTab === "low_stock") return matchesSearch && product.status === "low_stock";
    if (currentTab === "out_of_stock") return matchesSearch && product.status === "out_of_stock";
    
    return matchesSearch;
  });
  
  // Handle adding a new product
  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };
  
  // Handle editing a product
  const handleEditProduct = (product: any) => {
    setCurrentProduct(product);
    setIsEditModalOpen(true);
  };
  
  // Handle deleting a product
  const handleDeleteClick = (product: any) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id));
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "low_stock":
        return <Badge variant="outline" className="text-orange-500 border-orange-500">Low Stock</Badge>;
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your products inventory and listings
          </p>
        </div>
        
        <Button 
          className="bg-seller hover:bg-seller/90"
          onClick={handleAddProduct}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs 
          defaultValue="all" 
          className="w-full sm:w-auto" 
          value={currentTab}
          onValueChange={setCurrentTab}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="low_stock">Low Stock</TabsTrigger>
            <TabsTrigger value="out_of_stock">Out of Stock</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Products Grid/List View Toggle */}
      <Tabs 
        defaultValue="grid" 
        className="w-full" 
        value={viewMode}
        onValueChange={setViewMode}
      >
        <div className="flex justify-end mb-4">
          <TabsList>
            <TabsTrigger value="grid" className="px-3">
              <Grid className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="list" className="px-3">
              <List className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-32 w-32 object-contain" 
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{product.name}</CardTitle>
                    {getStatusBadge(product.status)}
                  </div>
                  <CardDescription>{product.category}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pb-0">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Stock: {product.inventory}</p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteClick(product)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <div className="bg-white rounded-md shadow">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="h-full w-full object-contain" 
                          />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-gray-900">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p>{product.category}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium">${product.price.toFixed(2)}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p>{product.inventory}</p>
                    </td>
                    <td className="px-4 py-4">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="px-4 py-4 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 px-2"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 px-2 text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Modals */}
      <ProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product"
      />
      
      {currentProduct && (
        <ProductModal 
          isOpen={isEditModalOpen} 
          onClose={() => {
            setIsEditModalOpen(false);
            setCurrentProduct(null);
          }}
          product={currentProduct}
          title="Edit Product"
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      {productToDelete && (
        <DeleteConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setProductToDelete(null);
          }}
          productName={productToDelete.name}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default Products;
