import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';
import axios from '../../axios';
import useAuth from '../../hooks/useAuth';
import LinkButton from '../../components/UI/LinkButton/LinkButton';
import ReactStars from "react-rating-stars-component";
import useWebTitle from '../../hooks/useWebsiteTitle';
import { formatValues } from '../../helpers/formatValues';

function Company() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const [rating, setRating] = useState(0);
  useWebTitle('Company Search - Company');

  const { id } = useParams();

  const fetchCompany = async () => {
    try {
      const res = await axios.get(`/companies/${id}.json`);
     
      setCompany(res.data);
      setRating(res.data.rating || 0)
      setLoading(false);
    } catch(ex) {
      console.log(ex);
    };
  };  

  useEffect(() => {
    fetchCompany();    
  }, []);

  const ratingChanged = async (newRating) => {
    setRating(newRating);
    
    try {
      await axios.patch(`/companies/${id}.json?auth=${auth.stsTokenManager.accessToken}`, {
        rating: newRating,
      });
    } catch(ex) {
      console.log(ex);
    };
  };

    return loading 
      ? <LoadingIcon />
      : <div className='card text-center'>
          <div className='card-header'>
            <h3>{company.name}</h3>
          </div>
          <div className='card-body'>
            <div className='row align-items-center gap-2 gap-md-0'>
              <div className='col-12 col-md-6'>
                <img 
                  src={`https://picsum.photos/id/${Math.floor(Math.random() * 50)}/650/400`}
                  alt='company-logo'
                  className='img-thumbnail' />
              </div>
              <div className='col-12 col-md-6 px-md-4'>
                <table className='table'>
                  <tbody>
                    <tr>
                      <th className='text-start'>City</th>
                      <td className='text-end'>{formatValues(company.city)}</td>
                    </tr>
                    <tr>
                      <th className='text-start'>Industry</th>
                      <td className='text-end'>{formatValues(company.industry)}</td>
                    </tr>
                    <tr>
                      <th className='text-start'>Employees</th>
                      <td className='text-end'>{company.employees}</td>
                    </tr>                    
                    <tr>
                      <th className='text-start'>Benefits</th>
                      <td className='text-end'>{formatValues(company.benefits || [])}</td>
                    </tr>
                    <tr>
                      <th className='text-start'>Recruitment process</th>
                      <td className='text-end'>{formatValues(company.status)}</td>
                    </tr>
                  </tbody>
                </table>
                {auth
                  ? <div className='text-start mt-5'>
                      <p className='mb-0'>Rate the quality of services!</p>
                      <ReactStars
                        value={rating}
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                    </div>
                  : <div className='mt-5'>
                      <p>Confirm your identity to rate the company!</p>
                      <div className='d-flex justify-content-between'>
                        <LinkButton to='/login'>Login</LinkButton>
                        <LinkButton to='/register'>Register</LinkButton>
                      </div>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
  };

export default Company;