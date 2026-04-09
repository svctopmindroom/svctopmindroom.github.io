import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scenarios, type Choice } from "@/data/scenarios";
import { ArrowRight, MessageCircle } from "lucide-react";

interface ScenarioGameProps {
  onComplete: (scores: number[]) => void;
}

const ScenarioGame = ({ onComplete }: ScenarioGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenario = scenarios[currentIndex];
  const progress = ((currentIndex) / scenarios.length) * 100;

  const handleSelect = (choiceIndex: number) => {
    if (showFeedback) return;
    setSelectedChoice(choiceIndex);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (selectedChoice === null) return;
    const newScores = [...scores, scenario.choices[selectedChoice].score];

    if (currentIndex < scenarios.length - 1) {
      setScores(newScores);
      setCurrentIndex(currentIndex + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      onComplete(newScores);
    }
  };

  const getChoiceStyle = (index: number, choice: Choice) => {
    if (!showFeedback) {
      return "bg-card border-border hover:border-primary/40 hover:shadow-md cursor-pointer";
    }
    if (index === selectedChoice) {
      if (choice.score >= 2) return "bg-hope/10 border-hope";
      if (choice.score === 1) return "bg-warm/10 border-warm";
      return "bg-accent/10 border-accent";
    }
    if (choice.score === 3 && index !== selectedChoice) {
      return "bg-hope/5 border-hope/30 opacity-70";
    }
    return "bg-card border-border opacity-50";
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>상황 {currentIndex + 1} / {scenarios.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + (showFeedback ? 1 : 0)) / scenarios.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
        >
          {/* Scenario Card */}
          <div className="bg-card rounded-3xl p-6 md:p-8 shadow-sm border border-border mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{scenario.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-foreground">{scenario.title}</h2>
                <p className="text-xs text-muted-foreground">{scenario.context}</p>
              </div>
            </div>
            <p className="text-foreground/90 leading-relaxed">{scenario.situation}</p>
          </div>

          {/* Choices */}
          <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4" />
            어떻게 하시겠어요?
          </p>
          <div className="space-y-3">
            {scenario.choices.map((choice, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleSelect(i)}
                className={`w-full text-left rounded-2xl p-4 border-2 transition-all ${getChoiceStyle(i, choice)}`}
              >
                <p className="text-sm font-medium text-foreground">{choice.text}</p>
                {showFeedback && (selectedChoice === i || choice.score === 3) && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs text-muted-foreground mt-2 leading-relaxed"
                  >
                    {choice.feedback}
                  </motion.p>
                )}
                {showFeedback && choice.score === 3 && selectedChoice !== i && (
                  <span className="text-xs text-hope font-medium">✨ 추천 대응</span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Next button */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex justify-end"
            >
              <button
                onClick={handleNext}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-shadow"
              >
                {currentIndex < scenarios.length - 1 ? "다음 상황" : "결과 보기"}
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
