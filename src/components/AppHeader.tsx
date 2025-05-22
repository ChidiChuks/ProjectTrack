
import { useState } from "react";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { getAllAlerts } from "@/data/mockData";
import { Alert } from "@/types";
import { getAlertSeverityColor, formatDate } from "@/lib/helpers";

const AppHeader = () => {
  const { toast } = useToast();
  const [showNotifications, setShowNotifications] = useState(false);
  const alerts = getAllAlerts();
  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search",
      description: "Search functionality will be implemented in the next version.",
    });
  };

  return (
    <header className="bg-white border-b border-border h-16 flex items-center justify-between px-4 sticky top-0 z-20 shadow-sm">
      <div className="flex-1 flex items-center">
        <form onSubmit={handleSearch} className="max-w-sm relative">
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 w-[300px]"
          />
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </form>
      </div>

      <div className="flex items-center gap-2">
        <NotificationsMenu 
          alerts={alerts} 
          unreadCount={unreadCount}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

interface NotificationsMenuProps {
  alerts: Alert[];
  unreadCount: number;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
}

const NotificationsMenu = ({ 
  alerts, 
  unreadCount,
  showNotifications,
  setShowNotifications 
}: NotificationsMenuProps) => {
  const { toast } = useToast();
  
  const handleAlertClick = (alert: Alert) => {
    toast({
      title: alert.title,
      description: alert.description,
    });
  };

  return (
    <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[0.7rem] bg-destructive">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          <Button variant="link" className="h-auto p-0 text-xs">Mark all as read</Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {alerts.length === 0 ? (
          <div className="py-4 px-2 text-center text-muted-foreground">
            No notifications
          </div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto">
            {alerts.map(alert => (
              <DropdownMenuItem 
                key={alert.id} 
                className="p-0 focus:bg-transparent cursor-default"
                onSelect={(e) => e.preventDefault()}
              >
                <button 
                  className={`w-full text-left p-3 flex gap-3 hover:bg-accent rounded-md transition-colors ${!alert.isRead ? 'bg-accent/20' : ''}`}
                  onClick={() => handleAlertClick(alert)}
                >
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${getAlertSeverityColor(alert.severity)}`}>
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{alert.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">{alert.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatDate(alert.createdAt)}
                    </div>
                  </div>
                </button>
              </DropdownMenuItem>
            ))}
          </div>
        )}
        <DropdownMenuSeparator />
        <Button variant="ghost" className="w-full justify-center text-primary">
          View all notifications
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppHeader;
