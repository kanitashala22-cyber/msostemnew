# MsoSTEM Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from Codecademy's educational clarity, Duolingo's playful engagement, and Linear's modern minimalism. This combination creates an approachable yet sophisticated platform that empowers young girls in STEM.

**Core Principle**: Empowering and aspirational design that balances professionalism with accessibility, using gradient treatments and modern UI patterns to create an inspiring learning environment.

---

## Typography System

**Font Stack**:
- Primary: "Inter" (headings, navigation, UI elements)
- Secondary: "JetBrains Mono" (code snippets, playground)

**Hierarchy**:
- Hero Headline: text-6xl/text-7xl font-bold
- Section Headlines: text-4xl/text-5xl font-bold
- Subsection Titles: text-2xl/text-3xl font-semibold
- Body Text: text-base/text-lg font-normal
- Small Text: text-sm font-medium

---

## Layout System

**Spacing Primitives**: Consistently use Tailwind units of **4, 6, 8, 12, 16, 20, 24** (as in p-4, gap-8, mt-12, py-20).

**Container Strategy**:
- Full-width sections with inner max-w-7xl containers
- Content-focused sections: max-w-6xl
- Text-heavy content: max-w-4xl

**Section Padding**:
- Desktop: py-20 to py-24
- Mobile: py-12 to py-16

---

## Page Structure

### Navigation Header
- Sticky navigation with subtle backdrop blur
- Logo left, main nav center, language toggle + CTA button right
- Links: Courses, Programs, Playground, Blog, About
- Mobile: Hamburger menu with slide-in panel

### Hero Section (80vh)
- **Large background image**: Diverse group of girls coding together, bright collaborative environment
- Gradient overlay (purple-to-pink) at 40% opacity over image
- Centered content with bold headline, supporting text, dual CTA buttons
- Buttons have backdrop-blur-md background treatment
- Floating "Trusted by 5,000+ students" badge with avatar stack

### Featured Courses Section (3-column grid)
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Course cards with gradient border accent, thumbnail image, title, difficulty badge, duration, description, "Start Learning" link
- Hover: subtle lift effect (translate-y)

### Exchange Programs & Scholarships (2-column split)
- Left: Large feature image of scholarship winners/program participants
- Right: Stacked program cards with icon, title, deadline, eligibility, application CTA

### Code Playground Preview
- Full-width dark section with embedded code editor preview
- Split view: code panel left, output preview right
- "Try the Playground" prominent CTA
- Syntax highlighting visualization

### Success Stories (2-column testimonial grid)
- Student photo, quote, name, achievement badge
- Alternating gradient accent borders

### Blog Highlights (4-column grid on desktop)
- Featured post: 2-column span with large image
- Recent posts: 1-column cards with thumbnail, category tag, title, excerpt, read time
- "View All Articles" link to blog

### Footer
- 4-column layout: About, Quick Links, Resources, Contact
- Newsletter signup with gradient button
- Social media icons
- Language selector
- Copyright and trust badges

---

## Component Library

**Buttons**:
- Primary: Gradient background, white text, rounded-lg, px-6 py-3
- Secondary: Outline with gradient border, gradient text
- Ghost: No background, gradient text on hover

**Cards**:
- Rounded-xl corners
- Subtle shadow (shadow-md)
- Gradient border accent (1px on hover)
- Padding: p-6

**Badges**:
- Rounded-full, text-xs, px-3 py-1
- Gradient backgrounds for emphasis

**Form Inputs**:
- Rounded-lg borders
- Focus: gradient ring effect
- Consistent padding: px-4 py-3

**Language Toggle**:
- Pill-shaped switcher (EN/SQ)
- Gradient background on active state

---

## Images Strategy

**Large Hero Image**: Yes - prominent hero section with inspiring imagery
**Supporting Images**:
1. Hero: Girls collaborating on coding project
2. Programs section: Students at tech conference/workshop
3. Code Playground: Screenshot of interactive coding interface
4. Success Stories: Student headshots (authentic, diverse)
5. Blog thumbnails: Tech/education themed graphics
6. About section: Team photo or classroom setting

---

## Bilingual Implementation

- Language toggle in header (flag icons + text)
- All content duplicated in both languages
- URL structure: /en/ and /sq/ prefixes
- Maintain consistent layout regardless of language

---

## Animations

**Minimal, purposeful only**:
- Fade-in on scroll for section reveals
- Subtle hover lift on cards (transform: translateY(-4px))
- Gradient animation on primary CTAs (background-position shift)
- Code playground typing effect on preview

---

## Accessibility

- ARIA labels for language switcher
- Keyboard navigation for all interactive elements
- Sufficient contrast ratios throughout
- Alt text for all educational images
- Focus indicators with gradient ring treatment