/**
 * Seed script with REAL data from iro.by archive
 * Run with: npm run seed:real
 */

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = '3ea1f1dedcc07a31bc92dfae22f3014e2ae0097aa77cb2877f608ec69caf4afbf519db9ae84b7fee40a60d804fdf245a6c9eb23b8da46e425118aa172aca42464bf0f6d87aa8100006af8e351324adbaa33679c972224bf029563bbb0802d138319347050dced18b6271c50416bf119e88e3f818f31b5f457b348bee6d7871e6';

// Real communities from iro.by
const communities = [
  {
    name: 'Минск',
    slug: 'minsk',
    community_name: 'Иудейское религиозное объединение в Республике Беларусь',
    description: 'Центральная община и офис ИРО в Минске',
    leader: '',
    phone: '+375 (44) 555-06-83',
    email: 'iro13b@gmail.com',
    address: '220002, г. Минск, ул. Даумана, 13Б',
    coordinates: { lat: 53.9045, lng: 27.5615 },
    order: 1,
  },
  {
    name: 'Брест',
    slug: 'brest',
    community_name: 'Брестская еврейская община',
    description: 'Место строительства первого Лапидария в Беларуси',
    leader: '',
    phone: '',
    email: '',
    address: 'г. Брест',
    coordinates: { lat: 52.0975, lng: 23.734 },
    order: 2,
  },
  {
    name: 'Гомель',
    slug: 'gomel',
    community_name: 'Гомельская еврейская община',
    description: 'Одна из крупнейших общин Беларуси',
    leader: '',
    phone: '',
    email: '',
    address: 'г. Гомель',
    coordinates: { lat: 52.4345, lng: 30.9754 },
    order: 3,
  },
  {
    name: 'Бобруйск',
    slug: 'bobruysk',
    community_name: 'Бобруйская еврейская община',
    description: 'Историческая община в Могилёвской области',
    leader: '',
    phone: '',
    email: '',
    address: 'г. Бобруйск',
    coordinates: { lat: 53.1393, lng: 29.2214 },
    order: 4,
  },
  {
    name: 'Могилев',
    slug: 'mogilev',
    community_name: 'Могилевская еврейская община',
    description: 'Восточная община Беларуси',
    leader: '',
    phone: '',
    email: '',
    address: 'г. Могилев',
    coordinates: { lat: 53.8978, lng: 30.3331 },
    order: 5,
  },
  {
    name: 'Мозырь',
    slug: 'mozyr',
    community_name: 'Мозырская еврейская община',
    description: 'Община в Гомельской области',
    leader: '',
    phone: '',
    email: '',
    address: 'г. Мозырь',
    coordinates: { lat: 52.0495, lng: 29.2456 },
    order: 6,
  },
  {
    name: 'Калинковичи',
    slug: 'kalinkovichi',
    community_name: 'Калинковичская еврейская община',
    description: 'Община на юге Беларуси',
    leader: '',
    phone: '',
    email: '',
    address: 'г. Калинковичи',
    coordinates: { lat: 52.1284, lng: 29.3291 },
    order: 7,
  },
  {
    name: 'Климовичи',
    slug: 'klimovichi',
    community_name: 'Климовичская еврейская община',
    description: 'Община в Могилёвской области',
    leader: '',
    phone: '',
    email: '',
    address: 'г. Климовичи',
    coordinates: { lat: 53.6067, lng: 31.9567 },
    order: 8,
  },
  {
    name: 'Молодечно',
    slug: 'molodechno',
    community_name: 'Молодечненская еврейская община',
    description: 'Община в Минской области',
    leader: '',
    phone: '',
    email: '',
    address: 'г. Молодечно',
    coordinates: { lat: 54.3167, lng: 26.85 },
    order: 9,
  },
  {
    name: 'Орша',
    slug: 'orsha',
    community_name: 'Оршанская еврейская община',
    description: 'Историческая община в Витебской области',
    leader: '',
    phone: '',
    email: '',
    address: 'г. Орша',
    coordinates: { lat: 54.5081, lng: 30.4172 },
    order: 10,
  },
  {
    name: 'Полоцк',
    slug: 'polotsk',
    community_name: 'Полоцкая еврейская община',
    description: 'Древняя община на севере Беларуси',
    leader: '',
    phone: '',
    email: '',
    address: 'г. Полоцк',
    coordinates: { lat: 55.4867, lng: 28.7853 },
    order: 11,
  },
  {
    name: 'Слуцк',
    slug: 'slutsk',
    community_name: 'Слуцкая еврейская община',
    description: 'Община в Минской области',
    leader: '',
    phone: '',
    email: '',
    address: 'г. Слуцк',
    coordinates: { lat: 53.0278, lng: 27.5514 },
    order: 12,
  },
  {
    name: 'Быхов',
    slug: 'bykhov',
    community_name: 'Быховская еврейская община',
    description: 'Небольшая община в Могилёвской области',
    leader: '',
    phone: '',
    email: '',
    address: 'г. Быхов',
    coordinates: { lat: 53.5211, lng: 30.2419 },
    order: 13,
  },
];

// Real projects from iro.by
const projectsRu = [
  {
    title: 'Поддержка общин',
    slug: 'support-communities',
    description: 'Поддержка 15 еврейских общин по всей Беларуси',
    content:
      'ИРО поддерживает 15 еврейских общин по всей Беларуси, реализуя совместные проекты и укрепляя связи между общинами.',
    icon: 'Users',
    order: 1,
    locale: 'ru',
  },
  {
    title: 'Гуманитарная помощь',
    slug: 'humanitarian-aid',
    description: 'Помощь нуждающимся членам общины',
    content:
      'Ежегодно оказываем гуманитарную помощь еврейскому населению, многодетным семьям и людям с ограниченными возможностями.',
    icon: 'Heart',
    order: 2,
    locale: 'ru',
  },
  {
    title: 'Газета «Берега»',
    slug: 'berega-newspaper',
    description: 'Единственное еврейское СМИ в Беларуси',
    content:
      'Выпускаем единственное еврейское СМИ в Беларуси — газету «Берега», а также книги о еврейском наследии Беларуси.',
    icon: 'Newspaper',
    order: 3,
    locale: 'ru',
  },
  {
    title: 'Лапидарий в Бресте',
    slug: 'lapidarium-brest',
    description: 'Возрождение еврейской истории Беларуси',
    content:
      'Возрождаем еврейскую историю Беларуси: строим первый Лапидарий в Беларуси (г. Брест), устанавливаем мемориальные знаки, открываем Аллеи памяти.',
    icon: 'Landmark',
    order: 4,
    locale: 'ru',
  },
  {
    title: 'Аудио и видеотуры',
    slug: 'audio-video-tours',
    description: 'Туры по местам еврейского наследия',
    content: 'Создаем аудио- и видеотуры по местам еврейского наследия Беларуси.',
    icon: 'Video',
    order: 5,
    locale: 'ru',
  },
  {
    title: 'Культурные мероприятия',
    slug: 'cultural-events',
    description: 'Шаббаты, клубы, конференции',
    content:
      'Проводим совместные шаббаты, клубы еврейского наследия, тематические конференции, выставки и семинары.',
    icon: 'Calendar',
    order: 6,
    locale: 'ru',
  },
];

const projectsEn = [
  {
    title: 'Community Support',
    slug: 'support-communities-en',
    description: 'Supporting 15 Jewish communities across Belarus',
    content:
      'IRO supports 15 Jewish communities throughout Belarus, implementing joint projects and strengthening connections between communities.',
    icon: 'Users',
    order: 1,
    locale: 'en',
  },
  {
    title: 'Humanitarian Aid',
    slug: 'humanitarian-aid-en',
    description: 'Assistance to community members in need',
    content:
      'We annually provide humanitarian assistance to the Jewish population, large families, and people with disabilities.',
    icon: 'Heart',
    order: 2,
    locale: 'en',
  },
  {
    title: 'Berega Newspaper',
    slug: 'berega-newspaper-en',
    description: 'The only Jewish media in Belarus',
    content:
      'We publish the only Jewish media in Belarus — Berega newspaper, as well as books about the Jewish heritage of Belarus.',
    icon: 'Newspaper',
    order: 3,
    locale: 'en',
  },
  {
    title: 'Lapidarium in Brest',
    slug: 'lapidarium-brest-en',
    description: 'Reviving the Jewish history of Belarus',
    content:
      'We are reviving the Jewish history of Belarus: building the first Lapidarium in Belarus (Brest), installing memorial signs, opening Memory Alleys.',
    icon: 'Landmark',
    order: 4,
    locale: 'en',
  },
  {
    title: 'Audio and Video Tours',
    slug: 'audio-video-tours-en',
    description: 'Tours of Jewish heritage sites',
    content: 'We create audio and video tours of Jewish heritage sites in Belarus.',
    icon: 'Video',
    order: 5,
    locale: 'en',
  },
  {
    title: 'Cultural Events',
    slug: 'cultural-events-en',
    description: 'Shabbats, clubs, conferences',
    content:
      'We organize joint Shabbats, Jewish heritage clubs, thematic conferences, exhibitions, and seminars.',
    icon: 'Calendar',
    order: 6,
    locale: 'en',
  },
];

// Settings with real data
const settings = {
  site_name: 'Иудейское Религиозное Объединение в Республике Беларусь | IRO.BY',
  site_description: 'Официальный сайт Иудейского Религиозного Объединения в Республике Беларусь',
  hero_title: 'Добро пожаловать на официальный сайт ИРО в РБ!',
  hero_subtitle:
    'Мы являемся центром иудейской общины, продолжая традиции нашего народа и вносим свой вклад в многокультурное наследие Беларуси.',
  contact_email: 'iro13b@gmail.com',
  contact_phone: '+375 (44) 555-06-83',
  communities_title: 'Наши общины',
  communities_description: 'Еврейские общины по всей Беларуси',
  projects_title: 'Наши проекты',
  projects_description: 'Программы и инициативы ИРО',
};

async function seed() {
  console.log('🌱 Starting seed with REAL data from iro.by...\n');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  };

  try {
    // 1. Seed communities
    console.log('📍 Creating communities...');
    for (const community of communities) {
      const response = await fetch(`${STRAPI_URL}/api/communities`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data: community }),
      });

      if (response.ok) {
        console.log(`  ✅ Created: ${community.name}`);
      } else {
        const error = await response.json();
        console.log(`  ❌ Failed to create ${community.name}:`, error);
      }
    }

    // 2. Seed projects (Russian)
    console.log('\n🎯 Creating projects (Russian)...');
    for (const project of projectsRu) {
      const response = await fetch(`${STRAPI_URL}/api/projects`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data: project }),
      });

      if (response.ok) {
        console.log(`  ✅ Created: ${project.title}`);
      } else {
        const error = await response.json();
        console.log(`  ❌ Failed to create ${project.title}:`, error);
      }
    }

    // 3. Seed projects (English)
    console.log('\n🎯 Creating projects (English)...');
    for (const project of projectsEn) {
      const response = await fetch(`${STRAPI_URL}/api/projects`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data: project }),
      });

      if (response.ok) {
        console.log(`  ✅ Created: ${project.title}`);
      } else {
        const error = await response.json();
        console.log(`  ❌ Failed to create ${project.title}:`, error);
      }
    }

    // 4. Seed settings
    console.log('\n⚙️  Creating settings...');
    const response = await fetch(`${STRAPI_URL}/api/setting`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data: settings }),
    });

    if (response.ok) {
      console.log('  ✅ Settings created');
    } else {
      const error = await response.json();
      console.log('  ❌ Failed to create settings:', error);
    }

    console.log('\n✨ Seed completed successfully with REAL data!\n');
    console.log('📝 Next steps:');
    console.log('   1. Go to Strapi admin panel: http://localhost:1337/admin');
    console.log('   2. Navigate to Content Manager');
    console.log('   3. Publish all created content (Communities, Projects, Settings)');
    console.log('   4. Check frontend to see the data: http://localhost:8080\n');
  } catch (error) {
    console.error('\n❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
