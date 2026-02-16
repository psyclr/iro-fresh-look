import type { Core } from '@strapi/strapi';
import fs from 'fs';
import path from 'path';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Ensure 'en' locale exists (ru is default via plugin config)
    await ensureLocales(strapi);

    // Configure public permissions for API access
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      console.warn('Public role not found');
      return;
    }

    // Content types that need public access
    const contentTypes = [
      { uid: 'api::article.article', actions: ['find', 'findOne'] },
      { uid: 'api::project.project', actions: ['find', 'findOne'] },
      { uid: 'api::community.community', actions: ['find', 'findOne'] },
      { uid: 'api::category.category', actions: ['find', 'findOne'] },
      { uid: 'api::setting.setting', actions: ['find'] },
      { uid: 'api::rabbi-qa.rabbi-qa', actions: ['find', 'findOne'] },
      { uid: 'api::tradition.tradition', actions: ['find', 'findOne'] },
      { uid: 'api::poster-event.poster-event', actions: ['find', 'findOne'] },
      { uid: 'api::rabbi-question.rabbi-question', actions: ['create'] },
    ];

    // Also grant public access to i18n locale listing
    const i18nPermissions = [
      { uid: 'plugin::i18n.locales', actions: ['listLocales'] },
    ];

    // Set permissions for each content type
    for (const ct of [...contentTypes, ...i18nPermissions]) {
      for (const action of ct.actions) {
        const actionString = `${ct.uid}.${action}`;

        let permission = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({
            where: {
              role: publicRole.id,
              action: actionString,
            },
          });

        if (!permission) {
          permission = await strapi
            .query('plugin::users-permissions.permission')
            .create({
              data: {
                role: publicRole.id,
                action: actionString,
                enabled: true,
              },
            });
          console.log(`Created and enabled: ${actionString}`);
        } else if (!permission.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: permission.id },
              data: { enabled: true },
            });
          console.log(`Enabled: ${actionString}`);
        } else {
          console.log(`Already enabled: ${actionString}`);
        }
      }
    }

    console.log('Public permissions configured successfully');

    // Auto-seed initial data
    await seedInitialData(strapi);

    // Auto-create admin user if env vars are set
    await autoCreateAdmin(strapi);
  },
};

async function ensureLocales(strapi: Core.Strapi) {
  try {
    const localeService = strapi.plugin('i18n').service('locales');
    const existingLocales = await localeService.find();
    const codes = existingLocales.map((l: { code: string }) => l.code);

    if (!codes.includes('en')) {
      await localeService.create({ code: 'en', name: 'English (en)' });
      console.log('Created locale: en');
    }
    if (!codes.includes('ru')) {
      await localeService.create({ code: 'ru', name: 'Russian (ru)' });
      console.log('Created locale: ru');
    }
  } catch (err) {
    console.log('Locale setup note:', (err as Error).message);
  }
}

// Helper: create RU document, then add EN translation
async function createWithTranslation(
  strapi: Core.Strapi,
  uid: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ruData: Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enData: Record<string, any>,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await (strapi as any).documents(uid).create({
    data: ruData,
    locale: 'ru',
    status: 'published',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (strapi as any).documents(uid).update({
    documentId: doc.documentId,
    data: enData,
    locale: 'en',
    status: 'published',
  });

  return doc;
}

async function seedInitialData(strapi: Core.Strapi) {
  // Check if data already exists
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existing = await (strapi as any).documents('api::community.community').findMany({
    locale: 'ru',
    limit: 1,
  });

  if (existing && existing.length > 0) {
    console.log('Initial data already exists, skipping seed');
    return;
  }

  console.log('\nSeeding initial data...');

  // Seed communities (RU + EN pairs)
  await seedCommunities(strapi);

  // Seed projects (RU + EN pairs)
  await seedProjects(strapi);

  // Seed settings (RU + EN)
  await seedSettings(strapi);

  // Seed categories
  await seedCategories(strapi);

  // Seed articles (RU + EN pairs)
  await seedArticles(strapi);

  // Seed rabbi Q&A (RU + EN pairs)
  await seedRabbiQA(strapi);

  // Seed traditions (RU + EN pairs)
  await seedTraditions(strapi);

  // Seed poster events (RU + EN pairs)
  await seedPosterEvents(strapi);

  // Upload seed images and link to projects
  await seedProjectImages(strapi);

  console.log('Initial data seeded successfully!\n');
}

async function seedCommunities(strapi: Core.Strapi) {
  console.log('Creating communities...');

  const communities = [
    {
      ru: { name: 'Минск', community_name: 'Иудейское религиозное объединение в Республике Беларусь', description: 'Центральная община и офис ИРО в Минске', address: '220002, г. Минск, ул. Даумана, 13Б' },
      en: { name: 'Minsk', community_name: 'Jewish Religious Association in the Republic of Belarus', description: 'Central community and IRO office in Minsk', address: '220002, Minsk, 13B Daumana St.' },
      shared: { slug: 'minsk', region: 'minsk', phone: '+375 (44) 555-06-83', email: 'iro13b@gmail.com', coordinates: { lat: 53.9045, lng: 27.5615 }, order: 1 },
    },
    {
      ru: { name: 'Брест', community_name: 'Брестская еврейская община', description: 'Место строительства первого Лапидария в Беларуси', address: 'г. Брест' },
      en: { name: 'Brest', community_name: 'Brest Jewish Community', description: 'Site of the first Lapidarium construction in Belarus', address: 'Brest' },
      shared: { slug: 'brest', region: 'brest', phone: '+375 (44) 555-06-83', email: 'iro13b@gmail.com', coordinates: { lat: 52.0975, lng: 23.734 }, order: 2 },
    },
    {
      ru: { name: 'Гомель', community_name: 'Гомельская еврейская община', description: 'Одна из крупнейших общин Беларуси', address: 'г. Гомель' },
      en: { name: 'Gomel', community_name: 'Gomel Jewish Community', description: 'One of the largest communities in Belarus', address: 'Gomel' },
      shared: { slug: 'gomel', region: 'gomel', phone: '+375 (44) 555-06-83', email: 'iro13b@gmail.com', coordinates: { lat: 52.4345, lng: 30.9754 }, order: 3 },
    },
    {
      ru: { name: 'Бобруйск', community_name: 'Бобруйская еврейская община', description: 'Историческая община в Могилёвской области', address: 'г. Бобруйск' },
      en: { name: 'Bobruysk', community_name: 'Bobruysk Jewish Community', description: 'Historic community in the Mogilev region', address: 'Bobruysk' },
      shared: { slug: 'bobruysk', region: 'mogilev', phone: '+375 (44) 555-06-83', email: 'iro13b@gmail.com', coordinates: { lat: 53.1393, lng: 29.2214 }, order: 4 },
    },
    {
      ru: { name: 'Могилев', community_name: 'Могилевская еврейская община', description: 'Восточная община Беларуси', address: 'г. Могилев' },
      en: { name: 'Mogilev', community_name: 'Mogilev Jewish Community', description: 'Eastern community of Belarus', address: 'Mogilev' },
      shared: { slug: 'mogilev', region: 'mogilev', phone: '+375 (44) 555-06-83', email: 'iro13b@gmail.com', coordinates: { lat: 53.8978, lng: 30.3331 }, order: 5 },
    },
  ];

  for (const c of communities) {
    try {
      await createWithTranslation(
        strapi,
        'api::community.community',
        { ...c.shared, ...c.ru },
        { ...c.shared, ...c.en },
      );
      console.log(`  ${c.ru.name} / ${c.en.name}`);
    } catch (error) {
      console.log(`  Failed ${c.ru.name}:`, (error as Error).message);
    }
  }
}

async function seedProjects(strapi: Core.Strapi) {
  console.log('Creating projects...');

  const projects = [
    {
      ru: { title: 'Газета «Берега»', description: 'Наше регулярное издание освещает жизнь еврейской общины Беларуси, публикует исторические материалы, рассказывает о традициях и современных событиях общинной жизни.', content: 'Газета является важным связующим звеном между общинами различных городов и регионов страны.' },
      en: { title: 'BEREGA Newspaper', description: 'Our regular publication covers the life of the Jewish community in Belarus, publishes historical materials and reports on traditions and current events in community life.', content: 'The newspaper serves as an important link between communities in various cities and regions of the country.' },
      shared: { slug: 'newspaper', icon: 'Newspaper', order: 1 },
    },
    {
      ru: { title: 'Лапидарий в Бресте', description: 'Строительство первого еврейского лапидария в Бресте - это масштабный проект по созданию музея под открытым небом, где будут представлены исторические надгробия и памятники.', content: 'Проект направлен на сохранение материального наследия еврейской общины региона для будущих поколений.' },
      en: { title: 'Lapidarium in Brest', description: 'Building the first Jewish lapidarium in Brest is a large-scale project to create an open-air museum that will display historical tombstones and monuments.', content: 'The project is aimed at preserving the material heritage of the regional Jewish community for future generations.' },
      shared: { slug: 'lapidarium', icon: 'Landmark', order: 2 },
    },
    {
      ru: { title: 'Центр изучения наследия', description: 'Исследовательский и образовательный центр, который занимается сбором, систематизацией и изучением материалов о еврейской истории и культуре в Беларуси.', content: 'Центр проводит научные конференции, семинары и издаёт научные публикации.' },
      en: { title: 'Heritage Research Center', description: 'A research and educational center that collects, systematises and studies materials on Jewish history and culture in Belarus.', content: 'The center hosts academic conferences, seminars and publishes scholarly works.' },
      shared: { slug: 'center', icon: 'GraduationCap', order: 3 },
    },
    {
      ru: { title: 'Гуманитарная помощь', description: 'Ежегодно мы оказываем поддержку многодетным семьям и людям с ограниченными возможностями. Наша программа включает материальную помощь, продуктовые наборы и социальную поддержку.', content: 'Мы верим, что взаимопомощь и забота о ближних - основа крепкой общины.' },
      en: { title: 'Humanitarian Aid', description: 'Every year we provide support to large families and people with disabilities. Our programme includes material aid, food packages and social support.', content: 'We believe that mutual aid and caring for others is the foundation of a strong community.' },
      shared: { slug: 'humanitarian', icon: 'HandHeart', order: 4 },
    },
    {
      ru: { title: 'Архивы', description: 'Мы ведём работу по сбору, оцифровке и сохранению архивных документов, фотографий и других материалов, связанных с историей еврейских общин Беларуси.', content: 'Этот проект помогает сохранить память о прошлом и обеспечить доступ к историческим материалам для исследователей.' },
      en: { title: 'Archives', description: 'We work to collect, digitise and preserve archival documents, photographs and other materials related to the history of Jewish communities in Belarus.', content: 'This project helps preserve the memory of the past and provide access to historical materials for researchers.' },
      shared: { slug: 'archives', icon: 'Archive', order: 5 },
    },
    {
      ru: { title: 'Виртуальные туры', description: 'Исследуйте исторические еврейские места Беларуси через интерактивные виртуальные экскурсии, которые позволяют познакомиться с богатым наследием не выходя из дома.' },
      en: { title: 'Virtual Tours', description: 'Explore historic Jewish sites in Belarus through interactive virtual tours that let you discover the rich heritage from the comfort of your home.' },
      shared: { slug: 'tours', icon: 'Map', order: 6, external_link: 'http://virtual.belarus.travel/' },
    },
    {
      ru: { title: 'Еврейские кладбища', description: 'Мы ведём работу по сохранению и восстановлению еврейских кладбищ по всей Беларуси. Эти священные места являются важной частью нашего исторического наследия.', content: 'Наша деятельность включает документирование надгробий, установку мемориальных знаков и создание аллей памяти для сохранения памяти о прошлых поколениях.' },
      en: { title: 'Jewish Cemeteries', description: 'We work to preserve and restore Jewish cemeteries throughout Belarus. These sacred sites are an important part of our historical heritage.', content: 'Our activities include documenting tombstones, installing memorial plaques and creating memorial alleys to preserve the memory of past generations.' },
      shared: { slug: 'cemeteries', icon: 'Cross', order: 7 },
    },
  ];

  for (const p of projects) {
    try {
      await createWithTranslation(
        strapi,
        'api::project.project',
        { ...p.shared, ...p.ru },
        { ...p.shared, ...p.en },
      );
      console.log(`  ${p.ru.title} / ${p.en.title}`);
    } catch (error) {
      console.log(`  Failed ${p.ru.title}:`, (error as Error).message);
    }
  }
}

async function seedSettings(strapi: Core.Strapi) {
  console.log('Creating settings...');
  try {
    const ruData = {
      site_name: 'Иудейское Религиозное Объединение в Республике Беларусь',
      site_description: 'Официальный сайт ИРО в РБ',
      hero_title: 'Добро пожаловать на официальный сайт ИРО в РБ!',
      hero_subtitle: 'Мы являемся центром иудейской общины, продолжая традиции нашего народа.',
      contact_email: 'iro13b@gmail.com',
      contact_phone: '+375 (44) 555-06-83',
      communities_title: 'Наши общины',
      communities_description: 'Еврейские общины по всей Беларуси',
      projects_title: 'Наши проекты',
      projects_description: 'Программы и инициативы ИРО',
      stats_communities_value: '15+',
      stats_communities_label: 'Общин по всей стране',
      stats_regions_value: '6',
      stats_regions_label: 'Регионов Беларуси',
      stats_founded_value: '1990',
      stats_founded_label: 'Год основания',
      stats_events_value: '100+',
      stats_events_label: 'Мероприятий в год',
    };

    const enData = {
      site_name: 'Jewish Religious Association in the Republic of Belarus',
      site_description: 'Official website of IRO in Belarus',
      hero_title: 'Welcome to the official website of IRO in Belarus!',
      hero_subtitle: 'We are the center of the Jewish community, continuing the traditions of our people.',
      contact_email: 'iro13b@gmail.com',
      contact_phone: '+375 (44) 555-06-83',
      communities_title: 'Our Communities',
      communities_description: 'Jewish communities across Belarus',
      projects_title: 'Our Projects',
      projects_description: 'IRO programmes and initiatives',
      stats_communities_value: '15+',
      stats_communities_label: 'Communities nationwide',
      stats_regions_value: '6',
      stats_regions_label: 'Regions of Belarus',
      stats_founded_value: '1990',
      stats_founded_label: 'Year founded',
      stats_events_value: '100+',
      stats_events_label: 'Events per year',
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = await (strapi as any).documents('api::setting.setting').create({
      data: ruData,
      locale: 'ru',
      status: 'published',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (strapi as any).documents('api::setting.setting').update({
      documentId: doc.documentId,
      data: enData,
      locale: 'en',
      status: 'published',
    });

    console.log('  Settings created (RU + EN)');
  } catch (error) {
    console.log('  Failed settings:', (error as Error).message);
  }
}

async function seedCategories(strapi: Core.Strapi) {
  console.log('Creating categories...');
  const categories = [
    { ru: { name: 'Община' }, en: { name: 'Community' }, shared: { slug: 'community-life' } },
    { ru: { name: 'История' }, en: { name: 'History' }, shared: { slug: 'history' } },
    { ru: { name: 'Культура' }, en: { name: 'Culture' }, shared: { slug: 'culture' } },
  ];

  for (const cat of categories) {
    try {
      await createWithTranslation(
        strapi,
        'api::category.category',
        { ...cat.shared, ...cat.ru },
        { ...cat.shared, ...cat.en },
      );
      console.log(`  ${cat.ru.name} / ${cat.en.name}`);
    } catch (error) {
      console.log(`  Failed ${cat.ru.name}:`, (error as Error).message);
    }
  }
}

// Helper to create Strapi Blocks content from plain text paragraphs
function textToBlocks(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    type: 'paragraph' as const,
    children: [{ type: 'text' as const, text }],
  }));
}

async function seedArticles(strapi: Core.Strapi) {
  console.log('Creating articles...');

  const articles = [
    {
      ru: {
        title: 'Ханука 2025: празднование в общинах Беларуси',
        excerpt: 'В декабре еврейские общины Беларуси отпраздновали Хануку — праздник света и чудес.',
        content: textToBlocks([
          'Ханука — один из самых радостных еврейских праздников, символизирующий победу света над тьмой.',
          'В этом году общины Минска, Бреста, Гомеля и Могилёва провели праздничные мероприятия с зажиганием ханукии, концертами и угощениями.',
          'Особенно ярким стало зажигание большой ханукии в центре Минска, собравшее сотни участников.',
        ]),
        author: 'Редакция ИРО',
      },
      en: {
        title: 'Chanukah 2025: Celebrations Across Belarus',
        excerpt: 'In December, Jewish communities across Belarus celebrated Chanukah — the festival of lights.',
        content: textToBlocks([
          'Chanukah is one of the most joyous Jewish holidays, symbolising the victory of light over darkness.',
          'This year, communities in Minsk, Brest, Gomel and Mogilev held festive events with menorah lighting, concerts and traditional treats.',
          'The grand menorah lighting in central Minsk was a highlight, drawing hundreds of participants.',
        ]),
        author: 'IRO Editorial',
      },
      shared: { slug: 'chanukah-2025' },
    },
    {
      ru: {
        title: 'Новый выпуск газеты «Берега»',
        excerpt: 'Вышел очередной номер газеты «Берега» с материалами об истории и жизни общин.',
        content: textToBlocks([
          'В новом выпуске газеты «Берега» читатели найдут материалы о проекте Лапидарий в Бресте, интервью с руководителями общин, а также исторические очерки о еврейских местечках Беларуси.',
          'Газета продолжает оставаться важным связующим звеном между еврейскими общинами различных городов страны.',
        ]),
        author: 'Редакция ИРО',
      },
      en: {
        title: 'New Issue of BEREGA Newspaper',
        excerpt: 'A new issue of BEREGA newspaper has been published with articles on community history and life.',
        content: textToBlocks([
          'In the new issue of BEREGA newspaper, readers will find materials about the Lapidarium project in Brest, interviews with community leaders, and historical essays about Jewish shtetls of Belarus.',
          'The newspaper continues to serve as a vital link between Jewish communities across the country.',
        ]),
        author: 'IRO Editorial',
      },
      shared: { slug: 'berega-new-issue' },
    },
    {
      ru: {
        title: 'Проект Лапидарий: итоги года',
        excerpt: 'Подводим итоги работы над проектом первого еврейского лапидария в Бресте.',
        content: textToBlocks([
          'За прошедший год команда проекта провела значительную работу по каталогизации и реставрации исторических надгробий.',
          'Были проведены археологические исследования на территории старого еврейского кладбища.',
          'На данный момент в коллекцию лапидария входят более 50 надгробий XVII-XIX веков с уникальными эпитафиями и художественной резьбой.',
        ]),
        author: 'Редакция ИРО',
      },
      en: {
        title: 'Lapidarium Project: Year in Review',
        excerpt: 'Summarising the year of work on the first Jewish lapidarium in Brest.',
        content: textToBlocks([
          'Over the past year, the project team has done significant work cataloguing and restoring historical tombstones.',
          'Archaeological research was conducted on the grounds of the old Jewish cemetery.',
          'The lapidarium collection now includes over 50 tombstones from the 17th-19th centuries with unique epitaphs and artistic carvings.',
        ]),
        author: 'IRO Editorial',
      },
      shared: { slug: 'lapidarium-year-results' },
    },
  ];

  for (const a of articles) {
    try {
      await createWithTranslation(
        strapi,
        'api::article.article',
        { ...a.shared, ...a.ru },
        { ...a.shared, ...a.en },
      );
      console.log(`  ${a.ru.title}`);
    } catch (error) {
      console.log(`  Failed ${a.ru.title}:`, (error as Error).message);
    }
  }
}

async function seedRabbiQA(strapi: Core.Strapi) {
  console.log('Creating rabbi Q&A...');
  const qas = [
    {
      ru: { question: 'Что такое Шаббат и как его соблюдать?', answer: 'Шаббат — это еженедельный день отдыха, начинающийся в пятницу вечером с зажигания свечей и заканчивающийся в субботу вечером церемонией Авдала. В этот день евреи воздерживаются от работы, посвящая время молитве, семье и изучению Торы.', rabbi_name: 'Раввин Гродненской общины' },
      en: { question: 'What is Shabbat and how is it observed?', answer: 'Shabbat is the weekly day of rest, beginning on Friday evening with candle lighting and ending on Saturday evening with the Havdalah ceremony. On this day, Jews refrain from work, dedicating time to prayer, family and Torah study.', rabbi_name: 'Rabbi of Grodno Community' },
      shared: { order: 1 },
    },
    {
      ru: { question: 'Как определяется кашрут продуктов?', answer: 'Кашрут — система еврейских диетарных законов. Основные правила: разделение мясного и молочного, употребление только кошерных животных (с раздвоенными копытами и жующих жвачку), рыбы с чешуёй и плавниками. Продукты должны быть приготовлены в соответствии с галахическими нормами.', rabbi_name: 'Раввин Минской общины' },
      en: { question: 'How is kashrut of food determined?', answer: 'Kashrut is the system of Jewish dietary laws. Key rules include: separating meat and dairy, consuming only kosher animals (with split hooves that chew cud), fish with scales and fins. Food must be prepared according to halachic standards.', rabbi_name: 'Rabbi of Minsk Community' },
      shared: { order: 2 },
    },
    {
      ru: { question: 'Какие основные еврейские праздники отмечаются в Беларуси?', answer: 'Основные праздники: Рош ха-Шана (еврейский Новый год), Йом Кипур (День искупления), Суккот (праздник шалашей), Ханука (праздник света), Пурим (праздник спасения), Песах (праздник свободы) и Шавуот (дарование Торы). Все общины ИРО проводят праздничные мероприятия.', rabbi_name: 'Раввин Минской общины' },
      en: { question: 'What are the main Jewish holidays celebrated in Belarus?', answer: 'The main holidays are: Rosh Hashanah (Jewish New Year), Yom Kippur (Day of Atonement), Sukkot (Festival of Booths), Chanukah (Festival of Lights), Purim (Festival of Salvation), Pesach (Festival of Freedom) and Shavuot (Giving of the Torah). All IRO communities hold festive events.', rabbi_name: 'Rabbi of Minsk Community' },
      shared: { order: 3 },
    },
    {
      ru: { question: 'Что такое бар-мицва и бат-мицва?', answer: 'Бар-мицва (для мальчиков в 13 лет) и бат-мицва (для девочек в 12 лет) — это церемония совершеннолетия, после которой молодой человек несёт ответственность за соблюдение заповедей. Обычно сопровождается чтением Торы в синагоге и праздничным мероприятием.', rabbi_name: 'Раввин Гродненской общины' },
      en: { question: 'What is Bar Mitzvah and Bat Mitzvah?', answer: 'Bar Mitzvah (for boys at 13) and Bat Mitzvah (for girls at 12) is a coming-of-age ceremony, after which the young person takes responsibility for observing the commandments. It is usually accompanied by Torah reading in the synagogue and a festive celebration.', rabbi_name: 'Rabbi of Grodno Community' },
      shared: { order: 4 },
    },
  ];

  for (const qa of qas) {
    try {
      await createWithTranslation(
        strapi,
        'api::rabbi-qa.rabbi-qa',
        { ...qa.shared, ...qa.ru },
        { ...qa.shared, ...qa.en },
      );
      console.log(`  ${qa.ru.question.substring(0, 40)}...`);
    } catch (error) {
      console.log(`  Failed Q&A:`, (error as Error).message);
    }
  }
}

async function seedTraditions(strapi: Core.Strapi) {
  console.log('Creating traditions...');
  const traditions = [
    {
      ru: { title: 'Шаббат', description: 'Еженедельный день отдыха — от заката пятницы до появления звёзд в субботу. Семьи собираются за праздничным столом, зажигают свечи, произносят кидуш над вином и благословляют хлеб (халу). Шаббат — основа еврейской жизни и духовного обновления.', related_holiday: 'Шаббат' },
      en: { title: 'Shabbat', description: 'The weekly day of rest — from Friday sunset to Saturday nightfall. Families gather at the festive table, light candles, recite Kiddush over wine and bless bread (challah). Shabbat is the foundation of Jewish life and spiritual renewal.', related_holiday: 'Shabbat' },
      shared: { order: 1 },
    },
    {
      ru: { title: 'Зажигание свечей', description: 'Перед наступлением Шаббата и праздников женщины зажигают свечи и произносят благословение. Это одна из трёх заповедей, данных еврейской женщине. Свечи зажигаются за 18 минут до захода солнца в пятницу.', related_holiday: 'Шаббат' },
      en: { title: 'Candle Lighting', description: 'Before the onset of Shabbat and holidays, women light candles and recite a blessing. This is one of three commandments given to Jewish women. Candles are lit 18 minutes before sunset on Friday.', related_holiday: 'Shabbat' },
      shared: { order: 2 },
    },
    {
      ru: { title: 'Кашрут', description: 'Система еврейских диетарных законов, определяющая, какие продукты разрешены к употреблению. Включает разделение мясной и молочной пищи, требования к забою скота и проверку продуктов на кошерность.' },
      en: { title: 'Kashrut', description: 'The system of Jewish dietary laws determining which foods are permitted. It includes separating meat and dairy foods, requirements for animal slaughter and checking products for kosher status.' },
      shared: { order: 3 },
    },
    {
      ru: { title: 'Мезуза', description: 'Свиток пергамента с текстом из Торы (Шма Исраэль), помещённый в специальный футляр и прикреплённый к дверному косяку еврейского дома. Мезуза напоминает о присутствии Б-га и защищает дом.' },
      en: { title: 'Mezuzah', description: 'A parchment scroll with text from the Torah (Shema Yisrael), placed in a special case and affixed to the doorpost of a Jewish home. The mezuzah reminds of G-d\'s presence and protects the home.' },
      shared: { order: 4 },
    },
    {
      ru: { title: 'Тфилин', description: 'Две маленькие кожаные коробочки со свитками из Торы, которые еврейские мужчины повязывают во время утренней молитвы на руку и на лоб. Тфилин символизируют связь между Б-гом и еврейским народом.' },
      en: { title: 'Tefillin', description: 'Two small leather boxes with Torah scrolls that Jewish men bind on the arm and forehead during morning prayers. Tefillin symbolise the bond between G-d and the Jewish people.' },
      shared: { order: 5 },
    },
  ];

  for (const t of traditions) {
    try {
      await createWithTranslation(
        strapi,
        'api::tradition.tradition',
        { ...t.shared, ...t.ru },
        { ...t.shared, ...t.en },
      );
      console.log(`  ${t.ru.title} / ${t.en.title}`);
    } catch (error) {
      console.log(`  Failed ${t.ru.title}:`, (error as Error).message);
    }
  }
}

async function seedPosterEvents(strapi: Core.Strapi) {
  console.log('Creating poster events...');

  const now = new Date();
  const inDays = (days: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() + days);
    d.setHours(18, 0, 0, 0);
    return d.toISOString();
  };
  const daysAgo = (days: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() - days);
    d.setHours(18, 0, 0, 0);
    return d.toISOString();
  };

  const events = [
    {
      ru: { title: 'Шаббат в общине', location: 'Минск, ул. Даумана 13Б', description: 'Приглашаем на совместную встречу Шаббата. Зажигание свечей, кидуш, праздничный ужин.' },
      en: { title: 'Shabbat at the Community', location: 'Minsk, 13B Daumana St.', description: 'Join us for a communal Shabbat. Candle lighting, Kiddush, festive dinner.' },
      shared: { date: inDays(2) },
    },
    {
      ru: { title: 'Урок иврита для начинающих', location: 'Минск, ул. Даумана 13Б', description: 'Еженедельные занятия по ивриту. Начальный уровень, все материалы предоставляются.' },
      en: { title: 'Hebrew Lesson for Beginners', location: 'Minsk, 13B Daumana St.', description: 'Weekly Hebrew classes. Beginner level, all materials provided.' },
      shared: { date: inDays(7) },
    },
    {
      ru: { title: 'Лекция: Еврейская история Беларуси', location: 'Минск, ул. Даумана 13Б', description: 'Профессор Гриша Смолин расскажет о еврейских общинах Беларуси XIX века.' },
      en: { title: 'Lecture: Jewish History of Belarus', location: 'Minsk, 13B Daumana St.', description: 'Professor Grisha Smolin will speak about the Jewish communities of 19th-century Belarus.' },
      shared: { date: inDays(14) },
    },
    {
      ru: { title: 'Концерт клезмерской музыки', location: 'Минск, ул. Даумана 13Б', description: 'Ансамбль «Шалом» представил программу традиционной клезмерской музыки.' },
      en: { title: 'Klezmer Music Concert', location: 'Minsk, 13B Daumana St.', description: 'The Shalom Ensemble presented a programme of traditional klezmer music.' },
      shared: { date: daysAgo(10) },
    },
  ];

  for (const e of events) {
    try {
      await createWithTranslation(
        strapi,
        'api::poster-event.poster-event',
        { ...e.shared, ...e.ru },
        { ...e.shared, ...e.en },
      );
      console.log(`  ${e.ru.title}`);
    } catch (error) {
      console.log(`  Failed ${e.ru.title}:`, (error as Error).message);
    }
  }
}

// Image mapping: project slug → image directory
const PROJECT_IMAGE_MAP: Record<string, string> = {
  lapidarium: 'lapidarium',
  cemeteries: 'heritage',
  tours: 'heritage',
};

async function seedProjectImages(strapi: Core.Strapi) {
  const seedDir = path.resolve(__dirname, '../../seed-data');
  if (!fs.existsSync(seedDir)) {
    console.log('No seed-data directory found, skipping image seed');
    return;
  }

  console.log('Uploading seed images...');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects = await (strapi as any).documents('api::project.project').findMany({
    locale: 'ru',
    limit: 100,
  });

  for (const project of projects) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const proj = project as any;
    const imageDir = PROJECT_IMAGE_MAP[proj.slug];
    if (!imageDir) continue;

    const dirPath = path.join(seedDir, imageDir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    if (files.length === 0) continue;

    const uploadedIds: number[] = [];

    for (const fileName of files) {
      const filePath = path.join(dirPath, fileName);
      const stats = fs.statSync(filePath);
      const ext = path.extname(fileName).toLowerCase();
      const mimeMap: Record<string, string> = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.webp': 'image/webp',
      };

      try {
        const uploadService = strapi.plugin('upload').service('upload');
        const [uploaded] = await uploadService.upload({
          data: {},
          files: {
            filepath: filePath,
            originalFilename: fileName,
            mimetype: mimeMap[ext] || 'image/jpeg',
            size: stats.size,
          },
        });
        uploadedIds.push(uploaded.id);
      } catch (err) {
        console.log(`    Failed to upload ${fileName}:`, (err as Error).message);
      }
    }

    if (uploadedIds.length > 0) {
      try {
        // Link media via knex to both locale rows (draft + published)
        const knex = strapi.db.connection;
        const rows = await knex('projects')
          .select('id')
          .where('document_id', proj.documentId);

        for (const row of rows) {
          for (let i = 0; i < uploadedIds.length; i++) {
            await knex('files_related_mph').insert({
              file_id: uploadedIds[i],
              related_id: row.id,
              related_type: 'api::project.project',
              field: 'images',
              order: i + 1,
            });
          }
        }
        console.log(`  ${proj.title}: ${uploadedIds.length} images`);
      } catch (err) {
        console.log(`  Failed to link images to ${proj.title}:`, (err as Error).message);
      }
    }
  }
}

async function autoCreateAdmin(strapi: Core.Strapi) {
  const email = process.env.STRAPI_ADMIN_EMAIL;
  const password = process.env.STRAPI_ADMIN_PASSWORD;

  if (!email || !password) {
    return;
  }

  const firstname = process.env.STRAPI_ADMIN_FIRSTNAME || 'Admin';
  const lastname = process.env.STRAPI_ADMIN_LASTNAME || 'IRO';

  const existingAdmins = await strapi.query('admin::user').count();
  if (existingAdmins > 0) {
    console.log('Admin user already exists, skipping auto-creation');
    return;
  }

  const superAdminRole = await strapi.query('admin::role').findOne({
    where: { code: 'strapi-super-admin' },
  });

  if (!superAdminRole) {
    console.warn('Super admin role not found, cannot auto-create admin');
    return;
  }

  const hashedPassword = await strapi.admin.services.auth.hashPassword(password);

  await strapi.query('admin::user').create({
    data: {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      isActive: true,
      blocked: false,
      roles: [superAdminRole.id],
    },
  });

  console.log(`Admin user created: ${email}`);

  // Auto-create API token for frontend
  const existingToken = await strapi.query('admin::api-token').findOne({
    where: { name: 'Frontend Public' },
  });
  if (existingToken) {
    console.log('API token "Frontend Public" already exists, skipping');
    return;
  }

  try {
    const tokenService = strapi.admin.services['api-token'];
    const token = await tokenService.create({
      name: 'Frontend Public',
      description: 'Auto-generated token for frontend API access',
      type: 'full-access',
      lifespan: null,
    });

    console.log('API Token created (save this for VITE_STRAPI_TOKEN):');
    console.log(`   ${token.accessKey}`);
  } catch (err) {
    console.log('Could not auto-create API token:', (err as Error).message);
  }
}
