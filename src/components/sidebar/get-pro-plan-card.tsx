import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Lock, Sparkles } from "lucide-react";
import React from "react";

export const GetProPlanCard = () => {
  return (
    <Card className="group relative overflow-hidden border-0 bg-white rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] hover:scale-[1.02] py-6 mb-4 mx-2">
      <div className="absolute top-2 right-2 text-indigo-300/40 animate-pulse">
        <Sparkles size={16} />
      </div>
      <div className="absolute bottom-2 left-2 text-indigo-300/40 animate-pulse delay-300">
        <Sparkles size={12} />
      </div>

      <div className="relative px-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xl justify-center font-bold">
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600 bg-clip-text text-transparent animate-gradient">
            Startalyze Pro
          </span>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600">
            $9<span className="text-sm text-gray-400 font-normal">/mo</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm text-center leading-relaxed">
          Unlimited startup analysis, unlimited metrics, unlimited favorites
        </p>

        <Button className="cursor-pointer relative mt-2 w-full bg-gradient-to-r from-indigo-600 rounded-xl via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:via-indigo-400 hover:to-indigo-500 border-0 text-white font-medium py-6 animate-gradient shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300">
          <span>Upgrade Now</span>
          <ArrowUpRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Button>
      </div>
    </Card>
  );
};
