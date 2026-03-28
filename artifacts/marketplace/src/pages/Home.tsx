import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { ListingCard } from "@/components/shared/ListingCard";
import { StoreCard } from "@/components/shared/StoreCard";
import { Search, MapPin, ArrowRight, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useGetListings, useGetStores, useGetStats, useGetCategories } from "@workspace/api-client-react";

export function Home() {
  const [search, setSearch] = useState("");
  
  // Data Fetching
  const { data: listingsData, isLoading: listingsLoading } = useGetListings({ limit: 8, featured: true });
  const { data: stores, isLoading: storesLoading } = useGetStores({ featured: true });
  const { data: stats } = useGetStats();
  const { data: categories } = useGetCategories();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="Mediterranean Market Background"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
        />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-foreground mb-6 leading-tight">
              Discover Algeria's <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Best Local Stores
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Shop directly from verified local businesses across 58 wilayas. Electronics, fashion, home goods, and more.
            </p>

            {/* Search Box */}
            <div className="bg-card p-2 rounded-2xl shadow-xl shadow-primary/5 flex flex-col sm:flex-row gap-2 max-w-4xl mx-auto border border-border/50">
              <div className="flex-1 flex items-center px-4 bg-muted/50 rounded-xl">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input 
                  type="text" 
                  placeholder="What are you looking for?" 
                  className="w-full py-4 pl-3 bg-transparent outline-none font-medium placeholder:text-muted-foreground"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="sm:w-1/3 flex items-center px-4 bg-muted/50 rounded-xl border-t sm:border-t-0 sm:border-l border-border/50">
                <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
                <select className="w-full py-4 pl-3 bg-transparent outline-none font-medium text-foreground cursor-pointer appearance-none">
                  <option value="">All Wilayas</option>
                  <option value="16">Alger (16)</option>
                  <option value="31">Oran (31)</option>
                  <option value="25">Constantine (25)</option>
                  <option value="23">Annaba (23)</option>
                </select>
              </div>
              <Link 
                href={search ? `/listings?search=${search}` : '/listings'}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 flex items-center justify-center shrink-0"
              >
                Search
              </Link>
            </div>

            {/* Quick Stats */}
            {stats && (
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-foreground font-bold">{stats.totalListings.toLocaleString()}</span> Active Listings
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground font-bold">{stats.totalStores.toLocaleString()}</span> Verified Stores
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-foreground font-bold">{stats.totalWilayas}</span> Wilayas Covered
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Explore Categories</h2>
              <p className="text-muted-foreground">Find exactly what you need</p>
            </div>
            <Link href="/categories" className="hidden sm:flex items-center text-primary font-medium hover:underline">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories?.slice(0, 6).map((cat, i) => (
              <Link 
                key={cat.id} 
                href={`/listings?categoryId=${cat.id}`}
                className="group bg-card border border-border/50 rounded-2xl p-6 text-center hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">{cat.listingCount} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Fresh Arrivals</h2>
              <p className="text-muted-foreground">Latest top picks from local stores</p>
            </div>
            <Link href="/listings" className="hidden sm:flex items-center text-primary font-medium hover:underline">
              Browse All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {listingsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="animate-pulse bg-muted rounded-2xl h-80" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {listingsData?.listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                <ShieldCheck className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Verified Sellers</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Every store on our platform goes through a strict verification process to ensure quality and safety for all buyers.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                <MapPin className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Local & Nationwide</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Find stores right in your neighborhood or order from verified businesses across all 58 Algerian wilayas.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Zap className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Zero Fees</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                We don't take a cut from your transactions. Contact sellers directly via phone or WhatsApp to finalize your deal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Stores */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Featured Stores</h2>
              <p className="text-muted-foreground">Top rated businesses on DzaïrMarket</p>
            </div>
            <Link href="/stores" className="hidden sm:flex items-center text-primary font-medium hover:underline">
              All Stores <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {storesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => <div key={i} className="animate-pulse bg-card rounded-2xl h-64 border border-border" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stores?.slice(0, 3).map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
