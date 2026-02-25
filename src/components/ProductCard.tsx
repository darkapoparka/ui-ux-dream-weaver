import { Heart, Star, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
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
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div className="bg-card rounded-2xl shadow-card overflow-hidden transition-all duration-200 group-hover:shadow-card-hover group-hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Discount Badge */}
            {product.discount && (
              <span className="absolute top-2.5 left-2.5 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-md">
                -{product.discount}%
              </span>
            )}
            {/* Wishlist */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setLiked(!liked);
              }}
              className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-card/70 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-card hover:scale-110 active:scale-95"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  liked ? "fill-destructive text-destructive" : "text-foreground/60"
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-3">
            {/* Category */}
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
              {product.category}
            </p>

            {/* Seller */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[9px] font-bold text-secondary-foreground overflow-hidden">
                {product.seller.avatar ? (
                  <img src={product.seller.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  product.seller.name.slice(0, 2).toUpperCase()
                )}
              </div>
              <span className="text-xs font-medium text-muted-foreground">{product.seller.name}</span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-card-foreground line-clamp-2 leading-snug mb-2">
              {product.title}
            </h3>

            {/* Price Row */}
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-base font-extrabold text-card-foreground tracking-tight font-display">
                €{product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  €{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {product.rating && (
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {product.rating}
                      {product.reviewCount && ` (${product.reviewCount})`}
                    </span>
                  </div>
                )}
                {product.verified && (
                  <div className="flex items-center gap-0.5 text-success">
                    <CheckCircle2 className="w-3 h-3" />
                    <span className="text-[11px] font-medium">Verified</span>
                  </div>
                )}
              </div>
              <span className="text-[11px] text-muted-foreground">{product.timeAgo}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
