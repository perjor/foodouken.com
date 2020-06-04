import { httpClient } from '@/services/httpClient';

const notificationTypes = [
  {
    name: 'Text',
    key: 'phone',
    id: 1
  },
  {
    name: 'Email',
    key: 'email',
    id: 2
  }
];

const paymentMethods = [
  {
    name: 'Cash',
    id: 1
  },
  {
    name: 'ABA Bank Transfer',
    id: 2
  }
];

const state = {
    businessInfo: {
      name: '',
      email: '',
      phone: '',
      description: '',
    },
    selectedNotificationType: [],
    selectedPaymentMethods: [],
    businessHours: [
      {
        dayOfWeek: 0,
        isClosed: true
      },
      {
        dayOfWeek: 1,
        isClosed: true
      },
    ],
    page: 1,
    notificationTypes,
    paymentMethods
};

const getters = {
  getName(state) {
    return state.businessInfo.name;
  },
  getEmail(state) {
    return state.businessInfo.email;
  },
  getPhone(state) {
    return state.businessInfo.phone;
  },
  getDescription(state) {
    return state.businessInfo.description;
  },
  page(state) {
    return state.page;
  },
  getSelectedNotificationTypes(state) {
    return state.selectedNotificationType;
  },
  getSelectedPaymentMethods(state) {
    return state.selectedPaymentMethods;
  }
};

const actions = {
  signUp({ getters, state }) {
    const registerData = {
      name: getters.getName,
      email: getters.getEmail,
      phone: getters.getPhone,
      description: getters.getDescription,
      notificationType: getters.getSelectedNotificationTypes[0],
      paymentMethodType: getters.getSelectedPaymentMethods[0],
      companySlug: 'foodouken',
      businessHours: state.businessHours
    }

    return new Promise((resolve, reject) => {
      httpClient.post(`/companies/${registerData.companySlug}/tenants`, registerData).then(
        response => {
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
    });
  }
};

const mutations = {
  updateName(state, payload) {
    state.businessInfo.name = payload;
  },
  updateEmail(state, payload) {
    state.businessInfo.email = payload;
  },
  updatePhone(state, payload) {
    state.businessInfo.phone = payload;
  },
  updateDescription(state, payload) {
    state.businessInfo.description = payload;
  },
  pageChange(state, payload) {
    state.page = payload
  },
  updateSelectedNotificationTypes(state, payload) {
    state.selectedNotificationType = [...payload]
  },
  updateSelectedPaymentMethods(state, payload) {
    state.selectedPaymentMethods = [...payload]
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
