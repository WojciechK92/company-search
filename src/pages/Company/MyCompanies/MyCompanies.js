import { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import LinkButton from '../../../components/UI/LinkButton/LinkButton';
import LoadingIcon from '../../../components/UI/LoadingIcon/LoadingIcon'
import axios from '../../../axios';
import objectToArrayWithId from '../../../helpers/objectToArrayWithId';
import useAuth from '../../../hooks/useAuth';

const MyCompanies = () => {

  const { url } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [auth] = useAuth();

  const fetchCompanies = async () => {
    try {
      const res = await axios.get('/companies.json');
      const newCompanies = objectToArrayWithId(res.data);

      //filter simulation
      const filteredCompanies = newCompanies.filter(company => company.user_id === auth.userId) 

      filteredCompanies.sort((a, b) => {
        let nameA = a.name.toUpperCase(); 
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        };
        if (nameA > nameB) {
          return 1;
        };
        return 0;
      });

      setCompanies(filteredCompanies);
    } catch(ex) {
      console.log(ex.response);
    };
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, [])

  const removeCompany = async (companyId) => {
    if (window.confirm('Are you sure you want delete this company?')) {
      try {
        await axios.delete(`/companies/${companyId}.json?auth=${auth.stsTokenManager.accessToken}`); 
        fetchCompanies();
      } catch(ex) {
        console.log(ex);
      };
    };
  };

  return loading
    ? <LoadingIcon />
    : <div> 
        {companies.length 
          ? <div className='table-responsive text-center'>
              <table className='table align-middle'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th><div className='d-none d-md-block'>Industry</div></th>
                    <th><div className='d-none d-md-block'>Employees</div></th>
                    <th><div className='d-none d-lg-block'>Benefits</div></th>
                    <th><div className='d-none d-lg-block'>Recruitment process</div></th>
                    <th className=''>Option</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map(company => (
                    <tr key={company.id}>
                      <td className='text-start'>{company.name}</td>
                      <td>{company.city}</td>
                      <td><div className='d-none d-md-block'>{company.industry}</div></td>
                      <td><div className='d-none d-md-block'>{company.employees}</div></td>
                      <td><div className='d-none d-lg-block'>{company.benefits ? 'YES' : 'NO'}</div></td>
                    <td><div className={`d-none d-lg-inline badge ${company.status === 'active' ? 'bg-success' : 'bg-danger'}`}>{company.status}</div></td>
                      <td>
                        <div className='btn-group' role="group" aria-label="Editing and deleting">
                          <Link to={`/profile/companies/edit/${company.id}`} className='btn btn-warning'>Edit</Link>
                          <button onClick={() => removeCompany(company.id)} className='btn btn-danger'>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> 
            </div>
          : <p>Your list is empty!</p>
        }
        <LinkButton to={`${url}/add`}>Add</LinkButton>
      </div>
};

export default MyCompanies;