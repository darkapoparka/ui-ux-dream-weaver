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
const brands = ["Apple", "Samsung", "Sony", "Nike", "Adidas", "Other"];

export interface FilterState {
  conditions: string[];
  priceMin: string;
  priceMax: string;
  quickFilters: string[];
  brands: string[];
}

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
}

const FilterDrawer = ({ open, onClose, filters, onApply }: FilterDrawerProps) => {
  const [local, setLocal] = useState<FilterState>(filters);

  const handleOpen = (o: boolean) => {
    if (o) setLocal(filters);
    if (!o) onClose();
  };

  const toggleCondition = (c: string) => {
    setLocal((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(c)
        ? prev.conditions.filter((x) => x !== c)
        : [...prev.conditions, c],
    }));
  };

  const toggleBrand = (b: string) => {
    setLocal((prev) => ({
      ...prev,
      brands: prev.brands.includes(b)
        ? prev.brands.filter((x) => x !== b)
        : [...prev.brands, b],
    }));
  };

  const activeCount =
    local.conditions.length +
    local.brands.length +
    (local.priceMin || local.priceMax ? 1 : 0);

  const clearAll = () => {
    setLocal({ conditions: [], priceMin: "", priceMax: "", quickFilters: [], brands: [] });
  };

  const handleApply = () => {
    onApply(local);
    onClose();
  };

  return (
    <Drawer open={open} onOpenChange={handleOpen}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="flex items-center justify-between px-4 py-3 border-b border-border">
          <DrawerTitle className="text-[15px] font-semibold text-foreground">Filters</DrawerTitle>
          <DrawerClose asChild>
            <button className="w-8 h-8 flex items-center justify-center rounded-full active:bg-secondary">
              <X className="w-4 h-4 text-foreground" strokeWidth={1.5} />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4 py-4 space-y-5 overflow-y-auto">
          {/* Condition */}
          <div>
            <h4 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Condition</h4>
            <div className="flex flex-wrap gap-1.5">
              {conditions.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleCondition(c)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium ${
                    local.conditions.includes(c)
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground active:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <h4 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Price</h4>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-muted-foreground">€</span>
                <input
                  type="number"
                  placeholder="Min"
                  value={local.priceMin}
                  onChange={(e) => setLocal((p) => ({ ...p, priceMin: e.target.value }))}
                  className="w-full h-10 pl-7 pr-3 rounded-xl bg-secondary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <span className="text-[11px] text-muted-foreground">to</span>
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-muted-foreground">€</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={local.priceMax}
                  onChange={(e) => setLocal((p) => ({ ...p, priceMax: e.target.value }))}
                  className="w-full h-10 pl-7 pr-3 rounded-xl bg-secondary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          {/* Brand */}
          <div>
            <h4 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Brand</h4>
            <div className="flex flex-wrap gap-1.5">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => toggleBrand(b)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium ${
                    local.brands.includes(b)
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground active:text-foreground"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border flex items-center gap-3 safe-bottom">
          <button
            onClick={clearAll}
            className="flex-1 h-11 rounded-xl border border-border text-[13px] font-medium text-foreground active:bg-secondary"
          >
            Clear{activeCount > 0 ? ` (${activeCount})` : ""}
          </button>
          <button
            onClick={handleApply}
            className="flex-1 h-11 rounded-xl bg-foreground text-background text-[13px] font-semibold active:bg-foreground/90"
          >
            Show results
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
