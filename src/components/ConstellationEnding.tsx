import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { scenes } from "@/data/scenarios";
import { ArrowRight } from "lucide-react";

interface ConstellationEndingProps {
  choices: { sceneId: number; choiceText: string; emoji: string }[];
  characterName: string;
  characterEmoji: string;
  onContinue: () => void;
}

const ConstellationEnding = ({ choices, characterName, characterEmoji, onContinue }: ConstellationEndingProps) => {
  const [showStars, setShowStars] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowStars(true), 800);
    const t2 = setTimeout(() => setShowMessage(true), 2500);
    const t3 = setTimeout(() => setShowButton(true), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const goodSceneIds = new Set(
    choices
      .filter((c) => {
        const scene = scenes.find((s) => s.id === c.sceneId);
        if (!scene) return false;
        const choice = scene.choices.find((ch) => ch.text === c.choiceText);
        return choice?.tag === 'recover';
      })
      .map((c) => c.sceneId)
  );

  const starPositions = scenes.map((s, i) => ({
    x: 12 + (i / (scenes.length - 1)) * 76,
    y: 20 + Math.sin(i * 0.7) * 18 + (i % 2 === 0 ? -4 : 4),
    isGood: goodSceneIds.has(s.id),
    name: s.location.name,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-8 bg-gradient-to-b from-[hsl(230,35%,12%)] to-[hsl(245,30%,8%)] relative overflow-hidden">
      {/* Background twinkling stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white/40 rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{ repeat: Infinity, duration: 2 + Math.random() * 3, delay: Math.random() * 2 }}
        />
      ))}

      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Character at window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-6"
        >
          {/* Window frame */}
          <div className="relative inline-block">
            <div className="bg-[hsl(230,20%,18%)] border-2 border-[hsl(230,20%,30%)] rounded-xl p-6 relative">
              {/* Window panes */}
              <div className="absolute inset-3 border border-[hsl(230,20%,25%)] rounded-lg" />
              <div className="absolute top-3 bottom-3 left-1/2 w-px bg-[hsl(230,20%,25%)]" />
              
              {/* Character doing stretching */}
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="relative z-10"
              >
                <span className="text-5xl">{characterEmoji}</span>
              </motion.div>
            </div>
          </div>

          {/* Speech bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-3 inline-flex items-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-2.5 relative">
              <p className="text-white/90 text-sm font-medium">"오늘 하루도 잘 보냈습니다"</p>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/10 rotate-45" />
            </div>
          </motion.div>
        </motion.div>

        {/* Constellation map */}
        {showStars && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="bg-[hsl(230,30%,10%)]/60 backdrop-blur-sm rounded-2xl p-4 border border-white/10 mb-6"
          >
            <svg viewBox="0 0 100 55" className="w-full h-44 md:h-56">
              {/* Connection lines */}
              {starPositions.map((pos, i) => {
                if (i === 0) return null;
                const prev = starPositions[i - 1];
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={prev.x} y1={prev.y}
                    x2={pos.x} y2={pos.y}
                    stroke="hsl(200, 60%, 70%)"
                    strokeWidth="0.25"
                    strokeOpacity={0.35}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                  />
                );
              })}
              {/* Stars */}
              {starPositions.map((pos, i) => (
                <motion.g key={i}>
                  {pos.isGood && (
                    <motion.circle
                      cx={pos.x} cy={pos.y} r="3.5"
                      fill="hsl(45, 90%, 70%)"
                      opacity={0.25}
                      animate={{ r: [3.5, 5.5, 3.5], opacity: [0.15, 0.45, 0.15] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                    />
                  )}
                  <motion.circle
                    cx={pos.x} cy={pos.y}
                    r={pos.isGood ? 2.2 : 1}
                    fill={pos.isGood ? "hsl(45, 90%, 85%)" : "hsl(200, 30%, 55%)"}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                  />
                  <text
                    x={pos.x} y={pos.y + 5.5}
                    textAnchor="middle"
                    fill="hsl(200, 40%, 75%)"
                    fontSize="2.2"
                    opacity={0.6}
                  >
                    {pos.name}
                  </text>
                </motion.g>
              ))}
            </svg>
          </motion.div>
        )}

        {/* Title */}
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <p className="text-xl font-bold text-[hsl(45,80%,75%)] mb-1">
              ✨ {characterName}의 에너지 별자리 ✨
            </p>
            <p className="text-xs text-white/50">
              빛나는 별은 회복 행동을 선택한 순간이에요
            </p>
          </motion.div>
        )}

        {/* Continue button */}
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onContinue}
            className="w-full bg-primary/90 backdrop-blur text-primary-foreground py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            결과 보기 <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ConstellationEnding;
