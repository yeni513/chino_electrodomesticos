---
name: brand-footer-policy
description: Professional footer, copyright, agency credit, demo disclaimer, and client ownership policy for websites built by Leyva Web Studio. Use whenever creating or editing a footer, building a client website, creating a private demo, preparing a site for launch, or adding agency credit.
---

# BRAND FOOTER POLICY — Leyva Web Studio

You are acting as a professional web developer and premium agency owner.

Every website must handle footer credit, copyright, authorship, client ownership, and demo disclaimers correctly.

The goal is to make the website look professional, legally clean, client-friendly, and branded without making Leyva Web Studio look like the owner of the client’s business.

---

## Core Rule

The main copyright belongs to the business/client unless the website is for Leyva Web Studio itself.

Leyva Web Studio should appear as the creator/designer/developer of the website, not as the owner of the client’s brand, content, images, products, menu, services, or business identity.

---

## Footer Rules for Client Websites

For real client websites, use this structure:

© 2026 [Business Name]. All rights reserved.  
Website by Leyva Web Studio.

Alternative wording:

© 2026 [Business Name]. All rights reserved.  
Designed & developed by Leyva Web Studio.

Use the business/client name as the main copyright owner.

Do not write:

© 2026 Leyva Web Studio. All rights reserved.

unless the website is actually for Leyva Web Studio.

---

## Footer Rules for Private Demos

For private demos, redesign concepts, unofficial redesigns, or sales presentations, include a clear but discreet disclaimer.

Use this structure:

© 2026 [Business Name]. Demo concept only.  
Unofficial redesign concept for private presentation purposes.  
Website concept by Leyva Web Studio.

Alternative Spanish version:

© 2026 [Nombre del Negocio]. Concepto demo solamente.  
Concepto de rediseño no oficial creado solo para presentación privada.  
Concepto web por Leyva Web Studio.

The footer must make it clear that:
- This is not the official website.
- The business name is used only for presentation/demo purposes.
- Leyva Web Studio created the concept/design.
- Leyva Web Studio is not claiming ownership of the business.

---

## Footer Rules for Leyva Web Studio’s Own Website

If the project is for Leyva Web Studio, Alexander Rodriguez, a personal portfolio, or the agency itself, then use:

© 2026 Leyva Web Studio. All rights reserved.

Optional:

Built with precision by Leyva Web Studio.

Do not add “Website by Leyva Web Studio” as a separate external credit if Leyva Web Studio is already the brand owner.

---

## Agency Credit Rules

Always add a professional agency credit unless the user specifically says not to.

Recommended text:

Website by Leyva Web Studio

or:

Designed & developed by Leyva Web Studio

or for demos:

Website concept by Leyva Web Studio

The credit should be:
- elegant
- subtle
- professional
- readable
- non-invasive
- integrated naturally into the footer
- not styled like cheap advertising

The credit should not:
- steal attention from the client
- look spammy
- look like a giant badge
- use loud colors
- create layout imbalance
- hurt mobile layout
- imply ownership of the client’s business

---

## Agency Link Rules

If the official Leyva Web Studio domain is available, link the agency credit.

Use:

<a href="https://leyvawebstudio.com" target="_blank" rel="noopener noreferrer">
  Website by Leyva Web Studio
</a>

If the domain is not confirmed, use plain text or a placeholder that is easy to replace later.

Do not invent a final domain if the project does not already have one.

If using React/Next.js, use the project’s standard link pattern when appropriate.

---

## Ownership Language Rules

Correct:

© 2026 Trusted Appliances. All rights reserved.  
Website by Leyva Web Studio.

Correct:

© 2026 Tapatias Taqueria. Demo concept only.  
Unofficial redesign concept for private presentation purposes.  
Website concept by Leyva Web Studio.

Incorrect:

© 2026 Leyva Web Studio. All rights reserved.

for a client website.

Incorrect:

Official website by Leyva Web Studio

for a private demo unless the site is actually approved as the official website.

Incorrect:

Leyva Web Studio owns all content

unless there is a specific contract saying that.

---

## Visual Design Requirements

The footer credit must feel premium.

Recommended design:
- small text size
- clean typography
- subtle contrast
- readable on all backgrounds
- elegant hover state
- no aggressive colors
- no flashing effects
- no distracting animations
- aligned with the footer grid
- consistent spacing
- accessible contrast

For dark footers:
- use muted text color
- agency link can have a soft hover color
- avoid pure low-contrast gray if unreadable

For light footers:
- use neutral text
- keep the agency credit refined and quiet

---

## Responsive Requirements

Every footer update must be checked for:
- desktop alignment
- tablet layout
- mobile stacking
- spacing
- readable font size
- tap target if linked
- no horizontal overflow
- no text cut off
- no broken line wrapping
- no overlapping footer columns

On mobile:
- the copyright and agency credit can stack vertically
- spacing should remain clean
- links should be tappable
- text should not be too tiny

---

## Accessibility Requirements

Footer links must:
- be keyboard accessible
- have visible focus states
- use readable contrast
- include rel="noopener noreferrer" when target="_blank"
- avoid vague labels like “click here”

Do not use color alone to communicate important meaning.

---

## SEO / Trust Requirements

The footer should help trust, not confuse users.

For client websites:
- The client/business appears as the owner.
- Leyva Web Studio appears as the creator.
- Contact and business info should remain easy to find.
- Footer should not hide important business info behind agency branding.

For local businesses:
- keep business name
- phone
- address
- hours
- service area
- important CTA links
- social links if available

The agency credit must never compete with the client’s conversion goals.

---

## Demo Disclaimer Requirements

Use a demo disclaimer when:
- the project is a redesign concept
- the business has not approved the site as official
- the site uses business name/images for presentation
- the site is being sent to a potential client
- the site is a sales pitch

Recommended English disclaimer:

Unofficial redesign concept for private presentation purposes only.

Recommended Spanish disclaimer:

Concepto de rediseño no oficial creado solo para presentación privada.

The disclaimer should be discreet but visible enough to avoid confusion.

---

## Decision Rules

Before editing a footer, identify the project type:

1. Real paid client website
2. Private demo / unofficial redesign
3. Leyva Web Studio / personal agency website
4. Personal portfolio
5. Internal/admin-only project
6. Unknown

If unknown, ask the user before deciding final legal/credit wording.

---

## Output Formats

### Real Client Website Footer

Use:

© 2026 [Business Name]. All rights reserved.  
Website by Leyva Web Studio.

### Private Demo Footer

Use:

© 2026 [Business Name]. Demo concept only.  
Unofficial redesign concept for private presentation purposes.  
Website concept by Leyva Web Studio.

### Spanish Private Demo Footer

Use:

© 2026 [Nombre del Negocio]. Concepto demo solamente.  
Concepto de rediseño no oficial creado solo para presentación privada.  
Concepto web por Leyva Web Studio.

### Leyva Web Studio Website Footer

Use:

© 2026 Leyva Web Studio. All rights reserved.

---

## Implementation Rules

When updating code:
- Locate the existing footer component.
- Do not duplicate footers.
- Do not create a second footer if one already exists.
- Preserve the current design language.
- Integrate the copyright and agency credit naturally.
- Do not break existing footer links.
- Do not remove client contact information.
- Do not remove important CTAs.
- Do not change unrelated sections unless required.
- Do not install packages for this task.
- Do not rewrite the whole layout unless necessary.

If there is no footer:
- Create a clean, minimal, responsive footer.
- Include business name.
- Include copyright.
- Include agency credit.
- Include demo disclaimer if needed.
- Include key links if obvious from the site structure.

---

## Project-Specific Guidance

### Restaurant Demo

For restaurant demos like Tapatias Taqueria:

Use:

© 2026 Tapatias Taqueria. Demo concept only.  
Unofficial redesign concept for private presentation purposes.  
Website concept by Leyva Web Studio.

Keep it subtle and premium.

Do not make the demo look like the official site unless the business approves it.

### Appliance Business Website

For appliance business projects like Trusted Appliances / Chino Electrodomesticos:

If it is a real client project:

© 2026 Trusted Appliances. All rights reserved.  
Website by Leyva Web Studio.

If it is still a demo:

© 2026 Trusted Appliances. Demo concept only.  
Unofficial website concept for private presentation purposes.  
Website concept by Leyva Web Studio.

### Leyva Web Studio Website

For Leyva Web Studio’s own website:

© 2026 Leyva Web Studio. All rights reserved.

No client disclaimer needed.

---

## Final Checklist

After making footer changes, verify:

- Correct business name
- Correct project type
- Correct copyright owner
- Leyva Web Studio appears only as creator/developer
- Demo disclaimer included when needed
- Footer looks premium
- Footer works on mobile
- No horizontal overflow
- Link has target and rel if external
- Contrast is readable
- No broken layout
- No misleading ownership language
- No fake legal claims
- No unnecessary packages installed

---

## User Commands

If the user says “apply footer policy”, apply this full policy.

If the user says “add my credit”, add Leyva Web Studio credit professionally.

If the user says “demo footer”, use private demo disclaimer.

If the user says “client footer”, use real client footer format.

If the user says “agency footer”, use Leyva Web Studio ownership format.

If the user says “make it legal/professional”, ensure ownership and disclaimer wording are clean and not misleading.

---

# Final Instruction

Every website should make the client look like the owner and Leyva Web Studio look like the premium creator.

Do not overdo it.

Make it elegant, professional, and trustworthy.
