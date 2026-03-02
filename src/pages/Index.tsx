import { useState, useRef } from "react";
import { SlidersHorizontal } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import FilterDrawer, { FilterState } from "@/components/FilterDrawer";
import { mockProducts, categories } from "@/data/mockData";
import { Link } from "react-router-dom";

const quickFilters = ["Free Shipping", "New", "Under €50", "Verified", "On Sale"];

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeFeed, setActiveFeed] = useState("For You");
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    conditions: [],
    priceMin: "",
    priceMax: "",
    quickFilters: [],
    brands: [],
  });

  const toggleQuickFilter = (f: string) => {
    setActiveQuickFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const totalActiveFilters =
    activeQuickFilters.length +
    filters.conditions.length +
    filters.brands.length +
    (filters.priceMin || filters.priceMax ? 1 : 0);

  const filteredProducts = activeCategory
    ? mockProducts.filter((p) => p.category === activeCategory)
    : mockProducts;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header activeFeed={activeFeed} onFeedChange={setActiveFeed} />

      <main className="max-w-7xl mx-auto">
        {/* Category pills — scrollable */}
        <div className="border-b border-border/40">
          <div className="px-4 py-2">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 h-[30px] rounded-full text-[12px] font-medium whitespace-nowrap flex-shrink-0 transition-colors ${
                  !activeCategory
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground active:bg-accent"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/categories/${slugify(cat.name)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCategory(activeCategory === cat.name ? null : cat.name);
                  }}
                  className={`px-3 h-[30px] rounded-full text-[12px] font-medium whitespace-nowrap flex-shrink-0 flex items-center transition-colors ${
                    activeCategory === cat.name
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground active:bg-accent"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quick filter bar */}
        <div className="px-4 py-2 border-b border-border/40">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide items-center">
            {/* Filter button */}
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className={`flex items-center gap-1 px-2.5 h-[30px] rounded-full text-[12px] font-medium whitespace-nowrap flex-shrink-0 transition-colors border ${
                totalActiveFilters > 0
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground active:bg-accent"
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" strokeWidth={1.5} />
              {totalActiveFilters > 0 && (
                <span className="text-[10px] font-bold">{totalActiveFilters}</span>
              )}
            </button>

            {/* Quick filter pills */}
            {quickFilters.map((f) => (
              <button
                key={f}
                onClick={() => toggleQuickFilter(f)}
                className={`px-3 h-[30px] rounded-full text-[12px] font-medium whitespace-nowrap flex-shrink-0 transition-colors ${
                  activeQuickFilters.includes(f)
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground active:bg-accent"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <section className="px-4 pb-6 pt-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2.5 gap-y-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[14px] text-foreground font-medium mb-1">No products</p>
              <p className="text-[12px] text-muted-foreground">Try a different category.</p>
            </div>
          )}
        </section>
      </main>

      <FilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        filters={filters}
        onApply={setFilters}
      />
      <BottomNav />
    </div>
  );
};

export default Index;
