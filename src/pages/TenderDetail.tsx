
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { tenders, projects } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/helpers";
import { 
  ArrowLeft, 
  Calendar, 
  FileCheck,
  FileText,
  Landmark,
  DollarSign,
  Check,
  X,
  Upload,
  Send,
  Users,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TenderDetail = () => {
  const { tenderId } = useParams<{ tenderId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  
  const tender = tenders.find(t => t.id === tenderId);
  const project = tender ? projects.find(p => p.id === tender.projectId) : null;
  
  const [bidFormData, setBidFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    bidAmount: "",
    proposalDescription: ""
  });
  
  if (!tender || !project) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Tender Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The tender you are looking for does not exist or has been removed.
          </p>
          <Button onClick={() => navigate("/procurement")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Procurement
          </Button>
        </div>
      </PageLayout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBidFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!bidFormData.companyName || !bidFormData.contactName || !bidFormData.email || !bidFormData.bidAmount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Success message
    toast({
      title: "Bid Submitted",
      description: "Your bid has been successfully submitted.",
      variant: "default"
    });
    
    // Reset form
    setBidFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      bidAmount: "",
      proposalDescription: ""
    });
  };

  // Helper to render tender status badge
  const renderStatusBadge = () => {
    switch (tender.status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "published":
        return <Badge className="bg-project-blue">Open</Badge>;
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
      case "awarded":
        return <Badge className="bg-project-green">Awarded</Badge>;
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/procurement")}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{tender.title}</h1>
            {renderStatusBadge()}
          </div>
          <div className="text-muted-foreground mt-1">
            For project: {project.name}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="details">Tender Details</TabsTrigger>
          <TabsTrigger value="bids">
            Bids {tender.bids.length > 0 && `(${tender.bids.length})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Tender Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground">{tender.description}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Requirements</h3>
                    <p className="text-muted-foreground">{tender.requirementsSummary}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Deadline</div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">{formatDate(tender.deadline)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Budget</div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">{formatCurrency(tender.budget)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Published Date</div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">{formatDate(tender.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tender Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Status</div>
                      <div className="font-medium">
                        {tender.status === "published" ? "Open for Bidding" : 
                         tender.status === "closed" ? "Closed" :
                         tender.status === "awarded" ? "Awarded" :
                         tender.status === "draft" ? "Draft" : "Unknown"}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Reference ID</div>
                      <div className="font-medium">{tender.id}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Project</div>
                      <div className="font-medium">{project.name}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Submission Count</div>
                      <div className="font-medium">{tender.bids.length} bids</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tender.status === "published" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">Submit Bid</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Submit a Bid</DialogTitle>
                          <DialogDescription>
                            Complete the form below to submit your bid for this tender.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <ScrollArea className="h-[500px] pr-4">
                          <form onSubmit={handleBidSubmit}>
                            <div className="grid gap-6">
                              <div className="grid gap-3">
                                <Label htmlFor="companyName">Company Name *</Label>
                                <Input 
                                  id="companyName" 
                                  name="companyName"
                                  value={bidFormData.companyName}
                                  onChange={handleInputChange}
                                  placeholder="Your company name" 
                                  required
                                />
                              </div>
                              
                              <div className="grid gap-3">
                                <Label htmlFor="contactName">Contact Person *</Label>
                                <Input 
                                  id="contactName" 
                                  name="contactName"
                                  value={bidFormData.contactName}
                                  onChange={handleInputChange}
                                  placeholder="Full name" 
                                  required
                                />
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-3">
                                  <Label htmlFor="email">Email Address *</Label>
                                  <Input 
                                    id="email" 
                                    name="email"
                                    type="email"
                                    value={bidFormData.email}
                                    onChange={handleInputChange}
                                    placeholder="email@example.com" 
                                    required
                                  />
                                </div>
                                
                                <div className="grid gap-3">
                                  <Label htmlFor="phone">Phone Number</Label>
                                  <Input 
                                    id="phone" 
                                    name="phone"
                                    value={bidFormData.phone}
                                    onChange={handleInputChange}
                                    placeholder="(123) 456-7890" 
                                  />
                                </div>
                              </div>
                              
                              <div className="grid gap-3">
                                <Label htmlFor="bidAmount">Bid Amount (USD) *</Label>
                                <Input 
                                  id="bidAmount" 
                                  name="bidAmount"
                                  type="number"
                                  value={bidFormData.bidAmount}
                                  onChange={handleInputChange}
                                  placeholder="0.00" 
                                  required
                                />
                              </div>
                              
                              <div className="grid gap-3">
                                <Label htmlFor="proposalDescription">Proposal Description *</Label>
                                <Textarea 
                                  id="proposalDescription" 
                                  name="proposalDescription"
                                  value={bidFormData.proposalDescription}
                                  onChange={handleInputChange}
                                  placeholder="Describe your proposal and why you're the best fit for this project"
                                  rows={5}
                                  required
                                />
                              </div>
                              
                              <div className="grid gap-3">
                                <Label>Supporting Documents</Label>
                                <div className="border border-dashed rounded-lg p-6 text-center">
                                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                  <p className="text-sm font-medium mb-1">
                                    Drag & drop files here
                                  </p>
                                  <p className="text-xs text-muted-foreground mb-3">
                                    PDF, DOCX, XLSX (Max 10MB each)
                                  </p>
                                  <Button type="button" variant="outline" size="sm">
                                    Browse Files
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 mt-4">
                                <input 
                                  type="checkbox" 
                                  id="terms" 
                                  className="h-4 w-4 rounded border-gray-300 focus:ring-primary"
                                  required 
                                />
                                <Label htmlFor="terms" className="text-sm">
                                  I confirm that all information provided is accurate and I agree to the terms and conditions
                                </Label>
                              </div>
                            </div>
                            
                            <DialogFooter className="mt-6">
                              <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button type="submit">
                                <Send className="h-4 w-4 mr-2" />
                                Submit Bid
                              </Button>
                            </DialogFooter>
                          </form>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Download Tender Document
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Landmark className="h-4 w-4 mr-2" />
                    Contact Procurement Office
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bids" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Submitted Bids
              </CardTitle>
              <CardDescription>
                {tender.bids.length === 0
                  ? "No bids have been submitted yet."
                  : `${tender.bids.length} bid(s) submitted for this tender.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tender.bids.length > 0 ? (
                <div className="space-y-6">
                  {tender.bids.map(bid => (
                    <Card key={bid.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{bid.companyName}</h3>
                            <p className="text-sm text-muted-foreground">
                              Contact: {bid.contactName} • {bid.email}
                            </p>
                          </div>
                          {bid.status === "accepted" ? (
                            <Badge className="bg-project-green">
                              <CheckCircle className="h-3 w-3 mr-1" /> Accepted
                            </Badge>
                          ) : bid.status === "rejected" ? (
                            <Badge variant="destructive">
                              <X className="h-3 w-3 mr-1" /> Rejected
                            </Badge>
                          ) : (
                            <Badge variant="outline">Under Review</Badge>
                          )}
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-muted/30 rounded-lg p-3">
                            <div className="text-sm text-muted-foreground">Bid Amount</div>
                            <div className="font-semibold text-xl">{formatCurrency(bid.bidAmount)}</div>
                          </div>
                          
                          <div className="bg-muted/30 rounded-lg p-3">
                            <div className="text-sm text-muted-foreground">Submission Date</div>
                            <div className="font-medium">{formatDate(bid.submissionDate)}</div>
                          </div>
                          
                          <div className="bg-muted/30 rounded-lg p-3">
                            <div className="text-sm text-muted-foreground">Documents</div>
                            <div className="font-medium">{bid.documents.length} files</div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="text-sm font-medium mb-2">Proposal Description:</div>
                          <p className="text-sm text-muted-foreground">
                            {bid.proposalDescription}
                          </p>
                        </div>
                        
                        {tender.status === "published" && (
                          <div className="mt-4 flex justify-end gap-3">
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button variant="default" size="sm">
                              <Check className="h-3 w-3 mr-1" /> Accept Bid
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium mt-4 mb-2">No Bids Yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    No bids have been submitted for this tender yet. Check back later or reach out to potential contractors.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Bid evaluation criteria available in tender documentation
              </div>
              <div className="text-sm font-medium">
                Deadline: {formatDate(tender.deadline)}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default TenderDetail;
