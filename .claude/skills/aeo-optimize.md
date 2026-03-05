# AEO Content Optimization Skill

## Description
Optimize content for AI answer engine citability using the EXTRACT framework. Transforms existing content so that AI platforms (ChatGPT, Claude, Perplexity, Google AI Overviews) can discover, extract, and cite it as a direct answer.

## Trigger
User invokes `/aeo-optimize` followed by content text, a URL, or a file path.

## The EXTRACT Framework

Apply these 7 optimization dimensions to every piece of content:

### E — Explicit Answers First
- Add a **40-60 word "Answer Block"** immediately after each H2 heading
- The answer block should directly answer the question implied by the heading
- Use declarative statements, not hedging language ("X is..." not "X might be...")
- Front-load the most important fact in the first sentence

### X — eXtractable Structure
- Use clear H2/H3 heading hierarchy that mirrors common user questions
- Format headings as questions when appropriate ("What is X?" / "How does X work?")
- Use numbered lists for processes, bullet lists for features/options
- Add comparison tables for "vs" and "best of" content
- Keep paragraphs to 2-3 sentences maximum

### T — Technical Markup
- Recommend appropriate schema types: FAQPage, HowTo, DefinedTerm, Article
- Suggest `<meta name="description">` rewrites that answer the primary query
- Ensure the page title contains the target question or keyword
- Recommend `llms.txt` and robots.txt directives for AI crawler access

### R — Rich with Specifics
- Replace vague claims with concrete numbers, dates, costs, and examples
- Include "cite-worthy" statistics with source attribution
- Add real-world case studies or implementation examples
- Use specific timeframes ("in Q1 2026" not "recently")

### A — Authority Signals
- Ensure author bylines with credentials are present
- Recommend linking to primary sources, studies, and official documentation
- Suggest internal links to related authoritative content on the same domain
- Note where E-E-A-T signals (Experience, Expertise, Authoritativeness, Trust) can be strengthened

### C — Cross-Platform Awareness
- **ChatGPT**: Favors conversational depth with context and explanation
- **Perplexity**: Favors factual precision with clear citations and sources
- **Claude**: Values nuanced, multi-perspective analysis
- **Google AI Overviews**: Favors direct answers, structured data, authoritative domains
- Tailor recommendations based on user's priority platform(s)

### T — Testable Outcomes
- Suggest 3-5 specific queries the optimized content should answer
- Recommend testing content against AI platforms before and after optimization
- Define success metrics: citation inclusion, answer accuracy, brand mention

## Output Format

When optimizing content, produce:

```
## AEO Optimization Report

### Summary
[1-2 sentence overview of the content's current citability and top opportunities]

### EXTRACT Score: [X/7]
| Dimension | Score | Key Finding |
|-----------|-------|-------------|
| Explicit Answers | ✅/⚠️/❌ | [finding] |
| Extractable Structure | ✅/⚠️/❌ | [finding] |
| Technical Markup | ✅/⚠️/❌ | [finding] |
| Rich Specifics | ✅/⚠️/❌ | [finding] |
| Authority Signals | ✅/⚠️/❌ | [finding] |
| Cross-Platform | ✅/⚠️/❌ | [finding] |
| Testable Outcomes | ✅/⚠️/❌ | [finding] |

### Priority Optimizations
1. [Highest-impact change with specific instructions]
2. [Second-priority change]
3. [Third-priority change]

### Rewritten Sections
[Provide optimized rewrites for the top 3 sections that need improvement]

### Recommended Schema
[JSON-LD schema markup for the content]

### Test Queries
- [Query 1 this content should answer]
- [Query 2]
- [Query 3]
```

## Guidelines
- Do NOT over-optimize — content must remain natural and valuable to human readers
- Prioritize the 3 highest-impact changes rather than listing everything
- Always preserve the original voice and brand tone
- Consider the content's existing SEO value; AEO should complement, not replace SEO
- When analyzing a URL, use WebFetch to retrieve the content first
