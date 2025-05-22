
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsMap from "@/components/ProjectsMap";
import StatCard from "@/components/StatCard";
import ProjectCard from "@/components/ProjectCard";
import TenderCard from "@/components/TenderCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects, getActiveProjects, alerts, getActiveTenders } from "@/data/mockData";
import { formatCurrency } from "@/lib/helpers";
import { BarChart3, Calendar, DollarSign, MapPin, Bell, Clock, Users } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const activeProjects = getActiveProjects();
  const activeTenders = getActiveTenders();
  const unreadAlerts = alerts.filter(alert => !alert.isRead);
  
  // Calculate total budget across all projects
  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
  
  // Calculate total spent across all projects
  const totalSpent = projects.reduce((sum, project) => sum + project.currentSpend, 0);
  
  // Calculate remaining funds
  const remainingFunds = totalBudget - totalSpent;
  
  // Calculate percentage of budget used
  const budgetUsedPercent = Math.round((totalSpent / totalBudget) * 100);

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Active Projects"
              value={activeProjects.length}
              icon={<BarChart3 size={24} />}
              trend="up"
              trendValue="10%"
            />
            <StatCard
              title="Total Budget"
              value={formatCurrency(totalBudget)}
              icon={<DollarSign size={24} />}
            />
            <StatCard
              title="Open Tenders"
              value={activeTenders.length}
              icon={<Calendar size={24} />}
            />
            <StatCard
              title="Unread Alerts"
              value={unreadAlerts.length}
              icon={<Bell size={24} />}
              trend={unreadAlerts.length > 5 ? "up" : "neutral"}
              trendValue={unreadAlerts.length > 5 ? "+3" : "0"}
            />
          </div>
          
          {/* Projects and Tenders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold">Active Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeProjects.slice(0, 4).map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Open Tenders</h2>
              <div className="space-y-4">
                {activeTenders.slice(0, 3).map(tender => (
                  <TenderCard key={tender.id} tender={tender} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Budget Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center justify-center">
                  <DollarSign className="h-10 w-10 text-primary mb-2" />
                  <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
                  <div className="text-sm text-muted-foreground">Total Budget</div>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <Clock className="h-10 w-10 text-project-amber mb-2" />
                  <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
                  <div className="text-sm text-muted-foreground">Total Spent</div>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <Users className="h-10 w-10 text-project-green mb-2" />
                  <div className="text-2xl font-bold">{formatCurrency(remainingFunds)}</div>
                  <div className="text-sm text-muted-foreground">Remaining Funds</div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <div className="text-sm">Budget Usage</div>
                  <div className="text-sm font-medium">{budgetUsedPercent}%</div>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      budgetUsedPercent > 90
                        ? "bg-project-red"
                        : budgetUsedPercent > 70
                        ? "bg-project-amber"
                        : "bg-project-green"
                    }`}
                    style={{ width: `${budgetUsedPercent}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="map" className="mt-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Project Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectsMap projects={projects} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.length > 0 ? (
                  alerts.map(alert => (
                    <Card key={alert.id} className={`${!alert.isRead ? 'bg-accent/20' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-full flex items-center justify-center ${
                            alert.severity === 'high' 
                              ? 'bg-project-red text-white' 
                              : alert.severity === 'medium'
                              ? 'bg-project-amber text-black'
                              : 'bg-project-blue text-white'
                          }`}>
                            <Bell className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{alert.title}</h4>
                              <span className="text-xs text-muted-foreground">
                                {new Date(alert.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {alert.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No alerts found.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Dashboard;
