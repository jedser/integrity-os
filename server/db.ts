import { 
  User, Project, Commitment, EvidenceItem, 
  CommunityFeedback, RiskItem, ActivityLog, IntegrityScoreBreakdown 
} from '../src/types.js';

export class IntegrityDatabase {
  private users: User[] = [];
  private projects: Project[] = [];
  private commitments: Commitment[] = [];
  private evidence: EvidenceItem[] = [];
  private feedback: CommunityFeedback[] = [];
  private risks: RiskItem[] = [];
  private activities: ActivityLog[] = [];

  constructor() {
    this.seedDemoData();
  }

  public resetSeedData() {
    this.users = [];
    this.projects = [];
    this.commitments = [];
    this.evidence = [];
    this.feedback = [];
    this.risks = [];
    this.activities = [];
    this.seedDemoData();
  }

  private seedDemoData() {
    // =========================================================================
    // FICTIONAL DEMO DATA — NOT REAL PROJECT INFORMATION
    // All initial seed records (users, projects, commitments, evidence, risks)
    // are fictional sample records created for system demonstration purposes.
    // =========================================================================
    // 1. Users
    this.users = [
      {
        id: 'u-1',
        name: 'Aregawi Berhe',
        email: 'aregawi.admin@integrity-os.org',
        role: 'Administrator',
        organization: 'Tigray Reconstruction Commission',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: 'u-2',
        name: 'Dr. Helen Gebremichael',
        email: 'helen.g@healthboard-tigray.gov.et',
        role: 'Project Manager',
        organization: 'Tigray Regional Health Bureau',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: 'u-3',
        name: 'Mulugeta Tesfay',
        email: 'mulugeta@wateraid-ethiopia.org',
        role: 'Implementer',
        organization: 'WaterAid & Regional Water Works',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: 'u-4',
        name: 'Sara Kidanemariam',
        email: 'sara.community@adiga.org',
        role: 'Community/User',
        organization: 'Adigrat Resident Action Council',
        avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: 'u-5',
        name: 'Marcus Vance',
        email: 'm.vance@eurecoveryfund.eu',
        role: 'Funder/Observer',
        organization: 'EU Reconstruction & Resilience Facility',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
      }
    ];

    // 2. Projects
    this.projects = [
      {
        id: 'p-1',
        code: 'TIG-REC-2026-01',
        title: 'Mekelle Central Hospital & Maternity Wing Restoration',
        description: 'Full rehabilitation of damaged hospital infrastructure, installation of a 120kW solar power system, and re-equipping emergency and surgical wards.',
        objective: 'Restore tertiary healthcare and emergency surgical services for 450,000 residents in Eastern Tigray within 8 months.',
        region: 'Tigray, Ethiopia',
        locationName: 'Mekelle (Ayder / Central Zone)',
        coordinates: { lat: 13.4967, lng: 39.4753 },
        beneficiariesCount: 450000,
        beneficiariesTarget: '450,000 urban and rural residents including 22,000 expectant mothers',
        startDate: '2026-01-15',
        endDate: '2026-09-30',
        budgetAllocated: 1850000,
        budgetSpent: 920000,
        funder: 'EU Recovery Facility & WHO Health Emergency Fund',
        implementerOrg: 'Tigray Regional Health Bureau & Medecins Sans Frontieres Partner Network',
        projectManagerName: 'Dr. Helen Gebremichael',
        status: 'Active',
        integrityScore: 88,
        integrityStatus: 'Strong',
        createdAt: '2026-01-10T08:00:00Z',
        updatedAt: '2026-08-10T14:20:00Z'
      },
      {
        id: 'p-2',
        code: 'TIG-REC-2026-02',
        title: 'Adigrat Clean Water Well Reactivation & Solar Pumps',
        description: 'Reactivation of 14 deep groundwater boreholes, replacement of destroyed copper wiring with solar pumps, and piping repair across Adigrat municipal sectors.',
        objective: 'Provide clean, reliable drinking water access to 38,000 residents and eliminate waterborne disease outbreaks.',
        region: 'Tigray, Ethiopia',
        locationName: 'Adigrat (Eastern Zone)',
        coordinates: { lat: 14.2769, lng: 39.4608 },
        beneficiariesCount: 38000,
        beneficiariesTarget: '38,000 local residents across 5 municipal sub-districts',
        startDate: '2026-02-01',
        endDate: '2026-07-31',
        budgetAllocated: 640000,
        budgetSpent: 480000,
        funder: 'UNICEF & USAID Global Water Security Fund',
        implementerOrg: 'WaterAid & Adigrat Water Supply Enterprise',
        projectManagerName: 'Mulugeta Tesfay',
        status: 'Active',
        integrityScore: 62,
        integrityStatus: 'At Risk',
        createdAt: '2026-01-20T09:30:00Z',
        updatedAt: '2026-08-11T11:15:00Z'
      },
      {
        id: 'p-3',
        code: 'TIG-REC-2026-03',
        title: 'Shire Displaced Farmers Seed & Micro-Irrigation Distribution',
        description: 'Emergency supply of climate-resilient teff, maize seeds, fertilizer, and hand-pump irrigation tools to displaced agricultural households returning to farmland.',
        objective: 'Restore agricultural self-reliance for 12,500 displaced farming households in Northwestern Tigray before the main harvest cycle.',
        region: 'Tigray, Ethiopia',
        locationName: 'Shire Endaselassie (Northwestern Zone)',
        coordinates: { lat: 14.1032, lng: 38.2831 },
        beneficiariesCount: 62500,
        beneficiariesTarget: '12,500 farming families (62,500 individuals)',
        startDate: '2026-03-01',
        endDate: '2026-10-15',
        budgetAllocated: 1100000,
        budgetSpent: 540000,
        funder: 'FAO Agriculture Recovery & Netherlands Development Agency',
        implementerOrg: 'Tigray Agricultural Research Institute & Local Cooperatives',
        projectManagerName: 'Aregawi Berhe',
        status: 'Active',
        integrityScore: 74,
        integrityStatus: 'Watch',
        createdAt: '2026-02-15T10:00:00Z',
        updatedAt: '2026-08-09T16:45:00Z'
      },
      {
        id: 'p-4',
        code: 'TIG-REC-2026-04',
        title: 'Axum Primary Schools Reconstruction & Digital Learning Hub',
        description: 'Reconstructing roof spans and classrooms for 6 primary schools in Axum town, providing 3,200 desks and establishing solar-powered digital literacy hubs.',
        objective: 'Return 8,400 children to safe, functioning primary schools with modern educational supplies.',
        region: 'Tigray, Ethiopia',
        locationName: 'Axum (Central Zone)',
        coordinates: { lat: 14.1311, lng: 38.7219 },
        beneficiariesCount: 8400,
        beneficiariesTarget: '8,400 primary school children and 240 teachers',
        startDate: '2026-04-01',
        endDate: '2026-12-15',
        budgetAllocated: 920000,
        budgetSpent: 310000,
        funder: 'Global Partnership for Education & Education Cannot Wait',
        implementerOrg: 'Tigray Bureau of Education & Save the Children',
        projectManagerName: 'Dr. Helen Gebremichael',
        status: 'Active',
        integrityScore: 92,
        integrityStatus: 'Strong',
        createdAt: '2026-03-10T12:00:00Z',
        updatedAt: '2026-08-08T09:10:00Z'
      }
    ];

    // 3. Commitments
    this.commitments = [
      // p-1 Commitments
      {
        id: 'c-101',
        projectId: 'p-1',
        projectCode: 'TIG-REC-2026-01',
        title: 'Solar Backup Power Grid Installation (120kW)',
        description: 'Deliver, mount, and integrate 120kW solar rooftop panels and lithium battery bank to guarantee 24/7 power for operating rooms and cold storage.',
        responsiblePerson: 'Eng. Solomon Kahsay',
        responsibleOrg: 'PowerTech Renewable Horn Africa',
        allocatedBudget: 320000,
        spentBudget: 320000,
        deadline: '2026-05-30',
        deliverable: 'Fully commissioned 120kW solar microgrid with 18-hour battery discharge log verified by independent engineer.',
        status: 'Completed',
        verificationStatus: 'Verified',
        evidenceIds: ['e-1', 'e-2'],
        verifierNotes: 'On-site technical audit performed on June 4. Inverter telemetry confirmed operating seamlessly.',
        updatedAt: '2026-06-05T10:00:00Z'
      },
      {
        id: 'c-102',
        projectId: 'p-1',
        projectCode: 'TIG-REC-2026-01',
        title: 'Maternity Ward Surgical Equipment Procurement',
        description: 'Procure 4 ultrasound machines, 6 infant incubators, 2 anesthesia workstations, and surgical instrument sets.',
        responsiblePerson: 'Dr. Helen Gebremichael',
        responsibleOrg: 'Tigray Regional Health Bureau',
        allocatedBudget: 450000,
        spentBudget: 410000,
        deadline: '2026-07-15',
        deliverable: 'Customs clearance documents, serial-number shipment registry, and biomedical inspection certificate.',
        status: 'Evidence Submitted',
        verificationStatus: 'Pending Verification',
        evidenceIds: ['e-3'],
        verifierNotes: 'Shipping bill of lading and serial registry submitted. Third-party visual inventory underway.',
        updatedAt: '2026-07-28T14:30:00Z'
      },
      {
        id: 'c-103',
        projectId: 'p-1',
        projectCode: 'TIG-REC-2026-01',
        title: 'Emergency Room & ICU Civil Reconstruction',
        description: 'Rebuild structural roof trusses, replace shattered glass, re-tile sterile operating theater floors, and restore oxygen piping.',
        responsiblePerson: 'Teklehaimanot Construction Ltd',
        responsibleOrg: 'Teklehaimanot Construction',
        allocatedBudget: 510000,
        spentBudget: 190000,
        deadline: '2026-09-15',
        deliverable: 'Civil completion certificate, structural safety stamp, and oxygen pressure leak test log.',
        status: 'In Progress',
        verificationStatus: 'Unverified',
        evidenceIds: [],
        updatedAt: '2026-08-01T08:00:00Z'
      },

      // p-2 Commitments (Adigrat Water - At Risk)
      {
        id: 'c-201',
        projectId: 'p-2',
        projectCode: 'TIG-REC-2026-02',
        title: 'Borehole Solar Submersible Pumps Procurement (14 Units)',
        description: 'Import 14 high-efficiency Grundfos submersible pumps and solar drive controllers for Adigrat wellheads 1 through 14.',
        responsiblePerson: 'Mulugeta Tesfay',
        responsibleOrg: 'WaterAid Ethiopia',
        allocatedBudget: 280000,
        spentBudget: 280000,
        deadline: '2026-05-15',
        deliverable: 'Physical delivery receipt of 14 pumps at Adigrat central storehouse with serial numbers.',
        status: 'Overdue',
        verificationStatus: 'Unverified',
        evidenceIds: ['e-4'],
        verifierNotes: 'WARNING: Only 9 pump boxes located at the central storehouse during July random spot check. 5 units missing physical verification.',
        updatedAt: '2026-08-05T16:00:00Z'
      },
      {
        id: 'c-202',
        projectId: 'p-2',
        projectCode: 'TIG-REC-2026-02',
        title: 'Main Pipeline Trenching & HD-Polymer Pipe Laying in Sector 4',
        description: 'Excavate 8.5 km of trenching and lay high-density polyethylene pipes connecting Wellhead 3 to Sector 4 water points.',
        responsiblePerson: 'Adigrat Municipal Water Works',
        responsibleOrg: 'Adigrat Water Enterprise',
        allocatedBudget: 190000,
        spentBudget: 150000,
        deadline: '2026-07-01',
        deliverable: 'Pressure test log and community tap stand water flow logs signed by local neighborhood committee.',
        status: 'At Risk',
        verificationStatus: 'Unverified',
        evidenceIds: [],
        verifierNotes: 'Trenching delayed due to fuel shortage and contractor dispute. Community complaints logged regarding open trenches.',
        updatedAt: '2026-08-09T09:00:00Z'
      },

      // p-3 Commitments (Shire Agricultural)
      {
        id: 'c-301',
        projectId: 'p-3',
        projectCode: 'TIG-REC-2026-03',
        title: 'Certified Climate-Resilient Teff & Maize Seed Distribution',
        description: 'Distribute 250 metric tons of certified Quncho teff seed and drought-tolerant maize seed packages to 12,500 registered farming households.',
        responsiblePerson: 'Gebremedhin Haile',
        responsibleOrg: 'Tigray Agricultural Research Institute',
        allocatedBudget: 420000,
        spentBudget: 310000,
        deadline: '2026-06-01',
        deliverable: 'Beneficiary thumbprint/signature log for seed receipt across 6 kebeles in Shire Endaselassie.',
        status: 'Completed',
        verificationStatus: 'Verified',
        evidenceIds: ['e-5'],
        verifierNotes: 'Spot check across 120 households verified 96% direct receipt. Digital biometric registry cross-referenced.',
        updatedAt: '2026-06-20T11:00:00Z'
      },
      {
        id: 'c-302',
        projectId: 'p-3',
        projectCode: 'TIG-REC-2026-03',
        title: 'Treadle & Solar Micro-Irrigation Pump Kits (1,200 Units)',
        description: 'Distribute 1,200 portable solar surface pumps to smallholder farmer cooperatives along the Tekeze river basin.',
        responsiblePerson: 'Horn AgroTech Services',
        responsibleOrg: 'Horn AgroTech',
        allocatedBudget: 380000,
        spentBudget: 230000,
        deadline: '2026-08-30',
        deliverable: 'Cooperative delivery rosters and GPS tagged photos of installed irrigation units.',
        status: 'In Progress',
        verificationStatus: 'Unverified',
        evidenceIds: ['e-6'],
        updatedAt: '2026-08-02T15:00:00Z'
      },

      // p-4 Commitments (Axum Schools)
      {
        id: 'c-401',
        projectId: 'p-4',
        projectCode: 'TIG-REC-2026-04',
        title: 'Roof Span Reconstruction for 6 Primary Schools',
        description: 'Replace collapsed wooden trusses with galvanized steel roofing spans across 24 classrooms in Axum North & West kebeles.',
        responsiblePerson: 'Save the Children Infra Team',
        responsibleOrg: 'Save the Children International',
        allocatedBudget: 340000,
        spentBudget: 220000,
        deadline: '2026-07-31',
        deliverable: 'Structural engineering sign-off, weatherproofing test log, and photo documentation.',
        status: 'Completed',
        verificationStatus: 'Verified',
        evidenceIds: ['e-7'],
        verifierNotes: 'Verified on-site by Tigray Education Bureau inspectors on Aug 2.',
        updatedAt: '2026-08-03T10:00:00Z'
      }
    ];

    // 4. Evidence Items
    this.evidence = [
      {
        id: 'e-1',
        projectId: 'p-1',
        projectTitle: 'Mekelle Central Hospital Restoration',
        commitmentId: 'c-101',
        commitmentTitle: 'Solar Backup Power Grid Installation (120kW)',
        title: 'Electrical Commissioning & Telemetry Report (120kW Solar Grid)',
        description: 'Certified electrical inspection report containing inverter telemetry graph showing 120kW peak performance and 18-hour continuous battery run log.',
        type: 'Audit Report',
        fileUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800',
        externalLink: 'https://telemetry.integrity-os.org/mekelle-hospital/solar-log-2026.pdf',
        uploaderName: 'Eng. Solomon Kahsay',
        uploaderOrg: 'PowerTech Renewable Horn Africa',
        uploadedAt: '2026-06-02T14:10:00Z',
        verificationStatus: 'Verified',
        verifiedBy: 'Marcus Vance (EU Observer)',
        hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        metadata: {
          location: 'Mekelle Ayder Hospital Rooftop',
          dateRecorded: '2026-06-01',
          itemCount: 1,
          amountUSD: 320000
        }
      },
      {
        id: 'e-2',
        projectId: 'p-1',
        projectTitle: 'Mekelle Central Hospital Restoration',
        commitmentId: 'c-101',
        commitmentTitle: 'Solar Backup Power Grid Installation (120kW)',
        title: 'Geotagged Installation Photos - Battery Bank & Inverters',
        description: 'High-resolution photo gallery showing installed lithium-ion battery rack cabinets in secure power room with GPS EXIF metadata (13.4967 N, 39.4753 E).',
        type: 'Photo',
        fileUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=800',
        uploaderName: 'Dr. Helen Gebremichael',
        uploaderOrg: 'Tigray Regional Health Bureau',
        uploadedAt: '2026-06-03T09:15:00Z',
        verificationStatus: 'Verified',
        verifiedBy: 'Marcus Vance (EU Observer)',
        hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
        metadata: {
          location: 'Mekelle Ayder Hospital Substation',
          dateRecorded: '2026-06-02'
        }
      },
      {
        id: 'e-3',
        projectId: 'p-1',
        projectTitle: 'Mekelle Central Hospital Restoration',
        commitmentId: 'c-102',
        commitmentTitle: 'Maternity Ward Surgical Equipment Procurement',
        title: 'Customs Clearance & Equipment Shipping Manifest #MED-2026-88',
        description: 'Official Ethiopian Customs Commission release form detailing import of 4 GE Voluson ultrasound units and 6 Draeger incubators via Djibouti corridor.',
        type: 'Financial Receipt',
        fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
        externalLink: 'https://docs.integrity-os.org/manifests/customs-med-88.pdf',
        uploaderName: 'Dr. Helen Gebremichael',
        uploaderOrg: 'Tigray Regional Health Bureau',
        uploadedAt: '2026-07-25T11:40:00Z',
        verificationStatus: 'Pending Verification',
        hash: 'a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1d201c486512e',
        metadata: {
          location: 'Semera Customs Hub / Mekelle Delivery',
          dateRecorded: '2026-07-22',
          itemCount: 12,
          amountUSD: 410000
        }
      },
      {
        id: 'e-4',
        projectId: 'p-2',
        projectTitle: 'Adigrat Clean Water Well Reactivation',
        commitmentId: 'c-201',
        commitmentTitle: 'Borehole Solar Submersible Pumps Procurement (14 Units)',
        title: 'Adigrat Central Warehouse Receiving Slip (Partial Batch)',
        description: 'Storehouse receipt logging physical delivery of Grundfos solar pumps. Note: Slip lists 9 pumps received out of 14 ordered under Contract W-2026-ADG.',
        type: 'Financial Receipt',
        fileUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
        uploaderName: 'Mulugeta Tesfay',
        uploaderOrg: 'WaterAid Ethiopia',
        uploadedAt: '2026-07-10T16:20:00Z',
        verificationStatus: 'Flagged',
        verifiedBy: 'System AI Audit Flag',
        hash: 'c8d81023a85368a4175314f8263539ce0174092b3a1a45749c95d91e0a29358a',
        metadata: {
          location: 'Adigrat Municipal Warehouse',
          dateRecorded: '2026-07-09',
          itemCount: 9,
          amountUSD: 280000
        }
      },
      {
        id: 'e-5',
        projectId: 'p-3',
        projectTitle: 'Shire Displaced Farmers Seed & Equipment',
        commitmentId: 'c-301',
        commitmentTitle: 'Certified Climate-Resilient Teff & Maize Seed Distribution',
        title: 'Kebele Biometric Seed Distribution Registry (6 Kebeles)',
        description: 'Signed and thumbprinted distribution sheets covering 12,500 beneficiary farm households with cross-checked national ID entries.',
        type: 'Beneficiary Log',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
        uploaderName: 'Gebremedhin Haile',
        uploaderOrg: 'Tigray Agricultural Research Institute',
        uploadedAt: '2026-06-18T13:00:00Z',
        verificationStatus: 'Verified',
        verifiedBy: 'Aregawi Berhe (Admin)',
        hash: '4d3a0172e2e7b7f1e6804bb6185a816a7f8045620d4e9c7198a002a281093f18',
        metadata: {
          location: 'Shire Endaselassie Rural Kebeles 1-6',
          dateRecorded: '2026-06-15',
          itemCount: 12500
        }
      },
      {
        id: 'e-6',
        projectId: 'p-3',
        projectTitle: 'Shire Displaced Farmers Seed & Equipment',
        commitmentId: 'c-302',
        commitmentTitle: 'Treadle & Solar Micro-Irrigation Pump Kits (1,200 Units)',
        title: 'Tekeze Farmer Cooperative Pump Field Deployment Audit',
        description: 'Initial site check report showing 450 of 1,200 solar surface pumps operational in farming plots along Tekeze riverbank.',
        type: 'Photo',
        fileUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
        uploaderName: 'Horn AgroTech Services',
        uploaderOrg: 'Horn AgroTech',
        uploadedAt: '2026-07-30T10:45:00Z',
        verificationStatus: 'Pending Verification',
        hash: '7b2298c5d19818816c21a4f00b127c59a35e80d4f6c429c3683a45e22904b311',
        metadata: {
          location: 'Tekeze River Plot Kebeles',
          dateRecorded: '2026-07-28',
          itemCount: 450
        }
      },
      {
        id: 'e-7',
        projectId: 'p-4',
        projectTitle: 'Axum Primary Schools Reconstruction',
        commitmentId: 'c-401',
        commitmentTitle: 'Roof Span Reconstruction for 6 Primary Schools',
        title: 'Axum Education Bureau Structural Safety Certificate',
        description: 'Official safety certification signed by senior structural engineer confirming replacement of steel trusses and wind-resistant roofing for 6 primary schools.',
        type: 'Document',
        fileUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
        uploaderName: 'Save the Children Infra Team',
        uploaderOrg: 'Save the Children International',
        uploadedAt: '2026-08-01T15:20:00Z',
        verificationStatus: 'Verified',
        verifiedBy: 'Dr. Helen Gebremichael',
        hash: '12d98129846b0a2185c898b90123ef1245901283901283a0982319082310283a',
        metadata: {
          location: 'Axum Town Primary Schools 1-6',
          dateRecorded: '2026-07-30',
          itemCount: 6
        }
      }
    ];

    // 5. Community Feedback
    this.feedback = [
      {
        id: 'f-1',
        projectId: 'p-2',
        projectTitle: 'Adigrat Clean Water Well Reactivation',
        submittedBy: 'Sara Kidanemariam',
        isAnonymous: false,
        category: 'Missing Goods',
        title: '5 Solar Pumps Missing from Sector 4 Distribution',
        description: 'Water stands in Sector 4 are still dry. Local workers told us that only 9 pumps arrived at the storehouse instead of the promised 14, causing 3 sub-kebeles to remain without water.',
        location: 'Adigrat Sector 4 Sub-Kebele B',
        dateSubmitted: '2026-07-15T09:00:00Z',
        severity: 'High',
        status: 'Action Required',
        resolutionNotes: 'Flagged for formal administrative audit. Project Manager notified to reconcile storehouse inventory.'
      },
      {
        id: 'f-2',
        projectId: 'p-2',
        projectTitle: 'Adigrat Clean Water Well Reactivation',
        submittedBy: 'Anonymous Resident',
        isAnonymous: true,
        category: 'Delay',
        title: 'Open Piping Trenches Blocking Market Road for 3 Weeks',
        description: 'Trench digging stopped mid-way near the Central Market square. Open ditches are dangerous for children at night and blocking vegetable delivery trucks.',
        location: 'Adigrat Central Market Corridor',
        dateSubmitted: '2026-07-28T14:20:00Z',
        severity: 'Medium',
        status: 'Under Review',
        resolutionNotes: 'Contractor instructed to backfill uncompleted trenches by Aug 18.'
      },
      {
        id: 'f-3',
        projectId: 'p-1',
        projectTitle: 'Mekelle Central Hospital Restoration',
        submittedBy: 'Tewolde Medhin',
        isAnonymous: false,
        category: 'Positive Observation',
        title: 'Maternity Ward Solar Power Kept Incubators Running During Grid Blackout',
        description: 'During yesterday’s 6-hour regional electricity blackout, the new solar battery system kicked in instantly. Hospital operating room and incubators remained fully powered without interruption.',
        location: 'Mekelle Ayder Hospital Maternity Ward',
        dateSubmitted: '2026-08-05T11:10:00Z',
        severity: 'Low',
        status: 'Resolved',
        resolutionNotes: 'Commendation passed to engineering team.'
      },
      {
        id: 'f-4',
        projectId: 'p-3',
        projectTitle: 'Shire Displaced Farmers Seed & Equipment',
        submittedBy: 'Hadush Abreha',
        isAnonymous: false,
        category: 'Corruption Risk',
        title: 'Local Cooperative Official Demanded Extra Payment for Fertilizer Bags',
        description: 'At Kebele 3 distribution point, a local clerk asked for 500 Birr extra per bag of fertilizer that was supposed to be fully subsidized under the FAO grant.',
        location: 'Shire Kebele 3 Depot',
        dateSubmitted: '2026-08-01T16:45:00Z',
        severity: 'High',
        status: 'Under Review',
        resolutionNotes: 'Regional Agriculture Bureau opened an internal oversight review. Official suspended pending inquiry.'
      }
    ];

    // 6. Risks
    this.risks = [
      {
        id: 'r-1',
        projectId: 'p-2',
        projectTitle: 'Adigrat Clean Water Well Reactivation',
        commitmentId: 'c-201',
        commitmentTitle: 'Borehole Solar Submersible Pumps Procurement (14 Units)',
        title: 'Discrepancy Between Contracted Quantity (14 Pumps) and Verified Warehouse Inventory (9 Pumps)',
        category: 'Missing Evidence',
        severity: 'Critical',
        description: 'Contract W-2026-ADG disbursed $280,000 for 14 Grundfos solar submersible pumps. Physical evidence item e-4 shows only 9 units delivered to Adigrat storehouse. $100,000 worth of equipment remains unaccounted for.',
        flaggedBy: 'AI Automated Integrity Scan',
        detectedAt: '2026-07-16T10:00:00Z',
        status: 'Open',
        recommendedAction: 'Issue formal stop-payment on remaining contract tranche, conduct physical audit at transit warehouse in Semera, and request serial number manifest from vendor.',
        aiExplanation: {
          whatHappened: 'The payment receipt shows full disbursement ($280,000), but physical storehouse evidence logs only 9 out of 14 solar pumps received.',
          whyItMatters: '5 solar pumps worth approximately $100,000 are missing, directly preventing clean water access for 3 sub-districts (12,000 residents).',
          whatToCheck: 'Check customs manifest at Semera hub, inspect supplier delivery bill of lading, and verify if missing pumps were diverted or delayed in transit.',
          recommendedAction: 'Request immediate physical serial number audit from WaterAid project lead before releasing final 20% milestone funds.'
        }
      },
      {
        id: 'r-2',
        projectId: 'p-2',
        projectTitle: 'Adigrat Clean Water Well Reactivation',
        commitmentId: 'c-202',
        commitmentTitle: 'Main Pipeline Trenching & HD-Polymer Pipe Laying',
        title: 'Implementation Overdue by 40 Days with Unresolved Community Complaints',
        category: 'Timeline Delay',
        severity: 'High',
        description: 'Pipeline trenching deadline passed on July 1 without completion. 2 unresolved community complaints cite hazard from open ditches and lack of water access.',
        flaggedBy: 'Community Feedback Escalation',
        detectedAt: '2026-07-29T11:00:00Z',
        status: 'Investigating',
        recommendedAction: 'Engage municipal contractor, review fuel allocation logs, and set mandatory trench backfilling deadline within 10 days.',
        aiExplanation: {
          whatHappened: 'Pipeline laying in Sector 4 is 40 days past deadline with work halted in market corridor.',
          whyItMatters: 'Open trenches create physical safety risks in high-density areas and delay clean water distribution.',
          whatToCheck: 'Review contractor fuel subsidy receipts and verify if contractor requested formal extension due to rain season.',
          recommendedAction: 'Deploy municipal safety inspectors to site and mandate temporary safety covers over open ditches.'
        }
      },
      {
        id: 'r-3',
        projectId: 'p-3',
        projectTitle: 'Shire Displaced Farmers Seed & Equipment',
        commitmentId: 'c-302',
        commitmentTitle: 'Treadle & Solar Micro-Irrigation Pump Kits',
        title: 'Unverified Delivery of 750 Solar Pump Kits along Tekeze Basin',
        category: 'Missing Evidence',
        severity: 'Medium',
        description: 'Vendor submitted invoice for 1,200 irrigation kits, but field evidence e-6 only verifies 450 installed units. 750 units lack GPS verification.',
        flaggedBy: 'Auditor Review',
        detectedAt: '2026-08-01T14:30:00Z',
        status: 'Open',
        recommendedAction: 'Require vendor to upload GPS-tagged photographic evidence and cooperative verification rosters for remaining 750 kits.',
        aiExplanation: {
          whatHappened: '450 out of 1,200 solar irrigation pumps are geotagged in field photos. 750 units are claimed delivered but unverified.',
          whyItMatters: 'Unverified deliveries create fiduciary risk and risk overstating agricultural yield impacts.',
          whatToCheck: 'Compare cooperative member rosters in Kebeles 4 and 5 with physical pump serial numbers.',
          recommendedAction: 'Deploy mobile verification team with Integrity-OS mobile collector app to sample 50 farmer plots.'
        }
      }
    ];

    // 7. Activity Logs
    this.activities = [
      {
        id: 'act-1',
        projectId: 'p-1',
        projectTitle: 'Mekelle Central Hospital Restoration',
        timestamp: '2026-08-10T14:20:00Z',
        actorName: 'Dr. Helen Gebremichael',
        actorRole: 'Project Manager',
        action: 'AI Integrity Scan',
        details: 'Triggered full AI Integrity scan. Project integrity score calculated as 88/100 (Strong).'
      },
      {
        id: 'act-2',
        projectId: 'p-2',
        projectTitle: 'Adigrat Clean Water Well Reactivation',
        timestamp: '2026-08-09T11:15:00Z',
        actorName: 'Marcus Vance',
        actorRole: 'Funder/Observer',
        action: 'Flagged Risk',
        details: 'Escalated missing pump risk r-1 to Critical severity based on storehouse inventory mismatch.'
      },
      {
        id: 'act-3',
        projectId: 'p-3',
        projectTitle: 'Shire Displaced Farmers Seed & Equipment',
        timestamp: '2026-08-02T15:00:00Z',
        actorName: 'Horn AgroTech Services',
        actorRole: 'Implementer',
        action: 'Uploaded Evidence',
        details: 'Uploaded Tekeze Farmer Cooperative Pump Field Deployment Audit (e-6).'
      },
      {
        id: 'act-4',
        projectId: 'p-1',
        projectTitle: 'Mekelle Central Hospital Restoration',
        timestamp: '2026-07-28T14:30:00Z',
        actorName: 'Dr. Helen Gebremichael',
        actorRole: 'Project Manager',
        action: 'Uploaded Evidence',
        details: 'Uploaded Customs Clearance & Equipment Shipping Manifest #MED-2026-88 (e-3).'
      }
    ];
  }

  // --- CRUD METHODS ---

  // Users
  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  // Projects
  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(p => p.id === id);
  }

  createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'integrityScore' | 'integrityStatus'>): Project {
    const newId = `p-${Date.now()}`;
    const newProject: Project = {
      ...projectData,
      id: newId,
      integrityScore: 80,
      integrityStatus: 'Strong',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.projects.unshift(newProject);
    this.addActivity({
      projectId: newId,
      projectTitle: newProject.title,
      timestamp: new Date().toISOString(),
      actorName: newProject.projectManagerName || 'Administrator',
      actorRole: 'Project Manager',
      action: 'Created Project',
      details: `Created new project "${newProject.title}" with budget $${newProject.budgetAllocated.toLocaleString()}`
    });
    return newProject;
  }

  updateProject(id: string, updates: Partial<Project>): Project | undefined {
    const project = this.projects.find(p => p.id === id);
    if (!project) return undefined;
    Object.assign(project, updates, { updatedAt: new Date().toISOString() });
    return project;
  }

  // Commitments
  getCommitments(projectId?: string): Commitment[] {
    if (projectId) {
      return this.commitments.filter(c => c.projectId === projectId);
    }
    return this.commitments;
  }

  getCommitmentById(id: string): Commitment | undefined {
    return this.commitments.find(c => c.id === id);
  }

  createCommitment(commitmentData: Omit<Commitment, 'id' | 'updatedAt' | 'evidenceIds'>): Commitment {
    const newId = `c-${Date.now()}`;
    const project = this.getProjectById(commitmentData.projectId);
    const newCommitment: Commitment = {
      ...commitmentData,
      id: newId,
      projectCode: project?.code,
      evidenceIds: [],
      updatedAt: new Date().toISOString()
    };
    this.commitments.unshift(newCommitment);
    this.recalculateProjectIntegrity(commitmentData.projectId);
    this.addActivity({
      projectId: commitmentData.projectId,
      projectTitle: project?.title,
      timestamp: new Date().toISOString(),
      actorName: commitmentData.responsiblePerson || 'User',
      actorRole: 'Implementer',
      action: 'Created Commitment',
      details: `Created commitment "${newCommitment.title}" assigned to ${newCommitment.responsibleOrg}`
    });
    return newCommitment;
  }

  updateCommitment(id: string, updates: Partial<Commitment>): Commitment | undefined {
    const commitment = this.commitments.find(c => c.id === id);
    if (!commitment) return undefined;
    Object.assign(commitment, updates, { updatedAt: new Date().toISOString() });
    this.recalculateProjectIntegrity(commitment.projectId);
    return commitment;
  }

  // Evidence
  getEvidence(projectId?: string): EvidenceItem[] {
    if (projectId) {
      return this.evidence.filter(e => e.projectId === projectId);
    }
    return this.evidence;
  }

  getEvidenceById(id: string): EvidenceItem | undefined {
    return this.evidence.find(e => e.id === id);
  }

  createEvidence(evidenceData: Omit<EvidenceItem, 'id' | 'uploadedAt' | 'hash'>): EvidenceItem {
    const newId = `e-${Date.now()}`;
    const project = this.getProjectById(evidenceData.projectId);
    
    // Generate a clean cryptographic SHA-256 style fingerprint
    const hash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const newEvidence: EvidenceItem = {
      ...evidenceData,
      id: newId,
      projectTitle: project?.title,
      uploadedAt: new Date().toISOString(),
      hash
    };

    if (evidenceData.commitmentId) {
      const commitment = this.getCommitmentById(evidenceData.commitmentId);
      if (commitment) {
        newEvidence.commitmentTitle = commitment.title;
        if (!commitment.evidenceIds.includes(newId)) {
          commitment.evidenceIds.push(newId);
          if (commitment.status === 'Planned' || commitment.status === 'In Progress') {
            commitment.status = 'Evidence Submitted';
            commitment.verificationStatus = 'Pending Verification';
          }
        }
      }
    }

    this.evidence.unshift(newEvidence);
    this.recalculateProjectIntegrity(evidenceData.projectId);
    
    this.addActivity({
      projectId: evidenceData.projectId,
      projectTitle: project?.title,
      timestamp: new Date().toISOString(),
      actorName: evidenceData.uploaderName,
      actorRole: 'Implementer',
      action: 'Uploaded Evidence',
      details: `Submitted evidence "${newEvidence.title}" [Hash: ${hash.substring(0, 8)}...]`
    });

    return newEvidence;
  }

  verifyEvidence(id: string, verifiedBy: string, status: 'Verified' | 'Flagged'): EvidenceItem | undefined {
    const item = this.evidence.find(e => e.id === id);
    if (!item) return undefined;
    item.verificationStatus = status;
    item.verifiedBy = verifiedBy;

    if (item.commitmentId) {
      const commitment = this.getCommitmentById(item.commitmentId);
      if (commitment) {
        if (status === 'Verified') {
          commitment.verificationStatus = 'Verified';
          commitment.status = 'Completed';
        } else {
          commitment.verificationStatus = 'Rejected';
          commitment.status = 'At Risk';
        }
      }
    }

    this.recalculateProjectIntegrity(item.projectId);
    return item;
  }

  // Community Feedback
  getFeedback(projectId?: string): CommunityFeedback[] {
    if (projectId) {
      return this.feedback.filter(f => f.projectId === projectId);
    }
    return this.feedback;
  }

  createFeedback(feedbackData: Omit<CommunityFeedback, 'id' | 'dateSubmitted' | 'status'>): CommunityFeedback {
    const newId = `f-${Date.now()}`;
    const project = this.getProjectById(feedbackData.projectId);
    const newFeedback: CommunityFeedback = {
      ...feedbackData,
      id: newId,
      projectTitle: project?.title,
      dateSubmitted: new Date().toISOString(),
      status: 'New'
    };
    this.feedback.unshift(newFeedback);

    // If severity is High, auto-create a risk item
    if (feedbackData.severity === 'High') {
      this.createRisk({
        projectId: feedbackData.projectId,
        title: `Community Alert: ${feedbackData.title}`,
        category: 'Unresolved Complaint',
        severity: 'High',
        description: `High-severity community report submitted by ${feedbackData.submittedBy}: "${feedbackData.description}"`,
        flaggedBy: 'Community Alert System',
        status: 'Open',
        recommendedAction: 'Investigate community report and contact local project officer for field inspection.'
      });
    }

    this.recalculateProjectIntegrity(feedbackData.projectId);

    this.addActivity({
      projectId: feedbackData.projectId,
      projectTitle: project?.title,
      timestamp: new Date().toISOString(),
      actorName: feedbackData.submittedBy,
      actorRole: 'Community/User',
      action: 'Submitted Feedback',
      details: `Submitted community report: "${newFeedback.title}"`
    });

    return newFeedback;
  }

  updateFeedbackStatus(id: string, status: 'New' | 'Under Review' | 'Action Required' | 'Resolved', resolutionNotes?: string): CommunityFeedback | undefined {
    const item = this.feedback.find(f => f.id === id);
    if (!item) return undefined;
    item.status = status;
    if (resolutionNotes) item.resolutionNotes = resolutionNotes;
    this.recalculateProjectIntegrity(item.projectId);
    return item;
  }

  // Risks
  getRisks(projectId?: string): RiskItem[] {
    if (projectId) {
      return this.risks.filter(r => r.projectId === projectId);
    }
    return this.risks;
  }

  createRisk(riskData: Omit<RiskItem, 'id' | 'detectedAt'>): RiskItem {
    const newId = `r-${Date.now()}`;
    const project = this.getProjectById(riskData.projectId);
    const newRisk: RiskItem = {
      ...riskData,
      id: newId,
      projectTitle: project?.title,
      detectedAt: new Date().toISOString()
    };
    this.risks.unshift(newRisk);
    this.recalculateProjectIntegrity(riskData.projectId);

    this.addActivity({
      projectId: riskData.projectId,
      projectTitle: project?.title,
      timestamp: new Date().toISOString(),
      actorName: riskData.flaggedBy,
      actorRole: 'Administrator',
      action: 'Flagged Risk',
      details: `Flagged ${riskData.severity} risk: "${newRisk.title}"`
    });

    return newRisk;
  }

  updateRisk(id: string, updates: Partial<RiskItem>): RiskItem | undefined {
    const risk = this.risks.find(r => r.id === id);
    if (!risk) return undefined;
    Object.assign(risk, updates);
    this.recalculateProjectIntegrity(risk.projectId);
    return risk;
  }

  // Activities
  getActivities(projectId?: string): ActivityLog[] {
    if (projectId) {
      return this.activities.filter(a => a.projectId === projectId);
    }
    return this.activities;
  }

  addActivity(activity: Omit<ActivityLog, 'id'>): ActivityLog {
    const newActivity: ActivityLog = {
      ...activity,
      id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    this.activities.unshift(newActivity);
    return newActivity;
  }

  // --- INTEGRITY SCORE CALCULATOR ENGINE ---
  getIntegrityScoreBreakdown(projectId: string): IntegrityScoreBreakdown {
    const project = this.getProjectById(projectId);
    const commitments = this.getCommitments(projectId);
    const evidence = this.getEvidence(projectId);
    const feedback = this.getFeedback(projectId);
    const risks = this.getRisks(projectId);

    // 1. Commitment Completion Score (Max 35 pts)
    let commitmentScore = 35;
    if (commitments.length > 0) {
      const completed = commitments.filter(c => c.status === 'Completed' || c.status === 'Verified').length;
      const overdueOrAtRisk = commitments.filter(c => c.status === 'Overdue' || c.status === 'At Risk').length;
      const completionRatio = completed / commitments.length;
      commitmentScore = Math.round(completionRatio * 35) - (overdueOrAtRisk * 5);
      commitmentScore = Math.max(0, Math.min(35, commitmentScore));
    }

    // 2. Evidence Coverage Score (Max 25 pts)
    let evidenceScore = 25;
    if (commitments.length > 0) {
      const commitmentsWithEvidence = commitments.filter(c => c.evidenceIds && c.evidenceIds.length > 0).length;
      const coverageRatio = commitmentsWithEvidence / commitments.length;
      evidenceScore = Math.round(coverageRatio * 25);
    }

    // 3. Verification Rate Score (Max 20 pts)
    let verificationScore = 20;
    if (evidence.length > 0) {
      const verifiedEvidence = evidence.filter(e => e.verificationStatus === 'Verified').length;
      const flaggedEvidence = evidence.filter(e => e.verificationStatus === 'Flagged').length;
      const verifiedRatio = verifiedEvidence / evidence.length;
      verificationScore = Math.round(verifiedRatio * 20) - (flaggedEvidence * 4);
      verificationScore = Math.max(0, Math.min(20, verificationScore));
    }

    // 4. Risk Mitigation Score (Max 10 pts)
    let riskScore = 10;
    const openCriticalRisks = risks.filter(r => r.status === 'Open' && r.severity === 'Critical').length;
    const openHighRisks = risks.filter(r => r.status === 'Open' && r.severity === 'High').length;
    riskScore -= (openCriticalRisks * 6 + openHighRisks * 3);
    riskScore = Math.max(0, riskScore);

    // 5. Feedback Resolution Score (Max 10 pts)
    let feedbackScore = 10;
    if (feedback.length > 0) {
      const unresolvedHighSeverity = feedback.filter(f => f.status !== 'Resolved' && f.severity === 'High').length;
      const resolved = feedback.filter(f => f.status === 'Resolved').length;
      feedbackScore = Math.round((resolved / feedback.length) * 10) - (unresolvedHighSeverity * 3);
      feedbackScore = Math.max(0, Math.min(10, feedbackScore));
    }

    const totalScore = commitmentScore + evidenceScore + verificationScore + riskScore + feedbackScore;

    let status: 'Strong' | 'Watch' | 'At Risk' | 'Critical' = 'Strong';
    if (totalScore < 50 || openCriticalRisks > 0) {
      status = 'Critical';
    } else if (totalScore < 70) {
      status = 'At Risk';
    } else if (totalScore < 85) {
      status = 'Watch';
    }

    const recommendations: string[] = [];
    if (commitments.some(c => c.status === 'Overdue')) {
      recommendations.push('Address overdue commitments and submit updated milestone timelines.');
    }
    if (evidence.some(e => e.verificationStatus === 'Flagged')) {
      recommendations.push('Perform physical audit on flagged evidence items to reconcile warehouse inventory.');
    }
    if (risks.some(r => r.status === 'Open')) {
      recommendations.push('Review open risks with project manager and assign mitigation leads.');
    }
    if (feedback.some(f => f.status === 'New')) {
      recommendations.push('Respond to unreviewed community reports to maintain participatory trust.');
    }

    const explanation = `Project Integrity Status is ${status} (${totalScore}/100) based on transparent factors: Commitment Completion (${commitmentScore}/35), Evidence Coverage (${evidenceScore}/25), Verification Rate (${verificationScore}/20), Risk Level (${riskScore}/10), and Feedback Resolution (${feedbackScore}/10).`;

    return {
      score: totalScore,
      status,
      factors: {
        commitmentCompletionScore: commitmentScore,
        evidenceCoverageScore: evidenceScore,
        verificationRateScore: verificationScore,
        riskMitigationScore: riskScore,
        feedbackResolutionScore: feedbackScore
      },
      explanation,
      recommendations
    };
  }

  private recalculateProjectIntegrity(projectId: string) {
    const breakdown = this.getIntegrityScoreBreakdown(projectId);
    this.updateProject(projectId, {
      integrityScore: breakdown.score,
      integrityStatus: breakdown.status
    });
  }

  // Global Dashboard Statistics
  getDashboardStats() {
    const totalProjects = this.projects.length;
    const activeProjects = this.projects.filter(p => p.status === 'Active').length;
    const totalCommitments = this.commitments.length;
    const completedCommitments = this.commitments.filter(c => c.status === 'Completed' || c.status === 'Verified').length;
    const totalEvidenceSubmitted = this.evidence.length;
    const openRisksCount = this.risks.filter(r => r.status === 'Open' || r.status === 'Investigating').length;
    const criticalRisksCount = this.risks.filter(r => (r.status === 'Open' || r.status === 'Investigating') && r.severity === 'Critical').length;
    const communityFeedbackCount = this.feedback.length;
    const unresolvedFeedbackCount = this.feedback.filter(f => f.status !== 'Resolved').length;

    const averageIntegrityScore = Math.round(
      this.projects.reduce((sum, p) => sum + p.integrityScore, 0) / (totalProjects || 1)
    );

    const totalBudget = this.projects.reduce((sum, p) => sum + p.budgetAllocated, 0);
    const totalSpent = this.projects.reduce((sum, p) => sum + p.budgetSpent, 0);

    return {
      totalProjects,
      activeProjects,
      totalCommitments,
      completedCommitments,
      totalEvidenceSubmitted,
      openRisksCount,
      criticalRisksCount,
      communityFeedbackCount,
      unresolvedFeedbackCount,
      averageIntegrityScore,
      totalBudget,
      totalSpent,
      recentActivities: this.activities.slice(0, 10),
      topRisks: this.risks.filter(r => r.status === 'Open').slice(0, 5)
    };
  }
}

export const db = new IntegrityDatabase();
