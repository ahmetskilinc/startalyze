import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import React from "react";
import { ShimmerButton } from "../ui/shimmer-button";
import { UI_CUSTOM } from "@/lib/constants";

export const GetProPlanCard = () => {
  return (
    <Card className="group relative overflow-hidden border-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-800 shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all duration-300 transform hover:scale-105 px-4 py-6 mx-2 text-white">
      <div className="absolute top-1.5 right-1.5 text-indigo-300/40 animate-pulse">
        <Sparkles size={16} />
      </div>
      <div className="absolute bottom-1.5 left-1.5 text-indigo-300/40 animate-pulse delay-200">
        <Sparkles size={12} />
      </div>

      <div className="relative flex flex-col gap-3 z-10">
        <div className="text-center text-lg font-semibold tracking-wide">
          <span className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent animate-gradient">
            Startalyze Pro
          </span>
        </div>

        <div className="text-center text-3xl font-bold">
          $9 <span className="text-sm font-normal text-indigo-200">/mo</span>
        </div>

        <p className="text-sm text-indigo-200 text-center leading-snug px-2">
          Unlock unlimited insights, pro metrics, and advanced tools to scale
          smarter.
        </p>

        <ShimmerButton
          {...UI_CUSTOM.shimmer_btn}
          className="w-full mt-2 py-2.5 text-sm font-semibold text-white"
        >
          Upgrade Now
        </ShimmerButton>
      </div>
    </Card>
  );
};
