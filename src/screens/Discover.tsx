import { type ComponentType, type SVGProps } from "react";
import { Typography } from "@acko/typography";
import { Button } from "@acko/button";
import { Card } from "@acko/card";
import { Badge } from "@acko/badge";
import { Home, Layers, ClipboardCheck, Headphone, Hospital, TriangleWarning } from "@acko/icons";
import { QUIZZES } from "../data/quizzes";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

function Icon24({ icon: Cmp }: { icon: IconType }) {
  return (
    <span className="inline-flex size-24 shrink-0 [&_svg]:size-full" aria-hidden="true">
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

// ponytail: no real photo assets for these two mock articles — using a
// tinted block + icon as the media slot instead of inventing a fake photo,
// same "wave placeholder" spirit cards.md documents for a media slot with
// no real asset yet. Both headlines mirror real Discover content shown as
// reference; content only, not a copied image/design asset.
const ARTICLES = [
  {
    icon: Hospital,
    tint: "var(--accentPurpleSurface)",
    category: "Insurance basics",
    title: "How does a health insurance deductible work?",
    snippet: "It's the fixed amount you pay from your pocket before your insurance starts paying...",
  },
  {
    icon: TriangleWarning,
    tint: "var(--statusWarningSubtle)",
    category: "Your rights",
    title: "Can helping someone in an accident get you into legal trouble?",
    snippet: "No. You have every right to leave after helping. Indian law protects Good Samari...",
  },
];

function ArticleCard({ icon, tint, category, title, snippet }: (typeof ARTICLES)[number]) {
  return (
    <Card variant="primary">
      <div
        className="flex h-[180px] items-center justify-center rounded-t-[var(--radius4xl)]"
        style={{ background: tint }}
      >
        <Icon40 icon={icon} />
      </div>
      <div className="p-20">
        <Badge color="gray" textCase="sentence" className="mb-12">
          {category}
        </Badge>
        <Typography as="p" scale="lg" emphasis="bold" className="mb-8 block">
          {title}
        </Typography>
        <Typography as="p" scale="sm" color="secondary" className="block">
          {snippet}{" "}
          <Typography as="span" scale="sm" color="brand" className="underline">
            read more
          </Typography>
        </Typography>
      </div>
    </Card>
  );
}

function QuizTeaserCard({ quiz }: { quiz: (typeof QUIZZES)[number] }) {
  return (
    <Card variant="primary">
      <div className="p-20">
        <div className="mb-12 flex items-center gap-8">
          <Badge color="purple" textCase="uppercase" animated>
            Quiz
          </Badge>
          <Typography as="span" scale="xs" color="secondary">
            {quiz.questions.length} questions · 2 min
          </Typography>
        </div>
        <Typography as="p" scale="lg" emphasis="bold" className="mb-8 block">
          {quiz.title}
        </Typography>
        <Typography as="p" scale="sm" color="secondary" className="mb-16 block">
          {quiz.description}
        </Typography>
        <Button variant="primary" fullWidth onClick={() => { window.location.pathname = `/quiz/${quiz.id}`; }}>
          Start quiz
        </Button>
      </div>
    </Card>
  );
}

const NAV_ITEMS = [
  { icon: Home, label: "Home" },
  { icon: Layers, label: "Discover" },
  { icon: ClipboardCheck, label: "Claims" },
  { icon: Headphone, label: "Support" },
];

function BottomNav() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t py-12"
      style={{ background: "var(--surfaceStaticWhite)", borderColor: "var(--borderDefault)" }}
    >
      {NAV_ITEMS.map(({ icon, label }) => {
        const active = label === "Discover";
        return (
          <div key={label} className="flex flex-col items-center gap-4">
            <span style={{ color: active ? "var(--textBrand)" : "var(--textSecondary)" }}>
              <Icon24 icon={icon} />
            </span>
            <Typography as="span" scale="xs" emphasis={active ? "bold" : "normal"} color={active ? "brand" : "secondary"}>
              {label.toUpperCase()}
            </Typography>
          </div>
        );
      })}
    </div>
  );
}

// Interleaves quiz teasers into the article feed rather than dumping all 5
// quizzes at the top — closer to how a real feed would mix content, and
// avoids the page reading as "a quiz app" instead of "Discover with a quiz
// feature in it".
function buildFeed() {
  const feed: Array<{ kind: "article"; data: (typeof ARTICLES)[number] } | { kind: "quiz"; data: (typeof QUIZZES)[number] }> = [];
  const articles = [...ARTICLES];
  const quizzes = [...QUIZZES];
  while (articles.length || quizzes.length) {
    if (articles.length) feed.push({ kind: "article", data: articles.shift()! });
    if (quizzes.length) feed.push({ kind: "quiz", data: quizzes.shift()! });
  }
  return feed;
}

export function Discover() {
  const feed = buildFeed();
  return (
    <div style={{ background: "var(--surfaceBase)" }} className="min-h-screen pb-96">
      <div className="mx-auto flex w-full max-w-[430px] sm:max-w-[600px] lg:max-w-[680px] flex-col px-16 sm:px-32 lg:px-40 py-24">
        <Typography as="h1" scale="3xl" emphasis="bold" className="mb-24 block">
          Discover
        </Typography>

        <div className="flex flex-col gap-24">
          {feed.map((item) =>
            item.kind === "article" ? (
              <ArticleCard key={item.data.title} {...item.data} />
            ) : (
              <QuizTeaserCard key={item.data.id} quiz={item.data} />
            ),
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
