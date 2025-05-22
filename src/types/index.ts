
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'delayed';
  budget: number;
  currentSpend: number;
  startDate: string;
  endDate: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface Milestone {
  id: string;
  projectId: string;
  name: string;
  description: string;
  date: string;
  status: 'pending' | 'completed' | 'delayed';
}

export interface Alert {
  id: string;
  projectId: string;
  title: string;
  description: string;
  type: 'delay' | 'budget' | 'general';
  severity: 'low' | 'medium' | 'high';
  isRead: boolean;
  createdAt: string;
}

export interface Bid {
  id: string;
  tenderId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  bidAmount: number;
  proposalDescription: string;
  documents: string[];
  submissionDate: string;
  status: 'submitted' | 'under-review' | 'accepted' | 'rejected';
}

export interface Tender {
  id: string;
  projectId: string;
  title: string;
  description: string;
  budget: number;
  requirementsSummary: string;
  deadline: string;
  status: 'draft' | 'published' | 'closed' | 'awarded';
  createdAt: string;
  bids: Bid[];
}
