import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Clock, TrendingUp, Percent, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import CategoryChip from "@/components/CategoryChip";
import { mockProducts, categories } from "@/data/mockData";
import { Link } from "react-router-dom";

const tabs = [
  { label: "For You", icon: <Flame className="w-3.5 h-3.5" /> },
  { label: "Newest", icon: <Clock className="w-3.5 h-3.5" /> },
  { label: "Trending", icon: <TrendingUp className="w-3.5 h-3.5" /> },
  { label: "Deals", icon: <Percent className="w-3.5 h-3.5" /> },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("For You");

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      {/* Hero Banner */}
      <section className="px-4 pt-4 pb-2 md:pt-6">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 p-6 md:p-10"
          >
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-foreground mb-2 font-display">
                Buy & Sell Anything
              </h2>
              <p className="text-primary-foreground/80 text-sm md:text-base max-w-md mb-4">
                Join thousands of buyers and sellers on the marketplace built for everyone.
              </p>
              <button className="px-5 py-2.5 rounded-full bg-card text-foreground text-sm font-semibold hover:bg-card/90 transition-all active:scale-95 shadow-card">
                Start Selling
              </button>
            </div>
            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary-foreground/10" />
            <div className="absolute -right-5 -bottom-10 w-28 h-28 rounded-full bg-primary-foreground/5" />
          </motion.div>
        </div>
      </section>

      {/* Categories Row */}
      <section className="px-4 py-3">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-foreground font-display">Categories</h3>
            <Link to="/categories" className="text-xs font-medium text-primary flex items-center gap-0.5">
              See all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.name}
                to="/categories"
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
              >
                <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center text-2xl shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5">
                  {cat.icon}
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 py-2">
        <div className="container max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {tabs.map((tab) => (
              <CategoryChip
                key={tab.label}
                label={tab.label}
                icon={tab.icon}
                active={activeTab === tab.label}
                onClick={() => setActiveTab(tab.label)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-4 py-3">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {mockProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Index;
