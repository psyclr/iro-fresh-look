export default {
  routes: [
    {
      method: 'GET',
      path: '/communities',
      handler: 'community.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/communities/:id',
      handler: 'community.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/communities',
      handler: 'community.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/communities/:id',
      handler: 'community.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/communities/:id',
      handler: 'community.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
