import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { SlidersHorizontal, ArrowLeft, Grid3X3, LayoutList } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard, { Product } from "@/components/ProductCard";
import CategoryChip from "@/components/CategoryChip";
import FilterDrawer from "@/components/FilterDrawer";
import ProductQuickView from "@/components/ProductQuickView";
import { mockProducts, categories, subcategories } from "@/data/mockData";
import { useIsMobile } from "@/hooks/use-mobile";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");
const unslugify = (slug: string) => {
  const found = categories.find((c) => slugify(c.name) === slug);
  return found?.name || null;
};

const CategoriesPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const initialCategory = slug ? unslugify(slug) : null;
  const [active, setActive] = useState<string | null>(initialCategory);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filtered = active
    ? mockProducts.filter((p) => p.category === active)
    : mockProducts;

  const currentSubs = active ? subcategories[active] || [] : [];

  const handleCategorySelect = (name: string | null) => {
    setActive(name);
    setActiveSub(null);
    // Update URL
    if (name) {
      navigate(`/categories/${slugify(name)}`, { replace: true });
    } else {
      navigate("/categories", { replace: true });
    }
  };

  const handleProductTap = (product: Product) => {
    if (isMobile) {
      setQuickViewProduct(product);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />

      <main className="max-w-7xl mx-auto">
        {/* Page title when category selected */}
        {active && (
          <div className="px-4 pt-3 pb-1 flex items-center gap-2">
            <button
              onClick={() => handleCategorySelect(null)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-secondary transition-colors -ml-1"
            >
              <ArrowLeft className="w-4 h-4 text-foreground" strokeWidth={1.5} />
            </button>
            <h1 className="text-[16px] font-semibold text-foreground">{active}</h1>
            <span className="text-[12px] text-muted-foreground ml-auto">
              {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* Category chips row */}
        <div className="px-4 pt-2 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-[13px] font-medium text-foreground hover:bg-secondary transition-colors flex-shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter
            </button>
            <div className="w-px h-5 bg-border flex-shrink-0" />
            <CategoryChip label="All" active={!active} onClick={() => handleCategorySelect(null)} />
            {categories.map((cat) => (
              <CategoryChip
                key={cat.name}
                label={cat.name}
                active={active === cat.name}
                onClick={() => handleCategorySelect(active === cat.name ? null : cat.name)}
              />
            ))}
          </div>
        </div>

        {/* Subcategories row */}
        {active && currentSubs.length > 0 && (
          <div className="px-4 pb-2">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
              {currentSubs.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSub(activeSub === sub ? null : sub)}
                  className={`px-2.5 py-1 rounded-full text-[12px] font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                    activeSub === sub
                      ? "bg-foreground text-background"
                      : "bg-secondary/70 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Count — only when no category header shown */}
        {!active && (
          <div className="px-4 pb-2 pt-0.5">
            <p className="text-[12px] text-muted-foreground">
              {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Grid */}
        <section className="px-4 pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-5">
            {filtered.map((product) => (
              <div key={product.id} onClick={() => handleProductTap(product)}>
                <ProductCard product={product} preventNavigation={isMobile} />
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[13px] text-muted-foreground">No listings in this category yet.</p>
            </div>
          )}
        </section>
      </main>

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} />
      <ProductQuickView
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      <BottomNav />
    </div>
  );
};

export default CategoriesPage;
