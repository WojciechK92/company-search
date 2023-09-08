export const reducer = (state, action) => {
  switch (action.type) {
    case 'change-theme':
      const theme = state.theme === 'primary' ? 'warning' : 'primary';
      return { ...state, theme };
    case 'setCompanies':
      const companies = action.companies;
      return { ...state, companies };
    case 'setLoading':
      return { ...state, loading: false };
    case 'login':
      return { ...state, isAuthenticated: true };
    case 'logout':
      return { ...state, isAuthenticated: false };
    default:
      throw new Error(`This action doesn't exist`);
  }
};

export const initialState = {
  companies: [],
  isAuthenticated: false,
  loading: true,
  theme: 'primary',
};