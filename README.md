# Aroma Café — Coffee Shop Website

A responsive, modern coffee shop landing page built with plain HTML, CSS, and JavaScript. Features a media carousel, animated section reveals, a responsive mobile nav, and a working contact form.

**Live Demo:** _add your Vercel URL here after deploying_

## Features

- Fully responsive layout (mobile, tablet, desktop)
- Auto-playing image carousel with swipe support
- Scroll-based section reveal animations
- Sticky nav with active-link highlighting
- Contact form with client-side validation (powered by [Formspree](https://formspree.io))

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) (Anton, Poppins)

## Getting Started

```bash
git clone https://github.com/harshtrivedi/aroma-cafe.git
cd aroma-cafe
```

Just open `index.html` in your browser — no build step required.

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the repo on [vercel.com](https://vercel.com/new).
3. Framework preset: **Other** (static site) — no build command needed.
4. Deploy.

## Contact Form Setup (EmailJS)

The contact form uses [EmailJS](https://www.emailjs.com) to send form submissions straight to your inbox — no backend server needed.

1. Sign up free at [emailjs.com](https://www.emailjs.com).
2. **Add an Email Service** (Gmail, Outlook, etc.) → copy the **Service ID**.
3. **Create an Email Template** with these variables in the template body: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}` → copy the **Template ID**.
4. Go to **Account → General** → copy your **Public Key**.
5. Open `java.js` and replace:
   ```js
   const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
   const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
   const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
   ```
   with your actual values.
6. Done — form submissions will now land directly in your email.

Free tier allows 200 emails/month, which is plenty for a portfolio contact form.

## Author

**Harsh Trivedi**
Full Stack Web Developer

- GitHub: [github.com/harshtrivedi](https://github.com/harshtrivedi)
- LinkedIn: [linkedin.com/in/harsh-trivedi-6b9725393](https://linkedin.com/in/harsh-trivedi-6b9725393)

## License

This project is open source and available for personal/educational use.
