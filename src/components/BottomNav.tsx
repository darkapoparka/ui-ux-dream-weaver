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
      <div className="bg-card/95 backdrop-blur-md border-t border-border safe-bottom">
        <div className="flex items-center justify-around h-[56px]">
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
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
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
                <Icon className="w-[21px] h-[21px]" strokeWidth={active ? 2 : 1.5} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
