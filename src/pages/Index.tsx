import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import ScenarioGame from "@/components/ScenarioGame";
import ResultsPage from "@/components/ResultsPage";

type GamePhase = "landing" | "playing" | "results";

const Index = () => {
  const [phase, setPhase] = useState<GamePhase>("landing");
  const [scores, setScores] = useState<number[]>([]);

  const handleStart = () => setPhase("playing");

  const handleComplete = (finalScores: number[]) => {
    setScores(finalScores);
    setPhase("results");
  };

  const handleRestart = () => {
    setScores([]);
    setPhase("landing");
  };

  return (
    <>
      {phase === "landing" && <LandingPage onStart={handleStart} />}
      {phase === "playing" && <ScenarioGame onComplete={handleComplete} />}
      {phase === "results" && <ResultsPage scores={scores} onRestart={handleRestart} />}
    </>
  );
};

export default Index;
