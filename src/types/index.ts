export interface Service {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: string;
  category: string;
  department: string;
  description: string;
  officialUrl: string;
  verified: boolean;
  popular: boolean;
  lastVerified: string;
  aliases: string[];
  iconName: string;
  // অতিরিক্ত বিস্তারিত তথ্য
  requiredDocuments?: string[];
  steps?: string[];
  feeInfo?: string;
  processingTime?: string;
  importantNotes?: string[];
  helpline?: string;
}

export interface Category {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: string;
  description: string;
  iconName: string;
  color: string;
  bgColor: string;
  count: number;
}

export interface BrokenReport {
  id: string;
  serviceName: string;
  officialUrl: string;
  issueType: string;
  details: string;
  date: string;
  status: 'pending' | 'resolved';
}