import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import CategoryChip from "@/components/CategoryChip";
import { mockProducts, categories } from "@/data/mockData";

const CategoriesPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? mockProducts.filter((p) => p.category === activeCategory)
    : mockProducts;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      {/* Page Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link to="/" className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors md:hidden">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Link>
              <h2 className="text-xl font-bold font-display text-foreground">All Categories</h2>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:bg-secondary transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <section className="px-4 pb-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                onClick={() =>
                  setActiveCategory(activeCategory === cat.name ? null : cat.name)
                }
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200 ${
                  activeCategory === cat.name
                    ? "bg-primary/10 border-primary shadow-glow"
                    : "bg-card border-border hover:border-primary/30 hover:shadow-card-hover hover:-translate-y-0.5"
                }`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-semibold text-foreground">{cat.name}</span>
                <span className="text-[10px] text-muted-foreground">{cat.count} items</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Subcategory Chips */}
      {activeCategory && (
        <section className="px-4 pb-3">
          <div className="container max-w-7xl mx-auto">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              <CategoryChip label="All" active />
              <CategoryChip label="New Arrivals" />
              <CategoryChip label="Top Rated" />
              <CategoryChip label="Best Deals" />
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="px-4 py-2">
        <div className="container max-w-7xl mx-auto">
          <p className="text-sm text-muted-foreground mb-3">
            {filtered.length} {activeCategory ? `in ${activeCategory}` : "total"} listings
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default CategoriesPage;
