import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scenes, type Choice } from "@/data/scenarios";
import { Zap, ArrowRight, ChevronRight } from "lucide-react";

interface ScenarioGameProps {
  onComplete: (energy: number, choices: { sceneId: number; choiceText: string; emoji: string }[]) => void;
}

// --- Character Component ---
const Character = ({ action, energy }: { action: string; energy: number }) => {
  const shoulderDrop = energy < 30 ? 4 : energy < 50 ? 2 : 0;
  
  const getCharacterEmoji = () => {
    switch (action) {
      case 'sitting': return '🧑‍💻';
      case 'typing': return '⌨️';
      case 'stretching': return '🙆';
      case 'talking': return '🗣️';
      case 'walking': return '🚶';
      case 'resting': return '😌';
      default: return '🧍';
    }
  };

  return (
    <motion.div
      className="relative flex flex-col items-center"
      animate={{ y: shoulderDrop }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-4xl md:text-5xl"
        animate={
          action === 'walking' ? { x: [0, 3, 0, -3, 0] } :
          action === 'typing' ? { y: [0, -2, 0] } :
          action === 'stretching' ? { scaleY: [1, 1.1, 1], y: [0, -5, 0] } :
          action === 'talking' ? { rotate: [0, 2, -2, 0] } :
          {}
        }
        transition={{ repeat: Infinity, duration: action === 'walking' ? 0.8 : 1.5 }}
      >
        {getCharacterEmoji()}
      </motion.div>
      {/* Energy indicator under character */}
      <div className="mt-1 w-10 h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            energy >= 60 ? 'bg-hope' : energy >= 35 ? 'bg-warm' : 'bg-accent'
          }`}
          animate={{ width: `${Math.max(5, energy)}%` }}
        />
      </div>
    </motion.div>
  );
};

// --- World Location ---
const WorldLocation = ({ 
  emoji, name, isActive, isPast, index 
}: { 
  emoji: string; name: string; isActive: boolean; isPast: boolean; index: number;
}) => (
  <div className={`flex flex-col items-center transition-all duration-500 ${
    isActive ? 'scale-110 opacity-100' : isPast ? 'opacity-50 scale-90' : 'opacity-30 scale-90'
  }`}>
    <div className={`text-3xl md:text-4xl mb-1 ${isActive ? 'animate-bounce' : ''}`}>
      {emoji}
    </div>
    <span className={`text-[10px] font-medium whitespace-nowrap ${
      isActive ? 'text-foreground' : 'text-muted-foreground'
    }`}>
      {name}
    </span>
  </div>
);

// --- Background gradient based on time ---
const getTimeGradient = (bgTime: string, energy: number) => {
  const dimFactor = Math.max(0.4, energy / 100);
  const baseGradients: Record<string, string> = {
    morning: `linear-gradient(180deg, hsl(200 60% ${70 * dimFactor}%) 0%, hsl(40 50% ${90 * dimFactor}%) 100%)`,
    midmorning: `linear-gradient(180deg, hsl(200 50% ${65 * dimFactor}%) 0%, hsl(40 40% ${85 * dimFactor}%) 100%)`,
    noon: `linear-gradient(180deg, hsl(200 40% ${60 * dimFactor}%) 0%, hsl(35 45% ${80 * dimFactor}%) 100%)`,
    afternoon: `linear-gradient(180deg, hsl(25 50% ${65 * dimFactor}%) 0%, hsl(35 40% ${80 * dimFactor}%) 100%)`,
    evening: `linear-gradient(180deg, hsl(25 40% ${50 * dimFactor}%) 0%, hsl(220 30% ${40 * dimFactor}%) 100%)`,
    night: `linear-gradient(180deg, hsl(230 30% ${25 * dimFactor}%) 0%, hsl(240 25% ${15 * dimFactor}%) 100%)`,
  };
  return baseGradients[bgTime] || baseGradients.morning;
};

// --- World buildings between locations ---
const worldElements = ['🏠', '🌳', '🚗', '🏢', '🌳', '🖥️', '💻', '🍽️', '🪑', '📊', '☕', '💭', '🤝', '🌳', '🚶', '🏠'];

// --- Energy Bar ---
const EnergyBar = ({ energy }: { energy: number }) => (
  <div className="flex items-center gap-2 w-full">
    <Zap className="w-4 h-4 text-warm flex-shrink-0" />
    <div className="flex-1 h-2.5 bg-background/30 rounded-full overflow-hidden backdrop-blur-sm">
      <motion.div
        className={`h-full rounded-full ${
          energy >= 60 ? 'bg-hope' : energy >= 35 ? 'bg-warm' : 'bg-accent'
        }`}
        animate={{ width: `${Math.max(0, Math.min(100, energy))}%` }}
        transition={{ duration: 0.6 }}
      />
    </div>
    <span className="text-xs font-bold text-foreground/90 w-7 text-right">{energy}</span>
  </div>
);

const ScenarioGame = ({ onComplete }: ScenarioGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [energy, setEnergy] = useState(50);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [energyDelta, setEnergyDelta] = useState<number | null>(null);
  const [userChoices, setUserChoices] = useState<{ sceneId: number; choiceText: string; emoji: string }[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showScene, setShowScene] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scene = scenes[currentIndex];

  // Auto-scroll to current position and show scene
  useEffect(() => {
    setIsTransitioning(true);
    setShowScene(false);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setShowScene(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleSelect = useCallback((choiceIndex: number) => {
    if (showFeedback) return;
    const choice = scene.choices[choiceIndex];
    setSelectedChoice(choiceIndex);
    setEnergyDelta(choice.energyChange);
    setEnergy(prev => Math.max(0, Math.min(100, prev + choice.energyChange)));
    setShowFeedback(true);
    setUserChoices(prev => [...prev, { sceneId: scene.id, choiceText: choice.text, emoji: choice.emoji }]);
  }, [showFeedback, scene]);

  const handleNext = useCallback(() => {
    if (currentIndex < scenes.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
      setEnergyDelta(null);
    } else {
      onComplete(energy, userChoices);
    }
  }, [currentIndex, energy, userChoices, onComplete]);

  const getChoiceStyle = (index: number, choice: Choice) => {
    if (!showFeedback) {
      return "bg-background/60 backdrop-blur border-background/80 hover:border-primary/40 hover:bg-background/80 cursor-pointer";
    }
    if (index === selectedChoice) {
      if (choice.tag === 'recover') return "bg-hope/15 border-hope/60 backdrop-blur";
      if (choice.tag === 'neutral') return "bg-warm/15 border-warm/60 backdrop-blur";
      return "bg-accent/15 border-accent/60 backdrop-blur";
    }
    return "bg-background/30 border-background/40 opacity-40 backdrop-blur";
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden transition-all duration-1000"
      style={{ background: getTimeGradient(scene.location.bgTime, energy) }}
    >
      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 pb-2 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between text-[11px] text-foreground/70 mb-1.5">
            <span className="font-semibold">{scene.timeLabel} · {scene.location.name}</span>
            <span>{currentIndex + 1} / {scenes.length}</span>
          </div>
          <EnergyBar energy={energy} />
          {/* Progress track */}
          <div className="flex gap-0.5 mt-2">
            {scenes.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  i < currentIndex ? "bg-primary" : i === currentIndex ? "bg-primary/70" : "bg-foreground/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable world view */}
      <div className="flex-1 flex flex-col pt-20 pb-4">
        {/* World panorama */}
        <div className="relative h-28 md:h-36 overflow-hidden" ref={scrollRef}>
          <div className="absolute inset-0 flex items-end">
            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-foreground/5 to-transparent" />
            
            {/* Scrolling world content */}
            <motion.div
              className="flex items-end gap-6 md:gap-8 px-8 pb-3 w-full justify-center"
              animate={{ x: `${-currentIndex * 12}%` }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {scenes.map((s, i) => (
                <div key={s.id} className="flex flex-col items-center relative min-w-[60px]">
                  {i === currentIndex && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-1"
                    >
                      <Character action={s.location.characterAction} energy={energy} />
                    </motion.div>
                  )}
                  <WorldLocation
                    emoji={s.location.emoji}
                    name={s.location.name}
                    isActive={i === currentIndex}
                    isPast={i < currentIndex}
                    index={i}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scene card */}
        <div className="flex-1 px-4 max-w-lg mx-auto w-full">
          <AnimatePresence mode="wait">
            {showScene && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Scene description */}
                <div className="bg-background/70 backdrop-blur-md rounded-2xl p-4 border border-background/80 mb-3 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{scene.icon}</span>
                    <div>
                      <h2 className="text-sm font-bold text-foreground">{scene.title}</h2>
                      <p className="text-[10px] text-muted-foreground">{scene.subtext}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed">{scene.situation}</p>
                </div>

                {/* Choices */}
                <div className="space-y-2">
                  {scene.choices.map((choice, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      onClick={() => handleSelect(i)}
                      className={`w-full text-left rounded-xl p-3 border-2 transition-all ${getChoiceStyle(i, choice)}`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg mt-0.5">{choice.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{choice.text}</p>
                          {showFeedback && i === selectedChoice && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="mt-1.5 text-xs text-muted-foreground leading-relaxed"
                            >
                              {choice.feedback}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Energy delta */}
                {showFeedback && energyDelta !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`mt-3 text-center text-sm font-bold ${
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
                    className="mt-3 pb-4"
                  >
                    <button
                      onClick={handleNext}
                      className="w-full bg-primary/90 backdrop-blur text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
                    >
                      {currentIndex < scenes.length - 1 ? (
                        <>다음 장소로 이동 <ChevronRight className="w-4 h-4" /></>
                      ) : (
                        <>결과 보기 <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Transition state */}
          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10"
            >
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="text-3xl mb-3"
              >
                🚶
              </motion.div>
              <p className="text-sm text-foreground/60 font-medium">
                {scene.location.name}(으)로 이동 중...
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll hint on first scene */}
      {currentIndex === 0 && !showScene && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 text-foreground/40 text-xs flex items-center gap-1"
        >
          이동 중 <ChevronRight className="w-3 h-3" />
        </motion.div>
      )}
    </div>
  );
};

export default ScenarioGame;
