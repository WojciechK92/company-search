import AuthForm from '../../Auth/AuthForm';
import useAuth from '../../../hooks/useAuth';

function ProfileDetails() {

  const [auth, setAuth] = useAuth();

  const submit = (form) => {
    // request to backend
  };

  return (
    <AuthForm 
      header='Edit profile' 
      buttonText='Save'
      onSubmit={submit} />
  );
};

export default ProfileDetails;