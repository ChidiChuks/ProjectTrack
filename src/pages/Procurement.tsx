
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TenderCard from "@/components/TenderCard";
import { tenders } from "@/data/mockData";
import { Search, Plus, ShoppingBag, Clock } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/helpers";

const Procurement = () => {
  const [activeTab, setActiveTab] = useState("open");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tenders based on active tab, status filter, and search query
  const filteredTenders = tenders.filter(tender => {
    // Apply tab filter
    if (activeTab === "open" && tender.status !== "published") {
      return false;
    }
    if (activeTab === "closed" && !["closed", "awarded"].includes(tender.status)) {
      return false;
    }
    if (activeTab === "draft" && tender.status !== "draft") {
      return false;
    }
    
    // Apply status filter if not "all"
    if (statusFilter !== "all" && tender.status !== statusFilter) {
      return false;
    }
    
    // Apply search filter
    if (
      searchQuery && 
      !tender.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !tender.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });
  
  // Get counts for the tabs
  const openCount = tenders.filter(t => t.status === "published").length;
  const closedCount = tenders.filter(t => ["closed", "awarded"].includes(t.status)).length;
  const draftCount = tenders.filter(t => t.status === "draft").length;

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">E-Procurement</h1>
          <p className="text-muted-foreground mt-1">
            Manage tenders and contract bidding
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Tender
        </Button>
      </div>

      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="open">
              Open Tenders ({openCount})
            </TabsTrigger>
            <TabsTrigger value="closed">
              Closed Tenders ({closedCount})
            </TabsTrigger>
            <TabsTrigger value="draft">
              Draft Tenders ({draftCount})
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tenders..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="published">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="awarded">Awarded</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="open" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTenders.length > 0 ? (
                filteredTenders.map(tender => (
                  <TenderCard key={tender.id} tender={tender} />
                ))
              ) : (
                <div className="col-span-full py-10 text-center">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium mt-4 mb-2">No open tenders found</h3>
                  <p className="text-muted-foreground">
                    No open tenders match your current filters.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="closed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTenders.length > 0 ? (
                filteredTenders.map(tender => (
                  <TenderCard key={tender.id} tender={tender} />
                ))
              ) : (
                <div className="col-span-full py-10 text-center">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium mt-4 mb-2">No closed tenders found</h3>
                  <p className="text-muted-foreground">
                    No closed or awarded tenders match your current filters.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="draft" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTenders.length > 0 ? (
                filteredTenders.map(tender => (
                  <TenderCard key={tender.id} tender={tender} />
                ))
              ) : (
                <div className="col-span-full py-10 text-center">
                  <h3 className="text-lg font-medium mb-2">No draft tenders found</h3>
                  <p className="text-muted-foreground mb-6">
                    Start creating a new tender to get started.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Tender
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">How E-Procurement Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-muted/30 border">
              <div className="rounded-full h-10 w-10 bg-primary flex items-center justify-center text-primary-foreground font-bold mb-4">1</div>
              <h3 className="font-medium mb-2">Create a Tender</h3>
              <p className="text-sm text-muted-foreground">
                Define project requirements, set a budget, and publish your tender for contractors to bid on.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/30 border">
              <div className="rounded-full h-10 w-10 bg-primary flex items-center justify-center text-primary-foreground font-bold mb-4">2</div>
              <h3 className="font-medium mb-2">Collect Bids</h3>
              <p className="text-sm text-muted-foreground">
                Contractors submit their proposals and bid amounts through our secure online system.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/30 border">
              <div className="rounded-full h-10 w-10 bg-primary flex items-center justify-center text-primary-foreground font-bold mb-4">3</div>
              <h3 className="font-medium mb-2">Award Contracts</h3>
              <p className="text-sm text-muted-foreground">
                Review bids, select the best proposal, and award the contract to begin work.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Procurement;
