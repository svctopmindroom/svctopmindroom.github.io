import { motion } from "framer-motion";
import { Heart, Shield, Users, Phone } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

const features = [
  { icon: Heart, label: "자기 돌봄", desc: "나를 먼저 챙기는 법" },
  { icon: Users, label: "동료 돌봄", desc: "옆 사람의 신호 읽기" },
  { icon: Shield, label: "위기 대처", desc: "도움을 요청하는 용기" },
  { icon: Phone, label: "도움 자원", desc: "언제든 연결되는 곳" },
];

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
        >
          <span className="text-4xl">🌿</span>
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          마음 한 켠,{" "}
          <span className="text-gradient-warm">쉼표를 찍다</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-2">
          콜센터 직원을 위한 생명존중 예방교육
        </p>
        <p className="text-muted-foreground/70 text-sm mb-10">
          4개의 상황을 통해 나와 동료의 마음을 돌보는 법을 배워봅니다
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-card rounded-2xl p-4 shadow-sm border border-border"
            >
              <f.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">{f.label}</p>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          시작하기
        </motion.button>

        <p className="text-xs text-muted-foreground/50 mt-6">
          소요시간: 약 5~10분 | 개인정보 수집 없음
        </p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
