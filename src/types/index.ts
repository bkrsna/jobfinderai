export type SeniorityLevel = "Junior" | "Mid" | "Senior" | "Lead" | "Staff";

export type WorkLocation = "Remote" | "Hybrid" | "On-site";

export type EmploymentType = "Full-time" | "Contract" | "Part-time";

export type QuestionCategory = "Technical" | "System Architecture" | "Behavioral" | "Resume Scenario";

export interface InterviewQuestion {
  id: string;
  category: QuestionCategory;
  question: string;
  focusPoints: string[];
  expectedConcepts: string[];
}

export interface JobRole {
  id: string;
  title: string;
  department: string;
  level: SeniorityLevel;
  location: WorkLocation;
  type: EmploymentType;
  experienceMinYears: number;
  salaryRange: string;
  requiredSkills: string[];
  preferredSkills: string[];
  shortDescription: string;
  baseQuestions: InterviewQuestion[];
}

export interface CandidateProfile {
  name?: string;
  titleHeadline?: string;
  detectedLevel: SeniorityLevel;
  estimatedYearsExperience: number;
  primaryDomains: string[];
  skills: {
    languages: string[];
    frameworks: string[];
    cloudAndDevOps: string[];
    databases: string[];
    toolsAndOthers: string[];
  };
  allSkills: string[];
  summary: string;
}

export interface MatchedJobRole extends JobRole {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  tailoredQuestions: InterviewQuestion[];
  fitAssessment: string;
}

export interface ScanResponse {
  candidate: CandidateProfile;
  suggestedFilters: {
    recommendedDepartments: string[];
    recommendedLevels: SeniorityLevel[];
    topSkillKeywords: string[];
  };
  matchedRoles: MatchedJobRole[];
  rawTextPreview: string;
  providerUsed: string;
}

export interface JobFilterState {
  departments: string[];
  levels: SeniorityLevel[];
  minMatchScore: number;
  selectedSkills: string[];
  searchQuery: string;
}
