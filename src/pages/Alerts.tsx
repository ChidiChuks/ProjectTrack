
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Alert } from "@/types";
import { getAllAlerts, getProjectById } from "@/data/mockData";
import { formatDate, getAlertSeverityColor } from "@/lib/helpers";
import {
  Bell,
  BellOff,
  ChevronDown,
  Clock,
  DollarSign,
  Filter,
  Info,
  Search,
  CheckCircle,
} from "lucide-react";

const Alerts = () => {
  const allAlerts = getAllAlerts();
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [readFilter, setReadFilter] = useState("all");

  const filteredAlerts = allAlerts.filter((alert) => {
    // Apply search filter
    if (
      searchQuery &&
      !alert.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !alert.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Apply severity filter
    if (severityFilter !== "all" && alert.severity !== severityFilter) {
      return false;
    }

    // Apply type filter
    if (typeFilter !== "all" && alert.type !== typeFilter) {
      return false;
    }

    // Apply read/unread filter
    if (readFilter === "read" && !alert.isRead) {
      return false;
    }
    if (readFilter === "unread" && alert.isRead) {
      return false;
    }

    return true;
  });

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "delay":
        return <Clock className="h-4 w-4" />;
      case "budget":
        return <DollarSign className="h-4 w-4" />;
      case "general":
        return <Info className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getAlertType = (type: Alert["type"]) => {
    switch (type) {
      case "delay":
        return "Schedule Delay";
      case "budget":
        return "Budget Issue";
      case "general":
        return "General Info";
      default:
        return "Notification";
    }
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Alerts</h1>
          <p className="text-muted-foreground mt-1">
            View and manage project notifications
          </p>
        </div>
        <Button 
          variant="outline"
          onClick={() => {
            // Mark all as read functionality would go here
          }}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark All as Read
        </Button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Severity
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSeverityFilter("all")}>
                All Severities
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSeverityFilter("low")}>
                Low
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSeverityFilter("medium")}>
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSeverityFilter("high")}>
                High
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Bell className="h-4 w-4 mr-2" />
                Type
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTypeFilter("all")}>
                All Types
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("delay")}>
                Schedule Delays
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("budget")}>
                Budget Issues
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("general")}>
                General Info
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <BellOff className="h-4 w-4 mr-2" />
                Status
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setReadFilter("all")}>
                All Alerts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setReadFilter("read")}>
                Read
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setReadFilter("unread")}>
                Unread
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Alert Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAlerts.length > 0 ? (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => {
                const project = getProjectById(alert.projectId);
                
                return (
                  <Card key={alert.id} className={`${!alert.isRead ? 'bg-accent/20' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full flex items-center justify-center ${getAlertSeverityColor(alert.severity)}`}>
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold">{alert.title}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-1 rounded-full bg-muted">
                                {getAlertType(alert.type)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(alert.createdAt)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {alert.description}
                          </p>
                          <div className="text-xs">
                            <span className="text-muted-foreground">Project: </span>
                            <a href={`/projects/${alert.projectId}`} className="font-medium text-primary hover:underline">
                              {project?.name || "Unknown Project"}
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="py-10 text-center">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-lg font-medium mt-4 mb-2">No Alerts Found</h3>
              <p className="text-muted-foreground">
                No alerts match your current search and filter criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Alerts;
