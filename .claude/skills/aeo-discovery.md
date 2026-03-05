# AEO Question & Topic Discovery Skill

## Description
Discover the questions, topics, and query patterns that AI answer engines are actively answering. Reverse-engineer what users ask AI chatbots by analyzing publicly available search signals, community forums, and autocomplete data.

## Trigger
User invokes `/aeo-discovery` followed by a topic, keyword, niche, or brand name.

## Discovery Modules

Run all 5 modules for a comprehensive discovery, or specify individual modules.

### Module 1: People Also Ask (PAA) Chain Mining

Analyze Google's "People Also Ask" boxes to find cascading question chains:

1. Start with the seed keyword/topic
2. Generate query variations: "what is [topic]", "how to [topic]", "[topic] vs", "best [topic]", "why [topic]"
3. For each variation, identify PAA questions that appear
4. Categorize questions by search intent:
   - **Informational**: "What is..." / "How does..."
   - **Commercial**: "Best..." / "Top..." / "vs..."
   - **Transactional**: "Buy..." / "Price of..." / "Where to get..."
   - **Navigational**: "[Brand] + [feature]"
5. Prioritize questions that AI engines are most likely to receive (informational and commercial intent dominate AI queries)

### Module 2: Autocomplete Pattern Mining

Analyze search autocomplete suggestions to find high-intent query patterns:

1. Test the seed keyword with modifiers:
   - Question words: how, what, why, when, where, which, who, can, does, is
   - Comparison: vs, versus, compared to, or, alternative
   - Qualifiers: best, top, cheapest, fastest, easiest, free
   - Context: for beginners, for small business, for enterprise, in 2026
2. Record the top suggestions for each modifier
3. Identify patterns and clusters in the suggestions
4. Flag high-frequency patterns that indicate strong user demand

### Module 3: Community Q&A Mining

Extract real questions from forums where users ask the same questions they later ask AI:

**Reddit**:
- Identify relevant subreddits for the topic
- Find top question-format posts (titles containing "?", "how to", "what is", "help with")
- Note which answers received the most upvotes (these mirror what AI considers authoritative)

**Quora**:
- Search for the topic and related terms
- Identify most-followed questions
- Note answer patterns that get the most engagement

**Stack Exchange / niche forums**:
- Relevant for technical topics
- Identify unanswered or poorly answered questions (content opportunities)

### Module 4: Question Tree Mapping

Build a comprehensive question hierarchy for the topic:

```
[Topic]
├── What is [topic]?
│   ├── What are the types of [topic]?
│   ├── What is [topic] used for?
│   └── What is the difference between [topic] and [related]?
├── How does [topic] work?
│   ├── How to get started with [topic]?
│   ├── How much does [topic] cost?
│   └── How long does [topic] take?
├── Why is [topic] important?
│   ├── Why do companies use [topic]?
│   └── Why is [topic] better than [alternative]?
├── Who uses [topic]?
│   ├── Who is the best [topic] provider?
│   └── Who invented [topic]?
└── When should you use [topic]?
    ├── When is [topic] not appropriate?
    └── When did [topic] become popular?
```

Expand each branch with topic-specific sub-questions based on the research from Modules 1-3.

### Module 5: AI Answer Gap Analysis

Identify where AI engines give weak, incomplete, or no answers:

1. Test 10-15 key questions from Modules 1-4 against AI platforms
2. For each question, evaluate:
   - Does the AI provide a confident, complete answer?
   - Does the AI cite specific sources?
   - Is the cited source a competitor?
   - Is the answer outdated or inaccurate?
3. Flag **gap opportunities**: questions where AI answers are weak, unsourced, or wrong
4. Flag **displacement opportunities**: questions where a competitor is cited but could be displaced with better content

## Output Format

```
## AEO Discovery Report: [Topic/Keyword]
**Date**: [current date]
**Modules Run**: [list]

### Executive Summary
[Key findings: total questions discovered, top opportunity areas, competitive gaps]

### Question Inventory
**Total unique questions discovered**: [N]

#### By Intent
| Intent | Count | Top Example |
|--------|-------|-------------|
| Informational | [n] | [example] |
| Commercial | [n] | [example] |
| Transactional | [n] | [example] |
| Navigational | [n] | [example] |

#### Top 20 Priority Questions
[Ranked by estimated AI query volume and content opportunity]

| # | Question | Intent | AI Answer Quality | Opportunity |
|---|----------|--------|-------------------|-------------|
| 1 | [question] | [intent] | Weak/None/Competitor | High/Med/Low |

### Question Tree
[Visual hierarchy from Module 4]

### Content Opportunities
#### Gap Opportunities (AI has no good answer)
1. [question + recommended content format]

#### Displacement Opportunities (competitor is cited)
1. [question + what competitor does well + how to beat them]

### Recommended Content Plan
| Priority | Content Piece | Target Questions | Format |
|----------|--------------|-----------------|--------|
| 1 | [title] | [questions it answers] | [article/FAQ/guide] |
| 2 | [title] | [questions] | [format] |
| 3 | [title] | [questions] | [format] |

### Next Steps
1. [immediate action]
2. [short-term action]
3. [ongoing monitoring recommendation]
```

## Guidelines
- Use WebSearch to gather real data for Modules 1-3 when possible
- Focus on questions that AI chatbots actually receive (informational and commercial intent)
- Deduplicate questions across modules before presenting the final inventory
- Prioritize gaps and displacement opportunities over well-answered topics
- Recommend specific content formats for each opportunity (FAQ page, comparison guide, how-to, etc.)
- Note that question trends change; recommend re-running discovery quarterly
