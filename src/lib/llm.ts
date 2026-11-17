import { CandidateProfile, InterviewQuestion, SeniorityLevel } from "@/types";

// Comprehensive tech skill taxonomy
export const SKILL_TAXONOMY = {
  languages: [
    "TypeScript", "JavaScript", "Python", "Go", "Golang", "Rust", "Java", "C++", "C#", "Ruby", "PHP", "Swift", "Kotlin", "SQL", "HTML5", "CSS3"
  ],
  frameworks: [
    "React", "React.js", "Next.js", "Vue", "Vue.js", "Nuxt", "Angular", "Svelte", "Node.js", "Express", "NestJS", "FastAPI", "Django", "Flask", "Spring Boot", "Ruby on Rails", "Tailwind CSS", "Redux", "Zustand", "TanStack Query", "GraphQL", "REST APIs", "gRPC"
  ],
  cloudAndDevOps: [
    "AWS", "GCP", "Google Cloud", "Azure", "Docker", "Kubernetes", "K8s", "Terraform", "Terragrunt", "CI/CD", "GitHub Actions", "GitLab CI", "Linux", "Prometheus", "Grafana", "ArgoCD", "Helm", "Cloudflare", "OpenTelemetry", "Datadog"
  ],
  databases: [
    "PostgreSQL", "Postgres", "MySQL", "MongoDB", "Redis", "Cassandra", "Elasticsearch", "DynamoDB", "Snowflake", "BigQuery", "SQLite", "Prisma", "Drizzle", "Vector Databases", "Pinecone", "Qdrant", "Chroma", "Milvus"
  ],
  aiAndData: [
    "PyTorch", "TensorFlow", "Large Language Models (LLMs)", "LLMs", "RAG", "LangChain", "LlamaIndex", "Fine-tuning", "vLLM", "Deep Learning", "NLP", "Computer Vision", "Scikit-learn", "Hugging Face", "Pandas", "NumPy", "Apache Spark", "Airflow", "dbt"
  ],
  specialized: [
    "Micro-frontends", "Distributed Systems", "Web Performance", "State Management", "System Architecture", "React Native", "iOS", "Android", "Playwright", "Cypress", "Jest", "Vitest", "OWASP", "Application Security", "Threat Modeling", "Penetration Testing", "Agile / Scrum", "Product Strategy"
  ]
};

// Flattened skill lookup for fast regex matching
const ALL_CANONICAL_SKILLS = Array.from(
  new Set([
    ...SKILL_TAXONOMY.languages,
    ...SKILL_TAXONOMY.frameworks,
    ...SKILL_TAXONOMY.cloudAndDevOps,
    ...SKILL_TAXONOMY.databases,
    ...SKILL_TAXONOMY.aiAndData,
    ...SKILL_TAXONOMY.specialized,
  ])
);

export interface ScanOptions {
  apiKey?: string;
  provider?: "openai" | "gemini" | "groq" | "heuristic";
  endpoint?: string;
  model?: string;
}

/**
 * Extracts candidate profile from resume text using heuristic analysis.
 * Fast, deterministic, and 100% offline-ready.
 */
export function extractCandidateProfileHeuristic(resumeText: string): CandidateProfile {
  const normalizedText = resumeText.toLowerCase();

  // 1. Detect candidate name (look at first 3 non-empty lines)
  const lines = resumeText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.toLowerCase().includes("resume") && !l.toLowerCase().includes("curriculum"));
  
  let detectedName = "Candidate";
  if (lines.length > 0) {
    const firstLine = lines[0];
    if (firstLine.length < 40 && !firstLine.includes("@") && !firstLine.includes("http")) {
      detectedName = firstLine.replace(/[^a-zA-Z\s.-]/g, "").trim();
    }
  }

  // 2. Skill Detection against canonical taxonomy
  const matchedSkills = new Set<string>();
  for (const skill of ALL_CANONICAL_SKILLS) {
    // Escape for regex
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const pattern = new RegExp(`(?:^|[\\s,;()/\\[\\]{}:•-])${escaped}(?:$|[\\s,;()/\\[\\]{}:•-])`, "i");
    if (pattern.test(resumeText)) {
      matchedSkills.add(skill);
    }
  }

  // Categorize extracted skills
  const languages = SKILL_TAXONOMY.languages.filter((s) => matchedSkills.has(s));
  const frameworks = SKILL_TAXONOMY.frameworks.filter((s) => matchedSkills.has(s));
  const cloudAndDevOps = SKILL_TAXONOMY.cloudAndDevOps.filter((s) => matchedSkills.has(s));
  const databases = SKILL_TAXONOMY.databases.filter((s) => matchedSkills.has(s));
  const aiAndData = SKILL_TAXONOMY.aiAndData.filter((s) => matchedSkills.has(s));
  const specialized = SKILL_TAXONOMY.specialized.filter((s) => matchedSkills.has(s));

  const allSkillsList = Array.from(matchedSkills);

  // 3. Experience Estimation
  let estimatedYears = 3; // sensible default
  const yearMatches = resumeText.match(/(\d+)\+?\s*years(?:\s+of)?\s+experience/i);
  if (yearMatches && yearMatches[1]) {
    const parsed = parseInt(yearMatches[1], 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 30) {
      estimatedYears = parsed;
    }
  } else {
    // Scan for year ranges e.g. 2018 - 2024 or 2020 - Present
    const yearNumbers = Array.from(resumeText.matchAll(/\b(20[0-2][0-9])\b/g)).map((m) => parseInt(m[1], 10));
    if (yearNumbers.length >= 2) {
      const minYear = Math.min(...yearNumbers);
      const currentYear = new Date().getFullYear();
      const diff = currentYear - minYear;
      if (diff >= 0 && diff <= 25) {
        estimatedYears = diff;
      }
    }
  }

  // 4. Seniority Level Calculation
  let detectedLevel: SeniorityLevel = "Mid";
  if (normalizedText.includes("staff") || normalizedText.includes("principal") || estimatedYears >= 9) {
    detectedLevel = "Staff";
  } else if (normalizedText.includes("lead") || normalizedText.includes("architect") || estimatedYears >= 7) {
    detectedLevel = "Lead";
  } else if (normalizedText.includes("senior") || normalizedText.includes("sr.") || estimatedYears >= 5) {
    detectedLevel = "Senior";
  } else if (estimatedYears <= 2 && (normalizedText.includes("junior") || normalizedText.includes("entry") || normalizedText.includes("intern"))) {
    detectedLevel = "Junior";
  }

  // 5. Primary Domain Identification
  const domainScores: Record<string, number> = {
    "Frontend Engineering": 0,
    "Backend & Systems": 0,
    "Full-Stack": 0,
    "AI & Data Science": 0,
    "Cloud & Infrastructure": 0,
    "Mobile Engineering": 0,
    "Security & Compliance": 0,
  };

  if (matchedSkills.has("React") || matchedSkills.has("Next.js") || matchedSkills.has("Tailwind CSS") || matchedSkills.has("Web Performance")) {
    domainScores["Frontend Engineering"] += 3;
  }
  if (matchedSkills.has("Node.js") || matchedSkills.has("Go") || matchedSkills.has("PostgreSQL") || matchedSkills.has("Kafka") || matchedSkills.has("gRPC")) {
    domainScores["Backend & Systems"] += 3;
  }
  if (domainScores["Frontend Engineering"] >= 3 && domainScores["Backend & Systems"] >= 3) {
    domainScores["Full-Stack"] += 5;
  }
  if (matchedSkills.has("PyTorch") || matchedSkills.has("LLMs") || matchedSkills.has("RAG") || matchedSkills.has("Vector Databases")) {
    domainScores["AI & Data Science"] += 6;
  }
  if (matchedSkills.has("Kubernetes") || matchedSkills.has("Terraform") || matchedSkills.has("AWS") || matchedSkills.has("Docker")) {
    domainScores["Cloud & Infrastructure"] += 5;
  }
  if (matchedSkills.has("React Native") || matchedSkills.has("iOS") || matchedSkills.has("Android") || matchedSkills.has("Swift")) {
    domainScores["Mobile Engineering"] += 6;
  }
  if (matchedSkills.has("Application Security") || matchedSkills.has("OWASP") || matchedSkills.has("Penetration Testing")) {
    domainScores["Security & Compliance"] += 6;
  }

  const sortedDomains = Object.entries(domainScores)
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([domain]) => domain);

  const primaryDomains = sortedDomains.length > 0 ? sortedDomains.slice(0, 2) : ["Full-Stack", "Frontend Engineering"];

  // 6. Summary (Crisp, zero slop)
  const summary = `${detectedLevel} level engineer with approximately ${estimatedYears} years of experience specializing in ${primaryDomains.join(" and ")}. Extracted ${allSkillsList.length} core technical competencies across modern frameworks, distributed architectures, and deployment toolchains.`;

  return {
    name: detectedName,
    titleHeadline: `${detectedLevel} Software Engineer`,
    detectedLevel,
    estimatedYearsExperience: estimatedYears,
    primaryDomains,
    skills: {
      languages,
      frameworks,
      cloudAndDevOps,
      databases,
      toolsAndOthers: [...aiAndData, ...specialized],
    },
    allSkills: allSkillsList,
    summary,
  };
}

/**
 * Generates tailored interview questions for a matched job role
 * based on candidate's detected skills and identified gaps.
 */
export function generateTailoredQuestions(
  roleTitle: string,
  candidate: CandidateProfile,
  matchingSkills: string[],
  missingSkills: string[],
  baseQuestions: InterviewQuestion[]
): InterviewQuestion[] {
  const tailored: InterviewQuestion[] = [...baseQuestions];

  // If there are missing skills, generate a specific skill-gap transition question
  if (missingSkills.length > 0) {
    const gapSkill = missingSkills[0];
    tailored.push({
      id: `gap-${roleTitle.toLowerCase().replace(/\s+/g, "-")}`,
      category: "Resume Scenario",
      question: `This role emphasizes ${gapSkill}. Given your proficiency with ${matchingSkills.slice(0, 2).join(" and ")}, how will you accelerate your mastery of ${gapSkill} in production?`,
      focusPoints: [
        `Parallels between familiar paradigms and ${gapSkill}`,
        "Proven ramp-up methodology on mission-critical features",
        "Writing defensive tests while learning new stack layers"
      ],
      expectedConcepts: ["Abstraction layers", "Official documentation & specifications", "Proof-of-concept prototyping"]
    });
  }

  // If candidate is Senior or higher, add an architectural trade-off question
  if (candidate.detectedLevel === "Senior" || candidate.detectedLevel === "Lead" || candidate.detectedLevel === "Staff") {
    tailored.push({
      id: `arch-${roleTitle.toLowerCase().replace(/\s+/g, "-")}`,
      category: "System Architecture",
      question: `In your past ${candidate.estimatedYearsExperience} years of experience, walk through a high-stakes architectural decision you made that required balancing latency, developer velocity, and operational cost.`,
      focusPoints: [
        "Quantitative benchmarks evaluated before rollout",
        "Disaster recovery and fallback mechanics",
        "Retrospective lessons learned after scaling"
      ],
      expectedConcepts: ["SLA / SLO impacts", "Load testing metrics", "Post-mortem governance"]
    });
  }

  return tailored;
}

/**
 * Scan resume text with optional external LLM or local deterministic fallback.
 */
export async function scanResumeWithLLM(
  resumeText: string,
  options?: ScanOptions
): Promise<{ candidate: CandidateProfile; providerUsed: string }> {
  const apiKey = options?.apiKey || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

  if (apiKey && options?.provider === "openai") {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: options.model || "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an expert technical resume scanner. Analyze the resume text strictly. Output ONLY valid JSON matching this schema:
{
  "name": "string",
  "detectedLevel": "Junior" | "Mid" | "Senior" | "Lead" | "Staff",
  "estimatedYearsExperience": number,
  "primaryDomains": ["string"],
  "skills": {
    "languages": ["string"],
    "frameworks": ["string"],
    "cloudAndDevOps": ["string"],
    "databases": ["string"],
    "toolsAndOthers": ["string"]
  },
  "allSkills": ["string"],
  "summary": "string"
}`,
            },
            {
              role: "user",
              content: resumeText,
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        return { candidate: parsed, providerUsed: "OpenAI GPT-4o" };
      }
    } catch {
      // Fallback silently to deterministic heuristic extractor
    }
  }

  // Default / Deterministic Local Extractor
  const heuristicProfile = extractCandidateProfileHeuristic(resumeText);
  return {
    candidate: heuristicProfile,
    providerUsed: "Deterministic Semantic Engine (Local)",
  };
}
