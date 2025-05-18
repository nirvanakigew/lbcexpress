import { Link, useLocation } from "wouter";
import { 
  Home, 
  Package, 
  Users, 
  Settings, 
  LogOut,
  BarChart3
} from "lucide-react";

interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const [location] = useLocation();
  
  const isActive = (path: string) => location === path;
  
  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: Package,
    },
    {
      name: "Admin Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];
  
  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <Link href="/admin/dashboard">
          <a className="flex items-center">
            <div className="text-lbc-red font-bold text-2xl tracking-tight">
              LBC<span className="text-lbc-blue">Express</span>
            </div>
          </a>
        </Link>
        <p className="text-sm text-gray-500 mt-1">Admin Portal</p>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href}>
              <a 
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md 
                  ${isActive(item.href)
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <Icon 
                  className={`
                    mr-3 h-5 w-5
                    ${isActive(item.href)
                      ? "text-lbc-red"
                      : "text-gray-400 group-hover:text-gray-500"
                    }
                  `}
                />
                {item.name}
              </a>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400" />
          Logout
        </button>
      </div>
    </div>
  );
}
