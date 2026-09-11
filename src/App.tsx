import { useState } from "react";
import { Typography } from "@acko/typography";
import { PlanDetails } from "./screens/PlanDetails";
import { UninstallFeedback } from "./screens/UninstallFeedback";

// ponytail: no router in this project (single screen until now), and the
// real entry point — a Home Screen Quick Action on long-press — can't be
// simulated in a browser at all. This dev-only toggle is the same "force
// a state that has no real trigger yet" pattern as PlanDetails' own
// DevStatusPanel. Gated on import.meta.env.DEV, dead-code-eliminated in
// production the same way.
function DevScreenSwitcher({ onOpen }: { onOpen: () => void }) {
  if (!import.meta.env.DEV) return null;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="fixed left-16 top-16 z-50 rounded-2xl border border-dashed px-8 py-4"
      style={{ background: "var(--surfaceStaticWhite)", borderColor: "var(--borderDefault)" }}
    >
      <Typography as="span" scale="xs" color="secondary">
        DEV: view uninstall flow
      </Typography>
    </button>
  );
}

function App() {
  const [showUninstallFlow, setShowUninstallFlow] = useState(false);

  if (showUninstallFlow) {
    return <UninstallFeedback onDone={() => setShowUninstallFlow(false)} />;
  }

  return (
    <>
      <PlanDetails />
      <DevScreenSwitcher onOpen={() => setShowUninstallFlow(true)} />
    </>
  );
}

export default App;
