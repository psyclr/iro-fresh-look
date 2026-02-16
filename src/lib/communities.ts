export type CommunityRegion = "minsk" | "brest" | "vitebsk" | "gomel" | "mogilev" | "grodno";

export interface LocalizedField {
  ru: string;
  en: string;
}

// Расширенная информация о общине для детального view
export interface CommunityHistory {
  founded: number; // Год основания
  facts: LocalizedField[]; // Исторические факты
}

export interface CommunityPhotos {
  building?: string; // Фото здания/синагоги
  events: string[]; // Фото событий (галерея)
  gallery?: string[]; // Дополнительная галерея
}

export interface ShabbatSchedule {
  candleLighting: string; // Зажигание свечей (пример: "18:45")
  havdalah: string; // Авдала/завершение (пример: "19:52")
  note?: LocalizedField; // Примечание о времени
}

export type ProgramCategory = "education" | "social" | "religious" | "cultural" | "youth";

export interface CommunityProgram {
  id: string;
  name: LocalizedField;
  description: LocalizedField;
  category: ProgramCategory;
  schedule?: LocalizedField; // Расписание (пример: "Вторник 19:00")
  contactPerson?: string; // Контактное лицо
}

export interface Community {
  id: string;
  region: CommunityRegion;
  coordinates: [number, number];
  city: LocalizedField;
  communityName: LocalizedField;
  description: LocalizedField;
  address: LocalizedField;
  leader: string;
  phone?: string;
  email?: string;
  website?: string;

  // Расширенная информация для детального view
  history?: CommunityHistory;
  photos?: CommunityPhotos;
  shabbatSchedule?: ShabbatSchedule;
  programs?: CommunityProgram[];
  memberCount?: number; // Примерное количество членов
  languages?: string[]; // Языки служб (например: ["русский", "иврит"])
}

export const COMMUNITY_DATA: Community[] = [
  {
    id: "minsk-beis-isroel",
    region: "minsk",
    coordinates: [53.90453979999999, 27.5615244],
    city: {
      ru: "Минск",
      en: "Minsk",
    },
    communityName: {
      ru: "Община «Бейс Исроэль»",
      en: "Beis Yisroel community",
    },
    description: {
      ru: "Главная община республики с образовательными программами и поддержкой семей",
      en: "The central community offering education programmes and family support",
    },
    address: {
      ru: "ул. Интернациональная, 33",
      en: "33 Internatsionalnaya St.",
    },
    leader: "Игорь Карпелев",
    phone: "+375 (29) 158-57-02",
    email: "info@beisisroel.by",
    history: {
      founded: 1990,
      facts: [
        {
          ru: "Одна из первых восстановленных еврейских общин после распада СССР",
          en: "One of the first restored Jewish communities after the collapse of the USSR",
        },
        {
          ru: "Главная община Республики Беларусь с развитой инфраструктурой",
          en: "The main community of the Republic of Belarus with developed infrastructure",
        },
        {
          ru: "Активно развивает образовательные и социальные программы для всех возрастов",
          en: "Actively develops educational and social programs for all ages",
        },
      ],
    },
    photos: {
      building: "/images/communities/minsk-building.jpg",
      events: [
        "/images/communities/minsk-event-1.jpg",
        "/images/communities/minsk-event-2.jpg",
        "/images/communities/minsk-event-3.jpg",
      ],
    },
    shabbatSchedule: {
      candleLighting: "16:30",
      havdalah: "17:45",
      note: {
        ru: "Время указано для зимнего периода и меняется в зависимости от сезона",
        en: "Time shown is for winter and changes seasonally",
      },
    },
    programs: [
      {
        id: "minsk-school",
        name: {
          ru: "Еврейская школа «Атид»",
          en: "Atid Jewish School",
        },
        description: {
          ru: "Образовательная программа для детей от 6 до 16 лет с изучением иврита, традиций и истории",
          en: "Educational program for children aged 6-16 with Hebrew, traditions and history studies",
        },
        category: "education",
        schedule: {
          ru: "Воскресенье 10:00-14:00",
          en: "Sunday 10:00-14:00",
        },
      },
      {
        id: "minsk-youth",
        name: {
          ru: "Молодёжный клуб",
          en: "Youth Club",
        },
        description: {
          ru: "Встречи, дискуссии и мероприятия для молодёжи от 16 до 30 лет",
          en: "Meetings, discussions and events for youth aged 16-30",
        },
        category: "youth",
        schedule: {
          ru: "Пятница 19:00",
          en: "Friday 19:00",
        },
      },
      {
        id: "minsk-hebrew",
        name: {
          ru: "Курсы иврита",
          en: "Hebrew Courses",
        },
        description: {
          ru: "Изучение современного иврита для начинающих и продвинутых студентов",
          en: "Modern Hebrew study for beginners and advanced students",
        },
        category: "education",
        schedule: {
          ru: "Вторник и четверг 19:00-21:00",
          en: "Tuesday and Thursday 19:00-21:00",
        },
      },
      {
        id: "minsk-shabbat",
        name: {
          ru: "Общинные шаббатние ужины",
          en: "Community Shabbat Dinners",
        },
        description: {
          ru: "Еженедельные совместные праздничные ужины после шаббатней службы",
          en: "Weekly communal festive dinners after Shabbat service",
        },
        category: "religious",
        schedule: {
          ru: "Каждую пятницу после службы",
          en: "Every Friday after service",
        },
      },
      {
        id: "minsk-charity",
        name: {
          ru: "Программа социальной помощи",
          en: "Social Support Program",
        },
        description: {
          ru: "Помощь пожилым членам общины, семьям с детьми и нуждающимся",
          en: "Support for elderly community members, families with children and those in need",
        },
        category: "social",
        contactPerson: "Мария Соломон",
      },
    ],
    memberCount: 250,
    languages: ["русский", "иврит"],
  },
  {
    id: "brest-emuna",
    region: "brest",
    coordinates: [52.097621, 23.734051],
    city: {
      ru: "Брест",
      en: "Brest",
    },
    communityName: {
      ru: "Община «Эмуна»",
      en: "Emuna community",
    },
    description: {
      ru: "Развивает культурные проекты и создаёт еврейский лапидарий под открытым небом",
      en: "Develops cultural projects and is building the Jewish lapidarium",
    },
    address: {
      ru: "ул. Гоголя, 48",
      en: "48 Gogolya St.",
    },
    leader: "Борис Брук",
    phone: "+375 (29) 635-51-53",
    email: "brest@iro.by",
    history: {
      founded: 1995,
      facts: [
        {
          ru: "Восстановлена в 1995 году как одна из активных общин западного региона",
          en: "Restored in 1995 as one of the active communities in the western region",
        },
        {
          ru: "Создаёт уникальный проект - еврейский лапидарий под открытым небом",
          en: "Creating a unique project - an open-air Jewish lapidarium",
        },
        {
          ru: "Сохраняет память о богатой еврейской истории Бреста",
          en: "Preserving the memory of Brest's rich Jewish history",
        },
      ],
    },
    photos: {
      building: "/images/communities/brest-building.jpg",
      events: [
        "/images/communities/brest-event-1.jpg",
        "/images/communities/brest-event-2.jpg",
      ],
    },
    shabbatSchedule: {
      candleLighting: "16:45",
      havdalah: "18:00",
      note: {
        ru: "Время для зимнего периода",
        en: "Winter time",
      },
    },
    programs: [
      {
        id: "brest-school",
        name: {
          ru: "Воскресная школа",
          en: "Sunday School",
        },
        description: {
          ru: "Еженедельные занятия для детей по изучению традиций и истории",
          en: "Weekly classes for children on traditions and history",
        },
        category: "education",
        schedule: {
          ru: "Воскресенье 11:00-13:00",
          en: "Sunday 11:00-13:00",
        },
      },
      {
        id: "brest-holidays",
        name: {
          ru: "Праздничные мероприятия",
          en: "Holiday Events",
        },
        description: {
          ru: "Празднование еврейских праздников для всей общины",
          en: "Celebration of Jewish holidays for the entire community",
        },
        category: "cultural",
        schedule: {
          ru: "По календарю праздников",
          en: "According to holiday calendar",
        },
      },
      {
        id: "brest-culture",
        name: {
          ru: "Культурные встречи",
          en: "Cultural Meetings",
        },
        description: {
          ru: "Лекции, концерты и творческие вечера о еврейской культуре",
          en: "Lectures, concerts and creative evenings about Jewish culture",
        },
        category: "cultural",
        schedule: {
          ru: "Первая среда месяца 18:00",
          en: "First Wednesday of month 18:00",
        },
      },
    ],
    memberCount: 120,
    languages: ["русский", "идиш"],
  },
  {
    id: "orsha-hevra",
    region: "vitebsk",
    coordinates: [54.508286, 30.417652],
    city: {
      ru: "Орша",
      en: "Orsha",
    },
    communityName: {
      ru: "Община «Хевра Тегелим»",
      en: "Hevra Tehilim community",
    },
    description: {
      ru: "Проводит образовательные встречи и поддерживает пожилых членов общины",
      en: "Hosts study meetings and supports senior community members",
    },
    address: {
      ru: "ул. Ленина, 28",
      en: "28 Lenina St.",
    },
    leader: "Александр Розенберг",
    phone: "+375 (33) 322-96-90",
  },
  {
    id: "gomel-community",
    region: "gomel",
    coordinates: [52.441176, 30.987846],
    city: {
      ru: "Гомель",
      en: "Gomel",
    },
    communityName: {
      ru: "Гомельская еврейская община",
      en: "Gomel Jewish community",
    },
    description: {
      ru: "Организует праздники, работает с молодёжью и проводит благотворительные ярмарки",
      en: "Organises holidays, youth programmes and charity fairs",
    },
    address: {
      ru: "пр-т Ленина, 10",
      en: "10 Lenin Ave.",
    },
    leader: "Анна Коган",
    phone: "+375 (25) 567-11-20",
  },
  {
    id: "mogilev-community",
    region: "mogilev",
    coordinates: [53.900715, 30.331359],
    city: {
      ru: "Могилёв",
      en: "Mogilev",
    },
    communityName: {
      ru: "Могилёвская община",
      en: "Mogilev community",
    },
    description: {
      ru: "Сохраняет историческое наследие и развивает образовательные экскурсии",
      en: "Preserves historical heritage and runs educational tours",
    },
    address: {
      ru: "ул. Первомайская, 15",
      en: "15 Pervomayskaya St.",
    },
    leader: "Роман Лурье",
    phone: "+375 (29) 777-12-34",
  },
  {
    id: "grodno-community",
    region: "grodno",
    coordinates: [53.669353, 23.813131],
    city: {
      ru: "Гродно",
      en: "Grodno",
    },
    communityName: {
      ru: "Гродненская община",
      en: "Grodno community",
    },
    description: {
      ru: "Проводит культурные вечера и развивает волонтёрские инициативы",
      en: "Runs cultural evenings and volunteer initiatives",
    },
    address: {
      ru: "ул. Дзержинского, 1",
      en: "1 Dzerzhinskogo St.",
    },
    leader: "Мария Левина",
    phone: "+375 (29) 123-45-67",
    history: {
      founded: 1993,
      facts: [
        {
          ru: "Основана в 1993 году как историческая община с богатым культурным наследием",
          en: "Founded in 1993 as a historical community with rich cultural heritage",
        },
        {
          ru: "Культурный центр еврейской жизни в западном регионе Беларуси",
          en: "Cultural center of Jewish life in the western region of Belarus",
        },
        {
          ru: "Активно развивает волонтёрское движение и межкультурный диалог",
          en: "Actively developing volunteer movement and intercultural dialogue",
        },
      ],
    },
    photos: {
      building: "/images/communities/grodno-building.jpg",
      events: [
        "/images/communities/grodno-event-1.jpg",
        "/images/communities/grodno-event-2.jpg",
      ],
    },
    shabbatSchedule: {
      candleLighting: "16:40",
      havdalah: "17:55",
      note: {
        ru: "Зимнее время, актуально с ноября по февраль",
        en: "Winter time, valid from November to February",
      },
    },
    programs: [
      {
        id: "grodno-courses",
        name: {
          ru: "Образовательные курсы",
          en: "Educational Courses",
        },
        description: {
          ru: "Курсы по еврейской истории, традициям и современному Израилю",
          en: "Courses on Jewish history, traditions and modern Israel",
        },
        category: "education",
        schedule: {
          ru: "Среда 18:30",
          en: "Wednesday 18:30",
        },
      },
      {
        id: "grodno-youth",
        name: {
          ru: "Молодёжный клуб «Мишпаха»",
          en: "Mishpacha Youth Club",
        },
        description: {
          ru: "Встречи, экскурсии и проекты для молодых членов общины",
          en: "Meetings, excursions and projects for young community members",
        },
        category: "youth",
        schedule: {
          ru: "Суббота 15:00",
          en: "Saturday 15:00",
        },
      },
      {
        id: "grodno-volunteers",
        name: {
          ru: "Волонтёрская программа",
          en: "Volunteer Program",
        },
        description: {
          ru: "Помощь пожилым людям, социальные проекты и благотворительность",
          en: "Helping the elderly, social projects and charity",
        },
        category: "social",
        contactPerson: "Мария Левина",
      },
      {
        id: "grodno-cultural",
        name: {
          ru: "Культурные вечера",
          en: "Cultural Evenings",
        },
        description: {
          ru: "Лекции, концерты и выставки о еврейской культуре и искусстве",
          en: "Lectures, concerts and exhibitions on Jewish culture and art",
        },
        category: "cultural",
        schedule: {
          ru: "Последняя пятница месяца 19:00",
          en: "Last Friday of month 19:00",
        },
      },
    ],
    memberCount: 90,
    languages: ["русский", "идиш"],
  },
  {
    id: "polotsk-community",
    region: "vitebsk",
    coordinates: [55.485051, 28.804567],
    city: {
      ru: "Полоцк",
      en: "Polotsk",
    },
    communityName: {
      ru: "Полоцкая община",
      en: "Polotsk community",
    },
    description: {
      ru: "Работает с молодёжью и проводит экскурсии по объектам еврейского наследия",
      en: "Engages youth and organises tours of Jewish heritage sites",
    },
    address: {
      ru: "ул. Октябрьская, 5",
      en: "5 Oktyabrskaya St.",
    },
    leader: "Лев Рахлин",
  },
  {
    id: "bobruisk-community",
    region: "mogilev",
    coordinates: [53.138419, 29.221375],
    city: {
      ru: "Бобруйск",
      en: "Bobruisk",
    },
    communityName: {
      ru: "Бобруйская община",
      en: "Bobruisk community",
    },
    description: {
      ru: "Развивает социальные программы для семей и работает с локальными музеями",
      en: "Runs social programmes for families and collaborates with local museums",
    },
    address: {
      ru: "ул. Социалистическая, 120",
      en: "120 Sotsialisticheskaya St.",
    },
    leader: "Давид Гринберг",
    phone: "+375 (44) 987-65-43",
  },
  {
    id: "mozyr-community",
    region: "gomel",
    coordinates: [52.0451, 29.2456],
    city: {
      ru: "Мозырь",
      en: "Mozyr",
    },
    communityName: {
      ru: "Мозырская община",
      en: "Mozyr community",
    },
    description: {
      ru: "Поддерживает еврейские традиции и культурное наследие в Полесском регионе",
      en: "Preserves Jewish traditions and cultural heritage in the Polesie region",
    },
    address: {
      ru: "г. Мозырь",
      en: "Mozyr",
    },
    leader: "Контакт через центральный офис",
  },
  {
    id: "bykhov-community",
    region: "mogilev",
    coordinates: [53.5314, 30.2472],
    city: {
      ru: "Быхов",
      en: "Bykhov",
    },
    communityName: {
      ru: "Быховская община",
      en: "Bykhov community",
    },
    description: {
      ru: "Сохраняет память о еврейской истории и наследии Быхова",
      en: "Preserves the memory of Jewish history and heritage in Bykhov",
    },
    address: {
      ru: "г. Быхов",
      en: "Bykhov",
    },
    leader: "Контакт через центральный офис",
  },
  {
    id: "klimovichi-community",
    region: "mogilev",
    coordinates: [53.6117, 31.9583],
    city: {
      ru: "Климовичи",
      en: "Klimovichi",
    },
    communityName: {
      ru: "Климовичская община",
      en: "Klimovichi community",
    },
    description: {
      ru: "Объединяет еврейские семьи Климовичского района",
      en: "Unites Jewish families of the Klimovichi district",
    },
    address: {
      ru: "г. Климовичи",
      en: "Klimovichi",
    },
    leader: "Контакт через центральный офис",
  },
  {
    id: "kalinkovichi-community",
    region: "gomel",
    coordinates: [52.1283, 29.3267],
    city: {
      ru: "Калинковичи",
      en: "Kalinkovichi",
    },
    communityName: {
      ru: "Калинковичская община",
      en: "Kalinkovichi community",
    },
    description: {
      ru: "Развивает общинную жизнь и сохраняет еврейские традиции в Калинковичах",
      en: "Develops community life and preserves Jewish traditions in Kalinkovichi",
    },
    address: {
      ru: "г. Калинковичи",
      en: "Kalinkovichi",
    },
    leader: "Контакт через центральный офис",
  },
  {
    id: "molodechno-community",
    region: "minsk",
    coordinates: [54.3089, 26.8542],
    city: {
      ru: "Молодечно",
      en: "Molodechno",
    },
    communityName: {
      ru: "Молодечненская община",
      en: "Molodechno community",
    },
    description: {
      ru: "Поддерживает связь еврейских семей региона и организует культурные мероприятия",
      en: "Connects Jewish families in the region and organises cultural events",
    },
    address: {
      ru: "г. Молодечно",
      en: "Molodechno",
    },
    leader: "Контакт через центральный офис",
  },
];

export const COMMUNITY_REGIONS: CommunityRegion[] = [
  "minsk",
  "brest",
  "vitebsk",
  "gomel",
  "mogilev",
  "grodno",
];

export const fetchCommunities = async (): Promise<Community[]> => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return COMMUNITY_DATA;
};

export const getLocalizedField = (field: LocalizedField, language: string): string => {
  if (language in field) {
    return field[language as keyof LocalizedField];
  }

  return field.ru;
};
