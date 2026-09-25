"use client";

import { BookOpen, Check, Gauge, MapPin, Package, Users, type LucideIcon } from "lucide-react";
import { useState, type CSSProperties } from "react";

import { cn } from "@/lib/cn";

type Kind = "location" | "equipment" | "product";

interface Check {
  name: string;
  cadence: string;
  assignee: string;
  /** Days until due; negative is overdue, null is "as needed". */
  due: number | null;
}

interface Asset {
  id: string;
  kind: Kind;
  name: string;
  records: number;
  manual?: string;
  checks: Check[];
}

interface Site {
  name: string;
  assets: Asset[];
}

/** A brewery with a taproom, the example the illustration set uses. */
const SITES: Site[] = [
  {
    name: "Main brewery",
    assets: [
      {
        id: "main",
        kind: "location",
        name: "Main brewery",
        records: 311,
        checks: [{ name: "Opening checklist", cadence: "Daily", assignee: "Brew team", due: 0 }],
      },
      {
        id: "mash-tun",
        kind: "equipment",
        name: "Brewhouse #1 mash tun",
        manual: "Brewing manual",
        records: 96,
        checks: [
          { name: "Mash temperature log", cadence: "Twice daily", assignee: "Brew team", due: 0 },
          { name: "Cleaning record", cadence: "Weekly", assignee: "Brew team", due: 2 },
          { name: "Valve and gasket inspection", cadence: "Monthly", assignee: "Maintenance", due: 9 },
        ],
      },
      {
        id: "keg-washer",
        kind: "equipment",
        name: "Keg washer",
        manual: "Packaging manual",
        records: 142,
        checks: [
          { name: "Caustic concentration check", cadence: "Daily", assignee: "Cellar team", due: -1 },
          { name: "Spray ball inspection", cadence: "Weekly", assignee: "Cellar team", due: 3 },
          { name: "Pump and seal service", cadence: "Monthly", assignee: "Maintenance", due: 12 },
        ],
      },
      {
        id: "pale-ale",
        kind: "product",
        name: "Kiln Road Pale Ale",
        records: 58,
        checks: [
          { name: "Gravity reading", cadence: "Daily", assignee: "Brew team", due: 1 },
          { name: "Packaging QC", cadence: "As needed", assignee: "Packaging team", due: null },
        ],
      },
      {
        id: "stout",
        kind: "product",
        name: "Cellar Door Stout",
        records: 73,
        checks: [
          { name: "Gravity reading", cadence: "Daily", assignee: "Brew team", due: 0 },
          { name: "Packaging QC", cadence: "As needed", assignee: "Packaging team", due: null },
        ],
      },
    ],
  },
  {
    name: "Taproom",
    assets: [
      {
        id: "taproom",
        kind: "location",
        name: "Taproom",
        records: 184,
        checks: [
          { name: "Opening checklist", cadence: "Daily", assignee: "Front of house", due: 0 },
          { name: "Closing checklist", cadence: "Daily", assignee: "Front of house", due: 0 },
        ],
      },
      {
        id: "draft-lines",
        kind: "equipment",
        name: "Draft line system",
        manual: "Taproom manual",
        records: 64,
        checks: [
          { name: "Line cleaning log", cadence: "Weekly", assignee: "Bar team", due: 4 },
          { name: "Glycol temperature check", cadence: "Daily", assignee: "Bar team", due: 0 },
        ],
      },
      {
        id: "glass-washer",
        kind: "equipment",
        name: "Glass washer",
        manual: "Taproom manual",
        records: 210,
        checks: [{ name: "Sanitizer strength check", cadence: "Twice daily", assignee: "Bar team", due: -1 }],
      },
      {
        id: "taproom-pale-ale",
        kind: "product",
        name: "Kiln Road Pale Ale",
        records: 21,
        checks: [{ name: "Pour quality check", cadence: "Weekly", assignee: "Bar team", due: 6 }],
      },
      {
        id: "taproom-stout",
        kind: "product",
        name: "Cellar Door Stout",
        records: 17,
        checks: [{ name: "Sensory panel", cadence: "Weekly", assignee: "Taproom staff", due: 4 }],
      },
    ],
  },
];

const NEXT_DUE: Record<string, number | null> = {
  Daily: 1,
  "Twice daily": 0,
  Weekly: 7,
  "Twice weekly": 3,
  Monthly: 30,
  "As needed": null,
};

const kindIcons: Record<Kind, LucideIcon> = { location: MapPin, equipment: Gauge, product: Package };
const kindLabels: Record<Kind, string> = { location: "Location", equipment: "Equipment", product: "Product" };

/** Where the four assets sit around the location card, in percent of the map. */
const SLOTS = [
  { x: 20, y: 20 },
  { x: 20, y: 80 },
  { x: 80, y: 20 },
  { x: 80, y: 80 },
];

function dueLabel(due: number | null) {
  if (due === null) return "As needed";
  if (due < 0) return `Overdue by ${-due} ${due === -1 ? "day" : "days"}`;
  if (due === 0) return "Due today";
  return `Due in ${due} ${due === 1 ? "day" : "days"}`;
}

function dueTone(due: number | null) {
  if (due !== null && due < 0) return "bg-c-red/10 text-c-red";
  if (due === 0) return "bg-c-yellow-light text-c-brown ring-1 ring-c-yellow/60";
  return "bg-c-off-white text-c-brown/70";
}

/** The asset's most urgent check, which is what its card on the map shows. */
function nextDue(asset: Asset) {
  const scheduled = asset.checks.map((check) => check.due).filter((due): due is number => due !== null);
  return scheduled.length ? Math.min(...scheduled) : null;
}

/**
 * A site map in miniature: pick a location, pick the equipment or product,
 * and log its checks. Logging moves the check to its next due date and adds
 * a record; product records will not save without a batch or lot number,
 * which is the rule the copy promises.
 */
export function OperationsDemo() {
  const [sites, setSites] = useState(SITES);
  const [siteIndex, setSiteIndex] = useState(0);
  const [selectedId, setSelectedId] = useState("keg-washer");
  const [batch, setBatch] = useState("");
  const [saved, setSaved] = useState<string | null>(null);

  const site = sites[siteIndex];
  const [location, ...assets] = site.assets;
  const selected = site.assets.find((asset) => asset.id === selectedId) ?? location;
  const SelectedIcon = kindIcons[selected.kind];
  const needsBatch = selected.kind === "product";

  const select = (id: string) => {
    setSelectedId(id);
    setBatch("");
    setSaved(null);
  };

  const logCheck = (checkName: string) => {
    setSites((current) =>
      current.map((entry, index) =>
        index !== siteIndex
          ? entry
          : {
              ...entry,
              assets: entry.assets.map((asset) =>
                asset.id !== selected.id
                  ? asset
                  : {
                      ...asset,
                      records: asset.records + 1,
                      checks: asset.checks.map((check) =>
                        check.name === checkName ? { ...check, due: NEXT_DUE[check.cadence] ?? null } : check,
                      ),
                    },
              ),
            },
      ),
    );
    setSaved(needsBatch ? `${checkName} saved for batch ${batch.trim()}` : `${checkName} saved`);
    setBatch("");
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-[2rem] border border-c-brown/10 bg-white p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="grid grid-cols-2 gap-1 rounded-full bg-c-off-white p-1" role="group" aria-label="Location">
            {sites.map((entry, index) => (
              <button
                key={entry.name}
                type="button"
                aria-pressed={siteIndex === index}
                onClick={() => {
                  setSiteIndex(index);
                  select(entry.assets[0].id);
                }}
                className={cn(
                  "inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors",
                  siteIndex === index ? "bg-c-brown text-white" : "text-c-brown hover:bg-c-yellow-light",
                )}
              >
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {entry.name}
              </button>
            ))}
          </div>
          <p className="text-sm text-c-brown/55">Pick anything on the map to see its checks.</p>
        </div>

        <div className="bg-dot-grid relative mt-4 rounded-3xl bg-c-off-white p-3 sm:aspect-[16/10] sm:p-0">
          <svg className="absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {assets.map((asset, index) => {
              const active = asset.id === selected.id;
              return (
                <line
                  key={asset.id}
                  x1={50}
                  y1={50}
                  x2={SLOTS[index].x}
                  y2={SLOTS[index].y}
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="5 6"
                  className={cn(
                    "transition-[stroke] duration-300",
                    active ? "animate-dash stroke-c-yellow [stroke-width:2.5]" : "stroke-c-brown/20 [stroke-width:1.5]",
                  )}
                />
              );
            })}
          </svg>

          <div className="grid grid-cols-2 gap-3 sm:block">
            <MapCard
              key={`${site.name}-location`}
              asset={location}
              active={selected.id === location.id}
              onSelect={() => select(location.id)}
              className="col-span-2 sm:absolute sm:left-1/2 sm:top-1/2 sm:w-[34%] sm:-translate-x-1/2 sm:-translate-y-1/2"
              center
              summary={`${assets.filter((asset) => asset.kind === "equipment").length} equipment · ${
                assets.filter((asset) => asset.kind === "product").length
              } products`}
            />
            {assets.map((asset, index) => (
              <MapCard
                key={asset.id}
                asset={asset}
                active={selected.id === asset.id}
                onSelect={() => select(asset.id)}
                className="sm:absolute sm:w-[30%] sm:-translate-x-1/2 sm:-translate-y-1/2"
                style={{ left: `${SLOTS[index].x}%`, top: `${SLOTS[index].y}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-[2rem] border border-c-brown/10 bg-white p-6">
        <div key={selected.id} className="animate-pop-in flex items-start gap-3">
          <span
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
              selected.kind === "location" ? "bg-c-brown text-c-yellow" : "bg-c-yellow text-c-brown",
            )}
          >
            <SelectedIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-c-brown/50">
              {kindLabels[selected.kind]} · {site.name}
            </p>
            <p className="mt-0.5 text-lg font-semibold leading-snug text-c-ink">{selected.name}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-c-brown">
          <span className="rounded-full bg-c-off-white px-3 py-1" aria-live="polite">
            {selected.records} records kept
          </span>
          {selected.manual ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-c-off-white px-3 py-1">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> {selected.manual}
            </span>
          ) : null}
        </div>

        {needsBatch ? (
          <label className="mt-5 block text-sm font-semibold text-c-ink">
            Batch or lot number <span className="text-c-red">*</span>
            <input
              value={batch}
              onChange={(event) => setBatch(event.target.value)}
              placeholder="e.g. CDS-0924-02"
              className="mt-2 w-full rounded-xl border border-c-brown/15 bg-c-off-white px-3.5 py-2.5 text-sm font-normal text-c-ink outline-none placeholder:text-c-brown/45 focus:border-c-yellow focus:bg-white focus:ring-2 focus:ring-c-yellow/25"
            />
          </label>
        ) : null}

        <ul className="mt-5 divide-y divide-c-brown/10 border-y border-c-brown/10">
          {selected.checks.map((check) => (
            <li key={check.name} className="flex items-center gap-3 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-c-ink">{check.name}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-c-brown/55">
                  {check.cadence}
                  <span aria-hidden="true">·</span>
                  <Users className="h-3 w-3" aria-hidden="true" /> {check.assignee}
                </p>
                <span className={cn("mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold", dueTone(check.due))}>
                  {dueLabel(check.due)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => logCheck(check.name)}
                disabled={needsBatch && !batch.trim()}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-c-yellow px-4 text-sm font-semibold text-c-brown transition-colors hover:bg-c-brown hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Check className="h-4 w-4" aria-hidden="true" /> Log
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-auto min-h-[1.5rem] pt-4 text-sm font-medium text-c-brown" aria-live="polite">
          {saved ? (
            <span className="animate-pop-in inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-c-yellow" aria-hidden="true" /> {saved}
            </span>
          ) : needsBatch && !batch.trim() ? (
            <span className="text-c-brown/55">Product records need a batch or lot number.</span>
          ) : null}
        </p>
      </div>
    </div>
  );
}

function MapCard({
  asset,
  active,
  onSelect,
  className,
  style,
  center = false,
  summary,
}: {
  asset: Asset;
  active: boolean;
  onSelect: () => void;
  className?: string;
  style?: CSSProperties;
  center?: boolean;
  summary?: string;
}) {
  const Icon = kindIcons[asset.kind];
  const due = nextDue(asset);
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      style={style}
      className={cn(
        "animate-pop-in rounded-2xl p-3.5 text-left shadow-card transition-all duration-300 sm:p-4",
        center ? "bg-c-brown text-white" : "bg-white",
        active ? "ring-2 ring-c-yellow" : "ring-1 ring-c-brown/10 hover:ring-c-yellow",
        className,
      )}
    >
      <span className="flex items-center gap-2.5">
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            center || asset.kind === "product" ? "bg-c-yellow text-c-brown" : "bg-c-yellow-light text-c-brown/70",
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className={cn("block text-sm font-semibold leading-snug", center ? "text-white" : "text-c-ink")}>{asset.name}</span>
          <span className={cn("block text-xs", center ? "text-white/60" : "text-c-brown/55")}>
            {summary ?? `${kindLabels[asset.kind]} · ${asset.checks.length} ${asset.checks.length === 1 ? "form" : "forms"}`}
          </span>
        </span>
      </span>
      <span className={cn("mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold", dueTone(due))}>
        {dueLabel(due)}
      </span>
    </button>
  );
}
