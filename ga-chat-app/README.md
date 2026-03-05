# GA4 Analytics Chat

A Next.js chat interface for querying Google Analytics 4 data across Miraclesuit, Venus, Vitamin A, and Longitude using Claude AI.

## Quick Start

### 1. Install dependencies

```bash
cd ga-chat-app
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in:

```env
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
```

### 3. Set up Google Service Account (one-time)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project (or use an existing one)
3. Enable **Google Analytics Data API** (`APIs & Services → Enable APIs`)
4. Go to **IAM & Admin → Service Accounts → Create Service Account**
5. Download the JSON key file
6. In **Google Analytics Admin**, add the service account email as a **Viewer** on each of the 4 properties:
   - Miraclesuit (`292696532`)
   - Venus (`516975710`)
   - Vitamin A (`322306237`)
   - Longitude (`368919397`)
7. Paste the entire JSON file contents as a single line into `GOOGLE_SERVICE_ACCOUNT_JSON`

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment (Vercel)

1. Push to GitHub
2. Import into Vercel
3. Add environment variables in Vercel dashboard:
   - `ANTHROPIC_API_KEY`
   - `GOOGLE_SERVICE_ACCOUNT_JSON` (paste the JSON as a single line)

## Features

- **4 brand switcher** — Miraclesuit, Venus, Vitamin A, Longitude
- **Conversational AI** — powered by Claude Opus
- **Real GA4 data** — queries live data via Google Analytics Data API
- **Rich rendering** — tables, bar charts, line charts, area charts
- **Streaming responses** — see status updates while GA is being queried
- **Suggested questions** — quick-start prompts on the home screen

## Example Questions

- "What were our top 10 traffic sources last 30 days?"
- "Show me daily sessions for the past 2 weeks as a chart"
- "Which pages have the highest bounce rate?"
- "Compare new vs returning users this month"
- "What devices are our visitors using?"
- "How many active users right now?"
