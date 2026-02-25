import { Search, Heart, ShoppingCart, Menu, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="container max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center gap-3 h-14 px-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xl font-extrabold font-display text-foreground tracking-tight">
              treido<span className="text-primary">.</span>
            </h1>
          </Link>

          {/* Search — Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-auto relative">
            <div
              className={`w-full flex items-center gap-2 px-4 h-10 rounded-full border transition-all ${
                searchFocused
                  ? "border-primary ring-2 ring-primary/20 bg-card"
                  : "border-border bg-secondary/60"
              }`}
            >
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Search products, brands, and more..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto">
            <Link to="/search" className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors">
              <Search className="w-5 h-5 text-foreground" />
            </Link>
            <Link to="/profile" className="p-2 rounded-full hover:bg-secondary transition-colors">
              <Heart className="w-5 h-5 text-foreground" />
            </Link>
            <Link to="/profile" className="hidden md:flex p-2 rounded-full hover:bg-secondary transition-colors">
              <User className="w-5 h-5 text-foreground" />
            </Link>
            <button className="p-2 rounded-full hover:bg-secondary transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <Link
            to="/search"
            className="flex items-center gap-2.5 px-4 h-10 rounded-full bg-secondary/80 border border-border/50"
          >
            <Search className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Search products...</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
