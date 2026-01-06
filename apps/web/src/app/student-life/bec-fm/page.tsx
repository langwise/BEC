"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Radio,
  Volume2,
  Mic2,
  Music4,
  Signal,
} from "lucide-react";
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";

export default function BECFMPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="space-y-12">
      <PageHeader
        title="BEC-FM Radio"
        description="Radio Basava Taranga - The voice of the campus. Tuning into innovation and culture."
      />

      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* Visualizer / Player Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-12"
        >
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative border border-slate-800">
            {/* Background blurred effect */}
            <div className="absolute inset-0 bg-linear-to-br from-orange-600/20 to-blue-900/40 opacity-50" />

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
              {/* Album Art / Logo Area */}
              <div className="relative shrink-0">
                <div
                  className={`w-64 h-64 rounded-full border-8 border-slate-800 shadow-xl bg-linear-to-tr from-orange-500 to-amber-400 flex items-center justify-center relative ${
                    isPlaying ? "animate-spin-slow" : ""
                  }`}
                >
                  {/* Inner grooves */}
                  <div className="absolute inset-4 rounded-full border border-white/20" />
                  <div className="absolute inset-8 rounded-full border border-white/20" />
                  <div className="absolute inset-12 rounded-full border border-white/20" />

                  <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center shadow-inner relative z-10">
                    <Radio className="w-10 h-10 text-orange-500" />
                  </div>
                </div>
                {/* Live Indicator */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 animate-pulse border-2 border-slate-900">
                    LIVE ON AIR
                  </Badge>
                </div>
              </div>

              {/* Controls & Info */}
              <div className="flex-1 text-center md:text-left space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-orange-400 font-bold uppercase tracking-widest text-xs">
                    <Signal className="w-4 h-4" />
                    90.4 MHz Frequency
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Basava Taranga
                  </h2>
                  <p className="text-slate-400 text-lg">
                    Broadcasting knowledge, culture, and campus vibes 24/7.
                  </p>
                </div>

                {/* Audio Element (Hidden source for now, placeholder URL) */}
                <audio
                  ref={audioRef}
                  src="https://stream.zeno.fm/kvm0549y31zuv"
                  crossOrigin="anonymous"
                />

                <div className="flex flex-col items-center md:items-start gap-6">
                  <div className="flex items-center gap-6">
                    <Button
                      onClick={togglePlay}
                      className="h-20 w-20 rounded-full bg-white hover:bg-slate-200 text-slate-900 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center justify-center"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 fill-slate-900" />
                      ) : (
                        <Play className="w-8 h-8 fill-slate-900 ml-1" />
                      )}
                    </Button>
                    <div className="flex-1 min-w-[200px] h-1 bg-slate-700 rounded-full overflow-hidden">
                      {/* Fake progress/visualizer bar */}
                      <div
                        className={`h-full bg-orange-500 rounded-full ${
                          isPlaying ? "animate-progress-indeterminate" : "w-0"
                        }`}
                      />
                    </div>
                    <Volume2 className="w-6 h-6 text-slate-400" />
                  </div>

                  <div className="flex gap-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                      <Mic2 className="w-3 h-3" /> Talk Shows
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                      <Music4 className="w-3 h-3" /> Music
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <div className="lg:col-span-12 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Community Focus",
              desc: "Empowering the local community with educational content.",
              icon: Users,
            },
            {
              title: "Student RJs",
              desc: "Run by students, giving voice to young talent.",
              icon: Mic2,
            },
            {
              title: "Diverse Content",
              desc: "From agriculture tips to tech trends and classical music.",
              icon: Radio,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper icon
import { Users } from "lucide-react";
