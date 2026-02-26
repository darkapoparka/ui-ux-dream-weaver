import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-12 px-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button className="md:hidden -ml-1">
            <Menu className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          </button>
          <Link to="/" className="text-[17px] font-extrabold font-display text-foreground tracking-tight">
            treido.
          </Link>
        </div>

        {/* Center — Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/categories" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
            Browse
          </Link>
          <Link to="/categories/electronics" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
            Electronics
          </Link>
          <Link to="/categories/fashion" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
            Fashion
          </Link>
          <Link to="/categories/home" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-0.5">
          <Link to="/search" className="p-2 hover:bg-secondary rounded-full transition-colors">
            <Search className="w-[18px] h-[18px] text-foreground" strokeWidth={1.5} />
          </Link>
          <Link to="/profile" className="p-2 hover:bg-secondary rounded-full transition-colors">
            <Heart className="w-[18px] h-[18px] text-foreground" strokeWidth={1.5} />
          </Link>
          <button className="p-2 hover:bg-secondary rounded-full transition-colors relative">
            <ShoppingBag className="w-[18px] h-[18px] text-foreground" strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-brand text-brand-foreground text-[8px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-2.5">
        <Link
          to="/search"
          className="flex items-center gap-2 h-9 px-3 rounded-lg bg-secondary text-[13px] text-muted-foreground"
        >
          <Search className="w-4 h-4" strokeWidth={1.5} />
          Search on treido
        </Link>
      </div>
    </header>
  );
};

export default Header;
