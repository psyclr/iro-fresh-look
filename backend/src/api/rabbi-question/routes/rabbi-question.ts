export default {
  routes: [
    {
      method: 'POST',
      path: '/rabbi-questions',
      handler: 'rabbi-question.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
