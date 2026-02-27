import { Home, Search, Plus, MessageCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Plus, label: "Sell", path: "/sell", center: true },
  { icon: MessageCircle, label: "Messages", path: "#" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-card backdrop-blur-xl border-t border-border/50 rounded-t-[20px] safe-bottom shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-around h-[56px] px-4">
          {items.map((item) => {
            const active = pathname === item.path;
            const Icon = item.icon;

            if (item.center) {
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background"
                >
                  <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                </Link>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex flex-col items-center gap-[2px] min-w-[44px] ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={active ? 2 : 1.5} />
                <span className="text-[9px] font-medium leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
