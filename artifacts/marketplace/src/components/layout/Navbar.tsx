import { Link, useLocation } from "wouter";
import { Search, Menu, ShoppingBag, Store, MapPin, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/listings?search=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { href: "/listings", label: "Browse", icon: ShoppingBag },
    { href: "/stores", label: "Stores", icon: Store },
    { href: "/categories", label: "Categories", icon: MapPin },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm" 
          : "bg-background border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <Store className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl text-foreground tracking-tight hidden sm:block">
              Dzaïr<span className="text-primary">Market</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search listings, stores, or categories..."
                className="block w-full pl-10 pr-4 py-2.5 bg-muted/50 border-2 border-transparent rounded-full text-sm placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none"
              />
              <button type="submit" className="hidden" />
            </form>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5",
                  location === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            <div className="w-px h-6 bg-border mx-2" />
            <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <User className="w-5 h-5" />
              Sign In
            </button>
            <button className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              Post Ad
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 bg-muted rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </form>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-foreground font-medium"
                >
                  <link.icon className="w-5 h-5 text-muted-foreground" />
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-foreground font-medium w-full text-left">
                <User className="w-5 h-5 text-muted-foreground" />
                Sign In
              </button>
              <button className="mt-2 w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-md">
                Post Ad
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
