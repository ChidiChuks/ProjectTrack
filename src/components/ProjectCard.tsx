
import { Project } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency, getStatusColor, formatDate, calculateProgressPercentage } from "@/lib/helpers";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const progressValue = calculateProgressPercentage(project);
  const statusColor = getStatusColor(project.status);

  const statusLabel = project.status.charAt(0).toUpperCase() + project.status.slice(1);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link to={`/projects/${project.id}`} className="block h-full">
        <div className={`h-2 w-full ${statusColor}`}></div>
        <CardContent className="pt-5">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-1">{project.name}</h3>
            <Badge variant="outline" className={`${statusColor} text-white`}>
              {statusLabel}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 h-10">
            {project.description}
          </p>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Budget: {formatCurrency(project.budget)}</span>
                <span className="font-medium">{progressValue}%</span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Progress value={progressValue} className="h-2" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Spent: {formatCurrency(project.currentSpend)}</p>
                    <p>Remaining: {formatCurrency(project.budget - project.currentSpend)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="truncate">{project.location.address}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t bg-muted/30 flex items-center justify-between py-2">
          <div className="flex gap-6 text-xs text-muted-foreground">
            <div>
              <span className="block">Start</span>
              <span className="block font-medium text-foreground">
                {formatDate(project.startDate)}
              </span>
            </div>
            <div>
              <span className="block">End</span>
              <span className="block font-medium text-foreground">
                {formatDate(project.endDate)}
              </span>
            </div>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProjectCard;
