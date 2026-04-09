import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import ScenarioGame from "@/components/ScenarioGame";
import ResultsPage from "@/components/ResultsPage";

type GamePhase = "landing" | "playing" | "results";

const Index = () => {
  const [phase, setPhase] = useState<GamePhase>("landing");
  const [finalEnergy, setFinalEnergy] = useState(50);
  const [userChoices, setUserChoices] = useState<{ sceneId: number; choiceText: string; emoji: string }[]>([]);

  const handleStart = () => setPhase("playing");

  const handleComplete = (energy: number, choices: { sceneId: number; choiceText: string; emoji: string }[]) => {
    setFinalEnergy(energy);
    setUserChoices(choices);
    setPhase("results");
  };

  const handleRestart = () => {
    setFinalEnergy(50);
    setUserChoices([]);
    setPhase("landing");
  };

  return (
    <>
      {phase === "landing" && <LandingPage onStart={handleStart} />}
      {phase === "playing" && <ScenarioGame onComplete={handleComplete} />}
      {phase === "results" && (
        <ResultsPage energy={finalEnergy} choices={userChoices} onRestart={handleRestart} />
      )}
    </>
  );
};

export default Index;
