import { Link } from "wouter";
import { MapPin, Store as StoreIcon, CheckCircle } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Listing } from "@workspace/api-client-react";

interface ListingCardProps {
  listing: Listing;
  className?: string;
}

export function ListingCard({ listing, className }: ListingCardProps) {
  return (
    <Link 
      href={`/listings/${listing.id}`}
      className={cn(
        "group flex flex-col bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {/* fallback/stock image if no imageUrl */}
        <img 
          src={listing.imageUrl || `https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=450&fit=crop`}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {listing.isFeatured && (
            <span className="bg-secondary text-secondary-foreground text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-md">
              Featured
            </span>
          )}
          {listing.condition === 'new' && (
            <span className="bg-primary/90 text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-md">
              Neuf
            </span>
          )}
          {listing.condition === 'used' && (
            <span className="bg-background/90 text-foreground text-xs font-medium px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-md">
              Occasion
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-display font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {listing.title}
          </h3>
        </div>
        
        <p className="text-xl font-bold text-primary mb-4">
          {formatPrice(listing.price, listing.currency)}
          {listing.isNegotiable && <span className="text-xs font-medium text-muted-foreground ml-2 line-through decoration-transparent">Négociable</span>}
        </p>

        <div className="mt-auto space-y-2 pt-4 border-t border-border/50">
          <div className="flex items-center text-sm text-muted-foreground">
            <StoreIcon className="w-4 h-4 mr-1.5 shrink-0" />
            <span className="truncate">{listing.storeName}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
            <span className="truncate">{listing.wilayaName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
