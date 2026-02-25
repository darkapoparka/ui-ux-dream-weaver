import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ArrowLeft, X, Clock, TrendingUp, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import CategoryChip from "@/components/CategoryChip";
import { mockProducts } from "@/data/mockData";

const recentSearches = ["iPhone 15", "BMW", "Gaming Chair", "MacBook Pro"];
const trendingSearches = ["PlayStation 5", "Air Jordan", "Dyson", "Samsung TV", "Rolex"];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = query
    ? mockProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Search Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="flex items-center gap-3 h-14 px-4 container max-w-7xl mx-auto">
          <Link to="/" className="p-1 rounded-full hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div className="flex-1 flex items-center gap-2 px-4 h-10 rounded-full bg-secondary/80 border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-card transition-all">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(e.target.value.length > 0);
              }}
              placeholder="Search products, brands..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {query && (
              <button onClick={() => { setQuery(""); setShowResults(false); }}>
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <SlidersHorizontal className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </header>

      {!showResults ? (
        <div className="container max-w-7xl mx-auto px-4 py-6">
          {/* Recent Searches */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground font-display flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" /> Recent Searches
              </h3>
              <button className="text-xs text-primary font-medium">Clear All</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); setShowResults(true); }}
                  className="px-3 py-1.5 rounded-full bg-card border border-border text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.section>

          {/* Trending */}
          <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3 className="text-sm font-bold text-foreground font-display flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" /> Trending Now
            </h3>
            <div className="space-y-1">
              {trendingSearches.map((s, i) => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); setShowResults(true); }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-card transition-colors text-left"
                >
                  <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                  <span className="text-sm font-medium text-foreground">{s}</span>
                </button>
              ))}
            </div>
          </motion.section>
        </div>
      ) : (
        <div className="container max-w-7xl mx-auto px-4 py-4">
          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3">
            <CategoryChip label="All" active />
            <CategoryChip label="Electronics" />
            <CategoryChip label="Fashion" />
            <CategoryChip label="Home" />
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            {results.length} results for "{query}"
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {results.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">No results found</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Try different keywords or browse our categories.
              </p>
            </div>
          )}
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default SearchPage;
