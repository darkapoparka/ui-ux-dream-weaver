import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Clock,
  Eye,
  Tag,
  MapPin,
  ShoppingCart,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/data/mockData";

const CollapsibleSection = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3.5 px-4 text-left"
      >
        <span className="text-[14px] font-medium text-foreground">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

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
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors flex-shrink-0 -ml-1">
            <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          </button>
          {/* Seller avatar + title in header */}
          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[9px] font-bold text-secondary-foreground flex-shrink-0">
            {product.seller.name.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-[13px] font-medium text-foreground truncate">{product.title}</span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
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
          {/* Wishlist floating on image */}
          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center md:hidden"
          >
            <Heart className={`w-[18px] h-[18px] ${liked ? "fill-destructive text-destructive" : "text-foreground/70"}`} strokeWidth={1.5} />
          </button>
        </div>

        {/* Drawer-style content card */}
        <div className="relative -mt-4 bg-card rounded-t-2xl border-t border-border md:mt-0 md:rounded-none md:border-t-0">
          {/* Drag handle visual */}
          <div className="flex justify-center pt-2.5 pb-1 md:hidden">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* Category + meta row */}
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
              <Link
                to={`/categories/${product.category.toLowerCase()}`}
                className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {product.category}
              </Link>
              {product.condition && (
                <>
                  <span className="text-muted-foreground/40 text-[10px]">·</span>
                  <span className="text-[12px] text-muted-foreground">{product.condition}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" strokeWidth={1.5} />
                {product.timeAgo}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" strokeWidth={1.5} />
                {Math.floor(Math.random() * 50) + 5}
              </span>
            </div>
          </div>

          {/* Price + Title */}
          <div className="px-4 pb-3">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[24px] font-bold font-display text-foreground">
                {product.price.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
              </span>
              {product.oldPrice && (
                <span className="text-[14px] text-muted-foreground line-through">
                  {product.oldPrice.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
                </span>
              )}
            </div>
            <h1 className="text-[15px] text-foreground/80 leading-snug">{product.title}</h1>
            {product.condition && (
              <span className="inline-block mt-2 px-2.5 py-1 rounded-full bg-secondary text-[11px] font-medium text-muted-foreground">
                {product.condition === "Like New" ? "Използвано - отлично" : product.condition === "New" ? "Ново" : "Използвано"}
              </span>
            )}
            <div className="flex items-center gap-1.5 mt-2 text-[12px] text-muted-foreground">
              <MapPin className="w-3 h-3" strokeWidth={1.5} />
              <span>Местоположение предстои</span>
              <span className="text-muted-foreground/40">·</span>
              <Clock className="w-3 h-3" strokeWidth={1.5} />
              <span>{product.timeAgo}</span>
            </div>
          </div>

          {/* Collapsible sections */}
          <CollapsibleSection title="Всички спецификации">
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
          </CollapsibleSection>

          <CollapsibleSection title="Описание">
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Great condition item, barely used. Everything works perfectly. Comes with all original accessories and packaging. Local pickup available or can ship nationwide.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="Доставка">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-foreground">Standard shipping</span>
                <span className="text-[13px] text-muted-foreground">€5.99</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-foreground">Express shipping</span>
                <span className="text-[13px] text-muted-foreground">€12.99</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-foreground">Local pickup</span>
                <span className="text-[13px] text-success font-medium">Free</span>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Продавач">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-[13px] font-bold text-secondary-foreground">
                {product.seller.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-semibold text-foreground">{product.seller.name}</span>
                  {product.verified && <CheckCircle2 className="w-3.5 h-3.5 text-success" />}
                </div>
                {product.rating && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 fill-foreground text-foreground" />
                    <span className="text-[11px] text-muted-foreground">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                )}
              </div>
              <Link
                to="/profile"
                className="flex items-center gap-0.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
              >
                View <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </CollapsibleSection>

          {/* Related */}
          {related.length > 0 && (
            <div className="px-4 py-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[14px] font-semibold text-foreground">Similar listings</h3>
                <Link to={`/categories/${product.category.toLowerCase()}`} className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
                  See all
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-5">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky bottom bar — like reference image */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-bottom md:max-w-7xl md:mx-auto md:left-auto md:right-auto">
        <div className="flex items-center gap-3 px-4 py-2.5">
          <button className="flex items-center gap-2 px-4 h-11 rounded-xl border border-border hover:bg-secondary transition-colors flex-shrink-0">
            <MessageCircle className="w-4.5 h-4.5 text-foreground" strokeWidth={1.5} />
            <span className="text-[13px] font-medium text-foreground">Чат</span>
          </button>
          <button className="flex-1 h-11 rounded-xl bg-foreground text-background text-[14px] font-semibold hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
            Добави · {product.price.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
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
