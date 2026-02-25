import { useState } from "react";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import CategoryChip from "@/components/CategoryChip";
import { mockProducts, categories } from "@/data/mockData";

const CategoriesPage = () => {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? mockProducts.filter((p) => p.category === active)
    : mockProducts;

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />

      <main className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <Link to="/" className="md:hidden">
              <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </Link>
            <h2 className="text-lg font-bold font-display text-foreground">Browse</h2>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-[13px] font-medium text-secondary-foreground hover:bg-accent transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>

        {/* Category list */}
        <div className="px-4 pb-3">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            <CategoryChip label="All" active={!active} onClick={() => setActive(null)} />
            {categories.map((cat) => (
              <CategoryChip
                key={cat.name}
                label={`${cat.name}`}
                active={active === cat.name}
                onClick={() => setActive(active === cat.name ? null : cat.name)}
              />
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="px-4 pb-3">
          <p className="text-[13px] text-muted-foreground">
            {filtered.length} listings{active ? ` in ${active}` : ""}
          </p>
        </div>

        {/* Grid */}
        <section className="px-4 pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sm text-muted-foreground">No listings in this category yet.</p>
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default CategoriesPage;
