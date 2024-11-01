# PDF Generator API

## Description

This is a simple Node.js application that generates a PDF file from a header image and Markdown file.

## Try using postman

- Clone the repo
- npm i
- npm run dev
- use postman: http://localhost:5800/api/pdf/generate with **headerImage** and **markdown** as form-data body then save the response as file [Postman Screenshot](https://asset.cloudinary.com/dchgmm8wb/f57d8b7de0cd6ce518ea25e0ccb8c452)

## API Endpoint

### POST /api/pdf/generate

- **Header Image**: Optional, image file (PNG format)
- **Markdown File**: Required, markdown content as .md file
- **Response**: PDF file

## Example Request

```bash
curl -X POST http://localhost:3000/api/pdf/generate \
  -F "headerImage=@path/to/image.png" \
  -F "markdown=@path/to/markdown.md"
```

## Author

[@AhmedHassan](https://www.linkedin.com/in/ahmedhassan711/)
