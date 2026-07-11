"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import type { PlacementOffersChart as PlacementOffersChartData } from "@/content/placements";

const PALETTE = [
  { light: "#5AA9F5", dark: "#2F6FE0", solid: "#2F80ED" }, // blue
  { light: "#B36BF6", dark: "#7C3AED", solid: "#8B5CF6" }, // purple
  { light: "#F45C9E", dark: "#D61F69", solid: "#EC4899" }, // pink
  { light: "#FBB24C", dark: "#E8850E", solid: "#F59E0B" }, // amber
  { light: "#3FD9C0", dark: "#0E9488", solid: "#14B8A6" }, // teal
] as const;

const colorAt = (index: number) => PALETTE[index % PALETTE.length];

type BadgeProps = {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
  index?: number;
  notes: (string | undefined)[];
};

function Callout({ x = 0, y = 0, width = 0, value = 0, index = 0, notes }: BadgeProps) {
  const color = colorAt(index).solid;
  const note = notes[index];
  const cx = x + width / 2;
  const badgeW = note ? 66 : 54;
  const badgeH = note ? 40 : 30;
  const pointer = 7;
  const top = y - pointer - badgeH;
  const left = cx - badgeW / 2;

  return (
    <g>
      <rect x={left} y={top} width={badgeW} height={badgeH} rx={7} fill={color} />
      <path
        d={`M ${cx - pointer} ${top + badgeH} L ${cx + pointer} ${top + badgeH} L ${cx} ${
          top + badgeH + pointer
        } Z`}
        fill={color}
      />
      <text
        x={cx}
        y={note ? top + 17 : top + badgeH / 2 + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ffffff"
        fontSize={16}
        fontWeight={700}
      >
        {value}
      </text>
      {note ? (
        <text
          x={cx}
          y={top + 31}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          fontSize={9}
          fontWeight={500}
          opacity={0.9}
        >
          {note}
        </text>
      ) : null}
    </g>
  );
}

function YearTick({ x = 0, y = 0, payload, points }: {
  x?: number;
  y?: number;
  payload?: { value?: string };
  points: PlacementOffersChartData["points"];
}) {
  const index = points.findIndex((p) => p.year === payload?.value);
  const color = index >= 0 ? colorAt(index).solid : "#6b7280";
  return (
    <text x={x} y={y + 16} textAnchor="middle" fill={color} fontSize={14} fontWeight={700}>
      {payload?.value}
    </text>
  );
}

export function PlacementOffersChart({ chart }: { chart: PlacementOffersChartData }) {
  const notes = chart.points.map((p) => p.note);
  const max = Math.max(...chart.points.map((p) => p.offers), 0);
  const niceMax = Math.max(20, Math.ceil(max / 20) * 20);
  const ticks = Array.from({ length: niceMax / 20 + 1 }, (_, i) => i * 20);

  return (
    <figure className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
      {chart.title ? (
        <figcaption className="mb-4 text-center text-lg font-bold text-gray-900 sm:text-xl">
          {chart.title}
        </figcaption>
      ) : null}
      <div className="h-[320px] w-full sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chart.points}
            margin={{ top: 48, right: 12, bottom: 8, left: 8 }}
            barCategoryGap="28%"
          >
            <defs>
              {PALETTE.map((c, i) => (
                <linearGradient key={i} id={`placement-bar-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c.light} />
                  <stop offset="100%" stopColor={c.dark} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} stroke="#e7e5e4" strokeDasharray="4 4" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: "#d6d3d1" }}
              interval={0}
              tick={<YearTick points={chart.points} />}
            />
            <YAxis
              domain={[0, niceMax]}
              ticks={ticks}
              tickLine={false}
              axisLine={{ stroke: "#d6d3d1" }}
              width={40}
              tick={{ fill: "#78716c", fontSize: 12, fontWeight: 600 }}
              label={
                chart.yAxisLabel
                  ? {
                      value: chart.yAxisLabel,
                      angle: -90,
                      position: "insideLeft",
                      style: {
                        textAnchor: "middle",
                        fill: "#57534e",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                      },
                    }
                  : undefined
              }
            />
            <Bar dataKey="offers" radius={[6, 6, 0, 0]} isAnimationActive={false} maxBarSize={90}>
              {chart.points.map((_, i) => (
                <Cell key={i} fill={`url(#placement-bar-${i % PALETTE.length})`} />
              ))}
              <LabelList dataKey="offers" content={<Callout notes={notes} />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
