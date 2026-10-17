export interface ForestItem {
  id: string;
  name: string;
  type: '국립자연휴양림' | '국립치유의숲' | '산림치유원' | '공립치유의숲';
  region: '수도권' | '강원권' | '충청권' | '전라권' | '경상권' | '제주권';
  location: string;
  phytoncideIndex: number; // 80 - 99 scale
  altitudeMeters: number;
  mainTrees: string[];
  themes: ('피톤치드산림욕' | '데크로드산책' | '맨발어싱' | '숲속숙박' | '수치유족욕' | '명상해먹')[];
  trailLengthKm: number;
  difficulty: '쉬움' | '보통' | '도전';
  summary: string;
  description: string;
  programs: string[];
  amenities: string[];
  bookingInfo: {
    platform: string;
    url: string;
    tip: string;
  };
  healingHighlights: string[];
  accentColor: string;
}

export const FOREST_LIST: ForestItem[] = [
  {
    id: 'daslim-yeongju',
    name: '국립산림치유원 다스림',
    type: '산림치유원',
    region: '경상권',
    location: '경상북도 영주시 봉현면 테라피로 209 (예천·영주 일원)',
    phytoncideIndex: 98,
    altitudeMeters: 450,
    mainTrees: ['잣나무', '신갈나무', '낙엽송', '자작나무'],
    themes: ['피톤치드산림욕', '데크로드산책', '수치유족욕', '명상해먹', '숲속숙박'],
    trailLengthKm: 50.4,
    difficulty: '쉬움',
    summary: '축구장 4,000개 규모의 아시아 최대 국립 산림치유 전문 힐링 콤플렉스',
    description: '백두대간의 풍부한 피톤치드와 음이온을 품은 세계적 수준의 산림치유 시설입니다. 무장애 데크로드인 마실치유숲길, 아쿠아라인과 바데풀이 갖춰진 수치유센터, 건강증진센터를 통해 체계적인 산림테라피를 제공합니다.',
    programs: ['숲에 안기다(기본 숲치유)', '다스림 숲테라피', '수(水)치유 스파 명상', '해먹 쉼 테라피', '숲 치유 식이요법'],
    amenities: ['수치유센터', '치유숲길 7코스', '숙박시설(수련센터)', '산림치유식 식당', '숲 치유 북카페'],
    bookingInfo: {
      platform: '국립산림치유원 공식 예약',
      url: 'https://daslim.fowi.or.kr',
      tip: '개인 및 단체 치유프로그램은 매월 1일 오전 9시 예약이 개시됩니다.'
    },
    healingHighlights: [
      '국내 최대 규모 50km 피톤치드 치유숲길',
      '수치유센터에서 즐기는 38도 천연 숲속 온열 바데풀',
      '전문 산림치유지도사의 심신 이완 1:1 지도'
    ],
    accentColor: '#1e5e3a'
  },
  {
    id: 'daegwallyeong',
    name: '국립 대관령 치유의 숲',
    type: '국립치유의숲',
    region: '강원권',
    location: '강원특별자치도 강릉시 성산면 대관령옛길 127-6',
    phytoncideIndex: 97,
    altitudeMeters: 650,
    mainTrees: ['금강소나무', '자작나무', '단풍나무'],
    themes: ['피톤치드산림욕', '데크로드산책', '명상해먹', '맨발어싱'],
    trailLengthKm: 5.7,
    difficulty: '쉬움',
    summary: '100년 수령의 웅장한 금강소나무 숲에서 즐기는 청정 솔바람 명상',
    description: '1920년대에 사람이 직접 씨를 뿌려 조성한 100년 수령의 붉은 줄기 금강송 군락이 장관을 이룹니다. 솔향기치유숲길, 노루목이길 등 피톤치드 농도가 높은 능선길과 솔바람 명상 쉼터가 지친 현대인의 뇌파를 안정시켜 줍니다.',
    programs: ['솔향기 솔솔(일반 성인)', '숲속 힐링 쉼표(직장인 번아웃)', '금강송 해먹 힐링', '솔잎 족욕 테라피'],
    amenities: ['치유센터', '솔바람 쉼터', '황토 맨발길', '해먹 명상존', '피톤치드 족욕실'],
    bookingInfo: {
      platform: '숲나들e (e-forest)',
      url: 'https://www.foresttrip.go.kr',
      tip: '프로그램 참여 시 사전 예약 필수이며, 금강송 데크길은 당일 자유 이용 가능합니다.'
    },
    healingHighlights: [
      '100년생 금강소나무의 강력한 알파-피넨 테르펜 방출',
      '피톤치드 풍부한 대관령 청정 해풍과 산풍의 조화',
      '숲속 해먹에 누워 바라보는 하늘과 솔방울 향기'
    ],
    accentColor: '#1b5e20'
  },
  {
    id: 'jangseong-cypress',
    name: '국립 장성 편백 치유의 숲',
    type: '국립치유의숲',
    region: '전라권',
    location: '전라남도 장성군 서삼면 추암로 555 (축령산 일원)',
    phytoncideIndex: 99,
    altitudeMeters: 400,
    mainTrees: ['편백나무', '삼나무', '밤나무'],
    themes: ['피톤치드산림욕', '데크로드산책', '맨발어싱', '명상해먹'],
    trailLengthKm: 10.2,
    difficulty: '쉬움',
    summary: '국내 최대 편백나무 조림지! 피톤치드 방출량 전국 최고 수준의 숲',
    description: '임종국 선생이 20여 년간 땀 흘려 심은 258만 그루의 편백과 삼나무가 울창한 녹색 커튼을 이룹니다. 스트레스 호르몬인 코르티솔을 현저히 낮추고 면역력을 증진하는 피톤치드 발생량이 전국에서 가장 높은 숲으로 꼽힙니다.',
    programs: ['편백 숲 테라피', '숲 태교 프로그램', '아토피·호흡기 안심 치유길', '황토길 맨발 걷기'],
    amenities: ['치유의 숲 힐링센터', '피톤치드 치유전망대', '산소축령 숲길', '편백 쉼터 데크'],
    bookingInfo: {
      platform: '숲나들e 산림치유',
      url: 'https://www.foresttrip.go.kr',
      tip: '이른 아침 안개가 자욱할 때 편백 숲의 피톤치드 농도가 가장 진합니다.'
    },
    healingHighlights: [
      '피톤치드 함량이 가장 높은 40~50년 수령의 편백나무 숲',
      '부드러운 황토 흙길을 맨발로 걸으며 체내 정전기 방출',
      '숲속 깊은 침묵 속에서 심박수 안정 및 수면 유도'
    ],
    accentColor: '#166534'
  },
  {
    id: 'saneum',
    name: '국립 산음 자연휴양림 & 치유의 숲',
    type: '국립자연휴양림',
    region: '수도권',
    location: '경기도 양평군 단월면 고북길 347',
    phytoncideIndex: 93,
    altitudeMeters: 400,
    mainTrees: ['잣나무', '참나무', '자작나무', '낙엽송'],
    themes: ['피톤치드산림욕', '숲속숙박', '데크로드산책', '수치유족욕'],
    trailLengthKm: 7.5,
    difficulty: '보통',
    summary: '수도권 최초의 치유의 숲! 계곡물 흐르는 고요한 잣나무 원시림',
    description: '용문산 북쪽 골짜기에 자리 잡아 사계절 맑은 계곡물이 흐르고 잣나무와 낙엽송이 하늘을 찌릅니다. 수도권에서 1시간 반 거리에 있어 도심 직장인들의 주말 힐링과 당일 산림욕 명소로 사랑받고 있습니다.',
    programs: ['숲, 소리를 품다 (음향 힐링)', '계곡 숲 물소리 명상', '직장인 스트레스 제로', '어르신 활력 숲체험'],
    amenities: ['숲속의 집', '산림문화휴양관', '치유의 숲길', '계곡 족욕 쉼터', '숲속 야영장'],
    bookingInfo: {
      platform: '숲나들e 자연휴양림',
      url: 'https://www.foresttrip.go.kr',
      tip: '매주 수요일 오전 9시에 6주차 분 예약이 열립니다. 평일 숙박은 비교적 여유롭습니다.'
    },
    healingHighlights: [
      '풍부한 음이온을 방출하는 청정 산음계곡 물소리',
      '울창한 잣나무 군락에서 뿜어져 나오는 상쾌한 수목향',
      '자연 친화적 목조 통나무 주택에서 즐기는 하룻밤'
    ],
    accentColor: '#1e40af'
  },
  {
    id: 'cheongtaesan',
    name: '국립 청태산 자연휴양림 & 치유숲길',
    type: '국립자연휴양림',
    region: '강원권',
    location: '강원특별자치도 횡성군 둔내면 청태산로 610',
    phytoncideIndex: 96,
    altitudeMeters: 800,
    mainTrees: ['잣나무', '주목', '전나무', '자작나무'],
    themes: ['피톤치드산림욕', '데크로드산책', '숲속숙박', '명상해먹'],
    trailLengthKm: 8.3,
    difficulty: '쉬움',
    summary: '해발 800m 고원 지대에서 누리는 국내 최장 무장애 데크 숲길',
    description: '청태산 자락 해발 800m의 고지대에 자리 잡고 있어 한여름에도 에어컨이 필요 없을 만큼 서늘하고 상쾌합니다. 경사가 완만한 데크로드가 잣나무 숲 한가운데로 길게 뻗어 있어 휠체어나 유모차도 편안히 피톤치드 산림욕을 누릴 수 있습니다.',
    programs: ['청태산 잣나무 숲 테라피', '숲 오감 힐링 워크', '목공예 DIY 힐링', '별빛 야간 숲산책'],
    amenities: ['무장애 잣나무 데크로드', '숲속의 집', '야영데크', '산림문화휴양관', '숲 생태체험관'],
    bookingInfo: {
      platform: '숲나들e 자연휴양림',
      url: 'https://www.foresttrip.go.kr',
      tip: '무장애 숲길(1km)은 계단이 전혀 없어 남녀노소 누구나 걷기 좋습니다.'
    },
    healingHighlights: [
      '해발 800m 피톤치드 공기와 잣나무 열매의 은은한 향기',
      '완만한 경사의 끝없는 공중 데크로드를 걷는 특별한 경험',
      '도심 열대야를 잊게 만드는 서늘한 숲속 힐링'
    ],
    accentColor: '#0f766e'
  },
  {
    id: 'yumyeongsan',
    name: '국립 유명산 자연휴양림',
    type: '국립자연휴양림',
    region: '수도권',
    location: '경기도 가평군 설악면 유명산길 79',
    phytoncideIndex: 92,
    altitudeMeters: 400,
    mainTrees: ['낙엽송', '잣나무', '참나무', '자생 야생화'],
    themes: ['숲속숙박', '피톤치드산림욕', '데크로드산책', '수치유족욕'],
    trailLengthKm: 6.8,
    difficulty: '보통',
    summary: '국내 최초·최대 규모 자생식물원과 기암괴석 계곡을 품은 대표 휴양림',
    description: '우리나라 자연휴양림의 효시로 손꼽히는 유명산휴양림은 맑은 계곡과 울창한 숲, 10만 평 규모의 자생식물원이 조화를 이룹니다. 기암괴석 사이로 쏟아지는 계곡수 음이온과 침엽수림의 피톤치드를 동시에 체감할 수 있습니다.',
    programs: ['식물원 힐링 해설', '숲길 트레킹 테라피', '가족 숲속 놀이터', '자연 공예 체험'],
    amenities: ['자생식물원', '숲속의 집', '오토캠핑장', '산책 데크로', '숲속 카페'],
    bookingInfo: {
      platform: '숲나들e 자연휴양림',
      url: 'https://www.foresttrip.go.kr',
      tip: '수도권 접근성이 최고이며, 가을 단풍철과 여름 계곡철 인기가 매우 높습니다.'
    },
    healingHighlights: [
      '계곡 트레킹 중 만나는 천연 음이온 샤워',
      '멸종위기 야생화가 자생하는 테마 식물원 관람',
      '소나무·낙엽송 숲길 사이로 펼쳐지는 파노라마 풍경'
    ],
    accentColor: '#047857'
  },
  {
    id: 'seogwipo-healing',
    name: '서귀포 치유의 숲',
    type: '공립치유의숲',
    region: '제주권',
    location: '제주특별자치도 서귀포시 산록남로 2271',
    phytoncideIndex: 98,
    altitudeMeters: 550,
    mainTrees: ['편백나무', '삼나무', '붉가시나무', '비자나무'],
    themes: ['피톤치드산림욕', '데크로드산책', '맨발어싱', '명상해먹'],
    trailLengthKm: 11.0,
    difficulty: '쉬움',
    summary: '한라산 중산간 편백·삼나무 숲과 제주 전통 차롱 치유밥상의 감동',
    description: '해발 320~760m 시오름 일대에 자리 잡은 서귀포 치유의 숲은 난대림, 온대림, 한대림이 공존하는 생태계의 보고입니다. 하루 탐방 인원을 엄격히 제한하여 최고의 고요와 청정함을 보존하며, 제주 대나무 바구니에 담긴 차롱 치유밥상 체험이 유명합니다.',
    programs: ['산림치유(어른/청소년)', '차롱 치유밥상 체험', '노고록 무장애 숲길', '편백 숲 해먹 명상'],
    amenities: ['힐링센터', '노고록 무장애길', '숨골 쉼터', '차롱 치유 쉼터', '족욕 시설'],
    bookingInfo: {
      platform: '서귀포시 E-Ticket 사전 예약',
      url: 'https://eticket.seogwipo.go.kr',
      tip: '사전 예약 필수이며 주차가 한정적이니 최소 3~5일 전 예약을 권장합니다.'
    },
    healingHighlights: [
      '하늘을 찌르는 60년생 삼나무 군락의 신비로운 원시림',
      '제주 현지 식재료로 정성껏 지은 저염 힐링 차롱 밥상',
      '화산송이 흙길을 사각사각 밟는 청정 어싱 테라피'
    ],
    accentColor: '#065f46'
  },
  {
    id: 'jangnyeongsan',
    name: '국립 장령산 자연휴양림 & 치유의 숲',
    type: '국립치유의숲',
    region: '충청권',
    location: '충청북도 옥천군 군서면 장령산로 519',
    phytoncideIndex: 94,
    altitudeMeters: 380,
    mainTrees: ['소나무', '참나무', '편백나무', '단풍나무'],
    themes: ['피톤치드산림욕', '수치유족욕', '숲속숙박', '데크로드산책'],
    trailLengthKm: 6.2,
    difficulty: '쉬움',
    summary: '충청권 피톤치드 1번지! 금천계곡과 편백 힐링센터의 휴식',
    description: '장령산(656m)과 맑고 깊은 금천계곡이 어우러진 숲으로, 충북보건환경연구원 조사 결과 피톤치드 방출량이 충북 도내에서 가장 높은 곳으로 공인받았습니다. 산림치유센터와 숲속 족욕 시설이 잘 갖추어져 있습니다.',
    programs: ['편백 피톤치드 테라피', '계곡 족욕 테라피', '숲 태교', '실버 건강 숲길'],
    amenities: ['산림치유센터', '치유숲길 4코스', '숲속의 집', '금천계곡 물놀이장', '야영장'],
    bookingInfo: {
      platform: '숲나들e 자연휴양림',
      url: 'https://www.foresttrip.go.kr',
      tip: '계곡을 따라 이어지는 3.9km 산책로는 경사가 완만해 걷기 편안합니다.'
    },
    healingHighlights: [
      '충청북도 보건환경연구원 공인 최고 피톤치드 농도',
      '맑고 차가운 금천계곡수를 활용한 야외 족욕 쉼터',
      '사계절 수채화처럼 물드는 장령산 단풍과 소나무 숲'
    ],
    accentColor: '#15803d'
  },
  {
    id: 'jirisan',
    name: '국립 지리산 자연휴양림',
    type: '국립자연휴양림',
    region: '경상권',
    location: '경상남도 함양군 마천면 삼정광평길 38',
    phytoncideIndex: 95,
    altitudeMeters: 600,
    mainTrees: ['소나무', '신갈나무', '구상나무', '고로쇠나무'],
    themes: ['피톤치드산림욕', '숲속숙박', '데크로드산책', '수치유족욕'],
    trailLengthKm: 5.5,
    difficulty: '보통',
    summary: '민족의 영산 지리산 자락의 깊은 계곡과 한지 공예 체험 휴양림',
    description: '지리산 주능선 형제봉 아래 원시림 지대에 포근하게 안겨 있습니다. 백두대간의 웅장한 기운과 함께 지리산 맑은 계곡물이 사계절 마르지 않으며, 닥나무를 이용한 전통 한지 만들기 체험 등 산림문화 행사가 다채롭습니다.',
    programs: ['지리산 생태 트레킹', '전통 한지뜨기 힐링', '숲속 명상과 기체조', '야생화 탐방'],
    amenities: ['숲속의 집', '전통 한지체험관', '출렁다리', '계곡 데크 쉼터'],
    bookingInfo: {
      platform: '숲나들e 자연휴양림',
      url: 'https://www.foresttrip.go.kr',
      tip: '지리산 둘레길과 인접해 있어 도보 여행자들에게 최적의 베이스캠프입니다.'
    },
    healingHighlights: [
      '지리산 원시림이 뿜어내는 깊고 묵직한 피톤치드 에어로졸',
      '사계절 흐르는 청정 암반수와 지리산 고산 식생',
      '피톤치드 향 그윽한 목조 주택에서의 고요한 밤'
    ],
    accentColor: '#0f766e'
  },
  {
    id: 'deogyusan',
    name: '국립 덕유산 자연휴양림',
    type: '국립자연휴양림',
    region: '전라권',
    location: '전북특별자치도 무주군 무풍면 구천동로 530-62',
    phytoncideIndex: 94,
    altitudeMeters: 700,
    mainTrees: ['독일가문비나무', '잣나무', '낙엽송', '자작나무'],
    themes: ['피톤치드산림욕', '숲속숙박', '데크로드산책', '명상해먹'],
    trailLengthKm: 6.0,
    difficulty: '쉬움',
    summary: '이국적인 웅장함을 자랑하는 국내 최대 독일가문비나무 숲',
    description: '1931년 조림된 80여 년 역사의 독일가문비나무 군락이 이국적인 풍광을 선사합니다. 덕유산 국립공원 구천동 계곡의 청량한 공기와 거대한 침엽수림이 만드는 숲속 그늘에서 진정한 쉼을 만끽할 수 있습니다.',
    programs: ['가문비 숲 피톤치드 샤워', '낙엽송 숲길 워킹', '솔방울 공예 힐링', '가족 숲속 힐링 캠프'],
    amenities: ['독일가문비 군락지 관람데크', '숲속의 집', '야영데크', '산림문화휴양관'],
    bookingInfo: {
      platform: '숲나들e 자연휴양림',
      url: 'https://www.foresttrip.go.kr',
      tip: '독일가문비 숲길은 사진 촬영 명소이자 서늘한 피톤치드 쉼터입니다.'
    },
    healingHighlights: [
      '국내 유일의 80년생 독일가문비나무 대경목 군락지',
      '덕유산 구천동 계곡의 청정 고산 지대 기후',
      '침엽수 숲길을 걸으며 느끼는 북유럽풍의 이국적 정취'
    ],
    accentColor: '#166534'
  }
];

export interface HealingActivity {
  id: string;
  sense: '후각' | '청각' | '촉각' | '시각' | '미각';
  title: string;
  subtitle: string;
  mechanism: string;
  instruction: string;
  durationMinutes: number;
  scientificBenefit: string;
}

export const HEALING_ACTIVITIES: HealingActivity[] = [
  {
    id: 'act-olfactory',
    sense: '후각',
    title: '피톤치드 테르펜 호흡 요법',
    subtitle: '수목이 방출하는 천연 살균 방향 물질 흡입',
    mechanism: '소나무, 편백나무, 잣나무가 발산하는 피넨(Pinene)과 사비넨 성분을 깊이 들이마십니다.',
    instruction: '눈을 감고 4초간 코로 천천히 숨을 들이마시고 7초간 호흡을 멈춘 뒤, 8초간 입으로 천천히 비워냅니다. 나무 기둥에 50cm 가까이 다가가 심호흡하세요.',
    durationMinutes: 15,
    scientificBenefit: '혈중 코르티솔(스트레스 호르몬) 23% 감소 및 자연살해(NK) 세포 활성 촉진'
  },
  {
    id: 'act-auditory',
    sense: '청각',
    title: '1/f 요동 물소리와 솔바람 경청',
    subtitle: '자연의 불규칙한 파동을 통한 뇌파 안정화',
    mechanism: '계곡물의 물결과 솔가지 사이를 통과하는 바람 소리는 인공 소음과 달리 1/f 요동 리듬을 띱니다.',
    instruction: '스마트폰을 비행기 탑승 모드로 전환하고, 계곡 옆 바위나 벤치에 앉아 눈을 감고 가장 멀리서 들려오는 자연의 소리 3가지를 가만히 헤아려보세요.',
    durationMinutes: 20,
    scientificBenefit: '알파(α)파 활성화로 교감신경 긴장 완화 및 심박 변이도(HRV) 향상'
  },
  {
    id: 'act-tactile',
    sense: '촉각',
    title: '맨발 흙길 어싱(Earthing) & 수목 터치',
    subtitle: '지구 대지와의 접지 및 생명력 촉감 연결',
    mechanism: '맨발로 촉촉한 황토나 낙엽 덮인 숲길을 직접 밟으면 발바닥 지압과 음전하 접지가 일어납니다.',
    instruction: '신발과 양말을 벗고 발바닥 전체로 흙의 서늘한 감촉과 미세한 입자를 느끼며 천천히 발걸음을 옮깁니다. 굵은 나무 기둥을 양손으로 가만히 감싸 안아보세요.',
    durationMinutes: 25,
    scientificBenefit: '체내 활성산소 중화, 혈류 순환 개선 및 하지 근육 피로 완화'
  },
  {
    id: 'act-visual',
    sense: '시각',
    title: '녹색 수관(Canopy) 파장 명상',
    subtitle: '500~550nm의 식물 엽록소 파장 감상',
    mechanism: '숲의 녹색 파장은 망막의 피로를 최소화하고 뇌의 시각 피질 긴장을 풀어줍니다.',
    instruction: '해먹이나 벤치에 비스듬히 누워 나뭇가지 사이로 비치는 햇살(Komorebi)과 나뭇잎의 흔들림을 멍하니 바라보세요. 시야의 초점을 부드럽게 넓힙니다.',
    durationMinutes: 30,
    scientificBenefit: '안구 건조 및 조절성 눈 피로 완화, 전두엽 스트레스 이완'
  },
  {
    id: 'act-gustatory',
    sense: '미각',
    title: '숲 치유 허브 & 솔잎차 테라피',
    subtitle: '자연의 쌉싸름함과 맑은 향으로 몸속 정화',
    mechanism: '야생 솔잎, 구절초, 당귀, 맥문동 등 산림 약초의 유효 성분을 따뜻한 차로 음미합니다.',
    instruction: '따뜻한 찻잔을 두 손으로 쥐어 온기를 느끼고, 마시기 전 김을 코로 들이마신 후 천천히 한 모금씩 목을 축이며 목 넘김의 온도를 느껴보세요.',
    durationMinutes: 15,
    scientificBenefit: '위장관 부교감 신경 자극, 체온 상승 및 수면 전 심신 진정'
  }
];
