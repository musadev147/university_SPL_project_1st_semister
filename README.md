# 🩸 HemoPulse - Smart Blood Donor Management & Transfusion Radar ERP

> **CSE 1101 Structured Programming Language University Project**  
> **Institution:** Canadian University of Bangladesh (CUB)  
> **Prepared by:** Musa (MD. MUSA ALOM MIM)

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![Vanilla JS](https://img.shields.io/badge/Stack-100%25%20Vanilla%20JS-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-10B981)](#)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-EF233C)](#)

---

## 🌟 Overview

**HemoPulse** is an ultra-fast, lightweight web-based medical ERP and public emergency transfusion platform. It features:
- **Public Animated Showcase (`home.html`)**: Real-time biological compatibility matching radar, 3D animated floating blood drop, live HTML5 canvas blood cell plasma particle simulation, interactive 8-group transfusion matrix wheel, public donor pledge registration, and 24/7 hotline dispatch banner (`01907096147`).
- **Internal ERP Command Hub (`index.html`, `dashboard.html`)**: In-memory donor state arrays, 120-day physiological cooldown timers, live search with $O(N)$ linear time complexity, CSV export, and responsive design.

---

## 🚀 How to Deploy on Vercel

### Option 1: Via Vercel Dashboard & GitHub (Recommended)
1. Initialize git and push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: HemoPulse ERP"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/hemopulse.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: Choose **"Other"** (Static HTML).
5. Click **"Deploy"**! Vercel will build and deploy your site in ~10 seconds.

### Option 2: Via Vercel CLI
```bash
npx vercel
```
Follow the interactive prompts to deploy directly from your terminal.

---

## 📁 Project Structure

```
├── home.html         # Public Animated Landing Website & Live Compatibility Radar
├── index.html        # ERP Authentication Gateway & Login
├── dashboard.html    # Transfusion ERP Command Dashboard & KPI Metrics
├── donors.html       # Central Donor Database with Search & Actions
├── matching.html     # Real-Time Transfusion Compatibility Engine
├── register.html     # New Donor Intake & Validation Form
├── logic.html        # CSE 1101 C & JS Structured Logic Inspector
├── docs.html         # Full Technical Academic Documentation
├── style.css         # Unified Design System, Keyframes & Responsive Media Queries
├── app.js            # Core In-Memory Engine, Array State, Date Arithmetic
├── vercel.json       # Vercel Clean Routing & Security Headers Configuration
├── package.json      # Project Metadata & NPM Scripts
├── .gitignore        # Git Ignored Files
└── README.md         # Documentation & Deployment Guide
```

---

## 👨‍🎓 Academic Accreditation

- **Project Lead:** Musa (MD. MUSA ALOM MIM)
- **Course:** CSE 1101 Structured Programming Language
- **Department:** Computer Science & Engineering
- **University:** Canadian University of Bangladesh

---

## 📄 License

This project is licensed under the MIT License.
