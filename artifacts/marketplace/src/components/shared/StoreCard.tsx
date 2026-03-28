import { Link } from "wouter";
import { Star, MapPin, BadgeCheck, Box, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Store } from "@workspace/api-client-react";

interface StoreCardProps {
  store: Store;
  className?: string;
}

export function StoreCard({ store, className }: StoreCardProps) {
  return (
    <Link 
      href={`/stores/${store.id}`}
      className={cn(
        "group block bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
        className
      )}
    >
      <div className="relative h-24 bg-muted">
        <img 
          src={store.coverUrl || `${import.meta.env.BASE_URL}images/store-pattern.png`}
          alt="Cover"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
        {store.isFeatured && (
          <div className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded shadow">
            Top Store
          </div>
        )}
      </div>
      
      <div className="px-5 pb-5 relative">
        <div className="w-16 h-16 rounded-xl bg-card border-4 border-card shadow-md -mt-8 mb-3 overflow-hidden relative z-10 flex items-center justify-center">
          {store.logoUrl ? (
            <img src={store.logoUrl} alt={store.name} className="w-full h-full object-cover" />
          ) : (
            <StoreIcon className="w-8 h-8 text-primary" />
          )}
        </div>
        
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-1.5 group-hover:text-primary transition-colors line-clamp-1">
            {store.name}
            {store.isVerified && (
              <BadgeCheck className="w-5 h-5 text-green-500 shrink-0" />
            )}
          </h3>
          <div className="flex items-center gap-1 bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-lg text-sm font-bold shrink-0">
            <Star className="w-3.5 h-3.5 fill-current" />
            {store.rating.toFixed(1)}
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
          {store.description}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary/70" />
            <span className="truncate max-w-[100px]">{store.wilayaName}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-foreground">
            <Box className="w-4 h-4 text-primary/70" />
            <span>{store.listingCount} <span className="text-muted-foreground font-normal">Ads</span></span>
          </div>
        </div>
      </div>
    </Link>
  );
}
