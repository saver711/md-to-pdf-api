import { marked } from "marked"

export const markdownToHtml = (markdown: string) => {
  return marked(markdown)
}
