const juvo = {
  index: '/',
  billing: {
    index: '/billing',
    error: '/billing/error',
    card: '/billing/card',
  },
  contacts: {
    index: '/contacts',
    pageRoute: '/contacts/page/:id',
    pageLink: id => `/contacts/page/${id}`,
    create: '/contacts/create',
    infoRoute: '/contacts/:id',
    infoLink: id => `/contacts/${id}`,
    importFile: '/contacts/import',
    importWeb: '/contacts/import/web',
  },
  dashboard: {
    index: '/dashboard',
  },
  diary: {
    index: '/diary',
    create: '/diary/create',
    infoRoute: '/diary/:id',
    infoLink: id => `/diary/${id}`,
  },
  documents: {
    index: '/documents',
    pageRoute: '/documents/page/:id',
    pageLink: id => `/documents/page/${id}`,
  },
  emailsms: {
    index: '/emailsms',
  },
  managements: {
    index: '/:category/managements',
    pageRoute: '/:category/managements/page/:id',
    pageLink: id => `/managements/page/${id}`,
  },
  properties: {
    index: '/properties',
    pageRoute: '/properties/page/:id',
    pageLink: id => `/properties/page/${id}`,
    create: '/properties/create',
    infoRoute: '/properties/:id',
    infoLink: id => `/properties/${id}`,
    assets: {
      imagesRoute: 'images',
      imagesLink: id => `/properties/${id}/images`,
      floorplansRoute: 'floorplans',
      floorplansLink: id => `/properties/${id}/floorplans`,
      epcRoute: 'epc',
      epcLink: id => `/properties/${id}/epc`,
      brochuresRoute: 'brochures',
      brochuresLink: id => `/properties/${id}/brochures`,
    },
  },
  offers: {
    index: '/offers',
    infoRoute: '/offers/:id',
    infoLink: id => `/offers/${id}`,
    create: '/offers/create',
  },
  support: {
    index: '/support',
  },
  settings: {
    index: '/settings',
  },
  tenancies: {
    index: '/tenancy',
    infoRoute: '/tenancy/:id',
    infoLink: id => `/tenancy/${id}`,
    create: '/tenancy/create',
    client: {
      index: '/tenancy/client',
      pageRoute: '/tenancy/client/page/:id',
      pageLink: id => `/tenancy/client/page/${id}`,
    },
    landlords: {
      index: '/tenancy/landlords',
      pageRoute: '/tenancy/landlords/page/:id',
      pageLink: id => `/tenancy/landlords/page/${id}`,
      statementsRoute: '/tenancy/:id/landlords/:rentId/statements',
      statementsLink: (id, rentId) => `/tenancy/${id}/landlords/${rentId}/statements`,
    },
    rents: {
      index: '/tenancy/rents',
      pageRoute: '/tenancy/rents/page/:id',
      pageLink: id => `/tenancy/rents/page/${id}`,
    },
  },
  options: {
    index: '/options',
    appointmentsRoute: 'appointment-types',
    appointmentsLink: '/options/appointment-types',
    countriesRoute: 'country-codes',
    countriesLink: '/options/country-codes',
    locationsRoute: 'locations',
    locationsLink: '/options/locations',
    notesRoute: 'note-types',
    notesLink: '/options/note-types',
    propertiesRoute: 'property-types',
    propertiesLink: '/options/property-types',
    sourcesRoute: 'client-source',
    sourcesLink: '/options/client-source',
  },
  plugins: {
    index: '/plugins',
  },
  emailtemplates: {
    index: '/emailtemplates',
  },
  templates: {
    index: '/templates',
  },
  user: {
    index: '/user',
    profile: '/user/me',
    create: '/user/create',
    infoRoute: '/user/:id',
    infoLink: id => `user/${id}`,
  },
  forgot: {
    index: '/forgot-password',
  },
  signIn: {
    index: '/sign-in',
    login: '/Login',
  },
  signUp: {
    index: '/sign-up',
  },
  reset: {
    index: '/reset-password',
  },
};

export default juvo;
