import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ListingCard } from "@/components/shared/ListingCard";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { useGetListings, useGetCategories, useGetWilayas } from "@workspace/api-client-react";

export function Listings() {
  const [filters, setFilters] = useState({
    search: "",
    categoryId: "",
    wilayaId: "",
    condition: "",
    minPrice: "",
    maxPrice: ""
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const { data: categories } = useGetCategories();
  const { data: wilayas } = useGetWilayas();
  
  const { data, isLoading } = useGetListings({
    search: filters.search || undefined,
    categoryId: filters.categoryId ? Number(filters.categoryId) : undefined,
    wilayaId: filters.wilayaId ? Number(filters.wilayaId) : undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    limit: 24
  });

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">Browse Listings</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
              />
            </div>
            <button 
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="md:hidden flex items-center justify-center gap-2 bg-card border border-border py-3 px-4 rounded-xl font-medium"
            >
              <SlidersHorizontal className="w-5 h-5" /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 space-y-8 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-28">
              <div className="flex items-center gap-2 font-display font-bold text-lg mb-6 pb-4 border-b border-border">
                <Filter className="w-5 h-5 text-primary" /> Filters
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Category</label>
                  <select 
                    value={filters.categoryId}
                    onChange={(e) => setFilters({...filters, categoryId: e.target.value})}
                    className="w-full p-2.5 bg-muted rounded-lg border-transparent focus:border-primary focus:bg-background outline-none text-sm"
                  >
                    <option value="">All Categories</option>
                    {categories?.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Wilaya</label>
                  <select 
                    value={filters.wilayaId}
                    onChange={(e) => setFilters({...filters, wilayaId: e.target.value})}
                    className="w-full p-2.5 bg-muted rounded-lg border-transparent focus:border-primary focus:bg-background outline-none text-sm"
                  >
                    <option value="">All Wilayas</option>
                    {wilayas?.map(w => (
                      <option key={w.id} value={w.id}>{w.code} - {w.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Price Range (DZD)</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      value={filters.minPrice}
                      onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                      className="w-full p-2.5 bg-muted rounded-lg border-transparent focus:border-primary focus:bg-background outline-none text-sm"
                    />
                    <span className="text-muted-foreground">-</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                      className="w-full p-2.5 bg-muted rounded-lg border-transparent focus:border-primary focus:bg-background outline-none text-sm"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setFilters({search: "", categoryId: "", wilayaId: "", condition: "", minPrice: "", maxPrice: ""})}
                  className="w-full py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground font-medium">
                {data?.total || 0} listings found
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => <div key={i} className="animate-pulse bg-muted rounded-2xl h-80" />)}
              </div>
            ) : data?.listings.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-bold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.listings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}
