<!--
  LONGITUDE SWIM — AEO-OPTIMIZED FAQ PAGE (NEW PAGE — DOES NOT CURRENTLY EXIST)
  ================================================================================
  IMPLEMENTATION NOTES (Shopify):
  1. Create a new page at /pages/faq on longitudeswim.com.
  2. Add a link to this page in the footer navigation under "Help" or "Customer Service."
  3. Add a link in the main navigation under a "Fit Help" or "Support" dropdown.
  4. Paste the JSON-LD schema block into your theme.liquid <head>, conditionally loaded
     only on the /pages/faq template (use Shopify's template variable to scope it).
  5. Render each Q as an <h3> and each A as a <p> beneath it.
  6. Heading hierarchy: H1 (page title) → H2 (category) → H3 (question)
-->

# Frequently Asked Questions

_Everything you need to know about Longitude Swim — from long torso fit and sizing to care, returns, and what makes our swimsuits different._

---

## Long Torso Fit

### What is a long torso swimsuit?

A long torso swimsuit is a one-piece swimsuit cut with extra length in the torso — the distance between the shoulder straps and the crotch seam. Standard swimsuits are proportioned for an average torso length. A long torso cut adds extra fabric in that zone to eliminate the shoulder binding, crotch riding, and side seam twisting that women with longer torsos experience in standard swimwear.

### How do I know if I have a long torso?

You likely have a long torso if you recognize any of these common fit problems in standard one-pieces:

- Shoulder straps pull down or cut into your shoulders before the suit fits at the crotch
- The crotch seam rides up uncomfortably even in the correct size
- Side seams twist, roll, or won't stay flat
- The bust fits but the hips don't — or vice versa
- You've never found a one-piece that fit correctly, regardless of size

The simplest test: measure from the top of your shoulder straight down the front of your body to your crotch. If that measurement exceeds 16–17 inches, a long torso cut will almost certainly fit you better than standard swimwear.

### How do I measure my torso for a Longitude swimsuit?

Use a soft measuring tape. Stand upright and measure from the top of your shoulder — where a strap would naturally sit — straight down the front of your body to your crotch. Note the measurement in inches. Then measure your bust, waist, and hips for overall size selection. Our size guide at /pages/size-chart walks through each measurement with instructions.

As a general guide:
- Under 15 inches: Standard sizing typically works
- 15–17 inches: Borderline — try long torso if possible
- Over 17 inches: Long torso cut is strongly recommended

### Is "long torso" the same as being tall?

No — but they often go together. Torso length is measured independently of overall height. Many women who are average height (5'4"–5'6") have long torsos and experience the same fit issues as taller women in standard swimwear. Conversely, some tall women have standard torso lengths.

If you're 5'8" or taller and one-pieces have never fit you comfortably, a long torso cut is almost always the solution. But even at 5'4", if you recognize the symptoms above, measure your torso — you may need long torso sizing.

### What is the difference between "long torso" sizing and "tall" sizing?

Long torso sizing adds extra fabric specifically in the torso zone — between the bust seam and the crotch seam — without changing the width, cup size, or hip dimensions. Tall sizing typically adds overall length across the entire garment, which can result in too much fabric through the leg and seat for women who are only long in the torso, not the leg. Longitude's long torso cuts are specifically designed to solve the torso-length problem, not the overall height problem.

---

## Sizing & Fit

### What sizes does Longitude offer?

Longitude offers swimwear in Misses sizes (generally 8–20) and Plus sizes, with many styles available in long torso cuts within both size ranges. You don't have to choose between a size that fits your body and a length that fits your torso.

### Does Longitude make swimwear for plus size women?

Yes. Longitude offers plus size swimwear with the same long torso fit engineering and support features as misses sizes — tummy control power netting, molded cups, adjustable straps, and chlorine-resistant fabrics — because fit problems associated with a long torso don't stop at a size cutoff.

### Does Longitude offer mastectomy swimsuits?

Yes. Several Longitude styles are designed with mastectomy-friendly features, including suits designed to accommodate prosthetics, provide full chest coverage, and offer structured support without underwire in sensitive areas. Filter by "mastectomy" on the collection page or contact customer service for guidance.

---

## Features & Technology

### What tummy control features do Longitude suits have?

Longitude swimsuits use power netting — a firm, compression-grade internal fabric — in key shaping zones, particularly across the midsection. Power netting provides firmer, more consistent compression than standard swimsuit lining. Combined with chlorine-resistant fabrics that have natural compression properties, molded cups, and strategic seaming, the result is a suit that smooths and streamlines without rigid panels or uncomfortable boning.

### What fabrics does Longitude use?

Longitude uses chlorine-resistant fabrics in all swimwear styles. Chlorine-resistant fabric maintains its elasticity, shape, and color through extended pool use — standard swimwear fabrics can degrade significantly within a single season of regular pool swimming. Longitude also uses premium fabrics with high-stretch recovery that hold their shape through active water use.

### What collections are available under Longitude / Mimi Flamingo?

Longitude Swim is part of the Mimi Flamingo family of swim brands. The collections include:

- **Longitude** — The core collection. Long torso swimwear with classic styling, premium construction, and a full size range.
- **ShapeSolver** — All-over shaping support in a more fashion-forward silhouette.
- **ShapeSolver Sport** — Performance fabrics and sporty cuts for active water use.
- **Trimshaper** — Slimming support at an accessible price point.

---

## Care

### How do I care for my Longitude swimsuit?

- Rinse in cold, fresh water immediately after each use — especially after chlorine or saltwater exposure
- Hand wash with a mild detergent
- Never machine wash, machine dry, or wring
- Lay flat to dry in the shade
- Avoid rough surfaces (pool deck concrete, brick walls) that cause pilling on the fabric exterior

Proper care extends the life of the shaping fabrics and elastic — chlorine and heat are the two primary causes of premature breakdown.

---

## Orders & Returns

### What shipping options does Longitude offer?

- Standard Ground — Free
- Premium Ground — $8.95
- 2nd Day Air — $19.95
- Next Day Air — $29.95

### What is Longitude's return policy?

Longitude offers box-free, printer-free returns through Return Bar locations. Start your return online, select the items to return, and drop off at your nearest Return Bar. Items must be returned within 30 days of shipment, unworn with tags attached.

---

## Schema Markup — Paste Into Theme `<head>` (for /pages/faq only)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a long torso swimsuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A long torso swimsuit is a one-piece swimsuit cut with extra length in the torso — the distance between the shoulder straps and the crotch seam. It is designed for women whose torso is longer than standard swimwear proportions, eliminating the shoulder binding, crotch riding, and side seam twisting that occur when standard-cut suits are worn by women with longer torsos."
      }
    },
    {
      "@type": "Question",
      "name": "How do I know if I have a long torso?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You likely have a long torso if your shoulder straps pull down before the suit fits at the crotch, if the crotch seam rides up uncomfortably, or if you have never found a one-piece that fits correctly in your usual size. Measure from your shoulder to your crotch: over 16 to 17 inches indicates a long torso."
      }
    },
    {
      "@type": "Question",
      "name": "How do I measure my torso for a Longitude swimsuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Using a soft measuring tape, stand upright and measure from the top of your shoulder straight down the front of your body to your crotch. Under 15 inches generally fits standard sizing. 15 to 17 inches is borderline. Over 17 inches strongly indicates a need for long torso sizing."
      }
    },
    {
      "@type": "Question",
      "name": "What sizes does Longitude offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Longitude offers swimwear in Misses sizes (generally 8 to 20) and Plus sizes. Many styles are available in long torso cuts within both size ranges, so you do not have to choose between a size that fits your body and a length that fits your torso."
      }
    },
    {
      "@type": "Question",
      "name": "Does Longitude offer plus size swimwear?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Longitude offers plus size swimwear with the same long torso fit engineering and support features as misses sizes, including tummy control power netting, molded cups, adjustable straps, and chlorine-resistant fabrics."
      }
    },
    {
      "@type": "Question",
      "name": "What tummy control features do Longitude suits have?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Longitude swimsuits use power netting — a firm, compression-grade internal fabric — in key shaping zones, particularly across the midsection. Combined with chlorine-resistant fabrics with natural compression properties and strategic seaming, the suits smooth and streamline without rigid panels or boning."
      }
    },
    {
      "@type": "Question",
      "name": "Does Longitude offer mastectomy swimsuits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Several Longitude styles are designed with mastectomy-friendly features, including suits designed to accommodate prosthetics and provide full chest coverage and structured support."
      }
    },
    {
      "@type": "Question",
      "name": "What is Longitude's return policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Longitude offers box-free, printer-free returns through Return Bar locations. Start your return online, select items to return, and drop off at your nearest Return Bar. Items must be returned within 30 days of shipment, unworn with tags attached."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Longitude and Mimi Flamingo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mimi Flamingo is the parent brand that carries the Longitude collection. Longitude is the swimwear line itself — the same long-torso-focused swimwear with 30 plus years of fit heritage, now part of the Mimi Flamingo family of swim brands."
      }
    }
  ]
}
</script>
```
