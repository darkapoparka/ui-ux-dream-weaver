import { Check } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "popular", label: "Most Popular" },
];

interface SortDrawerProps {
  open: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
}

const SortDrawer = ({ open, onClose, value, onChange }: SortDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="max-h-[50vh]">
        <DrawerHeader className="px-4 py-3 border-b border-border">
          <DrawerTitle className="text-[15px] font-semibold text-foreground">Sort by</DrawerTitle>
        </DrawerHeader>
        <div className="py-1">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                onClose();
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-secondary/50 transition-colors"
            >
              <span className={`text-[14px] ${value === opt.value ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                {opt.label}
              </span>
              {value === opt.value && (
                <Check className="w-4 h-4 text-foreground" strokeWidth={2} />
              )}
            </button>
          ))}
        </div>
        <div className="safe-bottom" />
      </DrawerContent>
    </Drawer>
  );
};

export default SortDrawer;
export { sortOptions };
