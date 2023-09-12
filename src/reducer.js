export const reducer = (state, action) => {
  switch (action.type) {
    case 'change-theme':
      const theme = state.theme === 'primary' ? 'warning' : 'primary';
      return { ...state, theme };
    case 'login':
      return { ...state, isAuthenticated: true };
    case 'logout':
      return { ...state, isAuthenticated: false };
    default:
      throw new Error(`This action doesn't exist`);
  }
};

export const initialState = {
  isAuthenticated: true,
  theme: 'warning',
};