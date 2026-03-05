# Marketing-Prompts: AEO Skills Suite

This repository contains 4,368 AI prompts and 546 digital marketing skills, along with a set of Claude Code skills focused on **Answer Engine Optimization (AEO)** — the practice of optimizing content so AI-powered answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews) can discover, extract, and cite it.

## AEO Skills Overview

The `.claude/skills/` directory contains specialized AEO skills:

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `aeo-optimize` | `/aeo-optimize` | Optimize content for AI citability using the EXTRACT framework |
| `aeo-audit` | `/aeo-audit` | Audit a URL or content for AI search visibility |
| `aeo-schema` | `/aeo-schema` | Generate schema markup (FAQPage, HowTo, Organization) for AEO |
| `aeo-discovery` | `/aeo-discovery` | Discover questions and topics AI engines are answering |
| `aeo-authority` | `/aeo-authority` | Assess and improve brand entity/authority signals for AI |

## Key AEO Principles

- **AEO vs SEO**: SEO aims to generate traffic; AEO aims to generate mentions/citations
- **Citability > Rankability**: Content must be structured for extraction, not just indexing
- **Answer Blocks**: Place concise 40-60 word direct answers at the top of sections
- **Platform awareness**: ChatGPT favors conversational depth, Perplexity favors factual precision with citations, Claude values nuanced multi-perspective analysis
- **Schema markup**: Only ~12% of websites use it — massive early-mover advantage
- **Entity signals**: Wikipedia, Wikidata, Knowledge Panels, verified social profiles build AI trust

## Working with the Prompts CSV

The file `planeeasy.substack.com.csv` contains marketing prompts organized with 9 columns:
1. Topic/Skill Name
2. DECAF
3. DECAF + ENGAGEMENT
4. TAXONOMY
5. PROBLEM SOLVING
6. BEST PRACTICES
7. SYSTEMS THINKING
8. CHECKLIST
9. KEY IDEAS

## Resources

- [Marketing Prompts GPT](https://chatgpt.com/g/g-sEvM9pj5D-marketing-prompts)
- [Max's Prompts on Substack](https://maxberry.substack.com/)
