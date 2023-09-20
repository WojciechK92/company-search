import useWebTitle from '../../hooks/useWebsiteTitle';

function NotFound() {

  useWebTitle('Company Search - NotFound');

  return (
    <div className='text-center my-5 py-5'>
      <h3>404 - Page Not Found</h3>
    </div>
  );
};

export default NotFound;