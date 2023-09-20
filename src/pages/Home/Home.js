import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Companies from '../../components/Companies/Companies';
import SpecialOffer from '../../components/SpecialOffer/SpecialOffer';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';
import LastCompany from '../../components/Companies/LastCompany/LastCompany';
import axios from '../../axios';
import objectToArrayWithId from '../../helpers/objectToArrayWithId';
import useWebTitle from '../../hooks/useWebsiteTitle';

function Home(props) {
  const [companies, setCompanies] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [specialOffer, setSpecialOffer] = useState(false);
  useWebTitle('Company Search - Home');


  const fetchCompanies = async () => {
    try {
      const res = await axios.get('/companies.json');
      const newCompanies = objectToArrayWithId(res.data);
      setCompanies(newCompanies);
      setLoading(false);
    } catch(ex) {
      console.log(ex.response);
    };
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Special offer
  const hideSpecialOffer = () => {
    setSpecialOffer(false);
  };

  useEffect(() => {
    let endTime = JSON.parse(window.localStorage.getItem('timer'));
    const now = new Date();

    if (endTime) {
      endTime = new Date(endTime);
      endTime > now ? setSpecialOffer(true) : setSpecialOffer(false);
    } else {
      endTime = now;
      endTime.setHours(endTime.getHours());
      endTime.setMinutes(endTime.getMinutes() + 2);
      endTime.setSeconds(endTime.getSeconds() + 45);
      window.localStorage.setItem('timer', JSON.stringify(endTime));
      setSpecialOffer(true);
    };
  });


  return loading 
    ? <LoadingIcon /> 
    : <>
        {specialOffer && !window.localStorage.getItem('registered')
         ? <SpecialOffer onHide={hideSpecialOffer}/>
         : null}
        {props.lastCompany 
          ? <LastCompany lastCompany={props.lastCompany} onRemove={props.onRemove} /> 
          : null}
        <Companies 
          companies={companies} 
          onOpen={props.onOpen} />
      </>
};

Home.propTypes = {
  lastCompany: PropTypes.object,
  onRemove: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default Home;