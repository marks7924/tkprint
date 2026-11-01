# TK-PRINT — Complete E-Commerce Platform

> **"Your Phone. Your Story."**  
> Creative Minimalism + Editorial E-Commerce for Bespoke & Curated Phone Cases in Egypt and the GCC.

---

## 🎨 Visual Identity & Brand Direction

- **Primary Pink**: `#EFA6C1`
- **Secondary Pink**: `#D982A5`
- **Soft Background**: `#FFF8FA`
- **Warm Cream**: `#F8F1ED`
- **Deep Text**: `#292329`
- **Secondary Text**: `#817780`
- **Borders**: `#F0E4E9`
- **Official Assets**:
  - `logo.jpg`: TK-PRINT official brand logo (Desktop header, Mobile header, Footer, Admin, Order receipts).
  - `web.jpg`: Desktop and mobile visual design baseline.

---

## 🚀 Technology Stack

- **Framework**: Next.js App Router (TypeScript)
- **Styling**: Tailwind CSS with custom editorial brand tokens and soft shadows
- **Database & Auth**: PostgreSQL / Supabase Schema (`supabase/migrations/20261101_init_schema.sql`) with client fallback
- **State Management**: React Context (`StoreContext` and `LanguageContext`) with full `localStorage` persistence
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Internationalization**: Arabic (Default with full RTL) + English (LTR) with instant language switcher

---

## 📱 Core Features & User Journeys

1. **Find Your Phone**:
   - Filter cases strictly based on exact database device compatibility.
   - Initial support for Apple iPhone, Samsung Galaxy, Xiaomi, Oppo, and Huawei.
   - Selected device persists across visits and filters store products dynamically.

2. **Custom Studio (Case Designer)**:
   - Interactive live preview with camera cutout overlays tailored to the chosen phone model.
   - Upload customer artwork (JPG, PNG, WEBP up to 15MB).
   - Add bespoke names and quotes in multiple typography families (Serif, Sans, Mono, Signature Cursive).
   - Real-time zoom, 90° rotation, vertical position sliders, and print technician instructions.
   - Admin access to download original high-resolution artwork for manufacturing.

3. **Matching Cases**:
   - Dedicated experience for couples and best friends.
   - Pairs two completely different phone models (e.g. iPhone 15 Pro + Galaxy S24 Ultra).
   - Automatic 15% duo bundle discount applied in cart.

4. **Tiered Bundle Builder**:
   - Choose 2 cases (15% off), 3 cases (20% off), or 4 cases (25% off).
   - Pick individual phone models and case finishes per item.

5. **Style Quiz**:
   - 3-step aesthetic quiz matching users to curated design styles (Cute, Minimal, Dark, Romantic).

6. **Limited Drops & Community Gallery**:
   - Real scarcity drop countdown with live unit inventory.
   - Customer photo uploads with admin moderation approval workflow.
   - Design of the week voting system.

7. **Cart & Seamless Checkout**:
   - Guest checkout available without mandatory registration.
   - Egyptian governorates shipping rates with automatic free delivery on orders over 999 EGP.
   - Cash on Delivery (COD) and Online Card Payment selection.
   - Unique order generation (e.g. `TK-849201`) with live tracking pipeline.

8. **Admin Operations Hub**:
   - Comprehensive dashboard with revenue metrics, pending orders, custom artwork download queue, product catalog manager, and community post moderation.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```
