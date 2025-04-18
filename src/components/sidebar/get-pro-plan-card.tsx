'use client';

import { ShimmerButton } from '../ui/shimmer-button';
import { Card } from '@/components/ui/card';
import { UI_CUSTOM } from '@/lib/constants';
import { Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const PRO_CARD_STORAGE_KEY = 'pro_card_dismissed';

export const GetProPlanCard = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isDismissed = localStorage.getItem(PRO_CARD_STORAGE_KEY);
    if (isDismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(PRO_CARD_STORAGE_KEY, 'true');
  };

  if (!isVisible) return null;

  return (
    <Card className="group relative mx-2 transform overflow-hidden rounded-xl border border-indigo-200/20 bg-gradient-to-br from-indigo-500/90 to-indigo-700/90 px-4 py-4 text-white shadow-lg transition-all duration-300 hover:shadow-indigo-500/20">
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-2 rounded-full p-1 text-indigo-200 opacity-60 transition-opacity hover:bg-indigo-600 hover:opacity-100"
        aria-label="Dismiss pro plan card"
      >
        <X size={14} />
      </button>

      <div className="absolute right-1 top-1/2 -translate-y-1/2 text-indigo-300/30">
        <Sparkles size={40} />
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        <div className="text-lg font-medium tracking-wide text-white/90">
          Startalyze Pro
        </div>

        <div className="text-2xl font-bold">
          $9 <span className="text-sm font-normal text-indigo-200/80">/mo</span>
        </div>

        <p className="text-sm leading-snug text-indigo-100/80">
          Unlock unlimited insights and advanced tools
        </p>

        <ShimmerButton
          {...UI_CUSTOM.shimmer_btn}
          className="mt-1 w-full py-2 text-sm font-medium dark:text-white"
        >
          Upgrade Now
        </ShimmerButton>
      </div>
    </Card>
  );
};
