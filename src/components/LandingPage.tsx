import { motion } from "framer-motion";
import { Battery, Heart, Clock, RotateCcw } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

const steps = [
  { icon: "⏰", label: "하루를 따라가며" },
  { icon: "🔋", label: "에너지 변화 체험" },
  { icon: "🌿", label: "회복 행동 선택" },
  { icon: "📋", label: "나만의 루틴 저장" },
];

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md mx-auto w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5"
        >
          <Battery className="w-8 h-8 text-primary" />
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight">
          하루를 지키는 작은 선택
        </h1>
        <p className="text-gradient-warm text-lg font-semibold mb-1">
          당신의 회복 루트
        </p>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          예측 불가능한 우리의 하루,<br />
          작은 선택으로 에너지를 되찾는 연습을 해봐요.
        </p>

        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-xl mb-1.5">
                {s.icon}
              </div>
              <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
              {i < steps.length - 1 && (
                <div className="hidden" /> 
              )}
            </motion.div>
          ))}
        </div>

        {/* Info badges */}
        <div className="flex items-center justify-center gap-3 mb-8 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 bg-card px-3 py-1.5 rounded-full border border-border">
            <Clock className="w-3 h-3" /> 3~5분
          </span>
          <span className="flex items-center gap-1 bg-card px-3 py-1.5 rounded-full border border-border">
            <RotateCcw className="w-3 h-3" /> 재플레이 가능
          </span>
          <span className="flex items-center gap-1 bg-card px-3 py-1.5 rounded-full border border-border">
            <Heart className="w-3 h-3" /> 개인정보 없음
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl text-base font-semibold shadow-lg"
        >
          시작하기
        </motion.button>

        <p className="text-[11px] text-muted-foreground/40 mt-5">
          직장인 생명존중 예방교육
        </p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
