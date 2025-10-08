export type CommunityRegion = "minsk" | "brest" | "vitebsk" | "gomel" | "mogilev" | "grodno";

export interface LocalizedField {
  ru: string;
  en: string;
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
}

const COMMUNITY_DATA: Community[] = [
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
