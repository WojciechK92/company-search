export const reducer = (state, action) => {
  switch (action.type) {
    case 'change-theme':
      const theme = state.theme === 'primary' ? 'warning' : 'primary';
      return { ...state, theme };
    case 'login':
      return { ...state, user: action.user};
    case 'logout':
      return { ...state, user: null };
    default:
      throw new Error(`This action doesn't exist`);
  }
};

export const initialState = {
  user: JSON.parse(window.localStorage.getItem('user')) ?? null,
  theme: 'warning',
};