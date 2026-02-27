import { Heart, CheckCircle2 } from "lucide-react";
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

interface ProductCardProps {
  product: Product;
  preventNavigation?: boolean;
}

const ProductCard = ({ product, preventNavigation = false }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const content = (
    <>
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary mb-1.5">
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-cover ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        {product.discount && (
          <span className="absolute top-1.5 left-1.5 bg-destructive text-destructive-foreground text-[9px] font-semibold px-1.5 py-0.5 rounded">
            -{product.discount}%
          </span>
        )}
        {product.condition && (
          <span className="absolute bottom-1.5 left-1.5 bg-card/90 backdrop-blur-sm text-[9px] font-medium text-foreground px-1.5 py-0.5 rounded">
            {product.condition}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
        >
          <Heart
            className={`w-3.5 h-3.5 ${liked ? "fill-destructive text-destructive" : "text-foreground/50"}`}
            strokeWidth={1.5}
          />
        </button>
      </div>

      <div>
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
        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug mt-0.5">
          {product.title}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[10px] text-muted-foreground/70">{product.seller.name}</span>
          {product.verified && (
            <CheckCircle2 className="w-2.5 h-2.5 text-success" />
          )}
        </div>
      </div>
    </>
  );

  if (preventNavigation) {
    return <div className="group block cursor-pointer">{content}</div>;
  }

  return (
    <Link to={`/product/${product.id}`} className="group block">
      {content}
    </Link>
  );
};

export default ProductCard;
