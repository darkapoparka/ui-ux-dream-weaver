import { Home, Search, Plus, MessageCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Plus, label: "Sell", path: "#", center: true },
  { icon: MessageCircle, label: "Messages", path: "#" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-card/95 backdrop-blur-md border-t border-border rounded-t-2xl safe-bottom">
        <div className="flex items-center justify-around h-[58px]">
          {items.map((item) => {
            const active = pathname === item.path;
            const Icon = item.icon;

            if (item.center) {
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground -mt-4 shadow-sm"
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </Link>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-[22px] h-[22px]" strokeWidth={active ? 2 : 1.5} />
                <span className={active ? "text-[10px]" : "text-[10px]"}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
