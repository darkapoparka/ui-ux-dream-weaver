import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, X, Plus } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { categories } from "@/data/mockData";
import { z } from "zod";

const conditions = ["New", "Like New", "Used"];

const sellSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(120, "Title must be less than 120 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(2000, "Description must be less than 2000 characters"),
  price: z.number().min(1, "Price must be at least €1").max(999999, "Price must be less than €1,000,000"),
  category: z.string().min(1, "Please select a category"),
  condition: z.string().min(1, "Please select a condition"),
});

type SellFormData = z.infer<typeof sellSchema>;

const SellPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof SellFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleImageAdd = () => {
    // Mock image addition with placeholder
    const placeholders = [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    ];
    if (images.length < 8) {
      setImages([...images, placeholders[images.length % placeholders.length]]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const result = sellSchema.safeParse({
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price) || 0,
      category,
      condition,
    });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SellFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof SellFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-[15px] font-semibold text-foreground mb-1">Listed successfully</p>
          <p className="text-[13px] text-muted-foreground mb-5">Your item is now visible to buyers.</p>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-lg bg-foreground text-background text-[13px] font-medium hover:bg-foreground/90 transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between h-12 px-4">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors -ml-1">
            <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          </button>
          <span className="text-[15px] font-semibold text-foreground">New Listing</span>
          <div className="w-8" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-4 space-y-5">
        {/* Photos */}
        <div>
          <label className="text-[13px] font-semibold text-foreground mb-2.5 block">
            Photos <span className="text-muted-foreground font-normal">({images.length}/8)</span>
          </label>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={handleImageAdd}
              className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 flex-shrink-0 hover:border-muted-foreground hover:bg-secondary/50 transition-all"
            >
              <Camera className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-[10px] text-muted-foreground">Add</span>
            </button>
            {images.map((img, i) => (
              <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-secondary">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-foreground/70 flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-background" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 text-[9px] font-medium text-background bg-foreground/60 px-1 py-0.5 rounded">
                    Cover
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-[13px] font-semibold text-foreground mb-1.5 block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. iPhone 15 Pro Max 256GB"
            maxLength={120}
            className="w-full h-10 px-3 rounded-lg bg-secondary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring transition-all"
          />
          {errors.title && <p className="text-[11px] text-destructive mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="text-[13px] font-semibold text-foreground mb-1.5 block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your item — condition, features, reason for selling..."
            maxLength={2000}
            rows={4}
            className="w-full px-3 py-2.5 rounded-lg bg-secondary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring transition-all resize-none leading-relaxed"
          />
          <div className="flex justify-between mt-1">
            {errors.description ? (
              <p className="text-[11px] text-destructive">{errors.description}</p>
            ) : (
              <span />
            )}
            <span className="text-[11px] text-muted-foreground">{description.length}/2000</span>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="text-[13px] font-semibold text-foreground mb-1.5 block">Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-muted-foreground">€</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              min={0}
              max={999999}
              className="w-full h-10 pl-7 pr-3 rounded-lg bg-secondary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          {errors.price && <p className="text-[11px] text-destructive mt-1">{errors.price}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="text-[13px] font-semibold text-foreground mb-2 block">Category</label>
          <div className="flex flex-wrap gap-1.5">
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                  category === cat.name
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          {errors.category && <p className="text-[11px] text-destructive mt-1">{errors.category}</p>}
        </div>

        {/* Condition */}
        <div>
          <label className="text-[13px] font-semibold text-foreground mb-2 block">Condition</label>
          <div className="flex gap-1.5">
            {conditions.map((c) => (
              <button
                key={c}
                onClick={() => setCondition(c)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                  condition === c
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          {errors.condition && <p className="text-[11px] text-destructive mt-1">{errors.condition}</p>}
        </div>
      </main>

      {/* Sticky bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-bottom">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <button
            onClick={handleSubmit}
            className="w-full h-11 rounded-xl bg-foreground text-background text-[14px] font-semibold hover:bg-foreground/90 transition-colors"
          >
            List Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
