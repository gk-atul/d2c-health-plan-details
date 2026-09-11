import { useCallback, useMemo, useState, type ComponentType, type SVGProps } from "react";
import { Typography } from "@acko/typography";
import { Button } from "@acko/button";
import { Card } from "@acko/card";
import { Textarea } from "@acko/textarea";
import { Alert } from "@acko/alert";
import { Close, Mail, Gift, Stopwatch, TriangleWarning, Star, Tick } from "@acko/icons";
import FeedbackIntroIllustration from "../assets/illustrations/feedback-intro.svg";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

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

// Same direction as the Swiggy reference (envelope + small sparkle accent,
// warm and personal), built from real @acko/icons rather than a copied
// asset: the icon-in-circle hero treatment already used for PlanDetails'
// hero fallback (Icon40 in a 96px --accentPurpleSurface circle), plus a
// small floating badge — Star, closest real icon to a "sparkle" accent —
// at the corner, matching that hero's own accent-badge composition idiom.
function FeedbackHeroIllustration() {
  return (
    <div className="mb-24 flex justify-center">
      <div
        className="relative flex h-96 w-96 items-center justify-center rounded-full"
        style={{ background: "var(--accentPurpleSurface)" }}
      >
        <Icon40 icon={Mail} />
        <span
          className="absolute -right-4 -top-4 flex size-32 items-center justify-center rounded-full"
          style={{ background: "var(--surfaceStaticWhite)", boxShadow: "var(--shadowXs)" }}
        >
          <Icon20 icon={Star} />
        </span>
      </div>
    </div>
  );
}

// ponytail: picking a nudge from free-text is a client-side keyword match —
// a real build would classify this server-side (a support/retention
// service, possibly with a real sentiment/intent model), not string-match
// in the browser. This is a stand-in for that response shape, same spirit
// as the mocked coupon/pricing data on the Plan Details screen — there's
// no backend yet, so this is what "the API returned a nudge" looks like
// for now. Swap the body of classifyFeedback for a real API call first.
type NudgeKind = "price" | "unused" | "issue" | "generic";

function classifyFeedback(text: string): NudgeKind {
  const t = text.toLowerCase();
  if (/expensive|price|cost|afford|money|premium/.test(t)) return "price";
  if (/don'?t need|not using|no need|don'?t use|barely use/.test(t)) return "unused";
  if (/bug|crash|slow|glitch|error|broken|issue|problem|not working/.test(t)) return "issue";
  return "generic";
}

const NUDGE_CONTENT: Record<
  NudgeKind,
  { Icon: IconType; title: string; body: string; cta: string }
> = {
  price: {
    Icon: Gift,
    title: "Before you pay full price again",
    body: "We'd rather you stay than lose you over cost. Here's 15% off your next renewal, no strings attached.",
    cta: "Apply 15% and stay",
  },
  unused: {
    Icon: Stopwatch,
    title: "Not ready to let go completely?",
    body: "You can pause your cover instead of losing it outright — pick back up anytime in the next 6 months.",
    cta: "Pause instead of leaving",
  },
  issue: {
    Icon: TriangleWarning,
    title: "We're sorry something broke",
    body: "This has been flagged directly to our engineering team. Let's get you sorted rather than losing you over a bug.",
    cta: "Talk to support now",
  },
  generic: {
    Icon: Mail,
    title: "Before you uninstall",
    body: "You'll lose easy access to your policy, claims, and support from here. Talk to us first — it takes two minutes.",
    cta: "Talk to an expert",
  },
};

// Three screens, matching the Swiggy reference's shape (intro/context ->
// capture -> resolution) without its literal "message from the CEO"
// framing — already decided that's just copy for the entry button, not a
// real promise, so the intro here sets expectations in ACKO's own voice
// instead of inventing a named executive's signature.
type Step = "intro" | "capture" | "completion";

export function UninstallFeedback({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState<Step>("intro");
  const [feedback, setFeedback] = useState("");
  const nudge = useMemo(() => NUDGE_CONTENT[classifyFeedback(feedback)], [feedback]);

  const handleSubmit = useCallback(() => setStep("completion"), []);

  return (
    <div style={{ background: "var(--surfaceBase)" }} className="min-h-screen">
      <div className="mx-auto flex w-full max-w-[430px] sm:max-w-[600px] lg:max-w-[680px] flex-col px-16 sm:px-32 lg:px-40 py-24">
        <div className="mb-24 flex items-center justify-end">
          <Button variant="ghost" size="lg" iconOnly iconLeft={<Close aria-hidden="true" />} onClick={onDone}>
            Close
          </Button>
        </div>

        {step === "intro" ? (
          <>
            {/* Real illustration asset (not an @acko/icons icon — that set
                is deliberately flat/single-color line-art at 16-32px, a
                different tier from a standalone hero graphic; same reason
                PlanDetails' own hero uses coverage-shield.svg instead of
                an icon). Provided by design for this screen specifically. */}
            <div className="mb-16 flex justify-center">
              <img src={FeedbackIntroIllustration} alt="" aria-hidden="true" width={80} height={80} />
            </div>
            <Typography as="h1" scale="2xl" emphasis="bold" align="center" className="mb-16 block">
              We'd love to hear from you
            </Typography>

            <Card variant="primary">
              <div className="p-24">
                <Typography as="p" scale="sm" className="mb-16 block">
                  Before you go, tell us what happened.
                </Typography>
                <Typography as="p" scale="sm" color="secondary" className="mb-16 block">
                  Our team personally reads every message that comes through here — it helps us
                  fix real problems for the next person, not just log a statistic.
                </Typography>
                <Typography as="p" scale="sm" color="secondary" className="block">
                  If something didn't work, felt unfair, or you simply don't need this anymore,
                  we'd rather know than guess.
                </Typography>
              </div>
            </Card>

            <Button variant="primary" fullWidth className="mt-24" onClick={() => setStep("capture")}>
              Share your feedback
            </Button>
          </>
        ) : step === "capture" ? (
          <>
            <FeedbackHeroIllustration />
            <Typography as="h1" scale="2xl" emphasis="bold" align="center" className="block">
              Before you go
            </Typography>
            <Typography as="p" scale="sm" color="secondary" align="center" className="mb-24 mt-8 block">
              We read every message personally — telling us what happened genuinely helps us fix
              it for the next person.
            </Typography>

            <Textarea
              label="What happened?"
              placeholder="Tell us what went wrong, or what we could've done better..."
              value={feedback}
              onChange={setFeedback}
              rows={6}
              maxLength={500}
              showCount
              className="mb-16"
            />

            <Button variant="primary" fullWidth disabled={feedback.trim() === ""} onClick={handleSubmit}>
              Submit feedback
            </Button>
            <Button variant="link" size="sm" className="mt-16 self-center" onClick={handleSubmit}>
              Skip and continue
            </Button>
          </>
        ) : (
          <>
            <div className="mb-24 flex justify-center">
              <div
                className="flex size-64 items-center justify-center rounded-full"
                style={{ background: "var(--statusSuccessSubtle)" }}
              >
                <Icon32 icon={Tick} />
              </div>
            </div>
            <Typography as="h1" scale="xl" emphasis="bold" align="center" className="mb-24 block">
              Got it — thank you
            </Typography>

            <Alert variant="info" layout="inline" className="mb-24">
              This goes straight to our product team, not just a queue.
            </Alert>

            <Card variant="primary">
              <div className="flex flex-col items-center p-24 text-center">
                <Icon32 icon={nudge.Icon} />
                <Typography as="p" scale="lg" emphasis="bold" align="center" className="mb-8 mt-16 block">
                  {nudge.title}
                </Typography>
                <Typography as="p" scale="sm" color="secondary" align="center" className="mb-24 block">
                  {nudge.body}
                </Typography>
                <Button variant="primary" fullWidth onClick={onDone}>
                  {nudge.cta}
                </Button>
              </div>
            </Card>

            <Button variant="link" size="sm" className="mt-16 self-center" onClick={onDone}>
              Continue uninstalling
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
