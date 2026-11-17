import { extractText } from "unpdf";

export async function parsePdfBuffer(data: ArrayBuffer | Uint8Array): Promise<{ text: string; pages: number }> {
  try {
    const uint8 = data instanceof Uint8Array ? data : new Uint8Array(data);
    const { text, totalPages } = await extractText(uint8);

    // Clean up repetitive line breaks and control characters
    const cleanText = (Array.isArray(text) ? text.join("\n") : (text || ""))
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\t/g, " ")
      .replace(/[ \u00A0]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    return {
      text: cleanText,
      pages: totalPages || 1,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to parse PDF document";
    throw new Error(`PDF Extraction Error: ${message}`);
  }
}
