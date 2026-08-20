import { useCallback, useEffect, useState, type ComponentType, type SVGProps } from "react";
import { Typography } from "@acko/typography";
import { Button } from "@acko/button";
import { Card } from "@acko/card";
import { Badge } from "@acko/badge";
import { ToggleGroup, ToggleGroupItem } from "@acko/toggle";
import { Separator } from "@acko/separator";
import { Skeleton } from "@acko/skeleton";
import {
  ArrowLeft,
  Hospital,
  RoomRentLimit,
  SumInsuredRestored,
  DoctorOnCall,
  ChevronRight,
  Stopwatch,
  HealthEvaluation,
  Coverage,
  Family,
  Airplane,
  Medicine,
  TriangleWarning,
  Cloud,
} from "@acko/icons";
import CoverageShieldIllustration from "../assets/illustrations/coverage-shield.svg";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const COVERED_ITEMS: { Icon: IconType; label: string }[] = [
  { Icon: Hospital, label: "100% hospital bill payment" },
  { Icon: RoomRentLimit, label: "No room rent limit" },
  { Icon: SumInsuredRestored, label: "10% bonus sum insured" },
  { Icon: DoctorOnCall, label: "Free doctor teleconsultations" },
];

// No @acko/icons entry exists for "maternity" specifically — Family is the
// closest available (iconography.md: pick closest, never fall back to
// another library). Logged in missing-components-plan-details.md.
const NOT_COVERED_ITEMS: { Icon: IconType; label: string }[] = [
  { Icon: Family, label: "Maternity expenses" },
  { Icon: Airplane, label: "Treatment outside India" },
  { Icon: Medicine, label: "Outpatient medical expenses" },
];

// icon size wrapper — @acko/icons ship as 1em SVGs and must be sized via a
// wrapper span (iconography.md), never width/height props.
function Icon24({ icon: Cmp }: { icon: IconType }) {
  return (
    <span className="inline-flex size-24 shrink-0 [&_svg]:size-full" aria-hidden="true">
      <Cmp aria-hidden="true" />
    </span>
  );
}
function Icon20({ icon: Cmp }: { icon: IconType }) {
  return (
    <span className="inline-flex size-20 shrink-0 [&_svg]:size-full" aria-hidden="true">
      <Cmp aria-hidden="true" />
    </span>
  );
}
function Icon32({ icon: Cmp }: { icon: IconType }) {
  return (
    <span className="inline-flex size-32 shrink-0 [&_svg]:size-full" aria-hidden="true">
      <Cmp aria-hidden="true" />
    </span>
  );
}
function Icon40({ icon: Cmp }: { icon: IconType }) {
  return (
    <span className="inline-flex size-40 shrink-0 [&_svg]:size-full" aria-hidden="true">
      <Cmp aria-hidden="true" />
    </span>
  );
}

// Shared row list for both covered and not-covered tabs — same icon+label+
// chevron pattern, only the data differs.
function CoverageRows({ items }: { items: { Icon: IconType; label: string }[] }) {
  return (
    <>
      {items.map((item, i) => (
        <div key={item.label}>
          <div className="flex items-center gap-12 px-8 py-12">
            <Icon24 icon={item.Icon} />
            <Typography as="span" scale="sm" className="flex-1">
              {item.label}
            </Typography>
            <Icon20 icon={ChevronRight} />
          </div>
          {i < items.length - 1 && <Separator />}
        </div>
      ))}
    </>
  );
}

// Switched from cards.md §3 AlertCard's colored/left-accent shell to a plain
// Card variant="primary" — matches the Coverage and Premium cards already on
// this page, and cards.md's own surface rule ("no two differentiating
// surfaces consecutively") was being broken by two colored boxes stacked
// back to back. Also sidesteps @acko/alert's confirmed warning-token bug
// (DESIGN-SYSTEM-BUGS.md) by not needing a colored shell at all.
function InfoCard({
  title,
  description,
  linkText,
  Icon,
  className = "",
}: {
  title: string;
  description: string;
  linkText: string;
  Icon: IconType;
  className?: string;
}) {
  return (
    <Card variant="primary" className={className}>
      <div className="flex items-start gap-12 p-16">
        <div className="flex-1">
          <Typography as="p" scale="sm" emphasis="bold" className="mb-4 block">
            {title}
          </Typography>
          <Typography as="p" scale="xs" color="secondary" className="mb-8 block">
            {description}
          </Typography>
          {/* @acko/button's real link variant — .acko-button-label hard-caps
              at max-width: 20ch with ellipsis, no wrap. linkText is kept
              <=20 chars at every call site specifically so this renders
              cleanly instead of truncating. */}
          <Button variant="link" size="sm">
            {linkText}
          </Button>
        </div>
        <Icon32 icon={Icon} />
      </div>
    </Card>
  );
}

type PageStatus = "loading" | "success" | "error" | "offline";

// ponytail: no real backend exists yet for this prototype, so this simulates
// the fetch lifecycle (delay, then resolve) rather than actually calling an
// API. Swap the body of `attempt` for the real request when one exists —
// everything downstream (loading/error/offline UI, retry) is already wired
// against this shape and won't need to change.
function usePlanDetailsStatus() {
  const [status, setStatus] = useState<PageStatus>("loading");

  const attempt = useCallback(() => {
    if (!navigator.onLine) {
      setStatus("offline");
      return () => {};
    }
    setStatus("loading");
    const timer = setTimeout(() => setStatus("success"), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cancel = attempt();
    const handleOnline = () => attempt();
    const handleOffline = () => setStatus("offline");
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      cancel();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [attempt]);

  return { status, retry: attempt };
}

// Full-page skeleton — dimensions mirror the real layout section-for-section
// (layout.md: "skeleton dimensions must match actual content dimensions —
// no layout shift"). Uses the real @acko/skeleton component throughout.
function PlanDetailsSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[430px] sm:max-w-[600px] lg:max-w-[680px] px-16 sm:px-32 lg:px-40 pb-40 pt-12">
      <div className="mt-8 flex flex-col items-center">
        <Skeleton variant="circular" width={96} height={96} className="mb-16" />
        <Skeleton variant="rounded" width={220} height={28} className="mb-8" />
        <Skeleton variant="rounded" width={260} height={18} />
      </div>

      <Skeleton variant="rounded" width="100%" height={40} className="my-16" />

      <Card variant="primary">
        <div className="p-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-12 px-8 py-12">
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="rounded" width="70%" height={16} />
            </div>
          ))}
          <div className="px-8 pt-12">
            <Skeleton variant="rounded" width="100%" height={48} />
          </div>
        </div>
      </Card>

      <Skeleton variant="rounded" width={200} height={22} className="mb-16 mt-32" />

      {[0, 1].map((i) => (
        <Card key={i} variant="primary" className={i === 0 ? "mb-12" : "mb-24"}>
          <div className="flex items-start gap-12 p-16">
            <div className="flex-1">
              <Skeleton variant="rounded" width="60%" height={18} className="mb-8" />
              <Skeleton variant="rounded" width="90%" height={14} className="mb-4" />
              <Skeleton variant="rounded" width="40%" height={14} className="mb-8" />
              <Skeleton variant="rounded" width={120} height={16} />
            </div>
            <Skeleton variant="circular" width={32} height={32} />
          </div>
        </Card>
      ))}

      <Card variant="primary" className="mb-24">
        <div className="flex items-center gap-12 p-16">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="rounded" width="70%" height={16} />
        </div>
      </Card>

      <Skeleton variant="rounded" width={180} height={22} className="mb-16" />

      <Card variant="primary">
        <div className="flex flex-col items-center p-20">
          <Skeleton variant="rounded" width={100} height={24} className="mb-16" />
          <Skeleton variant="rounded" width={90} height={14} className="mb-4" />
          <Skeleton variant="rounded" width={140} height={32} />
          <Skeleton variant="rounded" width="100%" height={1} className="my-16" />
          <div className="flex w-full items-center justify-between">
            <Skeleton variant="rounded" width={160} height={32} />
            <Skeleton variant="rounded" width={70} height={16} />
          </div>
        </div>
      </Card>
    </div>
  );
}

// Shared shell for the error and offline states. layout.md's Empty States
// rule applies here too even though this isn't literally an empty state:
// acknowledge what's wrong, explain briefly, give a clear next step — never
// a dead end.
function StatusScreen({
  Icon,
  title,
  body,
  onRetry,
}: {
  Icon: IconType;
  title: string;
  body: string;
  onRetry: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[430px] sm:max-w-[600px] lg:max-w-[680px] flex-col items-center px-16 sm:px-32 lg:px-40 py-64 text-center">
      <Icon32 icon={Icon} />
      <Typography as="p" scale="lg" emphasis="bold" className="mb-8 mt-16 block">
        {title}
      </Typography>
      <Typography as="p" scale="sm" color="secondary" className="mb-24 block">
        {body}
      </Typography>
      <Button variant="secondary" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

export function PlanDetails() {
  const { status, retry } = usePlanDetailsStatus();
  const [tab, setTab] = useState<string | string[]>("covered");
  const [heroImageFailed, setHeroImageFailed] = useState(false);

  if (status === "loading") {
    return (
      <div style={{ background: "var(--surfaceBase)" }} className="min-h-screen">
        <PlanDetailsSkeleton />
      </div>
    );
  }

  if (status === "offline") {
    return (
      <div style={{ background: "var(--surfaceBase)" }} className="min-h-screen">
        <StatusScreen
          Icon={Cloud}
          title="You're offline"
          body="Check your internet connection — we'll reconnect automatically, or try again now."
          onRetry={retry}
        />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{ background: "var(--surfaceBase)" }} className="min-h-screen">
        <StatusScreen
          Icon={TriangleWarning}
          title="Something went wrong"
          body="We couldn't load this plan's details. Please try again."
          onRetry={retry}
        />
      </div>
    );
  }

  return (
    <div style={{ background: "var(--surfaceBase)" }} className="min-h-screen">
      {/* Hero — approved pattern from ui-polish.md / layout.md's full-bleed
          hero rule: full-bleed gradient wrapper (--fillBrandSubtle →
          --surfaceBase), section-container inner. */}
      <section
        style={{
          background: "linear-gradient(180deg, var(--fillBrandSubtle) 0%, var(--surfaceBase) 100%)",
        }}
      >
        <div className="mx-auto w-full max-w-[430px] sm:max-w-[600px] lg:max-w-[680px] px-16 sm:px-32 lg:px-40 pb-24 pt-12">
          {/* iconography.md's exact documented pattern for icon-only back
              nav: <Button variant="ghost" iconOnly iconLeft={<ArrowLeft />}>
              Back</Button> — children becomes the sr-only accessible label
              when iconOnly is set (confirmed in Button.js), no separate
              aria-label needed. Icon goes in raw, not wrapped in Icon24 —
              Button's own CSS handles icon sizing. size="lg": default "md"
              icon-only is 48x40px, under the 44px tap-target minimum on the
              height axis; lg is 56x48. */}
          <Button
            variant="ghost"
            size="lg"
            iconOnly
            iconLeft={<ArrowLeft aria-hidden="true" />}
            className="-ml-16"
          >
            Back
          </Button>

          <div className="mt-8 flex flex-col items-center text-center">
            {/* Real illustration from the Figma library, not the flat
                @acko/icons placeholder — resolves the MISSING entry logged
                for this hero graphic. No wrapping circle: the asset already
                carries its own shading + drop shadow. Falls back to the
                original icon-in-circle version (what shipped before the
                real asset) if the image fails to load — cards.md rule #10:
                "Media must have a fallback... the card must still be
                usable." */}
            {heroImageFailed ? (
              <div
                className="mb-16 flex h-96 w-96 items-center justify-center rounded-full"
                style={{ background: "var(--accentPurpleSurface)" }}
              >
                <Icon40 icon={Coverage} />
              </div>
            ) : (
              <img
                src={CoverageShieldIllustration}
                alt=""
                aria-hidden="true"
                width={96}
                height={96}
                className="mb-16"
                onError={() => setHeroImageFailed(true)}
              />
            )}
            <Typography as="h1" scale="2xl" emphasis="bold" color="brand">
              Platinum Lite Health Plan
            </Typography>
            <Typography as="p" scale="sm" color="secondary" className="mt-4">
              Get ₹50 lakh for you, your spouse, and children
            </Typography>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[430px] sm:max-w-[600px] lg:max-w-[680px] px-16 sm:px-32 lg:px-40 pb-40">
        {/* Covered / not covered toggle */}
        <ToggleGroup type="single" stretch value={tab} onValueChange={setTab} className="mb-16">
          <ToggleGroupItem value="covered">What's covered</ToggleGroupItem>
          <ToggleGroupItem value="not-covered">What's not covered</ToggleGroupItem>
        </ToggleGroup>

        {/* Coverage card — padding lives on an inner wrapper div, never on
            Card itself (cards.md Part 1: no padding prop, no layout on
            Card's root). */}
        <Card variant="primary">
          <div className="p-8">
            {tab === "covered" ? (
              <>
                <CoverageRows items={COVERED_ITEMS} />
                <div className="px-8 pt-12">
                  <Button variant="secondary" fullWidth>
                    View all covers
                  </Button>
                </div>
              </>
            ) : (
              <CoverageRows items={NOT_COVERED_ITEMS} />
            )}
          </div>
        </Card>

        {/* What to know before you buy */}
        <Typography as="h2" scale="lg" emphasis="bold" className="mb-16 mt-32 block">
          What to know before you buy
        </Typography>

        <InfoCard
          className="mb-12"
          Icon={Stopwatch}
          title="About waiting periods"
          description="Your plan has a waiting time before it starts covering certain treatments"
          linkText="See how it unlocks"
        />
        <InfoCard
          className="mb-24"
          Icon={HealthEvaluation}
          title="About health evaluation"
          description="After payment, we'll ask a few simple medical questions to understand your family's health history. We don't suggest medical tests unless they're absolutely necessary."
          linkText="Why this matters?"
        />

        {/* Comparison teaser — was a custom colored-background button using
            --accentPurpleSurface. Re-checked semantics.md: accent/{hue}
            tokens are documented "for hue-coded components (badges, chips,
            counters, tags)" — small elements. Using one as a full-width
            banner fill was a scale mismatch, which is why it read as off
            against the rest of the page. Fixed the same way the info cards
            were: plain Card variant="primary" (matches every other card on
            this page), purple moved from background to text/icon color —
            how purple is used everywhere else here (badge text, button
            text, headings), never as a large fill. */}
        <Card
          variant="primary"
          onTap={() => {}}
          semanticLabel="See why ACKO's plan is best for you"
          className="mb-24"
        >
          <div className="flex w-full items-center gap-12 p-16 text-[color:var(--textBrand)]">
            <Icon24 icon={Coverage} />
            <Typography as="span" scale="sm" emphasis="medium" color="brand" className="flex-1 text-left">
              See why ACKO's plan is best for you
            </Typography>
            <Icon20 icon={ChevronRight} />
          </div>
        </Card>

        {/* Premium details */}
        <Typography as="h2" scale="lg" emphasis="bold" className="mb-16 block">
          Premium details
        </Typography>

        <Card variant="primary">
          <div className="flex flex-col items-center p-20 text-center">
            <Badge color="purple" textCase="sentence" animated>
              Recommended
            </Badge>
            {/* No forced uppercase — typography.md: all-caps outside Badge is
                a named anti-pattern. Plain small secondary label instead. */}
            <Typography as="p" scale="xs" color="secondary" className="mt-16 block">
              Sum insured
            </Typography>
            <Typography as="p" scale="2xl" emphasis="bold" className="mt-4 block">
              ₹50 lakh
            </Typography>

            <Separator className="my-16 w-full" />

            <div className="flex w-full items-center justify-between">
              <div className="text-left">
                <Typography as="p" scale="xs" color="secondary" className="block">
                  Premium
                </Typography>
                <div className="flex items-baseline gap-8">
                  {/* Real figure from the team — resolves the earlier-flagged
                      pricing anomaly (₹1,600 struck through under ₹5,090/month
                      read as a hike, not a discount). ₹8,000 → ₹5,090 is a
                      genuine markdown. */}
                  <Typography as="span" scale="sm" color="secondary" className="line-through">
                    ₹8,000
                  </Typography>
                  <Typography as="span" scale="lg" emphasis="bold">
                    ₹5,090/month
                  </Typography>
                </div>
              </div>
              {/* "See details" is 11 chars — well under the 20ch cap, no
                  copy change needed for this one. */}
              <Button variant="link" size="sm">
                See details
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
