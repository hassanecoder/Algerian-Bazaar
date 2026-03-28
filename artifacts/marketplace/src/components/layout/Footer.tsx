import { Link } from "wouter";
import { Store, Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <Store className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Dzaïr<span className="text-primary">Market</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The premier marketplace connecting Algerian buyers and sellers. Discover local stores, unique items, and great deals across all 58 wilayas.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/listings" className="hover:text-primary transition-colors">Browse Listings</Link></li>
              <li><Link href="/stores" className="hover:text-primary transition-colors">Find Stores</Link></li>
              <li><Link href="/categories" className="hover:text-primary transition-colors">All Categories</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Categories</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/listings?category=electronics" className="hover:text-primary transition-colors">Electronics & Tech</Link></li>
              <li><Link href="/listings?category=vehicles" className="hover:text-primary transition-colors">Vehicles</Link></li>
              <li><Link href="/listings?category=real-estate" className="hover:text-primary transition-colors">Real Estate</Link></li>
              <li><Link href="/listings?category=fashion" className="hover:text-primary transition-colors">Fashion & Clothing</Link></li>
              <li><Link href="/listings?category=home" className="hover:text-primary transition-colors">Home & Garden</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Rue Didouche Mourad<br />Algiers, 16000, Algeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span dir="ltr">+213 555 12 34 56</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>contact@dzairmarket.dz</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dzaïr Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
