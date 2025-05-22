
import { Milestone } from "@/types";
import { formatDate, getMilestoneStatusColor } from "@/lib/helpers";
import { Check, Clock, AlertCircle } from "lucide-react";

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

const MilestoneTimeline = ({ milestones }: MilestoneTimelineProps) => {
  // Sort milestones by date
  const sortedMilestones = [...milestones].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  if (sortedMilestones.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No milestones found for this project.
      </div>
    );
  }

  return (
    <div className="relative ml-6">
      {/* Timeline vertical line */}
      <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-border -ml-5"></div>

      {/* Milestones */}
      <div className="space-y-8">
        {sortedMilestones.map((milestone, index) => (
          <div key={milestone.id} className="relative pl-10">
            {/* Status indicator */}
            <div
              className={`absolute left-0 w-10 h-10 rounded-full ${getMilestoneStatusColor(milestone.status)} flex items-center justify-center -ml-5 z-10`}
            >
              {milestone.status === "completed" ? (
                <Check className="h-5 w-5 text-white" />
              ) : milestone.status === "delayed" ? (
                <AlertCircle className="h-5 w-5 text-white" />
              ) : (
                <Clock className="h-5 w-5 text-white" />
              )}
            </div>

            {/* Milestone content */}
            <div className="bg-white rounded-lg border p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{milestone.name}</h3>
                <div className="text-sm text-muted-foreground">
                  {formatDate(milestone.date)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneTimeline;
