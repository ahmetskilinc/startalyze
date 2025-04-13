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

  const renderScorecard = (item: any) => (
    <Card className="mt-4">
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
            <TableCell>{item.details}</TableCell>
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
              {items.strengths.map((strength: string, i: number) => (
                <li key={i}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Weaknesses</h4>
            <ul className="list-disc pl-5 space-y-1">
              {items.weaknesses.map((weakness: string, i: number) => (
                <li key={i}>{weakness}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Recommendations</h4>
            <ul className="list-disc pl-5 space-y-1">
              {items.recommendations.map((rec: string, i: number) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full space-y-6" style={geistSans.style}>
      <div className="">
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <span className="text-gray-600">{data.ideaName}</span>
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
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.content}
                    </p>
                    {item.metrics && renderMetrics(item.metrics)}
                  </div>
                ))}
              {section.type === "scorecard" &&
                section.items.map((item, i) => renderScorecard(item))}
              {section.type === "table" && renderTable(section.items)}
              {section.type === "matrix" && renderMatrix(section.items)}
              {section.type === "summary" && renderSummary(section.items)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
