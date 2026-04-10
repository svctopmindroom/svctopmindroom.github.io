import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CharacterInfo {
  id: string;
  emoji: string;
  label: string;
  name: string;
}

const characters = [
  { id: "m1", emoji: "👨‍💼", label: "직장인 A", gender: "male" },
  { id: "m2", emoji: "👨‍💻", label: "직장인 B", gender: "male" },
  { id: "f1", emoji: "👩‍💼", label: "직장인 C", gender: "female" },
  { id: "f2", emoji: "👩‍💻", label: "직장인 D", gender: "female" },
];

interface CharacterSelectProps {
  onSelect: (character: CharacterInfo) => void;
}

const CharacterSelect = ({ onSelect }: CharacterSelectProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<"pick" | "name">("pick");
  const [charName, setCharName] = useState("");

  const selectedChar = characters.find((c) => c.id === selected);

  const handleConfirmCharacter = () => {
    if (selected) setStep("name");
  };

  const handleConfirmName = () => {
    if (selectedChar && charName.trim()) {
      onSelect({
        id: selectedChar.id,
        emoji: selectedChar.emoji,
        label: selectedChar.label,
        name: charName.trim(),
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10">
      <AnimatePresence mode="wait">
        {step === "pick" ? (
          <motion.div
            key="pick"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-md mx-auto w-full"
          >
            <h2 className="text-xl font-bold text-foreground mb-2">캐릭터를 선택하세요</h2>
            <p className="text-sm text-muted-foreground mb-8">
              오늘 하루를 함께할 캐릭터를 골라주세요
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {characters.map((char) => (
                <motion.button
                  key={char.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelected(char.id)}
                  className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
                    selected === char.id
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <span className="text-5xl">{char.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{char.label}</span>
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleConfirmCharacter}
              disabled={!selected}
              className="w-full bg-primary text-primary-foreground py-4 rounded-2xl text-base font-semibold shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              선택 완료
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-md mx-auto w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-6xl mb-4"
            >
              {selectedChar?.emoji}
            </motion.div>
            <h2 className="text-xl font-bold text-foreground mb-2">이름을 지어주세요</h2>
            <p className="text-sm text-muted-foreground mb-6">
              캐릭터와 함께 하루를 보내봐요
            </p>
            <input
              type="text"
              value={charName}
              onChange={(e) => setCharName(e.target.value)}
              placeholder="이름을 입력하세요"
              maxLength={10}
              className="w-full bg-card border-2 border-border rounded-2xl px-5 py-4 text-center text-lg font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 mb-6"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && charName.trim() && handleConfirmName()}
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleConfirmName}
              disabled={!charName.trim()}
              className="w-full bg-primary text-primary-foreground py-4 rounded-2xl text-base font-semibold shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              시작하기 🚀
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CharacterSelect;
