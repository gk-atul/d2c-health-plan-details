import { useCallback, useMemo, useState, type ComponentType, type SVGProps } from "react";
import { Typography } from "@acko/typography";
import { Button } from "@acko/button";
import { Card } from "@acko/card";
import { Textarea } from "@acko/textarea";
import { Alert } from "@acko/alert";
import { Close, Mail, Gift, Stopwatch, TriangleWarning } from "@acko/icons";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

function Icon32({ icon: Cmp }: { icon: IconType }) {
  return (
    <span className="inline-flex size-32 shrink-0 [&_svg]:size-full" aria-hidden="true">
      <Cmp aria-hidden="true" />
    </span>
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

type Step = "capture" | "nudge";

export function UninstallFeedback({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState<Step>("capture");
  const [feedback, setFeedback] = useState("");
  const nudge = useMemo(() => NUDGE_CONTENT[classifyFeedback(feedback)], [feedback]);

  const handleSubmit = useCallback(() => setStep("nudge"), []);

  return (
    <div style={{ background: "var(--surfaceBase)" }} className="min-h-screen">
      <div className="mx-auto flex w-full max-w-[430px] sm:max-w-[600px] lg:max-w-[680px] flex-col px-16 sm:px-32 lg:px-40 py-24">
        <div className="mb-24 flex items-center justify-end">
          <Button variant="ghost" size="lg" iconOnly iconLeft={<Close aria-hidden="true" />} onClick={onDone}>
            Close
          </Button>
        </div>

        {step === "capture" ? (
          <>
            <Typography as="h1" scale="2xl" emphasis="bold" className="block">
              Before you go
            </Typography>
            <Typography as="p" scale="sm" color="secondary" className="mb-24 mt-8 block">
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
            <Alert variant="info" layout="inline" className="mb-24">
              Thanks — this goes straight to our product team, not just a queue.
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
