"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import {
  batch2024,
  batch2025,
  batch2026,
  offersPerYear,
  SERIES,
  type BatchStats,
} from "@/data/home/placement-charts";

const PRIMARY = "#EA6A0A";
const ROTATE_MS = 7000;

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number; color?: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-100 bg-white px-3 py-2 text-sm shadow-lg">
      <p className="mb-1 font-bold text-gray-900">{label}</p>
      <ul className="space-y-0.5">
        {payload.map((entry) => (
          <li key={entry.name} className="flex items-center gap-2 text-gray-600">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-medium">{entry.name}</span>
            <span className="ml-auto pl-3 font-bold text-gray-900">
              {entry.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function YearOffersChart() {
  return (
    <div className="h-[300px] w-full sm:h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={offersPerYear}
          margin={{ top: 28, right: 8, bottom: 4, left: -8 }}
          barCategoryGap="24%"
        >
          <defs>
            <linearGradient id="rs-year-bar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F79A46" />
              <stop offset="100%" stopColor={PRIMARY} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f0efed" strokeDasharray="4 4" />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={{ stroke: "#e7e5e4" }}
            interval={0}
            tick={{ fill: "#78716c", fontSize: 12, fontWeight: 600 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={44}
            tick={{ fill: "#a8a29e", fontSize: 11, fontWeight: 600 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(234,106,10,0.06)" }}
            content={<ChartTooltip />}
          />
          <Bar
            dataKey="offers"
            name="Placement Offers"
            radius={[5, 5, 0, 0]}
            fill="url(#rs-year-bar)"
            maxBarSize={54}
            isAnimationActive={false}
          >
            <LabelList
              dataKey="offers"
              position="top"
              fill="#57534e"
              fontSize={12}
              fontWeight={700}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function BatchDeptChart({ batch }: { batch: BatchStats }) {
  const series = [SERIES.eligible, SERIES.placed, SERIES.offers];
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {series.map((s) => (
          <div
            key={s.key}
            className="flex items-baseline gap-1.5 rounded-full bg-gray-50 px-3 py-1"
          >
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-lg font-bold text-gray-900">
              {batch.totals[s.key]}
            </span>
            <span className="text-xs font-medium text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="h-[300px] w-full sm:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={batch.rows}
            margin={{ top: 24, right: 8, bottom: 4, left: -12 }}
            barCategoryGap="18%"
            barGap={2}
          >
            <CartesianGrid vertical={false} stroke="#f0efed" strokeDasharray="4 4" />
            <XAxis
              dataKey="department"
              tickLine={false}
              axisLine={{ stroke: "#e7e5e4" }}
              interval={0}
              tick={{ fill: "#57534e", fontSize: 11, fontWeight: 700 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={44}
              tick={{ fill: "#a8a29e", fontSize: 11, fontWeight: 600 }}
            />
            <Tooltip
              cursor={{ fill: "rgba(120,113,108,0.06)" }}
              content={<ChartTooltip />}
            />
            <Legend
              verticalAlign="top"
              align="left"
              height={30}
              iconType="circle"
              iconSize={9}
              wrapperStyle={{ fontSize: 12, fontWeight: 600, paddingBottom: 6 }}
            />
            {series.map((s) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label}
                fill={s.color}
                radius={[3, 3, 0, 0]}
                maxBarSize={22}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey={s.key}
                  position="top"
                  fill="#78716c"
                  fontSize={9}
                  fontWeight={600}
                />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

type Slide = { id: string; title: string; subtitle: string; render: () => React.ReactNode };

const SLIDES: Slide[] = [
  {
    id: "year",
    title: "Placement Offers by Year",
    subtitle: "Total offers received, 2016–2026",
    render: () => <YearOffersChart />,
  },
  {
    id: "b2026",
    title: "2026 Batch — Department Breakdown",
    subtitle: "Eligible students, students placed and offers received, per department",
    render: () => <BatchDeptChart batch={batch2026} />,
  },
  {
    id: "b2025",
    title: "2025 Batch — Department Breakdown",
    subtitle: "Eligible students, students placed and offers received, per department",
    render: () => <BatchDeptChart batch={batch2025} />,
  },
  {
    id: "b2024",
    title: "2024 Batch — Department Breakdown",
    subtitle: "Eligible students, students placed and offers received, per department",
    render: () => <BatchDeptChart batch={batch2024} />,
  },
];

export function RollingStats() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [playing, index]);

  const slide = SLIDES[index];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{slide.title}</h3>
          <p className="mt-0.5 text-sm font-medium text-gray-500">{slide.subtitle}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous chart"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause auto-rotation" : "Resume auto-rotation"}
            aria-pressed={!playing}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next chart"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {slide.render()}

      <div className="mt-5 flex items-center justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${s.title}`}
            aria-current={i === index ? "true" : undefined}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-primary" : "w-2 bg-gray-200 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
