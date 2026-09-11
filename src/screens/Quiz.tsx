import { useCallback, useMemo, useState, type ComponentType, type SVGProps } from "react";
import { Typography } from "@acko/typography";
import { Button } from "@acko/button";
import { Alert } from "@acko/alert";
import { Progress } from "@acko/progress";
import { Close, Tick } from "@acko/icons";
import { getQuizById, type Quiz as QuizData, type QuizOption, type QuizQuestion } from "../data/quizzes";

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

// VARIANT-GAP — logged in missing-components-discover-quiz.md. Neither
// RadioGroup (one group-level `error` flag, can't mark one option green and
// another red at the same time) nor Button (no "correct/incorrect" state)
// covers a tap-to-instantly-answer option tile that needs per-option
// color-coding once answered. Built from a plain <button> + real semantic
// status tokens + Typography, not a from-scratch design — same shell shape
// (rounded surface, border, padding) as every other custom composition on
// this project.
type OptionState = "neutral" | "correct-selected" | "incorrect-selected" | "correct-reveal" | "muted";

function optionState(option: QuizOption, question: QuizQuestion, selectedId: string | null): OptionState {
  if (!selectedId) return "neutral";
  const isCorrect = option.id === question.correctOptionId;
  const isSelected = option.id === selectedId;
  if (isSelected) return isCorrect ? "correct-selected" : "incorrect-selected";
  if (isCorrect) return "correct-reveal";
  return "muted";
}

// ponytail: --surfaceStaticWhite looked right by name but isn't — it
// resolves to a light gray (#efeff0), documented as "dark mode relief,
// use sparingly in light mode", not a plain card surface. --cardFillDefault
// is what real Card components actually use for their background;
// matching it here keeps these tiles visually consistent with every real
// Card elsewhere in the app. Confirmed live before fixing (getComputedStyle
// on --surfaceStaticWhite returned rgb(239, 239, 240), not white).
const OPTION_STYLES: Record<OptionState, { border: string; background: string }> = {
  neutral: { border: "var(--borderDefault)", background: "var(--cardFillDefault)" },
  "correct-selected": { border: "var(--statusSuccessBase)", background: "var(--statusSuccessSubtle)" },
  "incorrect-selected": { border: "var(--statusErrorBase)", background: "var(--statusErrorSubtle)" },
  "correct-reveal": { border: "var(--statusSuccessBase)", background: "var(--statusSuccessSubtle)" },
  muted: { border: "var(--borderDefault)", background: "var(--cardFillDefault)" },
};

function QuizOptionTile({
  option,
  state,
  onSelect,
}: {
  option: QuizOption;
  state: OptionState;
  onSelect: () => void;
}) {
  const style = OPTION_STYLES[state];
  const icon = state === "correct-selected" || state === "correct-reveal" ? Tick : state === "incorrect-selected" ? Close : null;
  return (
    <button
      type="button"
      disabled={state !== "neutral"}
      onClick={onSelect}
      className="mb-12 flex w-full appearance-none items-center justify-between gap-12 rounded-2xl border p-16 text-left transition-colors"
      style={{ borderColor: style.border, background: style.background }}
    >
      <Typography as="span" scale="sm" emphasis="medium">
        {option.label}
      </Typography>
      {icon ? <Icon20 icon={icon} /> : null}
    </button>
  );
}

function QuizCompletion({ quiz, score, onDone }: { quiz: QuizData; score: number; onDone: () => void }) {
  const total = quiz.questions.length;
  const doneWell = score >= Math.ceil(total * 0.75);
  return (
    <div className="mx-auto flex w-full max-w-[430px] sm:max-w-[600px] flex-col items-center px-16 sm:px-32 py-64 text-center">
      <div
        className="mb-24 flex size-64 items-center justify-center rounded-full"
        style={{ background: doneWell ? "var(--statusSuccessSubtle)" : "var(--accentPurpleSurface)" }}
      >
        <Icon32 icon={Tick} />
      </div>
      <Typography as="p" scale="3xl" emphasis="bold" align="center" className="block">
        {score}/{total}
      </Typography>
      <Typography as="p" scale="lg" emphasis="bold" align="center" className="mt-8 block">
        {doneWell ? "Nicely done!" : "Good start!"}
      </Typography>
      <Typography as="p" scale="sm" color="secondary" align="center" className="mb-32 mt-8 block">
        {doneWell
          ? `You've got a solid handle on ${quiz.title.toLowerCase()}.`
          : `A few more rounds and ${quiz.title.toLowerCase()} will feel a lot clearer.`}
      </Typography>
      <Button variant="primary" fullWidth onClick={onDone}>
        Back to Discover
      </Button>
    </div>
  );
}

export function Quiz() {
  const quiz = useMemo(() => {
    const slug = window.location.pathname.split("/quiz/")[1]?.split("/")[0] ?? "";
    return getQuizById(slug);
  }, []);

  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const goToDiscover = useCallback(() => {
    window.location.pathname = "/discover";
  }, []);

  const handleSelect = useCallback(
    (optionId: string) => {
      if (selectedId || !quiz) return;
      setSelectedId(optionId);
      if (optionId === quiz.questions[index].correctOptionId) {
        setScore((s) => s + 1);
      }
    },
    [selectedId, quiz, index],
  );

  const handleContinue = useCallback(() => {
    if (!quiz) return;
    if (index === quiz.questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelectedId(null);
  }, [quiz, index]);

  if (!quiz) {
    return (
      <div className="mx-auto flex w-full max-w-[430px] flex-col items-center px-16 py-64 text-center">
        <Typography as="p" scale="lg" emphasis="bold" align="center" className="mb-16 block">
          Quiz not found
        </Typography>
        <Button variant="primary" onClick={goToDiscover}>
          Back to Discover
        </Button>
      </div>
    );
  }

  if (finished) {
    return (
      <div style={{ background: "var(--surfaceBase)" }} className="min-h-screen">
        <QuizCompletion quiz={quiz} score={score} onDone={goToDiscover} />
      </div>
    );
  }

  const question = quiz.questions[index];

  return (
    <div style={{ background: "var(--surfaceBase)" }} className="min-h-screen">
      <div className="mx-auto flex w-full max-w-[430px] sm:max-w-[600px] flex-col px-16 sm:px-32 py-24">
        <div className="mb-16 flex items-center gap-16">
          <Button variant="ghost" size="lg" iconOnly iconLeft={<Close aria-hidden="true" />} onClick={goToDiscover}>
            Close
          </Button>
          <Progress
            variant="segmented"
            segments={quiz.questions.length}
            value={index}
            max={quiz.questions.length}
            color="primary"
            className="flex-1"
          />
        </div>

        <Typography as="p" scale="xs" color="secondary" className="mb-8 block">
          {quiz.title} · Question {index + 1} of {quiz.questions.length}
        </Typography>
        <Typography as="h1" scale="xl" emphasis="bold" className="mb-24 block">
          {question.prompt}
        </Typography>

        <div>
          {question.options.map((option) => (
            <QuizOptionTile
              key={option.id}
              option={option}
              state={optionState(option, question, selectedId)}
              onSelect={() => handleSelect(option.id)}
            />
          ))}
        </div>

        {selectedId ? (
          <>
            <Alert
              variant={selectedId === question.correctOptionId ? "success" : "error"}
              layout="inline"
              className="mt-8"
            >
              {question.explanation}
            </Alert>
            <Button variant="primary" fullWidth className="mt-16" onClick={handleContinue}>
              {index === quiz.questions.length - 1 ? "See your score" : "Continue"}
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}
