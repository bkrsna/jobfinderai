import { NextRequest, NextResponse } from "next/server";
import { parsePdfBuffer } from "@/lib/pdfParser";
import { SAMPLE_RESUMES } from "@/data/sampleResumes";


export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const sampleId = formData.get("sampleId") as string | null;

      if (sampleId) {
        const found = SAMPLE_RESUMES.find((s) => s.id === sampleId);
        if (!found) {
          return NextResponse.json({ error: "Sample resume not found" }, { status: 404 });
        }
        return NextResponse.json({
          text: found.fullText,
          pages: 1,
          filename: `${found.name.replace(/\s+/g, "_")}_Resume.pdf`,
          sampleId: found.id,
        });
      }

      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json({ error: "No PDF file or sampleId uploaded" }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const { text, pages } = await parsePdfBuffer(arrayBuffer);

      if (!text || text.trim().length === 0) {
        return NextResponse.json(
          { error: "Could not extract readable text from this PDF. Please ensure it is not a scanned image-only PDF." },
          { status: 422 }
        );
      }

      return NextResponse.json({
        text,
        pages,
        filename: file.name,
      });
    }

    // JSON body fallback
    const body = await req.json().catch(() => ({}));
    if (body.sampleId) {
      const found = SAMPLE_RESUMES.find((s) => s.id === body.sampleId);
      if (found) {
        return NextResponse.json({
          text: found.fullText,
          pages: 1,
          filename: `${found.name}_Resume.pdf`,
        });
      }
    }

    if (body.text) {
      return NextResponse.json({
        text: body.text,
        pages: 1,
        filename: "Pasted_Resume.txt",
      });
    }

    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to process resume";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
