
import { Link } from "react-router-dom";
import { Tender } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/helpers";
import { Calendar, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TenderCardProps {
  tender: Tender;
}

const TenderCard = ({ tender }: TenderCardProps) => {
  const getStatusBadge = (status: Tender["status"]) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "published":
        return <Badge variant="default" className="bg-project-blue">Open</Badge>;
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
      case "awarded":
        return <Badge className="bg-project-green">Awarded</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold line-clamp-1">{tender.title}</h3>
          {getStatusBadge(tender.status)}
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {tender.description}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              Deadline: <span className="font-medium">{formatDate(tender.deadline)}</span>
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              Created: <span className="font-medium">{formatDate(tender.createdAt)}</span>
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              Budget: <span className="font-medium">{formatCurrency(tender.budget)}</span>
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {tender.status === "published" ? (
            <Link to={`/procurement/${tender.id}`}>
              <Button>Submit Bid</Button>
            </Link>
          ) : (
            <Link to={`/procurement/${tender.id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
          )}
          
          {tender.bids.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {tender.bids.length} bid{tender.bids.length > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TenderCard;
