import { useRouteMatch } from 'react-router-dom';
import LinkButton from '../../../components/UI/LinkButton/LinkButton';

const MyCompanies = () => {

  const { url } = useRouteMatch();

  return (
    <div>
      <p>Your list is empty!</p>
      <LinkButton to={`${url}/add`}>Create</LinkButton>
    </div>
  );
};

export default MyCompanies;