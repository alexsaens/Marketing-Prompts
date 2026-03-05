# AEO Audit Skill

## Description
Audit a brand, domain, or piece of content for AI search engine visibility. Assess how well positioned the content is to be discovered, extracted, and cited by AI answer engines.

## Trigger
User invokes `/aeo-audit` followed by a brand name, domain, URL, or content.

## Audit Process

### Step 1: Identify Audit Scope
Determine what is being audited:
- **Brand audit**: Assess overall entity visibility across AI platforms
- **Domain audit**: Evaluate site-wide AEO readiness
- **Page audit**: Score a specific page's citability
- **Content audit**: Analyze raw content for AEO optimization potential

### Step 2: AI Visibility Assessment

For each target query or topic area, evaluate:

#### Platform Presence Check
| Platform | Check |
|----------|-------|
| Google AI Overviews | Is the brand/content cited in AI Overview results? |
| Perplexity | Does Perplexity reference this content when answering related queries? |
| ChatGPT | Does ChatGPT mention this brand/content for relevant questions? |
| Claude | Does Claude reference this content in relevant responses? |

#### Content Citability Checklist
Score each item (0-2 points: 0=missing, 1=partial, 2=strong):

- [ ] **Direct answer presence**: Content contains clear, extractable answers (not buried in narrative)
- [ ] **Question-aligned headings**: H2/H3 tags match common user queries
- [ ] **Structured data**: FAQPage, HowTo, Organization, or Article schema implemented
- [ ] **Answer blocks**: 40-60 word summary answers appear near headings
- [ ] **Specific data points**: Concrete numbers, dates, percentages, and sources cited
- [ ] **Comparison content**: Tables, "vs" analyses, or ranked lists present
- [ ] **Source attribution**: Claims backed by linked primary sources
- [ ] **Author authority**: Author byline with credentials/bio present
- [ ] **Internal linking**: Related content linked with descriptive anchor text
- [ ] **Freshness signals**: Publication date, last-updated date, current-year references

**Total score out of 20** → AEO Readiness Rating:
- 16-20: **Strong** — Content is well-positioned for AI citation
- 10-15: **Moderate** — Key improvements needed
- 0-9: **Weak** — Major restructuring recommended

### Step 3: Competitor Benchmarking

If a brand or domain is being audited:
- Identify 3-5 competitors in the same space
- Note which competitors appear in AI answers for target queries
- Analyze what structural/content patterns the cited competitors use
- Identify gaps and opportunities

### Step 4: Technical AEO Factors

Check for:
- `robots.txt` allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- `llms.txt` file exists at domain root with sitemap and attribution preferences
- Page load speed (AI crawlers penalize slow pages)
- Mobile responsiveness
- SSL/HTTPS
- Sitemap.xml present and up to date
- Canonical tags properly set

### Step 5: Entity & Authority Signals

Evaluate brand entity strength:
- Wikipedia page exists and is current
- Wikidata entry with correct properties
- Google Knowledge Panel appears for brand searches
- Verified social profiles (LinkedIn, Twitter/X, Facebook, YouTube)
- News/press coverage from authoritative outlets
- Organization schema with comprehensive `sameAs` links
- Industry-specific directory listings

## Output Format

```
## AEO Audit Report: [Brand/URL/Content Title]
**Date**: [current date]
**Audit Type**: [Brand / Domain / Page / Content]

### Executive Summary
[2-3 sentences on overall AEO readiness and top recommendation]

### AEO Readiness Score: [X/20]
[Citability checklist results table]

### Platform Visibility
| Platform | Status | Notes |
|----------|--------|-------|
| Google AI Overviews | 🟢/🟡/🔴 | [detail] |
| Perplexity | 🟢/🟡/🔴 | [detail] |
| ChatGPT | 🟢/🟡/🔴 | [detail] |
| Claude | 🟢/🟡/🔴 | [detail] |

### Technical AEO Factors
[Results of technical checks]

### Entity & Authority Score
[Assessment of brand authority signals]

### Competitive Landscape
[Who is winning AI citations and why]

### Top 5 Recommendations
1. [Highest-impact action with specific implementation steps]
2. [action]
3. [action]
4. [action]
5. [action]

### Quick Wins (implement in <1 hour)
- [quick win 1]
- [quick win 2]
- [quick win 3]
```

## Guidelines
- When auditing a URL, use WebFetch to retrieve page content
- Be specific in recommendations — "add FAQPage schema for your top 3 questions" not "improve schema"
- Prioritize by impact: structural changes > content changes > technical changes
- Note that AI platform citation behavior changes frequently; recommendations are based on current patterns
- Always frame AEO as complementary to SEO, not a replacement
