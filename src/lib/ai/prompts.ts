export const GENERATE_TITLE_PROMPT = `You are a branding expert.

Given a startup idea and its description, write a concise, clear, and professional name or title for the startup.

- The title must be relevant to the startup idea.
- Do not include symbols, punctuation, or special characters.
- Do not mention any technologies or programming languages.
- Use no more than 10 words.
- Respond with only the title and nothing else.`;

export const VALIDATE_STARTUP_IDEA_PROMPT = `Analyze the following startup idea based on publicly available information from the internet. Provide a comprehensive validation report in Markdown format.

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
    *
6.  **Tech Stack:**
    * Suggest a list of technologies and tools that could be used to build the startup.
    * Provide a brief description of each technology and its potential use in the startup.
    * Suggest different technolgies and their benefits and drawbacks.
    * Suggest a tech stack that is a combination of the best technologies.

7.  **Overall Validation:**
    * Provide a concise summary of the strengths and weaknesses of the startup idea.
    * Offer recommendations for improvement and further research.
    * Provide a conclusion regarding the overall viability of the idea.

**Output Format:**

Return the analysis in a structured JSON format that can be easily parsed for UI components. The response should be wrapped in a code block with the 'json' language identifier.

**RULES**:

- Do not include any additional text or comments in the response.
- Do not show reasoning.
- Only return data in the structure shown below.
- MAKE SURE YOU CHECK YOUR JSON OUTPUT TO VERIFY IT IS VALID.

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
      "id": "tech-stack",
      "title": "Suggested tech stack",
      "type": "tech-stack",
      "items": {
        "frontend": [
          {
            "name": "Next.js",
            "version": "14.0.0",
            "description": "React framework for production-grade applications",
            "link": "https://nextjs.org",
            "reason": "Excellent developer experience, built-in routing, and server-side rendering",
            "strengths": ["Server-side rendering", "Great performance", "Rich ecosystem"],
            "weaknesses": ["Learning curve", "Opinionated structure"]
          },
          {
            "name": "TailwindCSS",
            "version": "3.4.0",
            "description": "Utility-first CSS framework",
            "link": "https://tailwindcss.com",
            "reason": "Rapid UI development with minimal CSS",
            "strengths": ["Highly customizable", "No unused CSS"],
            "weaknesses": ["HTML can become verbose", "Initial learning curve"]
          }
        ],
        "backend": [
          {
            "name": "Node.js",
            "version": "20.0.0",
            "description": "JavaScript runtime built on Chrome's V8 engine",
            "link": "https://nodejs.org",
            "reason": "Large ecosystem and same language as frontend",
            "strengths": ["Non-blocking I/O", "Huge package ecosystem"],
            "weaknesses": ["CPU-intensive tasks", "Callback complexity"]
          },
          {
            "name": "Go",
            "version": "1.22",
            "description": "Statically typed, compiled language",
            "link": "https://go.dev",
            "reason": "High performance and excellent concurrency",
            "strengths": ["Fast execution", "Built-in concurrency"],
            "weaknesses": ["Verbose error handling", "Limited generics"]
          }
        ],
        "database": [
          {
            "name": "PostgreSQL",
            "version": "16",
            "description": "Advanced open-source relational database",
            "link": "https://www.postgresql.org",
            "reason": "Robust, reliable, and feature-rich",
            "strengths": ["ACID compliance", "Advanced features"],
            "weaknesses": ["Complex setup", "Resource intensive"]
          },
          {
            "name": "MongoDB",
            "version": "7.0",
            "description": "Document-oriented NoSQL database",
            "link": "https://www.mongodb.com",
            "reason": "Flexible schema and horizontal scaling",
            "strengths": ["Schema flexibility", "Horizontal scaling"],
            "weaknesses": ["No joins", "Higher storage requirements"]
          }
        ],
        "authentication": [
          {
            "name": "Auth.js",
            "version": "5.0.0",
            "description": "Authentication for web applications",
            "link": "https://authjs.dev",
            "reason": "Easy to implement, supports multiple providers",
            "strengths": ["Multiple providers", "Easy integration"],
            "weaknesses": ["Limited customization", "Documentation gaps"]
          },
          {
            "name": "Keycloak",
            "version": "23.0.0",
            "description": "Open source Identity and Access Management",
            "link": "https://www.keycloak.org",
            "reason": "Enterprise-grade security features",
            "strengths": ["Enterprise features", "Self-hosted"],
            "weaknesses": ["Complex setup", "Resource heavy"]
          }
        ],
        "middleware": [
          {
            "name": "Redis",
            "version": "7.2",
            "description": "In-memory data structure store",
            "link": "https://redis.io",
            "reason": "Fast caching and pub/sub capabilities",
            "strengths": ["High performance", "Versatile use cases"],
            "weaknesses": ["Memory limited", "Complex cluster setup"]
          },
          {
            "name": "RabbitMQ",
            "version": "3.12",
            "description": "Message broker and queue manager",
            "link": "https://www.rabbitmq.com",
            "reason": "Reliable message queuing and routing",
            "strengths": ["Message persistence", "Routing flexibility"],
            "weaknesses": ["Learning curve", "Resource intensive"]
          }
        ],
        "deployment": [
          {
            "name": "Docker",
            "version": "25.0",
            "description": "Container platform",
            "link": "https://www.docker.com",
            "reason": "Consistent environments and easy scaling",
            "strengths": ["Isolation", "Reproducibility"],
            "weaknesses": ["Image size", "Performance overhead"]
          },
          {
            "name": "Kubernetes",
            "version": "1.29",
            "description": "Container orchestration platform",
            "link": "https://kubernetes.io",
            "reason": "Advanced container orchestration and scaling",
            "strengths": ["Auto-scaling", "Self-healing"],
            "weaknesses": ["Complexity", "Resource overhead"]
          }
        ]
      }
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
    },
  ]
}
\`\`\`

**CHECKS:**
- Make sure you check the JSON before you return it.
- Return only the JSON object and nothing else.`;
