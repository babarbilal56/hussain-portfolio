# Muhammad Hussain - Technical PPC Expert & Data Specialist Portfolio

A modern, high-converting portfolio website tailored for **PPC Expert (Google & Meta Ads)** roles, digital agencies, and performance marketing teams (such as Rozi Academy).

## Key Highlights

- **Tailored Value Proposition:** Bridges Computer Science & Data Analytics (Python, SQL, PowerBI, GTM, GA4) with high-ROI Paid Media strategies (Google Ads & Meta Ads).
- **Zero Fabricated Experience:** Strictly highlights real technical competencies, academic achievements (BS Computer Science at Iqra University, CGPA 3.1), and real projects (*CamTend*, *Finance Manager*, data visualizers).
- **Interactive ROAS & Unit Economics Simulator:** Live interactive widget allowing recruiters to test Ad Spend, CPC, CVR %, and AOV to calculate Clicks, Conversions, CPA, Revenue, and ROAS in real time.
- **UTM Campaign Builder:** Interactive attribution tag generator demonstrating mastery of GA4 tracking taxonomy.
- **Direct Candidate Contacts:** Integrated mailto form, one-click email copying (`emirates.hussain67345@gmail.com`), and direct WhatsApp link (`+92 342 2593789`).
- **Direct CV Download:** 1-click download of `Muhammad_Hussain_Resume.pdf`.

---

## How to Deploy to Vercel

### Option 1: Via Vercel CLI (Fastest)

1. Open your terminal in this directory:
   ```bash
   cd /Users/babarbilal/Desktop/hussain
   ```
2. Run:
   ```bash
   npx vercel
   ```
3. Follow the on-screen prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your Vercel account
   - Link to existing project? **N**
   - What's your project's name? **hussain-portfolio** (or press Enter)
   - In which directory is your code located? **./** (press Enter)
   - Want to modify these settings? **N**
4. For production deployment:
   ```bash
   npx vercel --prod
   ```

### Option 2: Via GitHub + Vercel Dashboard

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Click **Deploy**! (Vercel automatically detects static HTML/CSS/JS and configures everything).

---

## File Structure

```text
hussain/
├── assets/
│   ├── images/
│   │   ├── profile.jpg           # Portrait headshot of Muhammad Hussain
│   │   ├── ppc_project.jpg       # PPC Dashboard & Architecture showcase
│   │   ├── finance_project.jpg   # Finance Manager Project preview
│   │   └── camtend_project.jpg   # CamTend AI Attendance preview
│   └── Muhammad_Hussain_Resume.pdf # Original verified resume
├── index.html                    # Semantic HTML5 with SEO meta tags
├── styles.css                    # Modern CSS design system (Dark Mode & Glassmorphism)
├── app.js                        # Interactive logic, ROAS Simulator & UTM builder
├── vercel.json                   # Vercel deployment configuration & caching headers
├── README.md                     # Deployment guide & documentation
├── hu.pdf                        # Source resume PDF
└── WhatsApp Image...             # Source job description image
```
