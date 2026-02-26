import { Heart, Star, CheckCircle2, X, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import { Product } from "@/components/ProductCard";

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductQuickView = ({ product, open, onClose }: ProductQuickViewProps) => {
  const [liked, setLiked] = useState(false);

  if (!product) return null;

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="max-h-[85vh] focus:outline-none">
        {/* Handle bar is built into DrawerContent */}
        
        {/* Close button */}
        <DrawerClose asChild>
          <button className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-secondary hover:bg-accent transition-colors">
            <X className="w-3.5 h-3.5 text-foreground" strokeWidth={1.5} />
          </button>
        </DrawerClose>

        <div className="overflow-y-auto">
          {/* Image */}
          <div className="relative aspect-[4/3] bg-secondary overflow-hidden mx-4 rounded-lg mt-1">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.discount && (
              <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded">
                -{product.discount}%
              </span>
            )}
            {product.condition && (
              <span className="absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm text-[10px] font-medium text-foreground px-1.5 py-0.5 rounded">
                {product.condition}
              </span>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                setLiked(!liked);
              }}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
            >
              <Heart
                className={`w-4 h-4 ${liked ? "fill-destructive text-destructive" : "text-foreground/60"}`}
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Info */}
          <div className="px-4 pt-3 pb-2 space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[20px] font-bold font-display text-foreground">
                €{product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-[13px] text-muted-foreground line-through">
                  €{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[13px] text-foreground/80 leading-snug">{product.title}</p>

            {/* Seller row */}
            <div className="flex items-center gap-2 pt-1">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[9px] font-bold text-secondary-foreground">
                {product.seller.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-[12px] text-muted-foreground">{product.seller.name}</span>
              {product.verified && <CheckCircle2 className="w-3 h-3 text-success" />}
              {product.rating && (
                <>
                  <span className="text-muted-foreground/40 text-[10px]">·</span>
                  <Star className="w-2.5 h-2.5 fill-foreground/50 text-foreground/50" />
                  <span className="text-[11px] text-muted-foreground">{product.rating}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="px-4 py-3 border-t border-border flex items-center gap-3 safe-bottom">
          <Link
            to={`/product/${product.id}`}
            onClick={onClose}
            className="flex-1 h-10 rounded-lg border border-border text-[13px] font-medium text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
            View details
          </Link>
          <button className="flex-1 h-10 rounded-lg bg-foreground text-background text-[13px] font-medium hover:bg-foreground/90 transition-colors">
            Buy · €{product.price.toLocaleString()}
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductQuickView;
