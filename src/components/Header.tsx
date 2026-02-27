import { Search, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-card backdrop-blur-xl border-b border-border/50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[44px] px-4">
        <Link to="/" className="text-[16px] font-extrabold font-display text-foreground tracking-tight">
          treido.
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/categories" className="text-[13px] font-medium text-muted-foreground hover:text-foreground">Browse</Link>
          <Link to="/categories/electronics" className="text-[13px] font-medium text-muted-foreground hover:text-foreground">Electronics</Link>
          <Link to="/categories/fashion" className="text-[13px] font-medium text-muted-foreground hover:text-foreground">Fashion</Link>
          <Link to="/categories/home" className="text-[13px] font-medium text-muted-foreground hover:text-foreground">Home</Link>
        </nav>

        <div className="flex items-center">
          <Link to="/search" className="p-2 rounded-full active:bg-secondary">
            <Search className="w-[18px] h-[18px] text-foreground" strokeWidth={1.5} />
          </Link>
          <Link to="/profile" className="p-2 rounded-full active:bg-secondary">
            <Heart className="w-[18px] h-[18px] text-foreground" strokeWidth={1.5} />
          </Link>
          <button className="p-2 rounded-full active:bg-secondary relative">
            <ShoppingBag className="w-[18px] h-[18px] text-foreground" strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-brand text-brand-foreground text-[8px] font-bold rounded-full flex items-center justify-center">2</span>
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 pb-2.5">
        <Link
          to="/search"
          className="flex items-center gap-2 h-[36px] px-3 rounded-xl bg-secondary text-[13px] text-muted-foreground"
        >
          <Search className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
          Search on treido
        </Link>
      </div>
    </header>
  );
};

export default Header;
