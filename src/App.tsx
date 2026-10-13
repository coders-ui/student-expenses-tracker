import { Component, type ReactNode } from "react";
import StudentSpend from "./StudentSpend.jsx";
import "./studentspend.css";

class AppErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <main className="ss-error-screen"><h1>StudentSpend couldn’t load this view.</h1><p>{this.state.error.message}</p><button onClick={() => window.location.reload()}>Reload app</button></main>;
    }
    return this.props.children;
  }
}

export default function App() {
  return <AppErrorBoundary><StudentSpend /></AppErrorBoundary>;
}
