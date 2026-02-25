import { useState } from "react";
import { X } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

const conditions = ["New", "Like New", "Used"];
const sortOptions = ["Newest First", "Price: Low to High", "Price: High to Low", "Most Popular"];

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
}

const FilterDrawer = ({ open, onClose }: FilterDrawerProps) => {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("Newest First");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const toggleCondition = (c: string) => {
    setSelectedConditions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const clearAll = () => {
    setSelectedConditions([]);
    setSelectedSort("Newest First");
    setPriceMin("");
    setPriceMax("");
  };

  const activeCount = selectedConditions.length + (priceMin || priceMax ? 1 : 0) + (selectedSort !== "Newest First" ? 1 : 0);

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="flex items-center justify-between px-4 py-3 border-b border-border">
          <DrawerTitle className="text-[15px] font-semibold text-foreground">Filters</DrawerTitle>
          <DrawerClose asChild>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
              <X className="w-4 h-4 text-foreground" strokeWidth={1.5} />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4 py-4 space-y-6 overflow-y-auto">
          {/* Sort */}
          <div>
            <h4 className="text-[13px] font-semibold text-foreground mb-2.5">Sort by</h4>
            <div className="flex flex-wrap gap-1.5">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedSort(opt)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                    selectedSort === opt
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <h4 className="text-[13px] font-semibold text-foreground mb-2.5">Condition</h4>
            <div className="flex gap-1.5">
              {conditions.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleCondition(c)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                    selectedConditions.includes(c)
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <h4 className="text-[13px] font-semibold text-foreground mb-2.5">Price range</h4>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-secondary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring transition-all"
                />
              </div>
              <span className="text-[12px] text-muted-foreground">—</span>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-secondary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-4 py-3 border-t border-border flex items-center gap-3 safe-bottom">
          <button
            onClick={clearAll}
            className="flex-1 h-10 rounded-lg border border-border text-[13px] font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Clear{activeCount > 0 ? ` (${activeCount})` : ""}
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-lg bg-foreground text-background text-[13px] font-medium hover:bg-foreground/90 transition-colors"
          >
            Show results
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
