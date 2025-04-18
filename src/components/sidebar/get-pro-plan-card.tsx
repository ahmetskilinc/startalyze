import { ShimmerButton } from '../ui/shimmer-button';
import { Card } from '@/components/ui/card';
import { UI_CUSTOM } from '@/lib/constants';
import { Sparkles } from 'lucide-react';
import React from 'react';

export const GetProPlanCard = () => {
  return (
    <Card className="group relative mx-2 transform overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-800 px-4 py-6 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.6)]">
      <div className="absolute top-1.5 right-1.5 animate-pulse text-indigo-300/40">
        <Sparkles size={16} />
      </div>
      <div className="absolute bottom-1.5 left-1.5 animate-pulse text-indigo-300/40 delay-200">
        <Sparkles size={12} />
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        <div className="text-center text-lg font-semibold tracking-wide">
          <span className="animate-gradient bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
            Startalyze Pro
          </span>
        </div>

        <div className="text-center text-3xl font-bold">
          $9 <span className="text-sm font-normal text-indigo-200">/mo</span>
        </div>

        <p className="px-2 text-center text-sm leading-snug text-indigo-200">
          Unlock unlimited insights, pro metrics, and advanced tools to scale smarter.
        </p>

        <ShimmerButton
          {...UI_CUSTOM.shimmer_btn}
          className="mt-2 w-full py-2.5 text-sm font-semibold text-white"
        >
          Upgrade Now
        </ShimmerButton>
      </div>
    </Card>
  );
};
