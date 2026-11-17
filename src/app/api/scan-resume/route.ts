import { NextRequest, NextResponse } from "next/server";
import { scanResumeWithLLM } from "@/lib/llm";
import { matchAllRoles } from "@/lib/matcher";
import { JOB_ROLES } from "@/data/jobRoles";
import { ScanResponse, SeniorityLevel } from "@/types";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText, options } = body;

    if (!resumeText || typeof resumeText !== "string" || resumeText.trim().length === 0) {
      return NextResponse.json({ error: "Resume text is required for scanning." }, { status: 400 });
    }

    // 1. LLM / Semantic analysis
    const { candidate, providerUsed } = await scanResumeWithLLM(resumeText, options);

    // 2. Compute matching scores against all catalog job roles
    const matchedRoles = matchAllRoles(candidate, JOB_ROLES);

    // 3. Derive recommended filters
    const highMatchRoles = matchedRoles.filter((r) => r.matchPercentage >= 50);
    const recommendedDepartments = Array.from(
      new Set(
        highMatchRoles.length > 0
          ? highMatchRoles.map((r) => r.department)
          : matchedRoles.slice(0, 3).map((r) => r.department)
      )
    );

    const levelsOrder: SeniorityLevel[] = ["Junior", "Mid", "Senior", "Lead", "Staff"];
    const candidateIdx = levelsOrder.indexOf(candidate.detectedLevel);
    const recommendedLevels: SeniorityLevel[] = [candidate.detectedLevel];
    if (candidateIdx > 0) recommendedLevels.push(levelsOrder[candidateIdx - 1]);
    if (candidateIdx < levelsOrder.length - 1) recommendedLevels.push(levelsOrder[candidateIdx + 1]);

    const topSkillKeywords = candidate.allSkills.slice(0, 12);

    const responsePayload: ScanResponse = {
      candidate,
      suggestedFilters: {
        recommendedDepartments,
        recommendedLevels,
        topSkillKeywords,
      },
      matchedRoles,
      rawTextPreview: resumeText.slice(0, 400),
      providerUsed,
    };

    return NextResponse.json(responsePayload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error scanning resume";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
