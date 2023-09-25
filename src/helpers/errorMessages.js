export const convertErrorMessage = (errorMessage) => {
  switch (errorMessage) {
    case 'auth/invalid-login-credentials':
      return 'Incorrect e-mail or password!';
    case 'auth/email-already-in-use':
      return 'Email already in use! Please enter a different email address!'
    case 'auth/weak-password':
      return 'Too weak password! The password must contain at least 6 characters.'
    case 'auth/invalid-email':
      return 'Invalid e-mail!'
    case 'auth/too-many-requests':
      return 'The allowed number of attempts has been exceeded! Come back later.';
    default:
      return errorMessage;
  };
};