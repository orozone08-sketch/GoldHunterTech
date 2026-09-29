from datetime import datetime, timezone
from pathlib import Path
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import EmailStr

app = FastAPI(title="GoldHunterTech API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "GoldHunterTech"}

@app.post("/api/contact")
async def contact(
    name: str = Form(...),
    email: EmailStr = Form(...),
    phone: str = Form(...),
    message: str = Form(...),
    company: str = Form(""),
    country: str = Form(""),
    interest: str = Form(""),
    capacity: str = Form(""),
    attachment: UploadFile | None = File(None),
):
    """Record a quotation request and optionally retain its supporting file."""
    log = Path(__file__).with_name("enquiries.txt")
    timestamp = datetime.now(timezone.utc).isoformat()
    attachment_name = ""
    if attachment and attachment.filename:
        upload_dir = Path(__file__).with_name("uploads")
        upload_dir.mkdir(exist_ok=True)
        safe_name = Path(attachment.filename).name.replace(" ", "_")
        attachment_path = upload_dir / f"{timestamp.replace(':', '-')}_{safe_name}"
        attachment_path.write_bytes(await attachment.read())
        attachment_name = attachment_path.name
    with log.open("a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {{'name': {name!r}, 'email': {str(email)!r}, 'phone': {phone!r}, 'company': {company!r}, 'country': {country!r}, 'interest': {interest!r}, 'capacity': {capacity!r}, 'message': {message!r}, 'attachment': {attachment_name!r}}}\n")
    return {"success": True, "message": "Enquiry received"}
