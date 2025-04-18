import { geistSans } from "@/lib/fonts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import ReactMarkdown from "react-markdown";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface ValidationReportProps {
  data: {
    title: string;
    ideaName: string;
    sections: Array<{
      id: string;
      title: string;
      type: string;
      items: any[];
    }>;
  };
}

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <ArrowUp className="text-green-500 h-4 w-4" />;
  if (trend === "down") return <ArrowDown className="text-red-500 h-4 w-4" />;
  return <Minus className="text-gray-500 h-4 w-4" />;
};

export function ValidationReport({ data }: ValidationReportProps) {
  const renderMetrics = (metrics: any[]) => (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {metrics.map((metric, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{metric.label}</p>
            <TrendIcon trend={metric.trend} />
          </div>
          <p className="text-2xl font-bold mt-2">{metric.value}</p>
        </Card>
      ))}
    </div>
  );

  const renderScorecard = (item: any, index: number) => (
    <Card className="mt-4" key={index + item.title}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{item.title}</CardTitle>
          <Badge variant={item.score >= 7 ? "secondary" : "destructive"}>
            {item.score}/{item.maxScore}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {item.factors.map((factor: any, i: number) => (
          <div key={i} className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{factor.name}</span>
              <span className="text-sm">{factor.score}/10</span>
            </div>
            <Progress value={(factor.score / 10) * 100} />
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderTable = (items: any[]) => (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>Aspect</TableHead>
          <TableHead>Strength</TableHead>
          <TableHead>Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{item.aspect}</TableCell>
            <TableCell>
              <Badge variant={item.strength === "High" ? "secondary" : "default"}>
                {item.strength}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{item.details}</ReactMarkdown>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderMatrix = (items: any[]) => (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {items.map((item, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">{item.risk}</h4>
            <div className="flex gap-2">
              <Badge variant={item.impact === "High" ? "destructive" : "default"}>
                Impact: {item.impact}
              </Badge>
              <Badge
                variant={item.probability === "High" ? "destructive" : "default"}
              >
                Probability: {item.probability}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {item.mitigation}
          </p>
        </Card>
      ))}
    </div>
  );

  const renderSummary = (items: any) => (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Overall Score</CardTitle>
          <Badge variant={items.score >= 7 ? "secondary" : "destructive"}>
            {items.score}/10
          </Badge>
        </div>
        <CardDescription>Verdict: {items.verdict}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Strengths</h4>
            <ul className="list-disc pl-5 space-y-1">
              <div className="prose dark:prose-invert max-w-none">
                {items.strengths.map((strength: string, i: number) => (
                  <li key={i}>
                    <ReactMarkdown>{strength}</ReactMarkdown>
                  </li>
                ))}
              </div>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Weaknesses</h4>
            <ul className="list-disc pl-5 space-y-1">
              <div className="prose dark:prose-invert max-w-none">
                {items.weaknesses.map((weakness: string, i: number) => (
                  <li key={i}>
                    <ReactMarkdown>{weakness}</ReactMarkdown>
                  </li>
                ))}
              </div>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Recommendations</h4>
            <ul className="list-disc pl-5 space-y-1">
              <div className="prose dark:prose-invert max-w-none">
                {items.recommendations.map((rec: string, i: number) => (
                  <li key={i}>
                    <ReactMarkdown>{rec}</ReactMarkdown>
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  interface TechItem {
    name: string;
    version: string;
    description: string;
    link: string;
    reason?: string;
    strengths?: string[];
    weaknesses?: string[];
  }

  type TechStackItems =
    | {
        [key: string]: TechItem[];
      }
    | {
        "tech-stack": TechItem[];
      };

  const renderTechStack = (items: TechStackItems) => {
    // If the items still use the old "tech-stack" format, handle it
    if ("tech-stack" in items && items["tech-stack"]) {
      return (
        <Card className="mt-4">
          <CardContent className="p-6">
            <div className="space-y-4">
              {items["tech-stack"].map((tech: any, i: number) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
                >
                  <div className="mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{tech.name}</span>
                    </div>
                    <a
                      href={tech.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Documentation →
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    // Handle the new categorized format
    return (
      <div className="space-y-6">
        {Object.entries(items).map(
          ([category, techs]) =>
            // Only render if techs is an array and not empty
            Array.isArray(techs) &&
            techs.length > 0 && (
              <Card key={category} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold capitalize mb-4">
                    {category}
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {Array.isArray(techs) &&
                      techs.map((tech: any, i: number) => (
                        <div
                          key={i}
                          className="p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
                        >
                          <div className="mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{tech.name}</span>
                            </div>
                            <a
                              href={tech.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              Documentation →
                            </a>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">
                            {tech.description}
                          </p>

                          <div className="text-sm">
                            <p className="font-medium mb-1">Why use it:</p>
                            <p className="text-muted-foreground mb-3">
                              {tech.reason}
                            </p>

                            <div className="space-y-2">
                              <div>
                                <p className="font-medium text-green-600 dark:text-green-400 mb-1">
                                  Strengths:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground">
                                  {tech.strengths.map(
                                    (strength: string, j: number) => (
                                      <li key={j}>{strength}</li>
                                    ),
                                  )}
                                </ul>
                              </div>

                              <div>
                                <p className="font-medium text-red-600 dark:text-red-400 mb-1">
                                  Considerations:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground">
                                  {tech.weaknesses.map(
                                    (weakness: string, j: number) => (
                                      <li key={j}>{weakness}</li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ),
        )}
      </div>
    );
  };

  return (
    <div className="w-full space-y-6" style={geistSans.style}>
      <div className="">
        <span className="text-sm text-gray-600">{data.title}</span>
        <h2 className="text-2xl font-bold">{data.ideaName}</h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {data.sections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>
              {section.type === "accordion" &&
                section.items.map((item, i) => (
                  <div key={i} className="mb-6">
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <div className="prose dark:prose-invert max-w-none">
                      <ReactMarkdown>{item.content}</ReactMarkdown>
                    </div>
                    {item.metrics && renderMetrics(item.metrics)}
                  </div>
                ))}
              {section.type === "scorecard" &&
                section.items.map((item, i) => renderScorecard(item, i))}
              {section.type === "table" && renderTable(section.items)}
              {section.type === "matrix" && renderMatrix(section.items)}
              {section.type === "summary" && renderSummary(section.items)}
              {section.type === "tech-stack" &&
                renderTechStack(section.items as unknown as TechStackItems)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
