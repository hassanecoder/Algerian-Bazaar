import { Layout } from "@/components/layout/Layout";
import { Store, ShieldCheck, Map, Users } from "lucide-react";

export function About() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-foreground mb-6">
            Connecting Algeria, <br />
            <span className="text-primary">One Store at a Time.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            DzaïrMarket is the leading digital marketplace designed specifically for the Algerian market. We bridge the gap between local businesses and buyers across all 58 wilayas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="bg-muted rounded-3xl aspect-square overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=800&fit=crop" 
              alt="Algerian Market" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We started with a simple idea: make it easy for anyone in Algeria to find products locally and nationwide. Whether you are in Algiers looking for an artisan in Ghardaïa, or an electronics shop in Oran trying to reach a wider audience, we make it happen.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We empower small businesses by providing them with a digital storefront, expanding their reach beyond their physical location without the overhead of building an e-commerce site from scratch.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-card p-8 rounded-3xl border border-border text-center shadow-sm">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Store className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-2">Local Stores</h3>
            <p className="text-muted-foreground text-sm">Empowering thousands of local businesses with digital tools.</p>
          </div>
          <div className="bg-card p-8 rounded-3xl border border-border text-center shadow-sm">
            <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Map className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-2">58 Wilayas</h3>
            <p className="text-muted-foreground text-sm">Comprehensive coverage across the entirety of Algeria.</p>
          </div>
          <div className="bg-card p-8 rounded-3xl border border-border text-center shadow-sm">
            <div className="w-14 h-14 bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-2">Verified & Safe</h3>
            <p className="text-muted-foreground text-sm">Strict verification processes to ensure a safe community.</p>
          </div>
          <div className="bg-card p-8 rounded-3xl border border-border text-center shadow-sm">
            <div className="w-14 h-14 bg-accent/20 text-accent-foreground rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-2">Direct Contact</h3>
            <p className="text-muted-foreground text-sm">Connect directly with sellers without middlemen fees.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
