import puppeteer from "puppeteer"

export const createPdfWithPuppeteer = async (
  headerImageBuffer: Buffer | undefined,
  htmlContent: string
): Promise<Buffer> => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  let fullHtmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              line-height: 1.6;
            }
            img.header {
              width: 100%;
              margin-bottom: 20px;
            }
            h1, h2, h3, h4, h5, h6 {
              margin: 10px 0;
            }
            p {
              margin: 10px 0;
            }
            pre {
              background-color: #ddd !important;
              padding: 10px;
              border-radius: 5px;
              overflow-x: auto;
              font-family: "Courier New", monospace;
            }
            code {
              background-color: #ddd !important;
              padding: 2px 4px;
              border-radius: 3px;
              font-family: "Courier New", monospace;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f4f4f4;
            }
          </style>
        </head>
        <body>
    `

  if (headerImageBuffer) {
    const base64Image = headerImageBuffer.toString("base64")
    const dataUrl = `data:image/png;base64,${base64Image}`
    fullHtmlContent += `<img src="${dataUrl}" class="header" />`
  }

  fullHtmlContent += `${htmlContent}</body></html>`

  await page.setContent(fullHtmlContent, { waitUntil: "domcontentloaded" })
  const pdfBuffer = await page.pdf({ format: "A4" })
  await browser.close()

  return Buffer.from(pdfBuffer)
}
