import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import CharacterSelect from "@/components/CharacterSelect";
import type { CharacterInfo } from "@/components/CharacterSelect";
import ScenarioGame from "@/components/ScenarioGame";
import ConstellationEnding from "@/components/ConstellationEnding";
import ResultsPage from "@/components/ResultsPage";

type GamePhase = "landing" | "character" | "playing" | "constellation" | "results";

const Index = () => {
  const [phase, setPhase] = useState<GamePhase>("landing");
  const [finalEnergy, setFinalEnergy] = useState(50);
  const [character, setCharacter] = useState<CharacterInfo | null>(null);
  const [userChoices, setUserChoices] = useState<{ sceneId: number; choiceText: string; emoji: string }[]>([]);

  const handleStart = () => setPhase("character");

  const handleCharacterSelect = (char: CharacterInfo) => {
    setCharacter(char);
    setPhase("playing");
  };

  const handleComplete = (energy: number, choices: { sceneId: number; choiceText: string; emoji: string }[]) => {
    setFinalEnergy(energy);
    setUserChoices(choices);
    setPhase("constellation");
  };

  const handleRestart = () => {
    setFinalEnergy(50);
    setUserChoices([]);
    setCharacter(null);
    setPhase("landing");
  };

  return (
    <>
      {phase === "landing" && <LandingPage onStart={handleStart} />}
      {phase === "character" && <CharacterSelect onSelect={handleCharacterSelect} />}
      {phase === "playing" && character && (
        <ScenarioGame onComplete={handleComplete} character={character} />
      )}
      {phase === "constellation" && character && (
        <ConstellationEnding
          choices={userChoices}
          characterName={character.name}
          characterEmoji={character.emoji}
          onContinue={() => setPhase("results")}
        />
      )}
      {phase === "results" && character && (
        <ResultsPage energy={finalEnergy} choices={userChoices} onRestart={handleRestart} characterName={character.name} />
      )}
    </>
  );
};

export default Index;
