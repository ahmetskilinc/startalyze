import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Lock } from "lucide-react";
import React from "react";

type Props = {};

export const GetProPlanCard = (props: Props) => {
  return (
    <Card className="relative overflow-hidden border-0 bg-black rounded-xl shadow-[0_0_10px_rgba(59,130,246,0.5)]">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-600/20 backdrop-blur-sm"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 opacity-20 blur-xl"></div>

      <div className="relative px-6 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xl justify-center font-bold">
          <span className="text-blue-400">
            <Lock size={20} />
          </span>
          <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Startalyze Pro
          </span>
        </div>

        <p className="text-gray-400 text-sm text-center">
          Higher limits, unlimited upscaling & much more.
        </p>

        <Button className="mt-2 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-0 text-white">
          <span>Upgrade</span>
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
