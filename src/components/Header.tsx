import { useState } from "react";
import { Search, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const feedOptions = ["For You", "Newest", "Trending", "Deals"];

interface HeaderProps {
  activeFeed?: string;
  onFeedChange?: (feed: string) => void;
}

const Header = ({ activeFeed = "For You", onFeedChange }: HeaderProps) => {
  const [feedOpen, setFeedOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-card backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[44px] px-4">
        <div className="flex items-center gap-1 flex-shrink-0">
          <Link to="/" className="text-[16px] font-extrabold font-display text-foreground tracking-tight">
            treido.
          </Link>

          {/* Feed selector dropdown */}
          {onFeedChange && (
            <Popover open={feedOpen} onOpenChange={setFeedOpen}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg text-[12px] font-medium text-muted-foreground active:bg-secondary">
                  {activeFeed}
                  <ChevronDown className="w-3 h-3" strokeWidth={1.5} />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={8}
                className="w-[140px] p-1 rounded-xl border border-border bg-card shadow-sm"
              >
                {feedOptions.map((feed) => (
                  <button
                    key={feed}
                    onClick={() => {
                      onFeedChange(feed);
                      setFeedOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                      activeFeed === feed
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground active:bg-secondary"
                    }`}
                  >
                    {feed}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Search pill — opens overlay on tap */}
        <Link
          to="/search"
          className="flex items-center gap-2 h-[32px] flex-1 max-w-[240px] mx-3 px-3 rounded-full bg-secondary text-[12px] text-muted-foreground md:max-w-xs"
        >
          <Search className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
          <span className="truncate">Search products</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 mr-2">
          <Link to="/categories" className="text-[13px] font-medium text-muted-foreground hover:text-foreground">Browse</Link>
          <Link to="/categories/electronics" className="text-[13px] font-medium text-muted-foreground hover:text-foreground">Electronics</Link>
          <Link to="/categories/fashion" className="text-[13px] font-medium text-muted-foreground hover:text-foreground">Fashion</Link>
        </nav>

        <div className="flex items-center flex-shrink-0">
          <Link to="/profile" className="p-2 rounded-full active:bg-secondary">
            <Heart className="w-[18px] h-[18px] text-foreground" strokeWidth={1.5} />
          </Link>
          <button className="p-2 rounded-full active:bg-secondary relative">
            <ShoppingBag className="w-[18px] h-[18px] text-foreground" strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-brand text-brand-foreground text-[8px] font-bold rounded-full flex items-center justify-center">2</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
