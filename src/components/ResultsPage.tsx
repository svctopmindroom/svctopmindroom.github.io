import { motion } from "framer-motion";
import { getScoreMessage, helpResources } from "@/data/scenarios";
import { RotateCcw, Phone, Heart } from "lucide-react";

interface ResultsPageProps {
  scores: number[];
  onRestart: () => void;
}

const ResultsPage = ({ scores, onRestart }: ResultsPageProps) => {
  const totalScore = scores.reduce((a, b) => a + b, 0);
  const maxScore = scores.length * 3;
  const result = getScoreMessage(totalScore, maxScore);
  const percentage = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        {/* Score Card */}
        <div className="bg-card rounded-3xl p-8 shadow-sm border border-border text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-5xl mb-4"
          >
            {result.emoji}
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{result.title}</h2>
          <p className="text-muted-foreground mb-6">{result.message}</p>

          {/* Score ring */}
          <div className="relative w-28 h-28 mx-auto mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="42" fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - percentage / 100) }}
                transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-foreground">{percentage}점</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{totalScore} / {maxScore}</p>
        </div>

        {/* Key message */}
        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 mb-8">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground mb-1">기억해주세요</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                힘든 감정은 자연스러운 것이에요. 도움을 요청하는 것은 약함이 아니라, 
                자신을 소중히 여기는 <span className="text-primary font-medium">용기 있는 행동</span>입니다.
                당신은 혼자가 아니에요.
              </p>
            </div>
          </div>
        </div>

        {/* Help Resources */}
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary" />
          도움이 필요할 때
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {helpResources.map((resource, i) => (
            <motion.div
              key={resource.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="bg-card rounded-2xl p-4 border border-border"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{resource.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{resource.name}</p>
                  <p className="text-lg font-bold text-primary">{resource.number}</p>
                  <p className="text-xs text-muted-foreground">{resource.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Restart */}
        <div className="text-center">
          <button
            onClick={onRestart}
            className="bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:shadow-md transition-shadow"
          >
            <RotateCcw className="w-4 h-4" />
            다시 해보기
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground/50 mt-8">
          본 교육은 예방 교육 목적으로 제작되었으며, 전문 상담을 대체하지 않습니다.
        </p>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
