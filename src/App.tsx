import { PlanDetails } from "./screens/PlanDetails";
import { UninstallFeedback } from "./screens/UninstallFeedback";
import { Discover } from "./screens/Discover";
import { Quiz } from "./screens/Quiz";

// ponytail: four unrelated features, still no reason to pull in a router —
// App.tsx just picks based on the path, no shared component renders more
// than one of these. Visit each path directly to demo that flow.
function App() {
  const path = window.location.pathname;

  if (path.startsWith("/uninstall-feedback")) {
    return <UninstallFeedback onDone={() => { window.location.pathname = "/"; }} />;
  }
  if (path.startsWith("/quiz/")) {
    return <Quiz />;
  }
  if (path.startsWith("/discover")) {
    return <Discover />;
  }
  return <PlanDetails />;
}

export default App;
