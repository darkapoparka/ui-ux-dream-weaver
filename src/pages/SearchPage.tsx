import { useState, useRef, useEffect } from "react";
import { Search, ArrowLeft, X, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import CategoryChip from "@/components/CategoryChip";
import { mockProducts } from "@/data/mockData";

const recent = ["iPhone 15", "BMW", "Gaming Chair", "MacBook Pro"];
const trending = ["PlayStation 5", "Air Jordan", "Dyson", "Samsung TV", "Rolex"];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = query
    ? mockProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const hasQuery = query.length > 0;

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* Search header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center gap-2 h-12 px-4">
          <Link to="/" className="-ml-1">
            <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          </Link>
          <div className="flex-1 flex items-center gap-2 h-9 px-3 rounded-lg bg-secondary focus-within:ring-1 focus-within:ring-ring transition-all">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search on treido"
              className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4">
        {!hasQuery ? (
          <>
            {/* Recent */}
            <section className="pt-5 pb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-foreground flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                  Recent
                </h3>
                <button className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recent.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1.5 rounded-full bg-secondary text-[13px] text-secondary-foreground hover:bg-accent transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            {/* Trending */}
            <section className="pb-4">
              <h3 className="text-[13px] font-semibold text-foreground flex items-center gap-1.5 mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                Trending
              </h3>
              <div className="divide-y divide-border">
                {trending.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="flex items-center gap-3 w-full py-2.5 text-left hover:bg-secondary/50 transition-colors -mx-1 px-1 rounded"
                  >
                    <span className="text-[12px] font-semibold text-muted-foreground w-4 text-center">{i + 1}</span>
                    <span className="text-[13px] text-foreground">{s}</span>
                  </button>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Filter chips */}
            <div className="flex gap-1.5 pt-3 pb-2 overflow-x-auto scrollbar-hide">
              <CategoryChip label="All" active />
              <CategoryChip label="Electronics" />
              <CategoryChip label="Fashion" />
              <CategoryChip label="Home" />
            </div>

            <p className="text-[13px] text-muted-foreground py-2">
              {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
            </p>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-5 pb-6">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-[13px] text-muted-foreground">No results found. Try something different.</p>
              </div>
            )}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default SearchPage;
