import express, { Request, Response } from "express"
import multer from "multer"
import { generatePdf } from "@controllers/pdf.controller"

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post(
  "/generate",
  upload.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "markdown", maxCount: 1 }
  ]),
  (req: Request, res: Response) => {
    generatePdf(req, res)
  }
)

export default router
