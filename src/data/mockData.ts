
import { Project, Milestone, Alert, Tender, Bid } from "../types";

export const projects: Project[] = [
  {
    id: "proj-001",
    name: "Downtown Transit Hub",
    description: "Construction of a central transit hub with integrated commercial space and improved pedestrian access.",
    status: "active",
    budget: 12500000,
    currentSpend: 4750000,
    startDate: "2025-01-15",
    endDate: "2026-07-30",
    location: {
      lat: 40.712776,
      lng: -74.005974,
      address: "123 Main Street, New York, NY"
    }
  },
  {
    id: "proj-002",
    name: "Harbor Bridge Renovation",
    description: "Structural repairs and road surface improvements to the main harbor bridge, including improved lighting.",
    status: "active",
    budget: 8750000,
    currentSpend: 5250000,
    startDate: "2024-11-01",
    endDate: "2025-09-15",
    location: {
      lat: 40.702776,
      lng: -74.015974,
      address: "Harbor Bridge, New York, NY"
    }
  },
  {
    id: "proj-003",
    name: "West Side Park Development",
    description: "Creation of a new public park with recreational facilities, green spaces, and water features.",
    status: "planning",
    budget: 5200000,
    currentSpend: 780000,
    startDate: "2025-06-01",
    endDate: "2026-05-30",
    location: {
      lat: 40.722776,
      lng: -74.025974,
      address: "500 West Ave, New York, NY"
    }
  },
  {
    id: "proj-004",
    name: "Municipal Wastewater Treatment Upgrade",
    description: "Modernization of existing wastewater treatment facilities with improved energy efficiency and capacity.",
    status: "delayed",
    budget: 9500000,
    currentSpend: 3800000,
    startDate: "2024-08-15",
    endDate: "2025-12-30",
    location: {
      lat: 40.732776,
      lng: -73.995974,
      address: "800 East River Road, New York, NY"
    }
  },
  {
    id: "proj-005",
    name: "North District School Renovation",
    description: "Complete renovation of the North District Elementary School including seismic upgrades and modernized classrooms.",
    status: "completed",
    budget: 6800000,
    currentSpend: 6750000,
    startDate: "2024-05-10",
    endDate: "2025-01-15",
    location: {
      lat: 40.742776,
      lng: -73.975974,
      address: "200 North Street, New York, NY"
    }
  }
];

export const milestones: Milestone[] = [
  {
    id: "ms-001",
    projectId: "proj-001",
    name: "Site Preparation",
    description: "Clearing and preparation of construction site",
    date: "2025-03-01",
    status: "completed"
  },
  {
    id: "ms-002",
    projectId: "proj-001",
    name: "Foundation Construction",
    description: "Laying foundations for main terminal building",
    date: "2025-05-15",
    status: "completed"
  },
  {
    id: "ms-003",
    projectId: "proj-001",
    name: "Structural Framework",
    description: "Erection of structural steel framework",
    date: "2025-08-30",
    status: "pending"
  },
  {
    id: "ms-004",
    projectId: "proj-001",
    name: "Roof and Exterior",
    description: "Installation of roof and exterior cladding",
    date: "2025-12-15",
    status: "pending"
  },
  {
    id: "ms-005",
    projectId: "proj-001",
    name: "Interior Systems",
    description: "Installation of electrical, plumbing and HVAC systems",
    date: "2026-03-10",
    status: "pending"
  },
  {
    id: "ms-006",
    projectId: "proj-001",
    name: "Finishing and Commissioning",
    description: "Interior finishing and systems commissioning",
    date: "2026-06-20",
    status: "pending"
  },
  {
    id: "ms-007",
    projectId: "proj-002",
    name: "Traffic Rerouting",
    description: "Implementation of traffic management plan",
    date: "2024-11-15",
    status: "completed"
  },
  {
    id: "ms-008",
    projectId: "proj-002",
    name: "Deck Removal",
    description: "Removal of existing bridge deck sections",
    date: "2024-12-30",
    status: "completed"
  },
  {
    id: "ms-009",
    projectId: "proj-002",
    name: "Structural Repairs",
    description: "Repairs to main support structures",
    date: "2025-03-15",
    status: "delayed"
  },
  {
    id: "ms-010",
    projectId: "proj-003",
    name: "Environmental Assessment",
    description: "Completion of environmental impact studies",
    date: "2025-02-28",
    status: "completed"
  },
  {
    id: "ms-011",
    projectId: "proj-004",
    name: "Equipment Procurement",
    description: "Procurement of treatment equipment",
    date: "2024-10-15",
    status: "completed"
  },
  {
    id: "ms-012",
    projectId: "proj-004",
    name: "Tank Construction",
    description: "Construction of new treatment tanks",
    date: "2025-02-20",
    status: "delayed"
  }
];

export const alerts: Alert[] = [
  {
    id: "alert-001",
    projectId: "proj-002",
    title: "Structural Issue Detected",
    description: "Unexpected corrosion found in support beams requiring additional inspection and potential delay.",
    type: "delay",
    severity: "high",
    isRead: false,
    createdAt: "2025-05-20T09:30:00"
  },
  {
    id: "alert-002",
    projectId: "proj-004",
    title: "Equipment Cost Overrun",
    description: "Specialized treatment equipment prices exceeded estimates by 15%.",
    type: "budget",
    severity: "medium",
    isRead: true,
    createdAt: "2025-05-18T14:45:00"
  },
  {
    id: "alert-003",
    projectId: "proj-001",
    title: "Permit Approval Delay",
    description: "Waiting on final approval for electrical systems from regulatory authority.",
    type: "delay",
    severity: "low",
    isRead: false,
    createdAt: "2025-05-21T11:20:00"
  },
  {
    id: "alert-004",
    projectId: "proj-003",
    title: "Community Feedback Session",
    description: "Additional community feedback session scheduled for park design review.",
    type: "general",
    severity: "low",
    isRead: false,
    createdAt: "2025-05-19T16:15:00"
  },
  {
    id: "alert-005",
    projectId: "proj-004",
    title: "Critical Material Shortage",
    description: "Supplier notified of 3-week delay for specialized filtration components.",
    type: "delay",
    severity: "high",
    isRead: false,
    createdAt: "2025-05-21T08:45:00"
  }
];

export const tenders: Tender[] = [
  {
    id: "tender-001",
    projectId: "proj-001",
    title: "Transit Hub Electrical Systems",
    description: "Installation of all electrical systems for the Downtown Transit Hub including lighting, security, and monitoring systems.",
    budget: 2400000,
    requirementsSummary: "ISO 9001 certification required. Minimum 10 years experience with similar projects. Must complete within 8 months of award.",
    deadline: "2025-06-30",
    status: "published",
    createdAt: "2025-05-01",
    bids: []
  },
  {
    id: "tender-002",
    projectId: "proj-001",
    title: "Interior Finishing and Fixtures",
    description: "Supply and installation of interior finishing and fixtures for public areas of the Downtown Transit Hub.",
    budget: 1800000,
    requirementsSummary: "Experience with public transport facilities required. Sustainable materials preferred. 6-month completion timeline.",
    deadline: "2025-07-15",
    status: "published",
    createdAt: "2025-05-10",
    bids: []
  },
  {
    id: "tender-003",
    projectId: "proj-002",
    title: "Bridge Surface Repair",
    description: "Replacement and repair of 12,000 sq ft of bridge road surface including waterproofing and expansion joints.",
    budget: 3200000,
    requirementsSummary: "Specialized bridge work experience required. Must provide 10-year warranty on materials and workmanship.",
    deadline: "2025-06-15",
    status: "published",
    createdAt: "2025-04-20",
    bids: []
  },
  {
    id: "tender-004",
    projectId: "proj-003",
    title: "Landscaping and Planting",
    description: "Landscaping services for new West Side Park including soil preparation, planting, and irrigation system installation.",
    budget: 950000,
    requirementsSummary: "Minimum 5 years experience in public park landscaping. Must include 2-year maintenance plan.",
    deadline: "2025-09-30",
    status: "draft",
    createdAt: "2025-05-18",
    bids: []
  },
  {
    id: "tender-005",
    projectId: "proj-004",
    title: "Treatment Plant Automation Systems",
    description: "Supply and installation of automated control systems for wastewater treatment processes.",
    budget: 1750000,
    requirementsSummary: "Experience with SCADA systems required. Must integrate with existing municipal systems.",
    deadline: "2025-06-10",
    status: "closed",
    createdAt: "2025-03-15",
    bids: [
      {
        id: "bid-001",
        tenderId: "tender-005",
        companyName: "TechWater Solutions",
        contactName: "David Chen",
        email: "dchen@techwater.example.com",
        phone: "555-123-4567",
        bidAmount: 1680000,
        proposalDescription: "Complete integration solution with proven technology used in 20+ municipal installations.",
        documents: ["technical-proposal.pdf", "company-profile.pdf", "implementation-schedule.pdf"],
        submissionDate: "2025-04-28",
        status: "accepted"
      },
      {
        id: "bid-002",
        tenderId: "tender-005",
        companyName: "Hydro Controls Inc.",
        contactName: "Sarah Johnson",
        email: "sjohnson@hydrocontrols.example.com",
        phone: "555-987-6543",
        bidAmount: 1720000,
        proposalDescription: "Innovative solution with AI-enhanced efficiency and remote monitoring capabilities.",
        documents: ["proposal.pdf", "past-projects.pdf", "team-qualifications.pdf"],
        submissionDate: "2025-05-01",
        status: "rejected"
      }
    ]
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getMilestonesByProjectId = (projectId: string): Milestone[] => {
  return milestones.filter(milestone => milestone.projectId === projectId);
};

export const getAlertsByProjectId = (projectId: string): Alert[] => {
  return alerts.filter(alert => alert.projectId === projectId);
};

export const getTendersByProjectId = (projectId: string): Tender[] => {
  return tenders.filter(tender => tender.projectId === projectId);
};

export const getAllAlerts = (): Alert[] => {
  return [...alerts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const getActiveProjects = (): Project[] => {
  return projects.filter(project => project.status === 'active');
};

export const getActiveTenders = (): Tender[] => {
  return tenders.filter(tender => tender.status === 'published');
};
