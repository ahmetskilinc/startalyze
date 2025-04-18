import { ValidationReport } from './validation-report';
import { CornerDownRight, Ghost } from 'lucide-react';
import { AnimatedShinyText } from '../ui/shiny-text';
import ReactMarkdown from 'react-markdown';
import { geistSans } from '@/lib/fonts';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Message } from 'ai';

export type AIResponseStatus = 'ready' | 'submitted' | 'streaming' | 'error';

function AgentAvatar() {
  return (
    <div className="mr-3 grid aspect-square h-6 min-w-6 place-items-center rounded-full bg-indigo-500 leading-none shadow-lg shadow-blue-600/10 select-none">
      <Ghost size={13.5} className="text-white" />
    </div>
  );
}

export const UserMessage = ({ text }: { text: string }) => {
  return (
    <div className="flex">
      <div className="mr-3 grid aspect-square size-6 place-items-center rounded-full text-sm leading-none text-gray-500 select-none dark:text-gray-400">
        <CornerDownRight size={16} className="relative bottom-px" />
      </div>
      <div className="max-w-[95%] space-y-2 rounded-br-none text-base leading-relaxed">
        <p style={geistSans.style} className="mt-0.5 text-[15px] text-gray-800 dark:text-gray-400">
          {text}
        </p>
      </div>
    </div>
  );
};

export const AgentMessage = ({ message }: { message: Message }) => {
  let validationData = null;
  let cleanedContent = message.content;

  const jsonMatch = cleanedContent.match(/```json\s*({[\s\S]*?})\s*```/);

  if (jsonMatch && jsonMatch[1]) {
    try {
      const jsonStr = jsonMatch[1].trim();
      validationData = JSON.parse(jsonStr);
      console.log('Successfully parsed validation data');
    } catch (error) {
      console.error('Failed to parse validation report JSON:', error);
    }
  }

  return (
    <div className="flex text-base leading-relaxed">
      <AgentAvatar />
      <div className="min-w-0 flex-1">
        {validationData ? (
          <ValidationReport data={validationData} />
        ) : (
          <div
            className="agent-response space-y-6 text-[15px] [&>*:first-child]:mt-0"
            style={geistSans.style}
          >
            <ReactMarkdown>{cleanedContent}</ReactMarkdown>
          </div>
        )}
        {message.parts && message.parts.filter((part) => part.type === 'source').length >= 1 && (
          <div className="mt-6 flex items-center space-x-3 leading-none" style={geistSans.style}>
            <p className="text-[12.5px] font-semibold text-gray-600">Sources:</p>
            <div className="flex space-x-1.5">
              {message.parts
                .filter((part) => part.type === 'source')
                .map(({ source }, idx) => (
                  <>
                    {source.url && (
                      <Button
                        key={idx}
                        asChild
                        size="sm"
                        variant="outline"
                        className="h-fit w-fit px-2 py-1.5 text-[12.5px]"
                      >
                        <Link target="_blank" href={source.url}>
                          {source?.title}
                        </Link>
                      </Button>
                    )}
                  </>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const AgentThinking = ({ status }: { status: AIResponseStatus }) => {
  return (
    (status === 'submitted' || status === 'streaming') && (
      <div className="flex text-base leading-relaxed">
        <AgentAvatar />
        <AnimatedShinyText className="mx-0 inline-flex items-center justify-center text-[15px] tracking-wide transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span style={geistSans.style}>✨ Thinking...</span>
        </AnimatedShinyText>
      </div>
    )
  );
};
