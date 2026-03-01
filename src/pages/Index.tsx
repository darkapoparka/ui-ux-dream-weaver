import { useState, useRef } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { mockProducts, categories } from "@/data/mockData";
import { Link } from "react-router-dom";

const feedTabs = ["For You", "Newest", "Trending", "Deals"];

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("For You");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const filteredProducts = activeCategory
    ? mockProducts.filter((p) => p.category === activeCategory)
    : mockProducts;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

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

        {/* Feed tabs — underline style */}
        <div className="px-4">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide relative">
            {feedTabs.map((tab) => (
              <button
                key={tab}
                ref={(el) => { tabRefs.current[tab] = el; }}
                onClick={() => setActiveTab(tab)}
                className={`relative px-3.5 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "text-foreground"
                    : "text-muted-foreground active:text-foreground"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-foreground rounded-full" />
                )}
              </button>
            ))}
          </div>
          <div className="h-px bg-border/60 -mt-px" />
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

      <BottomNav />
    </div>
  );
};

export default Index;
