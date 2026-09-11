import { PlanDetails } from "./screens/PlanDetails";
import { UninstallFeedback } from "./screens/UninstallFeedback";

// ponytail: these are two unrelated features (a purchase-flow screen and an
// uninstall-feedback flow) that don't need to know about each other, and
// there's no reason to pull in a router for exactly two screens. Each gets
// its own URL; App.tsx just picks based on the path, no shared component
// renders both. Visit /uninstall-feedback directly to demo that flow —
// its real entry point (a Home Screen Quick Action on long-press) can't be
// simulated in a browser at all, so a URL is the honest stand-in rather
// than a dev button living inside PlanDetails' own render tree.
function App() {
  if (window.location.pathname.startsWith("/uninstall-feedback")) {
    return <UninstallFeedback onDone={() => { window.location.pathname = "/"; }} />;
  }
  return <PlanDetails />;
}

export default App;
