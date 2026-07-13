"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

import { asset } from "@/lib/assets";
import { cn } from "@/lib/utils";

const STREAM_URL = "https://d2z6svgl28ttco.cloudfront.net/becradio.m3u8";
const BAR_COUNT = 48;

type PlayerState = "idle" | "loading" | "playing" | "error";

export function RadioHero() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hlsRef = useRef<{ destroy: () => void } | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const [state, setState] = useState<PlayerState>("idle");
  const [muted, setMuted] = useState(false);

  const stateRef = useRef<PlayerState>("idle");
  stateRef.current = state;

  const ensureGraph = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || sourceRef.current || typeof window === "undefined") return;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const source = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.78;
      source.connect(ctx.destination);
      source.connect(analyser);
      ctxRef.current = ctx;
      sourceRef.current = source;
      analyserRef.current = analyser;
    } catch {
      analyserRef.current = null;
    }
  }, []);

  const teardown = useCallback(() => {
    hlsRef.current?.destroy();
    hlsRef.current = null;
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
  }, []);

  useEffect(() => {
    return () => {
      teardown();
      ctxRef.current?.close().catch(() => {});
    };
  }, [teardown]);

  const start = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.crossOrigin = "anonymous";
    ensureGraph();
    void ctxRef.current?.resume().catch(() => {});

    setState("loading");
    teardown();

    try {
      if (audio.canPlayType("application/vnd.apple.mpegurl")) {
        audio.src = STREAM_URL;
        await audio.play();
        return;
      }

      const { default: Hls } = await import("hls.js");
      if (!Hls.isSupported()) {
        audio.src = STREAM_URL;
        await audio.play();
        return;
      }

      const hls = new Hls({ liveDurationInfinity: true, enableWorker: true });
      hlsRef.current = hls;
      hls.loadSource(STREAM_URL);
      hls.attachMedia(audio);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        audio.play().catch(() => setState("error"));
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) setState("error");
      });
    } catch {
      setState("error");
    }
  }, [ensureGraph, teardown]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (state === "playing") {
      audio.pause();
      teardown();
      setState("idle");
    } else if (state !== "loading") {
      void start();
    }
  }, [state, start, teardown]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const heights = new Array<number>(BAR_COUNT).fill(0.05);
    let dpr = 1;
    let raf = 0;
    let silentFrames = 0;
    let bins: Uint8Array<ArrayBuffer> | null = null;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const analyser = analyserRef.current;
      const playing = stateRef.current === "playing";

      if (analyser && playing) {
        if (!bins || bins.length !== analyser.frequencyBinCount) {
          bins = new Uint8Array(analyser.frequencyBinCount);
        }
        analyser.getByteFrequencyData(bins);
        let sum = 0;
        for (let i = 0; i < bins.length; i++) sum += bins[i];
        silentFrames = sum < 8 ? silentFrames + 1 : 0;
      }

      const useSynthetic = playing && (!analyser || silentFrames > 60);
      const gap = Math.max(1, Math.round((2 * dpr)));
      const barW = Math.max(1, (w - gap * (BAR_COUNT - 1)) / BAR_COUNT);
      const radius = Math.min(barW / 2, 3 * dpr);

      for (let i = 0; i < BAR_COUNT; i++) {
        let target: number;
        if (playing && analyser && !useSynthetic && bins) {
          const bin = Math.min(bins.length - 1, i + 1);
          const v = bins[bin] / 255;
          target = Math.min(1, Math.pow(v, 1.35) * 1.25);
        } else if (useSynthetic) {
          const s =
            Math.abs(Math.sin(t * 0.006 + i * 0.5)) *
            (0.55 + 0.45 * Math.sin(t * 0.0021 + i));
          target = 0.18 + 0.62 * Math.abs(s);
        } else if (reduceMotion) {
          target = 0.08;
        } else {
          target = 0.06 + 0.05 * Math.abs(Math.sin(t * 0.0016 + i * 0.4));
        }

        const smoothing = playing ? 0.35 : 0.12;
        heights[i] += (target - heights[i]) * smoothing;
        const bh = Math.max(h * 0.05, heights[i] * h);
        const x = i * (barW + gap);
        const y = (h - bh) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + bh);
        grad.addColorStop(0, "oklch(0.82 0.16 62)");
        grad.addColorStop(1, "oklch(0.6 0.16 45)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(x, y, barW, bh, radius);
        } else {
          ctx.rect(x, y, barW, bh);
        }
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const isBusy = state === "loading";
  const isLive = state === "playing";
  const status =
    state === "loading"
      ? "Connecting to the stream"
      : state === "playing"
        ? "On air now"
        : state === "error"
          ? "Stream unavailable right now"
          : "Tap play to listen live";

  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.19 0.035 48) 0%, oklch(0.14 0.02 262) 62%, oklch(0.11 0.016 262) 100%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={asset("student-life/bec-fm/cine0974.webp")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right opacity-35 [mask-image:linear-gradient(90deg,transparent_0%,black_60%)]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.13 0.02 262 / 0.94) 0%, oklch(0.13 0.02 262 / 0.55) 48%, transparent 92%), linear-gradient(to top, oklch(0.11 0.016 262) 2%, transparent 34%)",
          }}
        />
        <div
          className="absolute -left-24 top-1/3 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "oklch(0.6 0.16 47 / 0.28)" }}
        />
      </div>

      <div className="container mx-auto flex min-h-[34rem] max-w-6xl flex-col justify-between gap-12 px-4 py-16 md:min-h-[38rem] md:py-20 lg:px-6">
        <div className="max-w-2xl space-y-5">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200/90">
            <span className="relative flex h-2 w-2">
              {isLive && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              )}
              <span
                className={cn(
                  "relative inline-flex h-2 w-2 rounded-full",
                  isLive ? "bg-red-500" : "bg-amber-300/70",
                )}
              />
            </span>
            Community Radio · 90.4 FM
          </div>

          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            BEC Dhwani
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-stone-200/90 md:text-lg">
            Bagalkote&rsquo;s first radio station. Community voices, campus
            culture and music, streaming live from the Basaveshwar Engineering
            College campus.
          </p>
        </div>

        <div className="rounded-2xl border border-white/12 bg-black/25 p-4 shadow-2xl backdrop-blur-md md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                {isLive && (
                  <span
                    className="pointer-events-none absolute inset-0 animate-pulse rounded-full blur-xl"
                    style={{ background: "oklch(0.65 0.17 47 / 0.6)" }}
                  />
                )}
                <button
                  type="button"
                  onClick={toggle}
                  disabled={isBusy}
                  aria-label={isLive ? "Pause live radio" : "Play live radio"}
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 ease-out hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 disabled:opacity-70"
                >
                  {isBusy ? (
                    <Loader2 className="h-7 w-7 animate-spin" />
                  ) : isLive ? (
                    <Pause className="h-7 w-7" />
                  ) : (
                    <Play className="h-7 w-7 translate-x-0.5" />
                  )}
                </button>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.16em]",
                      isLive
                        ? "bg-red-500/20 text-red-300"
                        : "bg-white/10 text-stone-300",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        isLive ? "animate-pulse bg-red-400" : "bg-stone-400",
                      )}
                    />
                    Live
                  </span>
                  <span className="truncate text-base font-semibold text-white">
                    BEC Dhwani
                  </span>
                </div>
                <p className="mt-0.5 truncate text-sm text-stone-300">{status}</p>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              aria-hidden
              className="h-14 w-full flex-1 md:h-16"
            />

            <div className="flex shrink-0 items-center justify-end">
              {state === "error" ? (
                <button
                  type="button"
                  onClick={() => void start()}
                  aria-label="Retry"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {muted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </div>

          <audio
            ref={audioRef}
            preload="none"
            onPlaying={() => setState("playing")}
            onPause={() => setState((s) => (s === "playing" ? "idle" : s))}
            onError={() => setState("error")}
          />
        </div>
      </div>
    </section>
  );
}
