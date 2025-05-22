
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import MilestoneTimeline from "@/components/MilestoneTimeline";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  getProjectById, 
  getMilestonesByProjectId, 
  getTendersByProjectId,
  getAlertsByProjectId 
} from "@/data/mockData";
import { 
  calculateProgressPercentage, 
  calculateTimeProgress,
  formatCurrency, 
  formatDate,
  getStatusColor
} from "@/lib/helpers";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  DollarSign,
  FileText,
  BarChart3,
  AlertCircle,
  MapPin,
  Bell
} from "lucide-react";
import TenderCard from "@/components/TenderCard";
import { Alert } from "@/types";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const project = getProjectById(projectId || "");
  const milestones = getMilestonesByProjectId(projectId || "");
  const tenders = getTendersByProjectId(projectId || "");
  const alerts = getAlertsByProjectId(projectId || "");
  
  if (!project) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The project you are looking for does not exist or has been removed.
          </p>
          <Button onClick={() => navigate("/projects")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </PageLayout>
    );
  }

  const budgetProgress = calculateProgressPercentage(project);
  const timeProgress = calculateTimeProgress(project);
  const statusColor = getStatusColor(project.status);

  const renderAlertBadge = (alert: Alert) => {
    const colorClass = 
      alert.severity === 'high' ? 'bg-project-red text-white' :
      alert.severity === 'medium' ? 'bg-project-amber text-black' :
      'bg-project-blue text-white';
    
    return <Badge className={colorClass}>{alert.severity}</Badge>;
  };

  return (
    <PageLayout>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/projects")}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge className={statusColor}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
            <div className="text-sm text-muted-foreground flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {project.location.address}
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="tenders">Tenders</TabsTrigger>
          <TabsTrigger value="alerts">
            Alerts
            {alerts.length > 0 && (
              <Badge variant="outline" className="ml-2 bg-destructive text-white h-5 w-5 flex items-center justify-center p-0">
                {alerts.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{project.description}</p>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Project Start</div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">{formatDate(project.startDate)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Project End</div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">{formatDate(project.endDate)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <div>
                          <div className="text-sm text-muted-foreground">Budget Usage</div>
                          <div className="font-medium">
                            {formatCurrency(project.currentSpend)} <span className="text-muted-foreground">of {formatCurrency(project.budget)}</span>
                          </div>
                        </div>
                        <div className="font-medium">{budgetProgress}%</div>
                      </div>
                      <Progress value={budgetProgress} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <div>
                          <div className="text-sm text-muted-foreground">Timeline Progress</div>
                          <div className="font-medium">
                            {timeProgress}%
                          </div>
                        </div>
                      </div>
                      <Progress value={timeProgress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Latest Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MilestoneTimeline milestones={milestones.slice(0, 3)} />
                  {milestones.length > 3 && (
                    <div className="mt-4 flex justify-center">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab("milestones")}
                      >
                        View All Milestones
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Project Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                      <DollarSign className="h-8 w-8 text-primary mr-3" />
                      <div>
                        <div className="text-sm text-muted-foreground">Total Budget</div>
                        <div className="font-semibold">{formatCurrency(project.budget)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                      <Clock className="h-8 w-8 text-secondary mr-3" />
                      <div>
                        <div className="text-sm text-muted-foreground">Time Remaining</div>
                        <div className="font-semibold">
                          {timeProgress >= 100 ? 'Completed' : `${100 - timeProgress}% remaining`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                      <FileText className="h-8 w-8 text-project-amber mr-3" />
                      <div>
                        <div className="text-sm text-muted-foreground">Active Tenders</div>
                        <div className="font-semibold">
                          {tenders.filter(t => t.status === "published").length}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                      <AlertCircle className="h-8 w-8 text-project-red mr-3" />
                      <div>
                        <div className="text-sm text-muted-foreground">Alerts</div>
                        <div className="font-semibold">
                          {alerts.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {alerts.length > 0 ? (
                    <div className="space-y-3">
                      {alerts.slice(0, 3).map(alert => (
                        <div 
                          key={alert.id} 
                          className={`p-3 rounded-lg border ${!alert.isRead ? 'bg-accent/20' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <div className="font-medium">{alert.title}</div>
                            {renderAlertBadge(alert)}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {alert.description}
                          </p>
                        </div>
                      ))}
                      
                      {alerts.length > 3 && (
                        <Button 
                          variant="ghost" 
                          className="w-full text-primary"
                          onClick={() => setActiveTab("alerts")}
                        >
                          View All Alerts
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-4">
                      No alerts for this project
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Project Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MilestoneTimeline milestones={milestones} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tenders" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Project Tenders</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Tender
            </Button>
          </div>
          
          {tenders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tenders.map(tender => (
                <TenderCard key={tender.id} tender={tender} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <h3 className="text-lg font-medium mb-2">No Tenders Available</h3>
                <p className="text-muted-foreground mb-6">
                  There are currently no tenders for this project.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Tender
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="alerts" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Project Alerts
              </CardTitle>
              <Button variant="outline">Mark All as Read</Button>
            </CardHeader>
            <CardContent>
              {alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map(alert => (
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
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  No alerts found for this project.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ProjectDetail;
