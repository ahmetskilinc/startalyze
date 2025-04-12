export const GENERATE_TITLE_PROMPT = `
You are a branding expert.

Given a startup idea and its description, write a concise, clear, and professional name or title for the startup.

- The title must be relevant to the startup idea.
- Do not include symbols, punctuation, or special characters.
- Do not mention any technologies or programming languages.
- Use no more than 10 words.
- Respond with only the title and nothing else.
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

Return the analysis in a structured JSON format that can be easily parsed for UI components. The response should be wrapped in a code block with the 'json' language identifier.

**Example Output Structure:**

\`\`\`json
{
  "title": "Startup Idea Validation Report",
  "ideaName": "[Startup Idea Title]",
  "sections": [
    {
      "id": "market-analysis",
      "title": "Market Analysis",
      "type": "accordion",
      "items": [
        {
          "title": "Market Size and Growth",
          "content": "[Analysis text]",
          "metrics": [
            {
              "label": "Market Size",
              "value": "$X Billion",
              "trend": "up"
            },
            {
              "label": "CAGR",
              "value": "X%",
              "trend": "up"
            }
          ],
          "sources": [
            {
              "text": "Source Title",
              "url": "https://example.com"
            }
          ]
        },
        {
          "title": "Target Audience",
          "content": "[Analysis text]",
          "segments": [
            {
              "name": "Segment 1",
              "percentage": 40,
              "description": "Description of segment"
            }
          ]
        },
        {
          "title": "Competitive Landscape",
          "content": "[Analysis text]",
          "competitors": [
            {
              "name": "Competitor 1",
              "strengths": ["Strength 1", "Strength 2"],
              "weaknesses": ["Weakness 1", "Weakness 2"]
            }
          ]
        }
      ]
    },
    {
      "id": "feasibility",
      "title": "Feasibility Assessment",
      "type": "scorecard",
      "items": [
        {
          "title": "Technical Feasibility",
          "score": 8.5,
          "maxScore": 10,
          "factors": [
            {
              "name": "Technology Readiness",
              "score": 9,
              "description": "Description"
            }
          ]
        }
      ]
    },
    {
      "id": "innovation",
      "title": "Innovation and Differentiation",
      "type": "table",
      "items": [
        {
          "aspect": "Unique Value Proposition",
          "strength": "High",
          "details": "[Analysis]",
          "evidence": ["Point 1", "Point 2"]
        }
      ]
    },
    {
      "id": "business-model",
      "title": "Business Model Evaluation",
      "type": "chart",
      "items": [
        {
          "title": "Revenue Streams",
          "data": [
            {
              "stream": "Stream 1",
              "percentage": 60,
              "potential": "High"
            }
          ]
        }
      ]
    },
    {
      "id": "risks",
      "title": "Risk Assessment",
      "type": "matrix",
      "items": [
        {
          "risk": "Risk 1",
          "impact": "High",
          "probability": "Medium",
          "mitigation": "[Strategy]"
        }
      ]
    },
    {
      "id": "validation",
      "title": "Overall Validation",
      "type": "summary",
      "items": {
        "score": 8.2,
        "verdict": "Viable",
        "strengths": ["Strength 1", "Strength 2"],
        "weaknesses": ["Weakness 1", "Weakness 2"],
        "recommendations": ["Recommendation 1", "Recommendation 2"]
      }
    }
  ]
}
\`\`\`
`;
