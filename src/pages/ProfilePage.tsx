import { motion } from "framer-motion";
import {
  Settings,
  Heart,
  Package,
  Star,
  MapPin,
  Calendar,
  ChevronRight,
  Shield,
  LogOut,
  Edit3,
  Camera,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/data/mockData";

const stats = [
  { label: "Listed", value: "24" },
  { label: "Sold", value: "18" },
  { label: "Rating", value: "4.9" },
  { label: "Reviews", value: "87" },
];

const menuItems = [
  { icon: Package, label: "My Listings", badge: "24" },
  { icon: Heart, label: "Wishlist", badge: "8" },
  { icon: Star, label: "Reviews" },
  { icon: Shield, label: "Verification", badge: "✓" },
  { icon: Settings, label: "Settings" },
  { icon: LogOut, label: "Log Out" },
];

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      {/* Profile Header */}
      <section className="px-4 pt-6 pb-4">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl shadow-card p-5 md:p-8"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-2xl md:text-3xl font-extrabold text-primary-foreground font-display shadow-glow">
                  TR
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card border-2 border-background flex items-center justify-center shadow-card">
                  <Camera className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="text-xl font-bold font-display text-foreground truncate">treido</h2>
                  <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Verified seller since 2024
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Sofia, Bulgaria
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Joined Jan 2024
                  </span>
                </div>
              </div>

              <button className="p-2 rounded-full hover:bg-secondary transition-colors flex-shrink-0">
                <Edit3 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mt-5 pt-5 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-lg font-bold font-display text-foreground">{stat.value}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu */}
      <section className="px-4 pb-4">
        <div className="container max-w-7xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            {menuItems.map((item, i) => {
              const Icon = item.icon;
              const isLast = i === menuItems.length - 1;
              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                  className={`flex items-center gap-3 w-full px-5 py-3.5 text-left hover:bg-secondary/50 transition-colors ${
                    !isLast ? "border-b border-border" : ""
                  } ${isLast ? "text-destructive" : "text-foreground"}`}
                >
                  <Icon className={`w-5 h-5 ${isLast ? "text-destructive" : "text-muted-foreground"}`} />
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      item.badge === "✓"
                        ? "bg-success/10 text-success"
                        : "bg-secondary text-secondary-foreground"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {!isLast && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* User's Listings */}
      <section className="px-4 py-4">
        <div className="container max-w-7xl mx-auto">
          <h3 className="text-base font-bold font-display text-foreground mb-3">My Listings</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {mockProducts.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
