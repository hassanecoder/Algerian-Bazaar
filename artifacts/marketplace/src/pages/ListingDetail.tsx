import { useParams, Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { ListingCard } from "@/components/shared/ListingCard";
import { Phone, MessageCircle, MapPin, ShieldCheck, Heart, Share2, Tag, Calendar, Eye } from "lucide-react";
import { useGetListingById } from "@workspace/api-client-react";
import { formatPrice } from "@/lib/utils";

export function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: listing, isLoading, isError } = useGetListingById(Number(id));

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
          <div className="h-8 bg-muted w-1/3 rounded mb-8"></div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 h-[500px] bg-muted rounded-2xl"></div>
            <div className="lg:w-1/3 h-[400px] bg-muted rounded-2xl"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !listing) {
    return (
      <Layout>
        <div className="text-center py-32">
          <h2 className="text-2xl font-bold text-destructive mb-2">Listing Not Found</h2>
          <p className="text-muted-foreground mb-6">The listing you're looking for doesn't exist or has been removed.</p>
          <Link href="/listings" className="text-primary hover:underline font-medium">Return to listings</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href={`/listings?categoryId=${listing.categoryId}`} className="hover:text-primary">{listing.categoryName}</Link>
            <span>/</span>
            <span className="text-foreground truncate">{listing.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-8">
            <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-sm">
              <div className="aspect-[4/3] sm:aspect-[16/9] w-full bg-black relative">
                {/* fallback/stock image if no imageUrl */}
                <img 
                  src={listing.imageUrl || `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=800&fit=crop`}
                  alt={listing.title}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-white hover:text-primary transition-colors shadow">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-white hover:text-destructive transition-colors shadow">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {listing.condition === 'new' && <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">Neuf</span>}
                  {listing.condition === 'used' && <span className="bg-muted text-foreground px-3 py-1 rounded-full text-sm font-medium">Occasion</span>}
                  <span className="bg-secondary/10 text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">{listing.categoryName}</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                  {listing.title}
                </h1>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground pb-6 border-b border-border">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {listing.wilayaName}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {new Date(listing.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" /> {listing.viewCount} views
                  </div>
                </div>

                <div className="py-6">
                  <h3 className="text-lg font-bold mb-4 font-display">Description</h3>
                  <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {listing.description}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-card rounded-3xl p-6 border border-border shadow-lg shadow-primary/5 sticky top-28">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1 font-medium">Price</p>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-display font-bold text-primary">
                    {formatPrice(listing.price, listing.currency)}
                  </span>
                </div>
                {listing.isNegotiable && <p className="text-sm text-secondary font-medium mt-2">✓ Négociable</p>}
              </div>

              <div className="space-y-3">
                <button className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                  <Phone className="w-5 h-5" /> Show Phone Number
                </button>
                <button className="w-full py-4 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-md shadow-green-500/20">
                  <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wider">Sold By</h4>
                
                <Link href={`/stores/${listing.store.id}`} className="group flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-muted border border-border overflow-hidden shrink-0">
                    {listing.store.logoUrl ? (
                      <img src={listing.store.logoUrl} alt={listing.store.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-xl">
                        {listing.store.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{listing.store.name}</h3>
                      {listing.store.isVerified && <ShieldCheck className="w-4 h-4 text-green-500" />}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Tag className="w-3.5 h-3.5" /> {listing.store.listingCount} active listings
                    </div>
                    <span className="text-primary text-sm font-medium group-hover:underline">View Store Profile</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
        </div>

        {/* Related */}
        {listing.relatedListings && listing.relatedListings.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold mb-8">Similar Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {listing.relatedListings.map(item => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
