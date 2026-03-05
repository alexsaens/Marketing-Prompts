# AEO Brand Authority & Entity Signals Skill

## Description
Assess and improve a brand's entity signals and authority markers that AI answer engines use to determine trustworthiness and citation worthiness. AI platforms rely on entity graphs and authority signals to decide which sources to cite — this skill helps strengthen those signals.

## Trigger
User invokes `/aeo-authority` followed by a brand name, domain, or company name.

## Why Entity Authority Matters for AEO

AI answer engines don't just match keywords — they build **entity graphs** that connect brands, people, topics, and relationships. When an AI decides which source to cite, it evaluates:
- Is this a recognized entity with verified presence across platforms?
- Do authoritative third-party sources reference this entity?
- Is the information consistent across all entity touchpoints?
- Does this entity have demonstrated expertise in the topic?

## Authority Assessment Framework

### 1. Knowledge Graph Presence

Check for presence in major knowledge bases:

| Signal | Status | Impact |
|--------|--------|--------|
| **Wikipedia page** | Exists / Stub / Missing | Very High — primary knowledge source for all AI models |
| **Wikidata entry** | Complete / Partial / Missing | Very High — structured entity data AI models consume directly |
| **Google Knowledge Panel** | Appears / Missing | High — signals entity recognition by Google |
| **Crunchbase profile** | Complete / Partial / Missing | Medium — used by AI for company data |

### 2. Verified Social & Platform Presence

Evaluate brand presence across platforms AI engines cross-reference:

- **LinkedIn** company page (verified, complete, active)
- **Twitter/X** (verified, active, consistent branding)
- **YouTube** (channel with content, About section complete)
- **Facebook** business page
- **GitHub** (for tech companies)
- **Industry-specific platforms** (G2, Capterra, ProductHunt for SaaS; Yelp, TripAdvisor for local)

Each platform should have:
- Consistent brand name and description
- Links back to the primary domain
- Active, recent content

### 3. Structured Data (Organization Schema)

Evaluate the Organization schema on the brand's website:
- Is `@type: Organization` present on the homepage?
- Does it include comprehensive `sameAs` links to all verified profiles?
- Are `founder`, `foundingDate`, `numberOfEmployees` populated?
- Is the `description` clear and cite-worthy?
- Does a `ContactPoint` exist?

### 4. Third-Party Authority Signals

Evaluate external validation:
- **Press/news coverage**: Articles from recognized publications
- **Industry awards/recognition**: Listed on authoritative "best of" or award pages
- **Academic/research citations**: Referenced in papers, studies, or educational content
- **Government/institutional references**: Listed in official directories or resources
- **Podcast/interview appearances**: Founders or experts featured as guests

### 5. Content Authority Signals

Evaluate on-site expertise markers:
- **Author pages**: Do content authors have detailed bios with credentials?
- **About page**: Does it clearly establish expertise, history, and credentials?
- **Case studies**: Are real results with specific metrics published?
- **Original research**: Does the brand publish primary data or studies?
- **Expert contributions**: Do recognized industry experts contribute content?

### 6. Technical Trust Signals

- **Domain age and history** (older, consistent domains are trusted more)
- **SSL/HTTPS** implemented
- **Consistent NAP** (Name, Address, Phone) across the web for local brands
- **Privacy policy and terms** present
- **Secure, fast-loading website**

## Entity Consistency Audit

AI engines cross-reference entity data across sources. Inconsistencies reduce trust.

Check for consistency in:
- Brand name spelling and formatting
- Company description / boilerplate
- Founding date
- Founder/CEO names
- Headquarters location
- Product/service descriptions

## Output Format

```
## AEO Authority Report: [Brand Name]
**Date**: [current date]
**Domain**: [domain if applicable]

### Authority Score: [X/100]

### Knowledge Graph Status
| Signal | Status | Action Required |
|--------|--------|----------------|
| Wikipedia | [status] | [action or "None"] |
| Wikidata | [status] | [action] |
| Knowledge Panel | [status] | [action] |
| Crunchbase | [status] | [action] |

### Platform Presence
| Platform | Status | Consistent | Active | Action |
|----------|--------|------------|--------|--------|
| LinkedIn | ✅/❌ | ✅/❌ | ✅/❌ | [action] |
| Twitter/X | ✅/❌ | ✅/❌ | ✅/❌ | [action] |
| YouTube | ✅/❌ | ✅/❌ | ✅/❌ | [action] |
| [others] | ... | ... | ... | ... |

### Organization Schema Status
[Current schema assessment + recommended improvements]

### Entity Consistency
[Any inconsistencies found across platforms]

### Third-Party Authority
[Assessment of external validation signals]

### Content Authority
[Assessment of on-site expertise signals]

### Priority Actions
1. **[Highest impact]**: [Specific action with implementation steps]
2. **[Second priority]**: [action]
3. **[Third priority]**: [action]
4. **[Fourth priority]**: [action]
5. **[Fifth priority]**: [action]

### Quick Wins (implement in <1 day)
- [quick win 1]
- [quick win 2]
- [quick win 3]

### Long-Term Strategy
[2-3 sentences on ongoing authority building]
```

## Guidelines
- Use WebSearch to verify actual brand presence across platforms
- Be honest about gaps — the value is in identifying what's missing, not inflating scores
- Prioritize knowledge graph presence (Wikipedia, Wikidata) as the highest-impact signals
- Note that Wikipedia has strict notability requirements — don't recommend creating a page if the brand doesn't meet them
- For smaller/newer brands, focus on achievable signals first (social profiles, schema, directory listings)
- Entity building is a long-term strategy; set realistic expectations
- Always check for entity consistency — one inconsistency can undermine other efforts
