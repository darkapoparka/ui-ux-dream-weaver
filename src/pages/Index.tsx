import { useState } from "react";
import { Laptop, Shirt, Sofa, Car, Gamepad2, Dumbbell } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import CategoryChip from "@/components/CategoryChip";
import { mockProducts } from "@/data/mockData";
import { Link } from "react-router-dom";

const tabs = ["For You", "Newest", "Trending", "Deals"];

const quickCategories = [
  { name: "Electronics", slug: "electronics", icon: Laptop },
  { name: "Fashion", slug: "fashion", icon: Shirt },
  { name: "Home", slug: "home", icon: Sofa },
  { name: "Auto", slug: "automotive", icon: Car },
  { name: "Gaming", slug: "gaming", icon: Gamepad2 },
  { name: "Sports", slug: "sports", icon: Dumbbell },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("For You");

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="max-w-7xl mx-auto">
        {/* Quick category icons — no heading, just icons */}
        <section className="px-4 pt-3 pb-2">
          <div className="flex justify-between">
            {quickCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/categories/${cat.slug}`}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div className="w-[50px] h-[50px] rounded-2xl bg-secondary flex items-center justify-center group-active:bg-accent">
                    <Icon className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Feed tabs */}
        <div className="border-t border-border">
          <section className="px-4 py-2">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
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
        </div>

        {/* Products */}
        <section className="px-4 pb-6 pt-1">
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
