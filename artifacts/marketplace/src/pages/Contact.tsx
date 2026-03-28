import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you shortly.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Info */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">Get in Touch</h1>
            <p className="text-lg text-muted-foreground mb-10">
              Have a question about our platform, need help with your store, or want to report an issue? We're here to help.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Our Office</h3>
                  <p className="text-muted-foreground">123 Rue Didouche Mourad<br />Algiers, 16000<br />Algeria</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Phone Number</h3>
                  <p className="text-muted-foreground" dir="ltr">+213 (0) 555 12 34 56</p>
                  <p className="text-sm text-muted-foreground mt-1">Sun-Thu, 9am - 5pm</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent-foreground shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Email Support</h3>
                  <p className="text-muted-foreground">support@dzairmarket.dz</p>
                  <p className="text-muted-foreground">business@dzairmarket.dz</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-border shadow-xl rounded-3xl p-8 lg:p-10">
            <h2 className="text-2xl font-display font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Subject</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Message</label>
                <textarea 
                  required 
                  rows={5}
                  className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"} 
                {!isSubmitting && <Send className="w-5 h-5" />}
              </button>
            </form>
          </div>

        </div>
      </div>
    </Layout>
  );
}
