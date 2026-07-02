# Contact Form Email Setup

## Overview

Contact form submissions send emails to the configured recipient via Supabase Edge Functions + Resend API.

**Current recipient:** `a97732348@gmail.com` (Resend test mode)
**Target recipient:** `akashkumar119911@gmail.com` (after domain verification)

---

## Architecture

```
Contact Form (React) → Supabase Edge Function → Resend API → Email
```

1. User fills contact form on `/contact` page
2. Frontend calls `send-contact-email` Edge Function via Supabase client
3. Edge Function sends email via Resend API
4. Email delivered to recipient

---

## Files

| File | Purpose |
|------|---------|
| `supabase/functions/send-contact-email/index.ts` | Edge Function - sends email via Resend |
| `src/services/contactService.ts` | Frontend service - calls Edge Function |
| `src/views/pages/Contact.tsx` | Contact form UI with state, validation, submission |
| `src/styles/contact.css` | Form styles + feedback UI |

---

## Environment Variables

### Supabase Edge Function (Dashboard → Settings → Edge Functions → Environment Variables)

| Key | Value |
|-----|-------|
| `RESEND_API_KEY` | `re_xxxxx` (from Resend dashboard) |

### Frontend (.env)

| Key | Value |
|-----|-------|
| `VITE_SUPABASE_URL` | `https://gztfxxxxxxxxxhyffoobc.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJxxxxx` |

---

## Deployment

### Deploy Edge Function

```bash
npx supabase functions deploy send-contact-email
```

### First-time Setup (if not done)

```bash
# Login to Supabase
npx supabase login

# Link project
npx supabase link --project-ref gztfqxxxxxxxxxxxxxxxxxxx

# Deploy function
npx supabase functions deploy send-contact-email
```

---

## Resend Setup

### Test Mode (Current)
- Only sends to the email registered on Resend account
- From address: `onboarding@resend.dev`
- Recipient: `a97732348@gmail.com`
- No domain verification needed

### Production Mode (After Domain Verification)
1. Go to [resend.com/domains](https://resend.com/domains)
2. Add your domain (e.g., `yourdomain.com`)
3. Add DNS records (TXT, CNAME) to your domain registrar
4. Wait for verification (usually 5-15 minutes)
5. Update Edge Function `to` address to `akashkumar119911@gmail.com`
6. Update `from` address to `contact@yourdomain.com`
7. Redeploy: `npx supabase functions deploy send-contact-email`

---

## Changing Recipient Email

Edit `supabase/functions/send-contact-email/index.ts`:

```typescript
// Line ~45
to: ["akashkumar119911@gmail.com"],  // Change this to desired email
```

Then redeploy:
```bash
npx supabase functions deploy send-contact-email
```

---

## Testing

### Via Form
1. Run `npm run dev`
2. Go to contact page
3. Fill form and submit
4. Check recipient email inbox

### Via API (Terminal)
```bash
curl -X POST https://gztfqtxoqxwahyffoobc.supabase.co/functions/v1/send-contact-email \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Hello","message":"Test message"}'
```

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `401 Unauthorized` | Wrong or missing anon key | Check `VITE_SUPABASE_ANON_KEY` in `.env` |
| `403 Forbidden` | Resend test mode - recipient not verified | Change `to` address to Resend account email, or verify domain |
| `RESEND_API_KEY not configured` | Secret not set in Supabase | Add `RESEND_API_KEY` in Dashboard → Settings → Edge Functions |
| `Failed to send email` | Resend API error | Check API key is valid at resend.com/api-keys |
| Form shows error but no network error | CORS issue | Ensure Edge Function has CORS headers (already configured) |

---

## Form Fields

| Field | Required | Validation |
|-------|----------|------------|
| Name | Yes | Non-empty |
| Email | Yes | Valid email format |
| Subject | No | Free text |
| Message | Yes | Non-empty |

---

## Email Template

The email is sent as HTML with the following structure:

```
From: Portfolio Contact <onboarding@resend.dev>
To: [recipient]
Subject: [subject or "New Contact from [name]"]

- Name
- Email (with mailto link)
- Subject
- Message (formatted with line breaks)
```

---

## Security Notes

- `RESEND_API_KEY` is stored as Supabase secret (not exposed to frontend)
- Frontend only has `VITE_SUPABASE_ANON_KEY` (public, safe for client)
- Edge Function validates required fields before sending
- CORS headers allow requests from any origin (restrict in production if needed)
