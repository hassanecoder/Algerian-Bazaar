import { useParams, Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { ListingCard } from "@/components/shared/ListingCard";
import { Star, MapPin, Phone, Mail, Globe, ShieldCheck, Clock, Share2 } from "lucide-react";
import { useGetStoreById } from "@workspace/api-client-react";

export function StoreDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: store, isLoading, isError } = useGetStoreById(Number(id));

  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="h-64 bg-muted w-full"></div>
          <div className="max-w-7xl mx-auto px-4 -mt-16">
            <div className="w-32 h-32 bg-muted-foreground/20 rounded-2xl border-4 border-background mb-4"></div>
            <div className="h-8 w-1/4 bg-muted mb-4"></div>
            <div className="h-24 w-1/2 bg-muted rounded-xl"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !store) {
    return (
      <Layout>
        <div className="text-center py-32">
          <h2 className="text-2xl font-bold text-destructive mb-2">Store Not Found</h2>
          <p className="text-muted-foreground mb-6">The store you are looking for is unavailable.</p>
          <Link href="/stores" className="text-primary hover:underline">Browse all stores</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Cover */}
      <div className="w-full h-64 md:h-80 bg-muted relative">
        <img 
          src={store.coverUrl || `${import.meta.env.BASE_URL}images/store-pattern.png`} 
          alt="Store Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 relative z-10 -mt-20">
          
          {/* Main Profile Info */}
          <div className="flex-1 bg-card rounded-3xl p-6 md:p-8 shadow-xl border border-border">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end mb-6 border-b border-border pb-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white border-4 border-card shadow-lg overflow-hidden shrink-0">
                {store.logoUrl ? (
                  <img src={store.logoUrl} alt={store.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary text-white text-4xl font-bold">
                    {store.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">{store.name}</h1>
                  {store.isVerified && <ShieldCheck className="w-7 h-7 text-green-500" />}
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
                  <div className="flex items-center text-secondary gap-1">
                    <Star className="w-4 h-4 fill-current" /> {store.rating.toFixed(1)} ({store.reviewCount} reviews)
                  </div>
                  <div className="flex items-center text-muted-foreground gap-1.5">
                    <MapPin className="w-4 h-4" /> {store.wilayaName}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-md">
                  Follow
                </button>
                <button className="w-11 h-11 bg-muted text-foreground flex items-center justify-center rounded-xl hover:bg-muted-foreground/20 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-lg font-bold mb-3 font-display">About Store</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {store.description}
                </p>
              </div>
              
              <div className="bg-muted/30 p-5 rounded-2xl border border-border space-y-4">
                <h3 className="text-lg font-bold mb-2 font-display">Contact Info</h3>
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <Phone className="w-5 h-5 text-primary" /> <span dir="ltr">{store.phone}</span>
                </div>
                {store.email && (
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <Mail className="w-5 h-5 text-primary" /> <span>{store.email}</span>
                  </div>
                )}
                {store.website && (
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <Globe className="w-5 h-5 text-primary" /> <a href={store.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">{store.website}</a>
                  </div>
                )}
                <div className="flex items-start gap-3 text-sm text-foreground">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" /> <span>{store.address}</span>
                </div>
                {store.openingHours && (
                  <div className="flex items-start gap-3 text-sm text-foreground">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" /> <span>{store.openingHours}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Store Listings */}
        <div className="py-16">
          <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
            <h2 className="text-2xl font-display font-bold">Store Listings ({store.listingCount})</h2>
          </div>

          {store.listings?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {store.listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
              <p className="text-muted-foreground">This store hasn't posted any listings yet.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
