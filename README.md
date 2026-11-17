# Evalify: AI mock interviews from your resume

**Live:** [auto-interview-psi.vercel.app](https://auto-interview-psi.vercel.app)

Upload a resume, pick the kind of role you are preparing for, and an AI interviewer asks you questions built from that resume. It speaks the questions, listens to your answers, watches for tab switches, and gives you a scored report at the end.

## What it does

- **Resume-based questions:** reads your PDF resume and generates questions about your own projects and skills
- **Pick your track:** Engineering, Government jobs, Medical, Law, MBA, Teaching, Startup and General corporate
- **Voice interview:** the interviewer speaks the questions aloud (browser speech synthesis) and transcribes your spoken answers (Web Speech API)
- **English, Hindi or Hinglish:** the interviewer can reply in any of the three
- **Proctoring:** webcam on during the interview, with alerts for tab switches
- **Report:** confidence and correctness scores, plus strong and weak topics
- **History:** every past interview is saved to your profile

## Tech stack

| Part | Built with |
|---|---|
| Frontend | React, Vite, Redux Toolkit, Tailwind CSS, Motion, react-webcam, pdf.js |
| Backend | Node.js, Express, MongoDB (Mongoose), JWT cookie auth, Multer, pdf-parse |
| AI | Groq (Llama 3.3 70B) |
| Auth | Email and password, plus Google sign-in through Firebase |
| Hosting | Vercel |

## How it works

1. `POST /api/interview/analyze-resume` turns the uploaded PDF into text and pulls out your skills and projects.
2. `POST /api/interview/generate` asks the model for questions that fit your resume and chosen track.
3. During the interview the browser handles speech and the webcam, and nothing is streamed to the server.
4. `POST /api/interview/analyze` scores the transcript and saves the result. `GET /api/interview/history` lists past interviews.

## Run it locally

You need Node.js 18+ and a MongoDB database (local or Atlas).

```bash
# API
cd server
npm install
npm run dev          # http://localhost:8000 by default

# Web app (new terminal)
cd client
npm install
npm run dev          # http://localhost:5173
```

Create `server/.env`:

```env
MONGODB_URL=your-mongodb-connection-string
JWTSECRET=any-long-random-string
GROQ_API_KEY=your-groq-key
PORT=8000
```

The client reads its Firebase config from `client/src/utils/firebase.js`.

## Project structure

```
client/   React app: pages for upload, interview room, result and profile
server/   Express API: auth, user and interview routes, Mongoose models
```

## Author

Built by [Varun Sharma](https://github.com/i-varunsharma).
