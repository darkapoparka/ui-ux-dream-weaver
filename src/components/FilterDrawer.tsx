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

export interface FilterState {
  conditions: string[];
  priceMin: string;
  priceMax: string;
  quickFilters: string[];
}

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
}

const FilterDrawer = ({ open, onClose, filters, onApply }: FilterDrawerProps) => {
  const [local, setLocal] = useState<FilterState>(filters);

  // Sync when opening
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

  const activeCount =
    local.conditions.length +
    (local.priceMin || local.priceMax ? 1 : 0);

  const clearAll = () => {
    setLocal({ conditions: [], priceMin: "", priceMax: "", quickFilters: [] });
  };

  const handleApply = () => {
    onApply(local);
    onClose();
  };

  return (
    <Drawer open={open} onOpenChange={handleOpen}>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="flex items-center justify-between px-4 py-3 border-b border-border">
          <DrawerTitle className="text-[15px] font-semibold text-foreground">Filters</DrawerTitle>
          <DrawerClose asChild>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
              <X className="w-4 h-4 text-foreground" strokeWidth={1.5} />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4 py-4 space-y-6 overflow-y-auto">
          {/* Condition */}
          <div>
            <h4 className="text-[13px] font-semibold text-foreground mb-2.5">Condition</h4>
            <div className="flex gap-1.5">
              {conditions.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleCondition(c)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                    local.conditions.includes(c)
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
              <input
                type="number"
                placeholder="Min €"
                value={local.priceMin}
                onChange={(e) => setLocal((p) => ({ ...p, priceMin: e.target.value }))}
                className="flex-1 h-10 px-3 rounded-lg bg-secondary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring transition-all"
              />
              <span className="text-[12px] text-muted-foreground">—</span>
              <input
                type="number"
                placeholder="Max €"
                value={local.priceMax}
                onChange={(e) => setLocal((p) => ({ ...p, priceMax: e.target.value }))}
                className="flex-1 h-10 px-3 rounded-lg bg-secondary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring transition-all"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border flex items-center gap-3 safe-bottom">
          <button
            onClick={clearAll}
            className="flex-1 h-10 rounded-lg border border-border text-[13px] font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Clear{activeCount > 0 ? ` (${activeCount})` : ""}
          </button>
          <button
            onClick={handleApply}
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
