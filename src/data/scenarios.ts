export interface Choice {
  text: string;
  feedback: string;
  score: number; // 0-3: 0=harmful, 1=poor, 2=good, 3=best
  category: 'self-care' | 'empathy' | 'boundary' | 'help-seeking';
}

export interface Scenario {
  id: number;
  title: string;
  icon: string;
  situation: string;
  context: string;
  choices: Choice[];
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "악성 민원 대응",
    icon: "📞",
    situation: "오늘 하루 종일 욕설과 인신공격을 하는 고객 전화를 받았습니다. 퇴근 후에도 그 말들이 머릿속에서 떠나지 않고, 가슴이 답답합니다.",
    context: "감정노동 후 정서적 회복이 필요한 상황",
    choices: [
      {
        text: "\"나는 괜찮아\"라고 스스로에게 말하며 참는다",
        feedback: "감정을 억누르면 오히려 스트레스가 쌓입니다. 힘든 감정을 인정하는 것이 회복의 첫 걸음이에요.",
        score: 1,
        category: 'self-care'
      },
      {
        text: "믿을 수 있는 동료에게 오늘 있었던 일을 이야기한다",
        feedback: "훌륭한 선택이에요! 감정을 나누는 것은 가장 효과적인 스트레스 해소법 중 하나입니다. 혼자 감당하지 않아도 됩니다.",
        score: 3,
        category: 'help-seeking'
      },
      {
        text: "고객에게 화가 나서 다음 전화부터 냉담하게 응대한다",
        feedback: "감정이 상한 것은 당연하지만, 이런 대응은 추가적인 갈등을 만들 수 있어요. 자신의 감정을 먼저 돌봐주세요.",
        score: 0,
        category: 'boundary'
      },
      {
        text: "퇴근 후 좋아하는 활동(산책, 음악 등)으로 기분을 전환한다",
        feedback: "좋은 방법이에요! 자기만의 회복 루틴을 갖는 것은 감정노동에서 벗어나는 데 큰 도움이 됩니다.",
        score: 2,
        category: 'self-care'
      }
    ]
  },
  {
    id: 2,
    title: "번아웃 위기",
    icon: "🔥",
    situation: "최근 몇 주 동안 출근이 너무 두렵고, 아무것도 하기 싫습니다. 업무 중 갑자기 눈물이 나기도 합니다. 밤에 잠도 잘 오지 않습니다.",
    context: "번아웃과 우울 증상이 나타나는 상황",
    choices: [
      {
        text: "\"다른 사람들도 다 이렇게 힘들겠지\"라며 견딘다",
        feedback: "모든 사람이 같은 강도로 힘든 것은 아니에요. 지금 느끼는 고통은 진지하게 다뤄져야 합니다. 도움을 요청해도 괜찮아요.",
        score: 0,
        category: 'self-care'
      },
      {
        text: "상사에게 상담을 요청하고 업무 조정을 논의한다",
        feedback: "용기 있는 선택이에요! 자신의 한계를 인정하고 도움을 요청하는 것은 강함의 표시입니다.",
        score: 3,
        category: 'help-seeking'
      },
      {
        text: "회사 EAP(직원지원프로그램)나 전문 상담을 이용한다",
        feedback: "매우 좋은 선택이에요! 전문가의 도움을 받는 것은 빠른 회복의 지름길입니다. 혼자 해결할 필요 없어요.",
        score: 3,
        category: 'help-seeking'
      },
      {
        text: "커피와 에너지드링크로 버틴다",
        feedback: "일시적으로는 효과가 있을 수 있지만, 근본적인 해결이 되지 않아요. 몸과 마음 모두 쉬어야 할 때입니다.",
        score: 0,
        category: 'self-care'
      }
    ]
  },
  {
    id: 3,
    title: "동료의 위기 신호",
    icon: "👥",
    situation: "평소 밝던 동료가 최근 \"이렇게 사는 게 무슨 의미가 있나\"라는 말을 자주 합니다. 점심도 혼자 먹고, 업무 중 자주 멍하니 있는 모습이 보입니다.",
    context: "동료의 위기 신호를 발견한 상황",
    choices: [
      {
        text: "개인적인 일이니까 모른 척 한다",
        feedback: "이런 신호를 무시하면 위험할 수 있어요. 관심을 표현하는 것만으로도 큰 힘이 될 수 있습니다.",
        score: 0,
        category: 'empathy'
      },
      {
        text: "조용한 곳에서 \"요즘 많이 힘들어 보여서 걱정돼\"라고 말을 건넨다",
        feedback: "최고의 선택이에요! 진심 어린 관심의 한마디가 누군가의 생명을 구할 수 있습니다. '걱정된다'는 표현이 핵심이에요.",
        score: 3,
        category: 'empathy'
      },
      {
        text: "\"힘내! 다 잘 될 거야\"라고 격려한다",
        feedback: "선한 의도지만, 힘든 사람에게 '힘내라'는 말은 오히려 부담이 될 수 있어요. 경청과 공감이 더 효과적입니다.",
        score: 1,
        category: 'empathy'
      },
      {
        text: "팀장이나 사내 상담사에게 동료의 상태를 알린다",
        feedback: "좋은 판단이에요! 전문가의 개입이 필요한 상황일 수 있습니다. 혼자 감당하려 하지 않는 것도 중요해요.",
        score: 2,
        category: 'help-seeking'
      }
    ]
  },
  {
    id: 4,
    title: "자기 돌봄의 시간",
    icon: "🌿",
    situation: "연속 야근과 감정적으로 힘든 통화 후, 주말에도 쉬지 못하고 불안감이 계속됩니다. \"나는 쓸모없는 사람\"이라는 생각이 들기 시작합니다.",
    context: "자존감 저하와 불안이 심화되는 상황",
    choices: [
      {
        text: "혼자서 술이나 게임으로 시간을 보낸다",
        feedback: "일시적 회피는 장기적으로 상황을 악화시킬 수 있어요. 건강한 방식으로 자신을 돌봐주세요.",
        score: 0,
        category: 'self-care'
      },
      {
        text: "정신건강 위기상담 전화(1393)에 전화한다",
        feedback: "매우 용감한 선택이에요! 전문 상담원이 24시간 대기하고 있습니다. 도움을 요청하는 것은 강한 사람만이 할 수 있는 일이에요.",
        score: 3,
        category: 'help-seeking'
      },
      {
        text: "감정일기를 쓰며 자신의 마음 상태를 정리해본다",
        feedback: "좋은 방법이에요! 글쓰기는 복잡한 감정을 정리하고 자기 인식을 높이는 데 효과적입니다.",
        score: 2,
        category: 'self-care'
      },
      {
        text: "가족이나 친한 친구에게 솔직하게 힘든 마음을 말한다",
        feedback: "훌륭해요! 사랑하는 사람들과 연결되는 것은 가장 강력한 보호 요인 중 하나입니다.",
        score: 3,
        category: 'empathy'
      }
    ]
  }
];

export const getScoreMessage = (totalScore: number, maxScore: number): { title: string; message: string; emoji: string } => {
  const percentage = (totalScore / maxScore) * 100;
  
  if (percentage >= 80) {
    return {
      title: "마음 돌봄 전문가! 🌟",
      message: "당신은 자신과 동료의 마음을 잘 돌볼 줄 아는 사람이에요. 이 따뜻한 마음을 주변에 계속 나눠주세요.",
      emoji: "🌟"
    };
  } else if (percentage >= 60) {
    return {
      title: "따뜻한 동반자 💚",
      message: "좋은 방향으로 가고 있어요! 조금 더 적극적으로 도움을 요청하고, 주변을 살피는 연습을 해보세요.",
      emoji: "💚"
    };
  } else if (percentage >= 40) {
    return {
      title: "성장하는 중 🌱",
      message: "힘든 상황에서 어떻게 대처해야 할지 더 알아가는 과정에 있어요. 오늘 배운 것들을 기억해주세요.",
      emoji: "🌱"
    };
  } else {
    return {
      title: "첫 걸음을 뗐어요 🤝",
      message: "감정을 다루는 것은 배울 수 있는 기술이에요. 힘들 때 도움을 요청하는 것은 부끄러운 일이 아닙니다.",
      emoji: "🤝"
    };
  }
};

export const helpResources = [
  { name: "정신건강 위기상담 전화", number: "1393", description: "24시간 무료 상담", icon: "📞" },
  { name: "자살예방 상담전화", number: "1393", description: "생명의 전화", icon: "💚" },
  { name: "근로자 건강센터", number: "1588-6497", description: "직장인 심리상담", icon: "🏥" },
  { name: "정신건강복지센터", number: "1577-0199", description: "지역 정신건강 서비스", icon: "🌿" },
];
