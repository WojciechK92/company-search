import LinkButton from '../../../components/UI/LinkButton/LinkButton';

const MyCompanies = () => {

  return (
    <div>
      <p>Your list is empty!</p>
      <LinkButton to='/profile/companies/add'>Create</LinkButton>
    </div>
  );
};

export default MyCompanies;