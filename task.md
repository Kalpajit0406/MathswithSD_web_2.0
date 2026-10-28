# Project Architecture & Design System

## Design Context

### Users & Context
- **Target Audience:** High school students (Classes 11 & 12), aspirants preparing for competitive entrance examinations (WBJEE, JEE Main, JEE Advanced), and their parents.
- **User Context:** Visitors typically arrive from word-of-mouth recommendations, social media, or search, seeking serious mathematics & science coaching with a proven track record. Many browse on mobile phones late in the evening.
- **Job to Be Done:** 
  1. Verify teacher credentials, methodology, and past board/entrance results.
  2. Understand course offerings, syllabus depth, and fee/batch timings.
  3. Seamlessly enquire, call, or message on WhatsApp to reserve a seat.
  4. Access visual/interactive mathematics modules and download the Android mobile app.

### Brand Personality
- **3-Word Persona:** **Rigorous**, **Authoritative**, **Inspiring**.
- **Voice & Tone:** Academic mastery with genuine pedagogical warmth. Speaks directly as an experienced educator (Soumen Sir) rather than a faceless corporate EdTech aggregator.
- **Emotional Goals:** Deep trust, academic confidence, intellectual curiosity, and clarity.
- **Anti-References:** 
  - Generic SaaS/AI templates with neon-cyan dark mode and glowing floating gradient orbs.
  - Aggressive commercial hype, countdown clocks, or spammy discount popups.
  - Low-contrast light gray text on light gray backgrounds.

### Aesthetic Direction
- **Theme:** **Warm Editorial Chalkboard / Harvard Crimson**.
- **Color Palette Tokens:**
  - `Parchment Base`: `#FDFBF7` (page background), `#F7F3EC` (subtle contrast), `#EDE7DC` (card borders and dividers).
  - `Typography Neutrals`: `#1E2022` (primary ink), `#2D3139` (headings/emphasis), `#555B67` (readable body text).
  - `Accent Harvard Crimson`: `#991B1B` (primary CTA / brand insignia), `#BE123C` (hover state), `#FFF1F2` (badge backgrounds).
  - `Accent Warm Amber / Gold`: `#D97706` / `#F59E0B` (highlights, formula accents, active status pills).
- **Typography Pairing:**
  - Display / Headings: `Space Grotesk` (clean, geometric, architectural clarity).
  - Body / Reading: `Inter` (high-legibility optical sizing for numbers and technical explanations).
  - Formula & Classroom Accents: `Kalam` & `Caveat` (authentic chalkboard hand-written mathematical derivations).

### Core Design Principles
1. **Credibility Over Novelty:** Every statistic and claim must be grounded in real pedagogy (15+ years teaching, 1,200+ rankers, 100/100 board scores). Never use placeholder AI metrics or decorative fluff.
2. **Mobile-First Conversions:** All key actions (WhatsApp direct chat, phone call, enquiry sheet) must be 1-tap accessible on touch devices via pinned action bars with min 44–48px touch targets.
3. **Restrained Motion & High Performance:** Heavy 3D Three.js visualizers and video intros must always be dynamically lazy-loaded with skeleton shimmer placeholders. Never block initial page rendering.
4. **Tactile Hierarchy:** Information flows naturally from Teacher Credibility → Pedagogical Approach → Curriculum & Batches → Admissions.
