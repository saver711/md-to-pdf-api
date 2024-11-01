import { createPdfWithPuppeteer } from "@services/create-pdf-with-puppeteer.service"
import { markdownToHtml } from "@utils/markdown-to-html"
import { Request, Response } from "express"

export const generatePdf = async (req: Request, res: Response) => {
  try {
    const { headerImage, markdown } = req.files as any
    const headerImageFile = headerImage?.[0]
    const markdownFile = markdown?.[0]

    if (!markdownFile) {
      return res.status(400).json({ message: "Markdown file is required" })
    }

    // Read the content of the Markdown file
    const markdownContent = markdownFile.buffer.toString("utf-8")
    const htmlContent = await markdownToHtml(markdownContent) // Convert Markdown to HTML

    // Use the image buffer directly
    const headerImageBuffer = headerImageFile
      ? headerImageFile.buffer
      : undefined

    // Generate the PDF using the buffer
    const pdfBuffer = await createPdfWithPuppeteer(
      headerImageBuffer,
      htmlContent
    )

    // Set headers for the response
    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", "attachment; filename=document.pdf")
    res.send(pdfBuffer)
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: "Error generating PDF", error })
    }
  }
}
