import {
  Settings,
  Heart,
  Package,
  Star,
  MapPin,
  ChevronRight,
  Shield,
  LogOut,
  HelpCircle,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/data/mockData";

const stats = [
  { label: "Listed", value: "24" },
  { label: "Sold", value: "18" },
  { label: "Rating", value: "4.9" },
];

const menu = [
  { icon: Package, label: "My Listings", detail: "24 active" },
  { icon: Heart, label: "Saved", detail: "8 items" },
  { icon: Star, label: "Reviews", detail: "87" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help" },
];

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />

      <main className="max-w-7xl mx-auto">
        {/* Profile card */}
        <section className="px-4 pt-5 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-base font-bold text-secondary-foreground">
              TR
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-[15px] font-bold text-foreground">treido</h2>
                <Shield className="w-3.5 h-3.5 text-success" />
              </div>
              <div className="flex items-center gap-2 text-[12px] text-muted-foreground mt-0.5">
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3" /> Sofia
                </span>
                <span>·</span>
                <span>Joined 2024</span>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-lg border border-border text-[13px] font-medium text-foreground hover:bg-secondary transition-colors">
              Edit
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-4 pt-4 border-t border-border">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-[15px] font-bold text-foreground">{s.value}</p>
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Menu */}
        <section className="px-4 pb-4">
          <div className="border border-border rounded-xl overflow-hidden bg-card divide-y divide-border">
            {menu.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors"
                >
                  <Icon className="w-[18px] h-[18px] text-muted-foreground" strokeWidth={1.5} />
                  <span className="flex-1 text-[13px] font-medium text-foreground">{item.label}</span>
                  {item.detail && (
                    <span className="text-[12px] text-muted-foreground">{item.detail}</span>
                  )}
                  <ChevronRight className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                </button>
              );
            })}
          </div>

          <button className="flex items-center gap-3 w-full px-4 py-3 mt-2 text-left text-destructive hover:bg-destructive/5 rounded-xl transition-colors">
            <LogOut className="w-[18px] h-[18px]" strokeWidth={1.5} />
            <span className="text-[13px] font-medium">Log Out</span>
          </button>
        </section>

        {/* Listings */}
        <section className="px-4 pb-6">
          <h3 className="text-[15px] font-semibold text-foreground mb-3">Your Listings</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-5">
            {mockProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
