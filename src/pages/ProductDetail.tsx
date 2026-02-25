import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  CheckCircle2,
  Shield,
  MapPin,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/data/mockData";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-[15px] font-semibold text-foreground mb-1">Product not found</p>
          <p className="text-[13px] text-muted-foreground mb-4">This listing may have been removed.</p>
          <Link to="/" className="text-[13px] font-medium text-foreground underline underline-offset-4">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const related = mockProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Floating top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-12 bg-card/90 backdrop-blur-md border-b border-border md:max-w-7xl md:mx-auto">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors -ml-1">
          <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLiked(!liked)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
          >
            <Heart className={`w-[18px] h-[18px] ${liked ? "fill-destructive text-destructive" : "text-foreground"}`} strokeWidth={1.5} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
            <Share2 className="w-[18px] h-[18px] text-foreground" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto pt-12">
        {/* Image */}
        <div className="relative aspect-[4/5] md:aspect-[16/9] bg-secondary overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
          />
          {product.condition && (
            <span className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm text-[11px] font-medium text-foreground px-2 py-1 rounded-md">
              {product.condition}
            </span>
          )}
          {product.discount && (
            <span className="absolute bottom-3 right-3 bg-destructive text-destructive-foreground text-[11px] font-semibold px-2 py-1 rounded-md">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Content */}
        <div className="px-4 pt-4 space-y-5">
          {/* Price + Title */}
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[22px] font-bold font-display text-foreground">
                €{product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-[14px] text-muted-foreground line-through">
                  €{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>
            <h1 className="text-[15px] text-foreground/80 leading-snug">{product.title}</h1>
            <p className="text-[12px] text-muted-foreground mt-1.5">{product.timeAgo} ago · {product.category}</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Seller */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-[12px] font-bold text-secondary-foreground">
              {product.seller.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-semibold text-foreground">{product.seller.name}</span>
                {product.verified && <CheckCircle2 className="w-3.5 h-3.5 text-success" />}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                {product.rating && (
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-foreground text-foreground" />
                    <span className="text-[11px] text-muted-foreground">{product.rating}</span>
                    {product.reviewCount && (
                      <span className="text-[11px] text-muted-foreground">({product.reviewCount})</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <Link
              to="/profile"
              className="flex items-center gap-0.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
            >
              View <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Details */}
          <div>
            <h3 className="text-[13px] font-semibold text-foreground mb-2.5">Details</h3>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              <div>
                <p className="text-[11px] text-muted-foreground">Condition</p>
                <p className="text-[13px] text-foreground font-medium">{product.condition || "Not specified"}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Category</p>
                <p className="text-[13px] text-foreground font-medium">{product.category}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Listed</p>
                <p className="text-[13px] text-foreground font-medium">{product.timeAgo} ago</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Shipping</p>
                <p className="text-[13px] text-foreground font-medium">Available</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Description placeholder */}
          <div>
            <h3 className="text-[13px] font-semibold text-foreground mb-2">Description</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Great condition item, barely used. Everything works perfectly. Comes with all original accessories and packaging. Local pickup available in Sofia or can ship nationwide. Feel free to message me for more details or to make an offer.
            </p>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <>
              <div className="h-px bg-border" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[13px] font-semibold text-foreground">Similar listings</h3>
                  <Link to="/categories" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
                    See all
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-5">
                  {related.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-bottom md:max-w-7xl md:mx-auto md:left-auto md:right-auto">
        <div className="flex items-center gap-3 px-4 py-3">
          <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-border hover:bg-secondary transition-colors flex-shrink-0">
            <MessageCircle className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          </button>
          <button className="flex-1 h-11 rounded-xl bg-foreground text-background text-[14px] font-semibold hover:bg-foreground/90 transition-colors">
            Buy Now · €{product.price.toLocaleString()}
          </button>
        </div>
      </div>

      <div className="hidden md:block">
        <BottomNav />
      </div>
    </div>
  );
};

export default ProductDetail;
