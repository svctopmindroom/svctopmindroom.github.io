import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scenes, type Choice } from "@/data/scenarios";
import { ArrowRight, Zap } from "lucide-react";

interface EnergyBarProps {
  energy: number;
}

const EnergyBar = ({ energy }: EnergyBarProps) => {
  const getColor = () => {
    if (energy >= 70) return "bg-hope";
    if (energy >= 40) return "bg-warm";
    return "bg-accent";
  };

  return (
    <div className="flex items-center gap-3">
      <Zap className="w-4 h-4 text-warm flex-shrink-0" />
      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${getColor()}`}
          animate={{ width: `${Math.max(0, Math.min(100, energy))}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <span className="text-sm font-bold text-foreground w-8 text-right">{energy}</span>
    </div>
  );
};

interface ScenarioGameProps {
  onComplete: (energy: number, choices: { sceneId: number; choiceText: string; emoji: string }[]) => void;
}

const ScenarioGame = ({ onComplete }: ScenarioGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [energy, setEnergy] = useState(50);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [energyDelta, setEnergyDelta] = useState<number | null>(null);
  const [userChoices, setUserChoices] = useState<{ sceneId: number; choiceText: string; emoji: string }[]>([]);

  const scene = scenes[currentIndex];

  const handleSelect = (choiceIndex: number) => {
    if (showFeedback) return;
    const choice = scene.choices[choiceIndex];
    setSelectedChoice(choiceIndex);
    setEnergyDelta(choice.energyChange);
    setEnergy(prev => Math.max(0, Math.min(100, prev + choice.energyChange)));
    setShowFeedback(true);
    setUserChoices(prev => [...prev, { sceneId: scene.id, choiceText: choice.text, emoji: choice.emoji }]);
  };

  const handleNext = () => {
    if (currentIndex < scenes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
      setEnergyDelta(null);
    } else {
      onComplete(energy, userChoices);
    }
  };

  const getChoiceStyle = (index: number, choice: Choice) => {
    if (!showFeedback) {
      return "bg-card border-border hover:border-primary/40 hover:shadow-md active:scale-[0.98] cursor-pointer";
    }
    if (index === selectedChoice) {
      if (choice.tag === 'recover') return "bg-hope/10 border-hope";
      if (choice.tag === 'neutral') return "bg-warm/10 border-warm";
      return "bg-accent/10 border-accent";
    }
    return "bg-card border-border opacity-40";
  };

  return (
    <div className="min-h-screen flex flex-col px-5 py-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span className="font-medium">{scene.timeLabel}</span>
          <span>{currentIndex + 1} / {scenes.length}</span>
        </div>
        <EnergyBar energy={energy} />
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 mb-5">
        {scenes.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < currentIndex ? "bg-primary" : i === currentIndex ? "bg-primary/60" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
          className="flex-1"
        >
          {/* Scene */}
          <div className="bg-card rounded-2xl p-5 border border-border mb-5">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-2xl">{scene.icon}</span>
              <div>
                <h2 className="text-base font-bold text-foreground">{scene.title}</h2>
                <p className="text-[11px] text-muted-foreground">{scene.subtext}</p>
              </div>
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed">{scene.situation}</p>
          </div>

          {/* Choices */}
          <div className="space-y-2.5">
            {scene.choices.map((choice, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleSelect(i)}
                className={`w-full text-left rounded-xl p-3.5 border-2 transition-all ${getChoiceStyle(i, choice)}`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-lg mt-0.5">{choice.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{choice.text}</p>
                    {showFeedback && i === selectedChoice && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-2"
                      >
                        <p className="text-xs text-muted-foreground leading-relaxed">{choice.feedback}</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Energy change indicator */}
          {showFeedback && energyDelta !== null && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-center text-sm font-semibold ${
                energyDelta > 0 ? "text-hope" : "text-accent"
              }`}
            >
              에너지 {energyDelta > 0 ? `+${energyDelta}` : energyDelta} ⚡
            </motion.div>
          )}

          {/* Next button */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5"
            >
              <button
                onClick={handleNext}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                {currentIndex < scenes.length - 1 ? "다음" : "결과 보기"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ScenarioGame;
