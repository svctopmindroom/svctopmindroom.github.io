export interface Choice {
  text: string;
  emoji: string;
  feedback: string;
  energyChange: number; // negative = drain, positive = recover
  tag: 'drain' | 'neutral' | 'recover';
}

export interface Scene {
  id: number;
  title: string;
  icon: string;
  timeLabel: string;
  situation: string;
  subtext: string;
  choices: Choice[];
}

export const scenes: Scene[] = [
  {
    id: 1,
    title: "출근 전 알림",
    icon: "⏰",
    timeLabel: "AM 7:30",
    situation: "눈을 뜨자마자 업무 알림이 쏟아집니다. 오늘도 벌써 메시지가 12개. 마음이 무거워집니다.",
    subtext: "하루의 시작, 첫 선택이 중요해요",
    choices: [
      {
        text: "바로 알림을 열어 확인한다",
        emoji: "📱",
        feedback: "아직 눈도 제대로 못 떴는데 업무 모드로 전환되면 에너지가 빠르게 소진돼요.",
        energyChange: -10,
        tag: 'drain'
      },
      {
        text: "물 한 잔을 먼저 마신다",
        emoji: "💧",
        feedback: "작은 행동이지만 '나를 먼저 챙기겠다'는 신호를 몸에 보내는 거예요. 좋은 시작!",
        energyChange: +5,
        tag: 'recover'
      },
      {
        text: "3번 깊은 호흡을 한다",
        emoji: "🌬️",
        feedback: "호흡 하나로 자율신경이 안정돼요. 하루를 내 속도로 시작하는 연습이에요.",
        energyChange: +5,
        tag: 'recover'
      }
    ]
  },
  {
    id: 2,
    title: "업무평가 기준 변경",
    icon: "📋",
    timeLabel: "AM 9:15",
    situation: "출근하자마자 공지: \"오늘부터 평가 기준이 변경됩니다.\" 이미 기존 기준도 버거웠는데, 더 높아졌습니다.",
    subtext: "예고 없는 변화 앞에서",
    choices: [
      {
        text: "\"알겠습니다\" 하고 다 받아들인다",
        emoji: "😔",
        feedback: "모든 걸 수용하면 자신도 모르게 분노와 무력감이 쌓여요. 감정을 눌러두면 몸이 대신 아파합니다.",
        energyChange: -10,
        tag: 'drain'
      },
      {
        text: "변경된 기준의 우선순위를 확인한다",
        emoji: "🔍",
        feedback: "상황을 파악하려는 태도는 통제감을 되찾는 방법이에요. 모든 걸 한번에 해결할 필요 없어요.",
        energyChange: +2,
        tag: 'recover'
      },
      {
        text: "동료와 느낀 점을 간단히 공유한다",
        emoji: "💬",
        feedback: "\"나만 이렇게 느끼는 건 아니구나\"라는 확인만으로도 마음이 가벼워져요.",
        energyChange: +3,
        tag: 'recover'
      }
    ]
  },
  {
    id: 3,
    title: "에너지 하락",
    icon: "🔋",
    timeLabel: "AM 11:00",
    situation: "오전 내내 쉴 틈 없이 일했습니다. 목이 뻣뻣하고, 눈이 침침하고, 머리가 무겁습니다.",
    subtext: "몸이 보내는 신호를 알아채는 순간",
    choices: [
      {
        text: "\"좀만 더 하면 되니까\" 참는다",
        emoji: "😤",
        feedback: "참는 것이 강한 게 아니에요. 신호를 무시하면 결국 더 큰 소진으로 이어져요.",
        energyChange: -8,
        tag: 'drain'
      },
      {
        text: "앉은 자세를 바꾸고 어깨를 돌린다",
        emoji: "🪑",
        feedback: "몸의 자세를 바꾸면 생각의 흐름도 바뀌어요. 30초만 투자해도 달라집니다.",
        energyChange: +3,
        tag: 'recover'
      },
      {
        text: "자리에서 일어나 잠시 걷는다",
        emoji: "🚶",
        feedback: "움직임은 가장 빠른 기분 전환법이에요. 화장실이라도 다녀오는 것만으로 충분해요.",
        energyChange: +5,
        tag: 'recover'
      }
    ]
  },
  {
    id: 4,
    title: "동료가 출근하지 않음",
    icon: "👤",
    timeLabel: "PM 1:00",
    situation: "같은 팀 동료가 오늘 갑자기 결근했습니다. 그 몫이 고스란히 나에게 왔습니다. 화가 나다가도 걱정됩니다.",
    subtext: "부족한 인력, 늘어나는 부담",
    choices: [
      {
        text: "\"또야\" 하며 감정을 무시한다",
        emoji: "😑",
        feedback: "반복되는 상황에 무감각해지는 것은 위험 신호예요. 감정은 억누른다고 사라지지 않아요.",
        energyChange: -8,
        tag: 'drain'
      },
      {
        text: "동료에게 짧은 안부 메시지를 보낸다",
        emoji: "💌",
        feedback: "\"괜찮아?\" 한마디가 누군가에겐 큰 위로가 됩니다. 관계가 에너지가 되는 순간이에요.",
        energyChange: +3,
        tag: 'recover'
      },
      {
        text: "오늘 할 수 있는 만큼만 정한다",
        emoji: "📝",
        feedback: "완벽하게 다 하려 하면 무너져요. '오늘은 여기까지'라는 선을 긋는 것도 능력이에요.",
        energyChange: +4,
        tag: 'recover'
      }
    ]
  },
  {
    id: 5,
    title: "목표 미달성",
    icon: "📊",
    timeLabel: "PM 2:30",
    situation: "오후 중간 점검. 오늘 목표의 60%밖에 못 했습니다. \"나는 왜 이것밖에 못 하지\"라는 생각이 올라옵니다.",
    subtext: "자기 비난이 시작될 때",
    choices: [
      {
        text: "자책하며 더 빠르게 일한다",
        emoji: "😰",
        feedback: "자책은 동기부여가 아니라 에너지 도둑이에요. 속도를 높여도 마음은 더 지칩니다.",
        energyChange: -10,
        tag: 'drain'
      },
      {
        text: "지금 느끼는 감정에 이름을 붙인다",
        emoji: "🏷️",
        feedback: "\"아, 지금 좌절감이구나.\" 감정에 이름을 붙이면 뇌가 진정돼요. 과학적으로 검증된 방법이에요.",
        energyChange: +4,
        tag: 'recover'
      },
      {
        text: "오늘 기대치를 현실적으로 조정한다",
        emoji: "🎯",
        feedback: "100%가 아니어도 괜찮아요. 80%의 나도, 60%의 나도 충분히 잘하고 있어요.",
        energyChange: +3,
        tag: 'recover'
      }
    ]
  },
  {
    id: 6,
    title: "3분 회복 타임",
    icon: "⏱️",
    timeLabel: "PM 3:00",
    situation: "잠깐 쉴 수 있는 3분이 생겼습니다. 이 시간을 어떻게 쓸까요?",
    subtext: "작은 쉼이 큰 차이를 만들어요",
    choices: [
      {
        text: "4-7-8 호흡법 (들숨4초-참기7초-날숨8초)",
        emoji: "🫁",
        feedback: "이 호흡법은 부교감신경을 활성화해 빠르게 안정을 찾게 해줘요. 2~3회면 충분합니다.",
        energyChange: +5,
        tag: 'recover'
      },
      {
        text: "따뜻한 물을 천천히 마신다",
        emoji: "☕",
        feedback: "따뜻한 물은 몸의 긴장을 풀어줘요. 마시는 동안 잠시 멈추는 것 자체가 회복이에요.",
        energyChange: +4,
        tag: 'recover'
      },
      {
        text: "목·어깨 스트레칭을 한다",
        emoji: "🙆",
        feedback: "감정노동은 몸에 긴장으로 쌓여요. 스트레칭으로 그 긴장을 물리적으로 풀어줄 수 있어요.",
        energyChange: +5,
        tag: 'recover'
      }
    ]
  },
  {
    id: 7,
    title: "자기 대화",
    icon: "💭",
    timeLabel: "PM 4:00",
    situation: "\"이 일은 나 아니면 안 돼\", \"좀 더 잘해야 하는데\"... 머릿속에서 끊임없이 목소리가 들립니다.",
    subtext: "내 안의 목소리, 어떤 말을 선택할까요?",
    choices: [
      {
        text: "\"더 열심히 해야지\" 하며 과몰입한다",
        emoji: "🌀",
        feedback: "과몰입은 헌신이 아니라 소진의 지름길이에요. 나를 갈아넣는 건 프로가 아닙니다.",
        energyChange: -10,
        tag: 'drain'
      },
      {
        text: "\"지금까지 잘 버텼어\" 하고 인정한다",
        emoji: "🤗",
        feedback: "자기 인정은 가장 강력한 회복 도구예요. 완벽하지 않아도 충분히 잘하고 있어요.",
        energyChange: +5,
        tag: 'recover'
      },
      {
        text: "\"여기까지가 내 영역이야\" 경계를 긋는다",
        emoji: "🛡️",
        feedback: "건강한 경계는 이기심이 아니에요. 나를 지켜야 남도 도울 수 있습니다.",
        energyChange: +4,
        tag: 'recover'
      }
    ]
  },
  {
    id: 8,
    title: "동료와 연결",
    icon: "🤝",
    timeLabel: "PM 5:00",
    situation: "옆자리 동료도 지쳐 보입니다. 말을 건네고 싶은데, 뭐라고 해야 할지 모르겠습니다.",
    subtext: "따뜻한 한마디의 힘",
    choices: [
      {
        text: "\"오늘 고생 많았어, 수고했어\"",
        emoji: "👋",
        feedback: "인정과 위로의 한마디는 서로에게 에너지가 돼요. 말을 건넨 당신도 따뜻해집니다.",
        energyChange: +4,
        tag: 'recover'
      },
      {
        text: "\"힘들면 말해, 같이 방법 찾아보자\"",
        emoji: "🫂",
        feedback: "혼자가 아니라는 걸 느끼게 해주는 말이에요. 해결보다 연결이 먼저입니다.",
        energyChange: +5,
        tag: 'recover'
      },
      {
        text: "\"잠깐 나가서 바람 쐬자\"",
        emoji: "🌿",
        feedback: "함께하는 휴식은 혼자보다 두 배의 회복을 줘요. 관계 속에서 쉬는 법을 배우는 거예요.",
        energyChange: +5,
        tag: 'recover'
      }
    ]
  },
  {
    id: 9,
    title: "퇴근 루틴",
    icon: "🌙",
    timeLabel: "PM 6:30",
    situation: "드디어 퇴근. 하지만 머릿속은 아직 사무실에 있습니다. 업무 생각이 계속 맴돕니다.",
    subtext: "일과 나를 분리하는 시간",
    choices: [
      {
        text: "업무 알림을 모두 끈다",
        emoji: "🔕",
        feedback: "알림을 끄는 건 무책임한 게 아니에요. 퇴근 후의 나는 '직원'이 아니라 '나'입니다.",
        energyChange: +4,
        tag: 'recover'
      },
      {
        text: "샤워 후 편한 옷으로 갈아입는다",
        emoji: "🚿",
        feedback: "물리적으로 '모드 전환'을 하면 마음도 따라와요. 의식적인 전환 루틴이 중요해요.",
        energyChange: +4,
        tag: 'recover'
      },
      {
        text: "오늘 감정을 한 줄로 기록한다",
        emoji: "📝",
        feedback: "\"오늘은 지쳤다.\" 이 한 줄이 감정을 정리하고, 내일을 준비하게 해줘요.",
        energyChange: +5,
        tag: 'recover'
      },
      {
        text: "가벼운 운동이나 산책을 한다",
        emoji: "🏃",
        feedback: "몸을 움직이면 스트레스 호르몬이 줄어들어요. 10분이면 충분합니다.",
        energyChange: +5,
        tag: 'recover'
      }
    ]
  },
  {
    id: 10,
    title: "내일의 약속",
    icon: "🌅",
    timeLabel: "PM 9:00",
    situation: "하루를 마무리하며, 내일을 위한 최소한의 회복 행동 하나를 정해봅니다.",
    subtext: "거창하지 않아도 돼요. 하나면 충분해요.",
    choices: [
      {
        text: "아침에 물 한 잔 마시기",
        emoji: "💧",
        feedback: "가장 작은 시작이 가장 오래 갑니다. 물 한 잔으로 하루를 여는 연습을 해보세요.",
        energyChange: +3,
        tag: 'recover'
      },
      {
        text: "점심시간에 3분 호흡하기",
        emoji: "🌬️",
        feedback: "하루 중간에 멈추는 연습. 3분이 당신의 오후를 바꿀 수 있어요.",
        energyChange: +3,
        tag: 'recover'
      },
      {
        text: "퇴근 후 알림 끄기",
        emoji: "🔕",
        feedback: "퇴근 후의 시간은 온전히 나의 것. 이 경계를 지키는 것이 내일의 에너지예요.",
        energyChange: +3,
        tag: 'recover'
      }
    ]
  }
];

export const getEnergyLabel = (energy: number): { label: string; emoji: string; color: string } => {
  if (energy >= 80) return { label: "충전 완료", emoji: "✨", color: "hope" };
  if (energy >= 60) return { label: "안정적", emoji: "💚", color: "primary" };
  if (energy >= 40) return { label: "주의 필요", emoji: "🟡", color: "warm" };
  if (energy >= 20) return { label: "위험 구간", emoji: "🟠", color: "accent" };
  return { label: "긴급 충전 필요", emoji: "🔴", color: "destructive" };
};

export const helpResources = [
  { name: "정신건강 위기상담 전화", number: "1393", description: "24시간 무료 상담", icon: "📞" },
  { name: "근로자 건강센터", number: "1588-6497", description: "직장인 심리상담", icon: "🏥" },
  { name: "정신건강복지센터", number: "1577-0199", description: "지역 정신건강 서비스", icon: "🌿" },
  { name: "자살예방 상담전화", number: "109", description: "생명의 전화 24시간", icon: "💚" },
];
