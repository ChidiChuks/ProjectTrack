import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import MilestoneTimeline from "@/components/MilestoneTimeline";
import { projects } from "@/data/mockData";
import {
  Clock,
  MapPin,
  DollarSign,
  FileText,
  BarChart2,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Plus,
} from "lucide-react";
import { formatCurrency, formatDate, getStatusColor, calculateProgressPercentage, calculateTimeProgress } from "@/lib/helpers";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <PageLayout>
        <div>Project not found</div>
      </PageLayout>
    );
  }

  const budgetProgress = calculateProgressPercentage(project);
  const timeProgress = calculateTimeProgress(project);

  return (
    <PageLayout>
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Edit Project
          </Button>
        </div>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-sm font-medium">Status</div>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </div>
            <div>
              <div className="text-sm font-medium">Budget</div>
              <div className="font-bold">{formatCurrency(project.budget)}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Start Date</div>
              <div>{formatDate(project.startDate)}</div>
            </div>
            <div>
              <div className="text-sm font-medium">End Date</div>
              <div>{formatDate(project.endDate)}</div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Budget Progress</span>
              </div>
              <Progress value={budgetProgress} />
              <p className="text-sm mt-2 text-muted-foreground">
                {formatCurrency(project.currentSpend)} / {formatCurrency(project.budget)}
              </p>
            </div>
            <div>
              <div className="mb-2 flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Time Progress</span>
              </div>
              <Progress value={timeProgress} />
              <p className="text-sm mt-2 text-muted-foreground">
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline">
            <Clock className="h-4 w-4 mr-2" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="reports">
            <BarChart2 className="h-4 w-4 mr-2" />
            Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="timeline" className="space-y-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <MilestoneTimeline milestones={project.milestones} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Project Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              {project.alerts.length === 0 ? (
                <div className="text-center py-4">No alerts found.</div>
              ) : (
                <ul>
                  {project.alerts.map((alert) => (
                    <li key={alert.id} className="py-2 border-b last:border-none">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{alert.message}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(alert.date)}
                          </div>
                        </div>
                        <Badge variant="secondary">{alert.type}</Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Project Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {project.documents.length === 0 ? (
                <div className="text-center py-4">No documents found.</div>
              ) : (
                <ul>
                  {project.documents.map((doc) => (
                    <li key={doc.id} className="py-2 border-b last:border-none">
                      <Link to={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {doc.type} - {formatDate(doc.uploadDate)}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Project Reports</CardTitle>
            </CardHeader>
            <CardContent>
              {project.reports.length === 0 ? (
                <div className="text-center py-4">No reports found.</div>
              ) : (
                <ul>
                  {project.reports.map((report) => (
                    <li key={report.id} className="py-2 border-b last:border-none">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {report.type} - {formatDate(report.date)}
                          </div>
                        </div>
                        <Button variant="outline">Download</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ProjectDetail;
