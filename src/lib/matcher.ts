import { CandidateProfile, JobRole, MatchedJobRole, SeniorityLevel } from "@/types";
import { generateTailoredQuestions } from "./llm";

// Canonical skill normalization map
const NORMALIZED_SKILL_MAP: Record<string, string> = {
  "react.js": "react",
  "vue.js": "vue",
  "postgres": "postgresql",
  "golang": "go",
  "k8s": "kubernetes",
  "llm": "llms",
  "large language models": "llms",
  "large language models (llms)": "llms",
  "aws": "aws",
  "amazon web services": "aws",
  "gcp": "gcp",
  "google cloud": "gcp",
  "ci/cd": "ci/cd",
  "nextjs": "next.js",
  "nodejs": "node.js",
};

function normalizeSkill(s: string): string {
  const lower = s.toLowerCase().trim();
  return NORMALIZED_SKILL_MAP[lower] || lower;
}

function skillsOverlap(candidateSkills: string[], targetSkill: string): boolean {
  const normTarget = normalizeSkill(targetSkill);
  return candidateSkills.some((cs) => {
    const normC = normalizeSkill(cs);
    return (
      normC === normTarget ||
      normC.includes(normTarget) ||
      normTarget.includes(normC)
    );
  });
}

const LEVEL_WEIGHTS: Record<SeniorityLevel, number> = {
  Junior: 1,
  Mid: 2,
  Senior: 3,
  Lead: 4,
  Staff: 5,
};

export function matchRole(candidate: CandidateProfile, role: JobRole): MatchedJobRole {
  const candidateSkills = candidate.allSkills || [];

  const matchingRequired: string[] = [];
  const missingRequired: string[] = [];

  for (const req of role.requiredSkills) {
    if (skillsOverlap(candidateSkills, req)) {
      matchingRequired.push(req);
    } else {
      missingRequired.push(req);
    }
  }

  const matchingPreferred: string[] = [];
  const missingPreferred: string[] = [];

  for (const pref of role.preferredSkills) {
    if (skillsOverlap(candidateSkills, pref)) {
      matchingPreferred.push(pref);
    } else {
      missingPreferred.push(pref);
    }
  }

  // 1. Skill Match Score (up to 70 points)
  const reqRatio = role.requiredSkills.length > 0 ? matchingRequired.length / role.requiredSkills.length : 1;
  const prefRatio = role.preferredSkills.length > 0 ? matchingPreferred.length / role.preferredSkills.length : 0;
  const skillScore = reqRatio * 55 + prefRatio * 15;

  // 2. Experience Match Score (up to 20 points)
  let expScore = 20;
  const expDiff = candidate.estimatedYearsExperience - role.experienceMinYears;
  if (expDiff < 0) {
    // Under minimum experience: penalize 5 pts per year deficit
    expScore = Math.max(0, 20 + expDiff * 6);
  }

  // 3. Seniority Tier Alignment (up to 10 points)
  const candidateLevelWeight = LEVEL_WEIGHTS[candidate.detectedLevel] || 2;
  const roleLevelWeight = LEVEL_WEIGHTS[role.level] || 2;
  const levelDiff = Math.abs(candidateLevelWeight - roleLevelWeight);
  const levelScore = Math.max(0, 10 - levelDiff * 4);

  const rawPercentage = Math.round(skillScore + expScore + levelScore);
  const matchPercentage = Math.min(99, Math.max(15, rawPercentage));

  // Crisp fit assessment (Strictly zero slop)
  let fitAssessment = "";
  if (matchPercentage >= 85) {
    fitAssessment = `Exceptional fit. Meets ${matchingRequired.length}/${role.requiredSkills.length} core requirements and matches the ${role.level} seniority profile.`;
  } else if (matchPercentage >= 70) {
    fitAssessment = `Strong match with ${matchingRequired.length}/${role.requiredSkills.length} required competencies; targeted preparation needed for ${missingRequired[0] || "niche tooling"}.`;
  } else if (matchPercentage >= 50) {
    fitAssessment = `Moderate alignment. Cross-functional skills overlap, but experience level or core tooling differs from baseline.`;
  } else {
    fitAssessment = `Low compatibility. Missing ${missingRequired.slice(0, 2).join(" & ")} and requires substantial domain pivoting.`;
  }

  const allMatching = Array.from(new Set([...matchingRequired, ...matchingPreferred]));
  const allMissing = Array.from(new Set([...missingRequired, ...missingPreferred]));

  const tailoredQuestions = generateTailoredQuestions(
    role.title,
    candidate,
    allMatching,
    allMissing,
    role.baseQuestions
  );

  return {
    ...role,
    matchPercentage,
    matchingSkills: allMatching,
    missingSkills: allMissing,
    tailoredQuestions,
    fitAssessment,
  };
}

export function matchAllRoles(candidate: CandidateProfile, roles: JobRole[]): MatchedJobRole[] {
  return roles
    .map((role) => matchRole(candidate, role))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
}
