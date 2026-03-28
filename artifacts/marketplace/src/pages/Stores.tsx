import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { StoreCard } from "@/components/shared/StoreCard";
import { Search, MapPin } from "lucide-react";
import { useGetStores, useGetWilayas } from "@workspace/api-client-react";

export function Stores() {
  const [search, setSearch] = useState("");
  const [wilayaId, setWilayaId] = useState("");

  const { data: wilayas } = useGetWilayas();
  const { data: stores, isLoading } = useGetStores({
    search: search || undefined,
    wilayaId: wilayaId ? Number(wilayaId) : undefined
  });

  return (
    <Layout>
      <div className="bg-primary/5 py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">Directory of Local Stores</h1>
            <p className="text-lg text-muted-foreground mb-8">Discover verified businesses and trusted sellers across Algeria.</p>
            
            <div className="flex flex-col sm:flex-row gap-3 bg-card p-2 rounded-2xl shadow-md border border-border/50">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search stores by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent outline-none font-medium"
                />
              </div>
              <div className="w-px bg-border hidden sm:block mx-1" />
              <div className="relative sm:w-1/3">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <select
                  value={wilayaId}
                  onChange={(e) => setWilayaId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent outline-none font-medium appearance-none"
                >
                  <option value="">All Regions</option>
                  {wilayas?.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="animate-pulse bg-muted rounded-2xl h-72" />)}
          </div>
        ) : stores?.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
            <h3 className="text-lg font-bold text-foreground mb-2">No stores found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {stores?.map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
