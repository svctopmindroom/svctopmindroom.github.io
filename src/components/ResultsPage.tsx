import { useState } from "react";
import { motion } from "framer-motion";
import { getEnergyLabel, helpResources, scenes } from "@/data/scenarios";
import { RotateCcw, Phone, Heart, Send, CheckCircle } from "lucide-react";

interface ResultsPageProps {
  energy: number;
  choices: { sceneId: number; choiceText: string; emoji: string }[];
  onRestart: () => void;
  characterName: string;
}

// --- Constellation component ---
const ConstellationView = ({ 
  choices, characterName 
}: { 
  choices: { sceneId: number; choiceText: string; emoji: string }[];
  characterName: string;
}) => {
  // Determine which scenes had "good" (recover) choices
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

  // Star positions along a path
  const starPositions = scenes.map((s, i) => ({
    x: 15 + (i / (scenes.length - 1)) * 70,
    y: 25 + Math.sin(i * 0.8) * 20 + (i % 2 === 0 ? -5 : 5),
    isGood: goodSceneIds.has(s.id),
    name: s.location.name,
  }));

  return (
    <div className="bg-gradient-to-b from-[hsl(230,40%,15%)] to-[hsl(245,30%,10%)] rounded-2xl p-5 border border-border mb-5 relative overflow-hidden">
      {/* Night sky stars background */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ repeat: Infinity, duration: 2 + Math.random() * 3, delay: Math.random() * 2 }}
        />
      ))}

      <div className="relative z-10">
        {/* SVG constellation */}
        <svg viewBox="0 0 100 70" className="w-full h-40 md:h-52 mb-3">
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
                strokeWidth="0.3"
                strokeOpacity={0.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
              />
            );
          })}
          {/* Stars */}
          {starPositions.map((pos, i) => (
            <motion.g key={i}>
              {pos.isGood && (
                <motion.circle
                  cx={pos.x} cy={pos.y} r="3"
                  fill="hsl(45, 90%, 70%)"
                  opacity={0.3}
                  animate={{ r: [3, 5, 3], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                />
              )}
              <motion.circle
                cx={pos.x} cy={pos.y}
                r={pos.isGood ? 2 : 1}
                fill={pos.isGood ? "hsl(45, 90%, 80%)" : "hsl(200, 30%, 60%)"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
              />
              <text
                x={pos.x} y={pos.y + 6}
                textAnchor="middle"
                fill="hsl(200, 40%, 75%)"
                fontSize="2.5"
                opacity={0.7}
              >
                {pos.name}
              </text>
            </motion.g>
          ))}
        </svg>

        {/* Character at window */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-2xl">🧘</span>
            <div className="relative">
              <div className="bg-background/20 backdrop-blur rounded-xl px-3 py-1.5 text-sm text-white/90 font-medium">
                "오늘 하루도 잘 보냈습니다"
              </div>
              {/* Speech bubble tail */}
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-background/20 rotate-45" />
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-lg font-bold text-[hsl(45,80%,75%)]"
        >
          ✨ {characterName}의 에너지 별자리 ✨
        </motion.p>
        <p className="text-center text-xs text-white/50 mt-1">
          빛나는 별은 회복 행동을 선택한 순간이에요
        </p>
      </div>
    </div>
  );
};

const ResultsPage = ({ energy, choices, onRestart, characterName }: ResultsPageProps) => {
  const result = getEnergyLabel(energy);
  const [routine, setRoutine] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const recoveryChoices = choices.filter((c) => {
    const scene = scenes.find((s) => s.id === c.sceneId);
    if (!scene) return false;
    const choice = scene.choices.find((ch) => ch.text === c.choiceText);
    return choice?.tag === 'recover';
  });

  const handleSubmit = () => {
    if (routine.trim()) setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col px-5 py-8 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Energy Result */}
        <div className="bg-card rounded-2xl p-6 border border-border text-center mb-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-4xl mb-3"
          >
            {result.emoji}
          </motion.div>
          <h2 className="text-xl font-bold text-foreground mb-1">{characterName}의 {result.label}</h2>
          <div className="relative w-24 h-24 mx-auto my-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="42" fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - energy / 100) }}
                transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-foreground">{energy}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">최종 에너지 점수</p>
        </div>

        {/* Recovery choices */}
        {recoveryChoices.length > 0 && (
          <div className="bg-card rounded-2xl p-5 border border-border mb-5">
            <h3 className="text-sm font-bold text-foreground mb-3">🌿 내가 선택한 회복에 도움되는 행동들</h3>
            <div className="space-y-2">
              {recoveryChoices.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                  <span>{c.emoji}</span>
                  <span>{c.choiceText}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom routine */}
        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 mb-5">
          <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-primary" />
            나만의 회복 루틴 작성
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            오늘 배운 것을 바탕으로, 내일부터 실천할 나만의 회복 루틴을 적어보세요.
          </p>
          {!submitted ? (
            <>
              <textarea
                value={routine}
                onChange={(e) => setRoutine(e.target.value)}
                placeholder="예: 출근 전 물 한 잔, 점심 후 3분 호흡, 퇴근 후 알림 끄기..."
                className="w-full bg-background border border-border rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground/50 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                onClick={handleSubmit}
                disabled={!routine.trim()}
                className="mt-3 w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                루틴 저장하기
              </button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background rounded-xl p-4 border border-border"
            >
              <div className="flex items-center gap-2 text-hope font-semibold text-sm mb-2">
                <CheckCircle className="w-4 h-4" />
                루틴이 저장되었어요!
              </div>
              <p className="text-sm text-foreground/80 italic">"{routine}"</p>
            </motion.div>
          )}
        </div>

        {/* Key message */}
        <div className="bg-card rounded-2xl p-5 border border-border mb-5 text-center">
          <p className="text-lg font-bold text-foreground mb-1">
            🌟 매일매일 회복하는 루틴으로 나를 건강하게
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            거창한 변화가 아니어도 괜찮아요.<br />
            작은 선택 하나가 내일의 나를 지켜줍니다.
          </p>
        </div>

        {/* Constellation ending */}
        <ConstellationView choices={choices} characterName={characterName} />

        {/* Help Resources */}
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
          <Phone className="w-4 h-4 text-primary" />
          도움이 필요할 때
        </h3>
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          {helpResources.map((resource, i) => (
            <motion.div
              key={resource.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              className="bg-card rounded-xl p-3 border border-border"
            >
              <span className="text-lg">{resource.icon}</span>
              <p className="text-xs font-semibold text-foreground mt-1">{resource.name}</p>
              <p className="text-sm font-bold text-primary">{resource.number}</p>
              <p className="text-[10px] text-muted-foreground">{resource.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Restart */}
        <button
          onClick={onRestart}
          className="w-full bg-secondary text-secondary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          다시 해보기
        </button>

        <p className="text-center text-[10px] text-muted-foreground/40 mt-5">
          본 교육은 예방 교육 목적이며, 전문 상담을 대체하지 않습니다.
        </p>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
