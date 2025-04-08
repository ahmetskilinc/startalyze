export const GENERATE_TITLE_PROMPT = `
- Generate a concise and impactful title for a startup idea.
- The title should accurately reflect the core concept of the startup.
- Aim for clarity, relevance, and professional tone.
- Limit the title to a maximum of 10 words.
- Do not mention specific technologies, platforms, or programming languages unless they are absolutely essential to the core concept and widely understood by a general audience.
- Do not use symbols, punctuation, or special characters unless absolutely necessary for clarity.
- Focus on the problem solved or the value offered.
- Prioritize titles that are easily memorable and shareable.
`;

export const VALIDATE_STARTUP_IDEA_PROMPT = `
Analyze the following startup idea based on publicly available information from the internet. Provide a comprehensive validation report in Markdown format.

**Startup Idea:** [User's Startup Idea - Inserted Dynamically]

**Instructions:**

1.  **Market Analysis:**
    * Assess the market size and growth potential.
    * Identify the target audience and their needs.
    * Analyze the competitive landscape, including existing players and potential substitutes.
    * Research relevant market trends and industry reports.
    * Provide links to supporting data and sources.

2.  **Feasibility Assessment:**
    * Evaluate the technical feasibility of the idea.
    * Identify potential technical challenges and solutions.
    * Assess the operational feasibility, including scalability and resource requirements.
    * Research existing technologies and infrastructure that could support the startup.
    * Provide links to relevant articles and resources.

3.  **Innovation and Differentiation:**
    * Assess the uniqueness of the idea and its value proposition.
    * Identify potential competitive advantages and differentiation strategies.
    * Research existing patents or intellectual property related to the idea.
    * Evaluate the potential for disruption and innovation.
    * Provide links to any supporting documentation.

4.  **Business Model Evaluation:**
    * Analyze the potential revenue generation strategies.
    * Assess the cost structure and potential profitability.
    * Evaluate customer acquisition and retention strategies.
    * Research similar business models and their success rates.
    * Provide links to comparable business examples.

5.  **Risk Assessment:**
    * Identify potential risks and challenges, including market, technical, and operational risks.
    * Evaluate potential mitigation strategies.
    * Assess the impact of market uncertainties and regulatory changes.
    * Research potential legal and ethical considerations.
    * Provide links to related risk assessment resources.

6.  **Overall Validation:**
    * Provide a concise summary of the strengths and weaknesses of the startup idea.
    * Offer recommendations for improvement and further research.
    * Provide a conclusion regarding the overall viability of the idea.

**Output Format:**

Return the analysis in Markdown format, with clear headings and subheadings. Include links to all supporting resources.

**Example Markdown Output Structure:**

\`\`\`markdown
# Startup Idea Validation Report: [Startup Idea Title]

## 1. Market Analysis

* **Market Size and Growth:** [Analysis with links]
* **Target Audience:** [Analysis with links]
* **Competitive Landscape:** [Analysis with links]
* **Market Trends:** [Analysis with links]

## 2. Feasibility Assessment

* **Technical Feasibility:** [Analysis with links]
* **Operational Feasibility:** [Analysis with links]

## 3. Innovation and Differentiation

* **Uniqueness and Value Proposition:** [Analysis with links]
* **Competitive Advantages:** [Analysis with links]

## 4. Business Model Evaluation

* **Revenue Generation:** [Analysis with links]
* **Cost Structure and Profitability:** [Analysis with links]
* **Customer Acquisition:** [Analysis with links]

## 5. Risk Assessment

* **Potential Risks:** [Analysis with links]
* **Mitigation Strategies:** [Analysis with links]

## 6. Overall Validation

* **Strengths:** [Summary]
* **Weaknesses:** [Summary]
* **Recommendations:** [Recommendations]
* **Conclusion:** [Conclusion]
\`\`\`
`;
