import LinkButton from '../../../components/UI/LinkButton/LinkButton';

const MyCompanies = () => {

  return (
    <div>
      <p>Your list is empty!</p>
      <LinkButton to='/companies/create'>Create</LinkButton>
    </div>
  );
};

export default MyCompanies;