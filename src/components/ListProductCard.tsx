import { CheckCircle2 } from "lucide-react";
import { Product } from "@/components/ProductCard";

const ListProductCard = ({ product }: { product: Product }) => (
  <div className="flex gap-3 py-2">
    <div className="relative w-[88px] aspect-[3/4] rounded-xl overflow-hidden bg-secondary flex-shrink-0">
      <img src={product.image} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
      {product.discount && (
        <span className="absolute top-1.5 left-1.5 bg-destructive text-destructive-foreground text-[9px] font-semibold px-1.5 py-0.5 rounded">
          -{product.discount}%
        </span>
      )}
    </div>
    <div className="flex-1 min-w-0 py-0.5">
      <div className="flex items-baseline gap-1.5 mb-0.5">
        <span className="text-[15px] font-semibold text-foreground">€{product.price.toLocaleString()}</span>
        {product.oldPrice && (
          <span className="text-[11px] text-muted-foreground line-through">€{product.oldPrice.toLocaleString()}</span>
        )}
      </div>
      <p className="text-[12px] text-foreground/80 leading-snug line-clamp-2 mb-1.5">{product.title}</p>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-muted-foreground">{product.seller.name}</span>
        {product.verified && <CheckCircle2 className="w-2.5 h-2.5 text-success" />}
      </div>
      {product.condition && (
        <span className="inline-block mt-1.5 text-[9px] font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
          {product.condition}
        </span>
      )}
    </div>
  </div>
);

export default ListProductCard;
