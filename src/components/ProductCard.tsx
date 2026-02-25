import { Heart, Star, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  category: string;
  seller: { name: string; avatar?: string };
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  timeAgo: string;
  condition?: "New" | "Used" | "Like New";
}

const ProductCard = ({ product }: { product: Product }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Link to={`/product/${product.id}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary mb-2">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
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
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            className={`w-3.5 h-3.5 ${liked ? "fill-destructive text-destructive" : "text-foreground/60"}`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="space-y-0.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[14px] font-semibold text-foreground">
            €{product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] text-muted-foreground line-through">
              €{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
        <p className="text-[12px] text-muted-foreground line-clamp-2 leading-snug">
          {product.title}
        </p>
        <div className="flex items-center gap-1 pt-0.5">
          <span className="text-[11px] text-muted-foreground/70">{product.seller.name}</span>
          {product.verified && (
            <CheckCircle2 className="w-3 h-3 text-success" />
          )}
          {product.rating && (
            <>
              <span className="text-muted-foreground/40 text-[10px]">·</span>
              <Star className="w-2.5 h-2.5 fill-foreground/50 text-foreground/50" />
              <span className="text-[11px] text-muted-foreground/70">{product.rating}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
