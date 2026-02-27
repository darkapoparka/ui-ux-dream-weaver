import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  SlidersHorizontal,
  ArrowLeft,
  ArrowUpDown,
  X,
  LayoutGrid,
  StretchHorizontal,
  Percent,
  Truck,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard, { Product } from "@/components/ProductCard";
import CategoryChip from "@/components/CategoryChip";
import FilterDrawer, { FilterState } from "@/components/FilterDrawer";
import SortDrawer, { sortOptions } from "@/components/SortDrawer";
import ProductQuickView from "@/components/ProductQuickView";
import { mockProducts, categories, subcategories } from "@/data/mockData";
import { useIsMobile } from "@/hooks/use-mobile";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");
const unslugify = (slug: string) => {
  const found = categories.find((c) => slugify(c.name) === slug);
  return found?.name || null;
};

const quickFilterOptions = [
  { key: "sale", label: "On Sale", icon: Percent },
  { key: "shipping", label: "Free Ship", icon: Truck },
  { key: "verified", label: "Verified", icon: CheckCircle2 },
];

const CategoriesPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const initialCategory = slug ? unslugify(slug) : null;
  const [active, setActive] = useState<string | null>(initialCategory);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    conditions: [],
    priceMin: "",
    priceMax: "",
    quickFilters: [],
  });

  const toggleQuickFilter = (key: string) => {
    setFilters((prev) => ({
      ...prev,
      quickFilters: prev.quickFilters.includes(key)
        ? prev.quickFilters.filter((k) => k !== key)
        : [...prev.quickFilters, key],
    }));
  };

  const activeFilterTags = useMemo(() => {
    const tags: { key: string; label: string }[] = [];
    if (filters.conditions.length > 0)
      tags.push({ key: "conditions", label: filters.conditions.join(", ") });
    if (filters.priceMin || filters.priceMax)
      tags.push({
        key: "price",
        label: `€${filters.priceMin || "0"} – €${filters.priceMax || "∞"}`,
      });
    filters.quickFilters.forEach((qf) => {
      const opt = quickFilterOptions.find((o) => o.key === qf);
      if (opt) tags.push({ key: `quick-${qf}`, label: opt.label });
    });
    return tags;
  }, [filters]);

  const removeFilterTag = (key: string) => {
    if (key === "conditions") setFilters((p) => ({ ...p, conditions: [] }));
    else if (key === "price") setFilters((p) => ({ ...p, priceMin: "", priceMax: "" }));
    else if (key.startsWith("quick-")) {
      const qf = key.replace("quick-", "");
      toggleQuickFilter(qf);
    }
  };

  const results = useMemo(() => {
    let items = active
      ? mockProducts.filter((p) => p.category === active)
      : [...mockProducts];
    if (filters.conditions.length > 0)
      items = items.filter((p) => p.condition && filters.conditions.includes(p.condition));
    if (filters.priceMin) items = items.filter((p) => p.price >= Number(filters.priceMin));
    if (filters.priceMax) items = items.filter((p) => p.price <= Number(filters.priceMax));
    if (filters.quickFilters.includes("sale")) items = items.filter((p) => p.discount);
    if (filters.quickFilters.includes("verified")) items = items.filter((p) => p.verified);
    if (sortValue === "price-low") items.sort((a, b) => a.price - b.price);
    else if (sortValue === "price-high") items.sort((a, b) => b.price - a.price);
    return items;
  }, [active, filters, sortValue]);

  const currentSubs = active ? subcategories[active] || [] : [];
  const currentSortLabel = sortOptions.find((o) => o.value === sortValue)?.label || "Sort";

  const handleCategorySelect = (name: string | null) => {
    setActive(name);
    setActiveSub(null);
    if (name) navigate(`/categories/${slugify(name)}`, { replace: true });
    else navigate("/categories", { replace: true });
  };

  const handleProductTap = (product: Product) => {
    if (isMobile) setQuickViewProduct(product);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="max-w-7xl mx-auto">
        {/* ─── Sticky toolbar ─── */}
        <div className="sticky top-[76px] md:top-11 z-30 bg-background/98 backdrop-blur-sm">
          {/* Back + category name when selected */}
          {active && (
            <div className="px-4 pt-2 pb-1 flex items-center gap-2">
              <button
                onClick={() => handleCategorySelect(null)}
                className="w-7 h-7 flex items-center justify-center rounded-full active:bg-secondary -ml-1"
              >
                <ArrowLeft className="w-4 h-4 text-foreground" strokeWidth={1.5} />
              </button>
              <span className="text-[15px] font-semibold text-foreground">{active}</span>
              <span className="text-[12px] text-muted-foreground ml-auto">{results.length}</span>
            </div>
          )}

          {/* Toolbar row */}
          <div className="px-4 py-2">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
              {/* Filter */}
              <button
                onClick={() => setFilterOpen(true)}
                className={`flex items-center gap-1.5 px-3 h-8 rounded-full border text-[12px] font-medium flex-shrink-0 ${
                  activeFilterTags.length > 0
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground active:bg-secondary"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filter
                {activeFilterTags.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-background text-foreground text-[9px] font-bold flex items-center justify-center">
                    {activeFilterTags.length}
                  </span>
                )}
              </button>

              {/* Sort */}
              <button
                onClick={() => setSortOpen(true)}
                className={`flex items-center gap-1.5 px-3 h-8 rounded-full border text-[12px] font-medium flex-shrink-0 ${
                  sortValue !== "newest"
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground active:bg-secondary"
                }`}
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                {sortValue !== "newest" ? currentSortLabel : "Sort"}
              </button>

              <div className="w-px h-5 bg-border flex-shrink-0" />

              {/* Quick filter pills */}
              {quickFilterOptions.map((qf) => {
                const isActive = filters.quickFilters.includes(qf.key);
                const Icon = qf.icon;
                return (
                  <button
                    key={qf.key}
                    onClick={() => toggleQuickFilter(qf.key)}
                    className={`flex items-center gap-1 px-2.5 h-8 rounded-full text-[11px] font-medium whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? "bg-foreground text-background"
                        : "bg-secondary text-muted-foreground active:bg-accent"
                    }`}
                  >
                    <Icon className="w-3 h-3" strokeWidth={1.5} />
                    {qf.label}
                  </button>
                );
              })}

              <div className="flex-1" />

              {/* View toggle */}
              <div className="flex items-center gap-0.5 flex-shrink-0 bg-secondary rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md ${
                    viewMode === "grid" ? "bg-card text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md ${
                    viewMode === "list" ? "bg-card text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <StretchHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Category chips — only when no category selected */}
          {!active && (
            <div className="px-4 pb-2">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                <CategoryChip label="All" active={!active} onClick={() => handleCategorySelect(null)} />
                {categories.map((cat) => (
                  <CategoryChip
                    key={cat.name}
                    label={cat.name}
                    active={active === cat.name}
                    onClick={() => handleCategorySelect(cat.name)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Subcategory pills */}
          {active && currentSubs.length > 0 && (
            <div className="px-4 pb-2">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                {currentSubs.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSub(activeSub === sub ? null : sub)}
                    className={`px-2.5 h-7 rounded-full text-[11px] font-medium whitespace-nowrap flex-shrink-0 ${
                      activeSub === sub
                        ? "bg-foreground text-background"
                        : "bg-secondary/70 text-muted-foreground active:bg-secondary"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active filter chips */}
          {activeFilterTags.length > 0 && (
            <div className="px-4 pb-2">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                {activeFilterTags.map((tag) => (
                  <button
                    key={tag.key}
                    onClick={() => removeFilterTag(tag.key)}
                    className="flex items-center gap-1 px-2 h-6 rounded-full bg-accent text-[10px] font-medium text-foreground whitespace-nowrap flex-shrink-0"
                  >
                    {tag.label}
                    <X className="w-2.5 h-2.5 text-muted-foreground" strokeWidth={1.5} />
                  </button>
                ))}
                <button
                  onClick={() => setFilters({ conditions: [], priceMin: "", priceMax: "", quickFilters: [] })}
                  className="text-[10px] text-muted-foreground active:text-foreground whitespace-nowrap flex-shrink-0"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}

          <div className="h-px bg-border/60" />
        </div>

        {/* ─── Product grid / list ─── */}
        <section className="px-4 pt-3 pb-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-4">
              {results.map((product) => (
                <div key={product.id} onClick={() => handleProductTap(product)}>
                  <ProductCard product={product} preventNavigation={isMobile} />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((product) => (
                <div key={product.id} onClick={() => handleProductTap(product)} className="cursor-pointer">
                  <ListProductCard product={product} />
                </div>
              ))}
            </div>
          )}
          {results.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[14px] text-foreground font-medium mb-1">No results</p>
              <p className="text-[12px] text-muted-foreground">Try adjusting your filters.</p>
            </div>
          )}
        </section>
      </main>

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} onApply={setFilters} />
      <SortDrawer open={sortOpen} onClose={() => setSortOpen(false)} value={sortValue} onChange={setSortValue} />
      <ProductQuickView product={quickViewProduct} open={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      <BottomNav />
    </div>
  );
};

const ListProductCard = ({ product }: { product: Product }) => (
  <div className="flex gap-3">
    <div className="relative w-24 aspect-[3/4] rounded-lg overflow-hidden bg-secondary flex-shrink-0">
      <img src={product.image} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
      {product.discount && (
        <span className="absolute top-1.5 left-1.5 bg-destructive text-destructive-foreground text-[9px] font-semibold px-1.5 py-0.5 rounded">
          -{product.discount}%
        </span>
      )}
    </div>
    <div className="flex-1 min-w-0 py-0.5">
      <div className="flex items-baseline gap-1.5 mb-0.5">
        <span className="text-[15px] font-semibold text-foreground">€{product.price.toLocaleString()}</span>
        {product.oldPrice && (
          <span className="text-[11px] text-muted-foreground line-through">€{product.oldPrice.toLocaleString()}</span>
        )}
      </div>
      <p className="text-[12px] text-foreground/80 leading-snug line-clamp-2 mb-1">{product.title}</p>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-muted-foreground">{product.seller.name}</span>
        {product.verified && <CheckCircle2 className="w-3 h-3 text-success" />}
      </div>
      {product.condition && (
        <span className="inline-block mt-1 text-[9px] font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
          {product.condition}
        </span>
      )}
    </div>
  </div>
);

export default CategoriesPage;
