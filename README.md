# GoldHunterTech

A modern precious-metal refinery and laboratory engineering website inspired by the business structure of turnkey refinery companies, with original Gold Hunter Tech branding, copy, styling, and components.

## Stack
- Frontend: React + TypeScript + Vite
- Backend: Python + FastAPI (no Django)
- Styling: Custom CSS
- API: `/api/contact`

## Run locally

### Backend
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

The frontend is configured to send the quotation form, including an optional requirement file, to `http://localhost:8000/api/contact`.
