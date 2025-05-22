
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  MapPin, 
  BarChart3, 
  FileText, 
  Bell, 
  Settings, 
  Menu,
  ChevronLeft,
  Home,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "Settings functionality will be implemented in the next version.",
    });
  };

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-sidebar flex flex-col transition-all duration-300 z-30 ${
        collapsed ? "w-[4.5rem]" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          {!collapsed && (
            <div className="font-bold text-xl text-white">ProjectTrack</div>
          )}
          {collapsed && (
            <div className="font-bold text-xl text-white w-full text-center">PT</div>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-sidebar-accent"
          onClick={toggleSidebar}
        >
          {collapsed ? <Menu /> : <ChevronLeft />}
        </Button>
      </div>
      <Separator className="bg-sidebar-border" />
      <div className="flex-1 overflow-y-auto p-2">
        <nav className="space-y-1">
          <NavItem to="/" icon={Home} label="Dashboard" collapsed={collapsed} />
          <NavItem to="/projects" icon={MapPin} label="Projects" collapsed={collapsed} />
          <NavItem to="/procurement" icon={ShoppingBag} label="E-Procurement" collapsed={collapsed} />
          <NavItem to="/reports" icon={BarChart3} label="Reports" collapsed={collapsed} />
          <NavItem to="/alerts" icon={Bell} label="Alerts" collapsed={collapsed} />
          <NavItem to="/documents" icon={FileText} label="Documents" collapsed={collapsed} />
        </nav>
      </div>
      <Separator className="bg-sidebar-border" />
      <div className="p-4">
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent ${collapsed ? 'justify-center px-0' : ''}`}
          onClick={handleSettingsClick}
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Settings</span>}
        </Button>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
}

const NavItem = ({ to, icon: Icon, label, collapsed }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center px-3 py-2.5 rounded-md transition-colors
        ${isActive 
          ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
          : 'text-sidebar-foreground hover:bg-sidebar-accent'}
        ${collapsed ? 'justify-center' : ''}
      `}
      end={to === "/"}
    >
      <Icon className="flex-shrink-0 h-5 w-5" />
      {!collapsed && <span className="ml-2">{label}</span>}
    </NavLink>
  );
};

export default AppSidebar;
