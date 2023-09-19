import AuthForm from '../../Auth/AuthForm';

function ProfileDetails() {

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