export interface Choice {
  text: string;
  emoji: string;
  feedback: string;
  energyChange: number;
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
  location: {
    name: string;
    emoji: string;
    positionPercent: number;
    bgTime: 'morning' | 'midmorning' | 'noon' | 'afternoon' | 'evening' | 'night';
    characterAction: 'standing' | 'walking' | 'sitting' | 'typing' | 'stretching' | 'talking' | 'resting';
  };
}

export const scenes: Scene[] = [
  {
    id: 1,
    title: "업무 전 쪽지들",
    icon: "📋",
    timeLabel: "AM 8:30",
    situation: "모니터 켜자마자 쪽지 5개가 쌓여있음. 아직 커피도 못 마셨는데.",
    subtext: "하루의 시작, 나를 먼저 챙기기",
    location: { name: "내 자리", emoji: "🖥️", positionPercent: 10, bgTime: 'morning', characterAction: 'sitting' },
    choices: [
      { text: "바로 쪽지 열어 확인", emoji: "📱", feedback: "에너지 -10, 긴장 상승. 눈도 안 떴는데 바로 업무 모드 들어가면 하루가 길어져요.", energyChange: -10, tag: 'drain' },
      { text: "물 한 잔 먼저 마시기", emoji: "💧", feedback: "에너지 +5, 긴장 완화. 물 한 잔이 별거 아닌 것 같지만, '나 먼저'라는 신호예요.", energyChange: +5, tag: 'recover' },
      { text: "숨 좀 고르고 시작", emoji: "🌬️", feedback: "에너지 +5, 마음 안정. 10초만 멈춰도 하루를 내 속도로 시작할 수 있어요.", energyChange: +5, tag: 'recover' },
    ]
  },
  {
    id: 2,
    title: "만족도 제외로 변경",
    icon: "📊",
    timeLabel: "AM 10:30",
    situation: "방금 중요했던 일이 뒤로 밀림. 공들인 게 허무해지는 순간.",
    subtext: "예고 없는 변화 앞에서",
    location: { name: "사무실", emoji: "💻", positionPercent: 22, bgTime: 'midmorning', characterAction: 'typing' },
    choices: [
      { text: "어차피 다 해야지", emoji: "😔", feedback: "에너지 -10, 무력감 상승. 다 받아들이면 속에서 쌓여요. 그게 결국 번아웃으로 가요.", energyChange: -10, tag: 'drain' },
      { text: "우선순위 다시 확인", emoji: "🔍", feedback: "에너지 +3, 통제감 회복. 바뀐 건 바뀐 거고, 내가 할 수 있는 건 정리하는 거예요.", energyChange: +3, tag: 'recover' },
      { text: "실장님에게 챙겨야 할 것 물어봄", emoji: "💬", feedback: "에너지 +4, 연결감 상승. 혼자 끙끙대지 않고 확인하는 것도 일 잘하는 거예요.", energyChange: +4, tag: 'recover' },
    ]
  },
  {
    id: 3,
    title: "몸이 보내는 신호",
    icon: "🔋",
    timeLabel: "AM 11:50",
    situation: "어깨 굳고 머리 무거움. 점심 전인데 벌써 지침.",
    subtext: "몸의 신호를 알아채는 순간",
    location: { name: "사무실", emoji: "💻", positionPercent: 32, bgTime: 'midmorning', characterAction: 'typing' },
    choices: [
      { text: "참고 계속", emoji: "😤", feedback: "에너지 -8, 피로 누적. 참는 게 강한 게 아니에요. 무시하면 오후에 더 힘들어져요.", energyChange: -8, tag: 'drain' },
      { text: "자세 좀 바꿈", emoji: "🪑", feedback: "에너지 +3, 긴장 완화. 허리 펴고 어깨 한 번 돌리면 30초만에 달라져요.", energyChange: +3, tag: 'recover' },
      { text: "금새 화장실 다녀옴", emoji: "🚶", feedback: "에너지 +5, 기분 전환. 자리에서 일어나는 것만으로도 머리가 환기돼요.", energyChange: +5, tag: 'recover' },
    ]
  },
  {
    id: 4,
    title: "빈 자리",
    icon: "👤",
    timeLabel: "PM 1:00",
    situation: "동료가 출근하지 않음. 그 몫이 슬그머니 나한테 오는 느낌.",
    subtext: "부족한 인력, 늘어나는 부담",
    location: { name: "동료 자리", emoji: "🪑", positionPercent: 42, bgTime: 'noon', characterAction: 'standing' },
    choices: [
      { text: "신경 쓰지 않기", emoji: "😑", feedback: "에너지 -8, 감정 마비. 반복되면 무감각해지고, 그게 위험 신호예요.", energyChange: -8, tag: 'drain' },
      { text: "옆자리한테 안부", emoji: "💌", feedback: "에너지 +3, 연결감 상승. '괜찮아?' 한마디가 서로에게 위로가 돼요.", energyChange: +3, tag: 'recover' },
      { text: "성실하게 일하는 스스로를 뿌듯해함", emoji: "💪", feedback: "에너지 +4, 자존감 회복. 묵묵히 해내는 나, 충분히 대단해요.", energyChange: +4, tag: 'recover' },
    ]
  },
  {
    id: 5,
    title: "이렇게까지?",
    icon: "📉",
    timeLabel: "PM 2:30",
    situation: "많이 했는데 충분치 않다는 느낌. '나는 왜 이것밖에 못 하지' 올라옴.",
    subtext: "자기 비난이 시작될 때",
    location: { name: "내 자리", emoji: "📊", positionPercent: 52, bgTime: 'afternoon', characterAction: 'sitting' },
    choices: [
      { text: "생각 말기", emoji: "😰", feedback: "에너지 -10, 자책 심화. 억누르면 나중에 더 크게 터져요.", energyChange: -10, tag: 'drain' },
      { text: "짜증난다, 이름 붙임", emoji: "🏷️", feedback: "에너지 +4, 감정 정리. '아, 짜증이구나' 하면 뇌가 한 발 물러서요.", energyChange: +4, tag: 'recover' },
      { text: "포기 안 하고 해냈던 순간 떠올림", emoji: "🎯", feedback: "에너지 +3, 회복력 강화. 지금은 힘들어도, 나는 여기까지 온 사람이에요.", energyChange: +3, tag: 'recover' },
    ]
  },
  {
    id: 6,
    title: "3분 리셋",
    icon: "⏱️",
    timeLabel: "PM 3:00",
    situation: "잠깐 쉴 수 있는 순간. 이 3분을 어떻게 쓸까.",
    subtext: "작은 쉼이 큰 차이를 만들어요",
    location: { name: "휴게실", emoji: "☕", positionPercent: 62, bgTime: 'afternoon', characterAction: 'stretching' },
    choices: [
      { text: "깊게 숨쉬기", emoji: "🫁", feedback: "에너지 +5, 긴장 해소. 들숨 4초, 참기 7초, 날숨 8초. 몸이 금방 풀려요.", energyChange: +5, tag: 'recover' },
      { text: "창밖 보기", emoji: "🪟", feedback: "에너지 +4, 시야 전환. 모니터에서 눈 떼고 먼 곳 보는 것만으로도 리셋돼요.", energyChange: +4, tag: 'recover' },
      { text: "물 마시기", emoji: "💧", feedback: "에너지 +5, 몸 회복. 따뜻한 물 한 잔이 긴장을 풀어줘요.", energyChange: +5, tag: 'recover' },
    ]
  },
  {
    id: 7,
    title: "지금 필요한 말",
    icon: "💭",
    timeLabel: "PM 4:00",
    situation: "과부하 쌓이는 느낌. 머릿속에서 '더 해야 해' 소리가 반복됨.",
    subtext: "내 안의 목소리, 어떤 말을 선택할까",
    location: { name: "내 자리", emoji: "💭", positionPercent: 72, bgTime: 'afternoon', characterAction: 'typing' },
    choices: [
      { text: "다 받아야지", emoji: "🌀", feedback: "에너지 -10, 과부하 심화. 다 안고 가면 결국 무너져요.", energyChange: -10, tag: 'drain' },
      { text: "우선순위 다시", emoji: "📋", feedback: "에너지 +4, 통제감 회복. 전부 다 못 해도 중요한 것부터 하면 돼요.", energyChange: +4, tag: 'recover' },
      { text: "기분 털고, 도움되는 생각 해보자", emoji: "🛡️", feedback: "에너지 +5, 자기 보호. 기분을 인정하고 전환하는 것, 그게 진짜 실력이에요.", energyChange: +5, tag: 'recover' },
    ]
  },
  {
    id: 8,
    title: "한마디",
    icon: "🤝",
    timeLabel: "PM 5:00",
    situation: "믿을만한 동료한테. 뭐라고 할까.",
    subtext: "따뜻한 한마디의 힘",
    location: { name: "복도", emoji: "🤝", positionPercent: 80, bgTime: 'evening', characterAction: 'talking' },
    choices: [
      { text: "오늘 좀 벅차네", emoji: "👋", feedback: "에너지 +4, 감정 해소. 솔직하게 말하는 것만으로도 마음이 가벼워져요.", energyChange: +4, tag: 'recover' },
      { text: "아까 알려줘서 고마워", emoji: "🫂", feedback: "에너지 +5, 연결감 상승. 고마움을 표현하면 나도 따뜻해져요.", energyChange: +5, tag: 'recover' },
      { text: "정리할 시간 필요", emoji: "🙏", feedback: "에너지 +4, 경계 설정. 내 상태를 말하는 건 약한 게 아니에요.", energyChange: +4, tag: 'recover' },
    ]
  },
  {
    id: 9,
    title: "퇴근 루틴",
    icon: "🌙",
    timeLabel: "PM 6:30",
    situation: "집 가기 전. 머릿속은 아직 사무실에 있음.",
    subtext: "일과 나를 분리하는 시간",
    location: { name: "퇴근길", emoji: "🚶", positionPercent: 88, bgTime: 'evening', characterAction: 'walking' },
    choices: [
      { text: "알림 15분 끄기", emoji: "🔕", feedback: "에너지 +4, 경계 설정. 15분이라도 알림 없는 시간, 그게 진짜 퇴근이에요.", energyChange: +4, tag: 'recover' },
      { text: "샤워 후 정리", emoji: "🚿", feedback: "에너지 +4, 모드 전환. 물리적으로 씻어내면 마음도 따라와요.", energyChange: +4, tag: 'recover' },
      { text: "오늘 느낌 한 단어", emoji: "📝", feedback: "에너지 +5, 감정 정리. '지쳤다' 한 단어가 오늘을 마무리해줘요.", energyChange: +5, tag: 'recover' },
      { text: "운동하기", emoji: "🏃", feedback: "에너지 +5, 스트레스 해소. 몸을 움직이면 머릿속이 정리돼요.", energyChange: +5, tag: 'recover' },
    ]
  },
  {
    id: 10,
    title: "내일 하나",
    icon: "🌅",
    timeLabel: "PM 9:00",
    situation: "집에 도착. 내일을 위한 아주 작은 약속 하나.",
    subtext: "거창하지 않아도 돼요. 하나면 충분해요.",
    location: { name: "집", emoji: "🏠", positionPercent: 97, bgTime: 'night', characterAction: 'resting' },
    choices: [
      { text: "점심시간 5분 나가 산책하기", emoji: "🚶", feedback: "에너지 +3, 회복 계획. 5분 바깥 공기만으로도 오후가 달라져요.", energyChange: +3, tag: 'recover' },
      { text: "물 먼저 마시기", emoji: "💧", feedback: "에너지 +3, 습관 형성. 가장 작은 시작이 가장 오래 가요.", energyChange: +3, tag: 'recover' },
      { text: "알림 끄기 20분", emoji: "🔕", feedback: "에너지 +3, 경계 연습. 20분의 고요가 내일의 나를 지켜줘요.", energyChange: +3, tag: 'recover' },
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
