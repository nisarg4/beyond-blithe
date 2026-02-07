# Beyond Blithe - Project Context

## What This Is
Event management website for Beyond Blithe, serving Indian middle-class families in Toronto.
- **Instagram:** @beyondblithe
- **Live site:** https://beyond-blithe.vercel.app
- **GitHub:** https://github.com/nisarg4/beyond-blithe (private)

---

## Tech Stack
- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Image Storage:** Supabase Storage (bucket: `gallery`)
- **Auth:** Supabase Auth (for admin)
- **CAPTCHA:** Cloudflare Turnstile
- **Hosting:** Vercel

---

## Supabase Details
- **Project URL:** https://unnqgmdjmsxmrafvnujc.supabase.co
- **Tables:** `inquiries`, `gallery_images`, `gallery_videos`
- **Storage bucket:** `gallery` (public)

---

## Pages Built
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, services preview, CTA |
| About | `/about` | Story, values |
| Services | `/services` | All 6 services with details |
| Gallery | `/gallery` | Pulls images from Supabase |
| Contact | `/contact` | Form with CAPTCHA, saves to DB |
| Admin Login | `/admin/login` | Supabase auth |
| Admin Dashboard | `/admin/dashboard` | Upload images to gallery |
| Admin Inquiries | `/admin/inquiries` | View/manage form submissions |

---

## Features Completed
- [x] Multi-page website structure
- [x] Contact form with "How did you hear about us" tracking
- [x] Conditional "Other" text fields in form
- [x] Cloudflare Turnstile CAPTCHA
- [x] Form submissions saved to Supabase
- [x] Admin authentication
- [x] Admin image upload to gallery
- [x] Admin inquiry viewer with status updates
- [x] Gallery displays images from database
- [x] Deployed to Vercel

---

## TODO / Future Improvements
- [ ] Update Turnstile domain in Cloudflare (add `beyond-blithe.vercel.app`)
- [ ] Upload real event photos via admin dashboard
- [ ] Polish design (less minimalistic, more vibrant for events)
  - Add hero background image/video
  - Warmer color palette
  - Elegant typography
  - Subtle animations
- [ ] Add custom domain (e.g., beyondblithe.ca)
- [ ] Email notifications for new inquiries
- [ ] Video upload support in admin
- [ ] Mobile navigation (hamburger menu)

---

## Environment Variables (in Vercel & .env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://unnqgmdjmsxmrafvnujc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAACY8xJ2g9sRnSX4Q
TURNSTILE_SECRET_KEY=0x4AAAAAACY8xFlBAG2yZZRA9yTEl8ODoYY
```

---

## How to Resume Work

Start Claude in the project folder:
```bash
cd ~/Desktop/Demo-claude/beyond-blithe
claude
```

Then say:
> "Read PROJECT-CONTEXT.md and let's continue working on Beyond Blithe"

---

## Key Files
- `src/app/` - All pages
- `src/components/` - Navigation, Footer, Turnstile
- `src/lib/supabase.ts` - Supabase client
- `src/app/api/contact/route.ts` - Contact form API with CAPTCHA verification
- `supabase-schema.sql` - Database schema (already run)

---

*Last updated: February 8, 2026*
