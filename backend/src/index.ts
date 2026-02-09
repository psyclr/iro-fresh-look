import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
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
    ];

    // Set permissions for each content type
    for (const ct of contentTypes) {
      for (const action of ct.actions) {
        const actionString = `${ct.uid}.${action}`;

        // Try to find existing permission
        let permission = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({
            where: {
              role: publicRole.id,
              action: actionString,
            },
          });

        // Create permission if it doesn't exist
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
          console.log(`✨ Created and enabled: ${actionString}`);
        } else if (!permission.enabled) {
          // Enable if exists but disabled
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: permission.id },
              data: { enabled: true },
            });
          console.log(`✅ Enabled: ${actionString}`);
        } else {
          console.log(`ℹ️  Already enabled: ${actionString}`);
        }
      }
    }

    console.log('🚀 Public permissions configured successfully');

    // Auto-seed initial data from iro.by
    await seedInitialData(strapi);
  },
};

async function seedInitialData(strapi: Core.Strapi) {
  // Check if data already exists
  const existingCommunities = await strapi.entityService.findMany('api::community.community', {
    limit: 1,
  });

  if (existingCommunities && existingCommunities.length > 0) {
    console.log('📦 Initial data already exists, skipping seed');
    return;
  }

  console.log('\n🌱 Seeding initial data from iro.by...');

  // Real communities data
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
      phone: '+375 (44) 555-06-83',
      email: 'iro13b@gmail.com',
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
      phone: '+375 (44) 555-06-83',
      email: 'iro13b@gmail.com',
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
      phone: '+375 (44) 555-06-83',
      email: 'iro13b@gmail.com',
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
      phone: '+375 (44) 555-06-83',
      email: 'iro13b@gmail.com',
      address: 'г. Могилев',
      coordinates: { lat: 53.8978, lng: 30.3331 },
      order: 5,
    },
  ];

  const projectsRu = [
    {
      title: 'Поддержка общин',
      slug: 'support-communities',
      description: 'Поддержка 15 еврейских общин по всей Беларуси',
      content: 'ИРО поддерживает 15 еврейских общин по всей Беларуси, реализуя совместные проекты.',
      icon: 'Users',
      order: 1,
      locale: 'ru',
    },
    {
      title: 'Гуманитарная помощь',
      slug: 'humanitarian-aid',
      description: 'Помощь нуждающимся членам общины',
      content: 'Ежегодно оказываем гуманитарную помощь еврейскому населению.',
      icon: 'Heart',
      order: 2,
      locale: 'ru',
    },
    {
      title: 'Газета «Берега»',
      slug: 'berega-newspaper',
      description: 'Единственное еврейское СМИ в Беларуси',
      content: 'Выпускаем единственное еврейское СМИ в Беларуси — газету «Берега».',
      icon: 'Newspaper',
      order: 3,
      locale: 'ru',
    },
  ];

  const projectsEn = [
    {
      title: 'Community Support',
      slug: 'support-communities-en',
      description: 'Supporting 15 Jewish communities across Belarus',
      content: 'IRO supports 15 Jewish communities throughout Belarus.',
      icon: 'Users',
      order: 1,
      locale: 'en',
    },
    {
      title: 'Humanitarian Aid',
      slug: 'humanitarian-aid-en',
      description: 'Assistance to community members in need',
      content: 'We annually provide humanitarian assistance to the Jewish population.',
      icon: 'Heart',
      order: 2,
      locale: 'en',
    },
  ];

  // Create communities
  console.log('📍 Creating communities...');
  for (const community of communities) {
    try {
      // Remove empty string fields to avoid validation errors
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Strapi entityService requires flexible typing for optional fields
      const data: Record<string, any> = { ...community };
      if (!data.email) delete data.email;
      if (!data.phone) delete data.phone;
      if (!data.leader) delete data.leader;

      await strapi.entityService.create('api::community.community', {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- dynamic data after optional field removal
        data: { ...data, publishedAt: new Date() } as any,
      });
      console.log(`  ✅ ${community.name}`);
    } catch (error) {
      console.log(`  ❌ ${community.name}:`, error.message);
    }
  }

  // Create projects (Russian)
  console.log('🎯 Creating projects (RU)...');
  for (const project of projectsRu) {
    try {
      await strapi.entityService.create('api::project.project', {
        data: { ...project, publishedAt: new Date() },
      });
      console.log(`  ✅ ${project.title}`);
    } catch (error) {
      console.log(`  ❌ ${project.title}:`, error.message);
    }
  }

  // Create projects (English)
  console.log('🎯 Creating projects (EN)...');
  for (const project of projectsEn) {
    try {
      await strapi.entityService.create('api::project.project', {
        data: { ...project, publishedAt: new Date() },
      });
      console.log(`  ✅ ${project.title}`);
    } catch (error) {
      console.log(`  ❌ ${project.title}:`, error.message);
    }
  }

  // Create settings
  console.log('⚙️  Creating settings...');
  try {
    await strapi.entityService.create('api::setting.setting', {
      data: {
        site_name: 'Иудейское Религиозное Объединение в Республике Беларусь',
        site_description: 'Официальный сайт ИРО в РБ',
        hero_title: 'Добро пожаловать на официальный сайт ИРО в РБ!',
        hero_subtitle:
          'Мы являемся центром иудейской общины, продолжая традиции нашего народа.',
        contact_email: 'iro13b@gmail.com',
        contact_phone: '+375 (44) 555-06-83',
        communities_title: 'Наши общины',
        communities_description: 'Еврейские общины по всей Беларуси',
        projects_title: 'Наши проекты',
        projects_description: 'Программы и инициативы ИРО',
        publishedAt: new Date(),
      },
    });
    console.log('  ✅ Settings created');
  } catch (error) {
    console.log('  ❌ Settings:', error.message);
  }

  console.log('✨ Initial data seeded successfully!\n');
}
