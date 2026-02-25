import { useState } from "react";
import { ChevronRight, Laptop, Shirt, Sofa, Car, Gamepad2, Dumbbell } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import CategoryChip from "@/components/CategoryChip";
import { mockProducts } from "@/data/mockData";
import { Link } from "react-router-dom";

const tabs = ["For You", "Newest", "Trending", "Deals"];

const quickCategories = [
  { name: "Electronics", icon: Laptop },
  { name: "Fashion", icon: Shirt },
  { name: "Home", icon: Sofa },
  { name: "Automotive", icon: Car },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Sports", icon: Dumbbell },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("For You");

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />

      <main className="max-w-7xl mx-auto">
        {/* Categories */}
        <section className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-semibold text-foreground">Categories</h2>
            <Link to="/categories" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
              All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {quickCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to="/categories"
                  className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors">
                    <Icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Tabs */}
        <section className="px-4 py-3">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <CategoryChip
                key={tab}
                label={tab}
                active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="px-4 pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-5">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
