import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { useGetCategories } from "@workspace/api-client-react";
import { 
  Laptop, Car, Home, Shirt, Briefcase, Wrench, 
  Smartphone, Sofa, Watch, HeartPulse, Sparkles, Map
} from "lucide-react";

// Helper to map icon names to actual Lucide components
const getIcon = (name: string, className: string = "w-8 h-8") => {
  const icons: Record<string, any> = {
    Laptop, Car, Home, Shirt, Briefcase, Wrench,
    Smartphone, Sofa, Watch, HeartPulse, Sparkles
  };
  const IconComponent = icons[name] || Map;
  return <IconComponent className={className} />;
};

export function Categories() {
  const { data: categories, isLoading } = useGetCategories();

  return (
    <Layout>
      <div className="bg-primary/5 py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">All Categories</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through thousands of items grouped by category to easily find what you're looking for.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories?.map(category => (
              <Link 
                key={category.id} 
                href={`/listings?categoryId=${category.id}`}
                className="group flex flex-col items-center justify-center p-8 bg-card border border-border rounded-3xl hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-muted group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-primary transition-colors mb-4">
                  {getIcon(category.icon)}
                </div>
                <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.listingCount} items</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
