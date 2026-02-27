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
      <div className="bg-card/98 backdrop-blur-xl border-t border-border/60 rounded-t-2xl safe-bottom">
        <div className="flex items-center justify-around h-[60px] px-2">
          {items.map((item) => {
            const active = pathname === item.path;
            const Icon = item.icon;

            if (item.center) {
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-foreground text-background -mt-3"
                >
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </Link>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex flex-col items-center gap-[3px] min-w-[48px] ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-[22px] h-[22px]" strokeWidth={active ? 2 : 1.5} />
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
