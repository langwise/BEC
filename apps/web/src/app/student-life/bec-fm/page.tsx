"use client";

import Image from "next/image";
import { PageHeader } from "@/components/placements/page-header";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset, assetsUnder } from "@/lib/assets";
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
  Users,
} from "lucide-react";
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";

const galleryImages = assetsUnder("student-life/bec-fm/").map(
  (src, index) => ({
    src,
    alt: `BEC Dhwani 90.4 FM community radio studio at Basaveshwar Engineering College ${index + 1}`,
  }),
);

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
        title="BEC Dhwani 90.4 FM"
        description="The community radio station of Basaveshwar Engineering College — the voice of the campus and its neighbouring communities."
      />

      <div className="relative aspect-21/9 w-full overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
        <Image
          src={asset("student-life/bec-fm/cine0978.webp")}
          alt="A radio jockey on air at the BEC Dhwani 90.4 FM studio, Basaveshwar Engineering College"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="object-cover"
        />
      </div>

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

            <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Album Art / Logo Area */}
              <div className="relative shrink-0">
                <div
                  className={`w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-slate-800 shadow-xl bg-linear-to-tr from-orange-500 to-amber-400 flex items-center justify-center relative ${isPlaying ? "animate-spin-slow" : ""
                    }`}
                >
                  {/* Inner grooves */}
                  <div className="absolute inset-4 rounded-full border border-white/20" />
                  <div className="absolute inset-8 rounded-full border border-white/20" />
                  <div className="absolute inset-12 rounded-full border border-white/20" />

                  <div className="w-16 h-16 md:w-24 md:h-24 bg-slate-900 rounded-full flex items-center justify-center shadow-inner relative z-10">
                    <Radio className="w-6 h-6 md:w-10 md:h-10 text-orange-500" />
                  </div>
                </div>
                {/* Live Indicator */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 md:px-4 md:py-1 animate-pulse border-2 border-slate-900 text-xs md:text-sm whitespace-nowrap">
                    LIVE ON AIR
                  </Badge>
                </div>
              </div>

              {/* Controls & Info */}
              <div className="flex-1 text-center md:text-left space-y-6 w-full">
                <div className="space-y-2">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-orange-400 font-bold uppercase tracking-widest text-xs">
                    <Signal className="w-4 h-4" />
                    90.4 FM Community Radio
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                    BEC Dhwani
                  </h2>
                  <p className="text-slate-400 text-base md:text-lg">
                    Broadcasting knowledge, culture, and campus voices from
                    Basaveshwar Engineering College.
                  </p>
                </div>

                {/* External Zeno.fm live stream — verify station ownership/URL before launch */}
                <audio
                  ref={audioRef}
                  src="https://stream.zeno.fm/kvm0549y31zuv"
                  crossOrigin="anonymous"
                />

                <div className="flex flex-col items-center md:items-start gap-6 w-full">
                  <div className="flex items-center gap-3 md:gap-6 w-full">
                    <Button
                      onClick={togglePlay}
                      className="h-14 w-14 md:h-20 md:w-20 rounded-full bg-white hover:bg-slate-200 text-slate-900 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center justify-center shrink-0"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 md:w-8 md:h-8 fill-slate-900" />
                      ) : (
                        <Play className="w-6 h-6 md:w-8 md:h-8 fill-slate-900 ml-1" />
                      )}
                    </Button>
                    <div className="flex-1 min-w-0 h-1 bg-slate-700 rounded-full overflow-hidden">
                      {/* Fake progress/visualizer bar */}
                      <div
                        className={`h-full bg-orange-500 rounded-full ${isPlaying ? "animate-progress-indeterminate" : "w-0"
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
              title: "Community Radio",
              desc: "A community radio station serving the campus and the surrounding region with locally relevant programming.",
              icon: Users,
            },
            {
              title: "Campus Voices",
              desc: "An on-air platform for students, faculty and the wider college community to share and create content.",
              icon: Mic2,
            },
            {
              title: "On-Air Studio",
              desc: "A dedicated broadcast and recording studio equipped for live shows and produced segments.",
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

      {/* Studio Gallery */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Inside the Studio
          </h2>
          <p className="text-slate-500 max-w-2xl">
            A look inside the BEC Dhwani broadcast and recording studio on the
            Basaveshwar Engineering College campus.
          </p>
        </div>
        <PhotoGallery images={galleryImages} />
      </section>
    </div>
  );
}
