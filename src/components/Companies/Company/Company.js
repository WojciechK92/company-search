function Company(props) {
  return (
    <div className='card mx-1 my-3'>
      <div className='card-body'>
        <div className='row'>
          <div className='col-5 col-md-4 align-self-center'>
            <img 
              src='https://cdn.pixabay.com/photo/2015/06/24/16/36/home-820389_1280.jpg'
              alt='company-logo'
              className='img-thumbnail' />
          </div>
          <div className='col-7 col-md-8 py-2'>
            <div className='row mx-2 h-100 align-items-between'>
              <div className='col-8 col-md-9 p-0 text-center'>
                <h2 className='m-0 p-0'>{props.name}</h2>
                <p>{props.city}</p>
              </div>
              <div className='col-4 col-md-3 text-end'>
                <h4>
                  <span className='badge bg-dark text-light h2'>{props.rating}</span>
                </h4>
              </div>
              <div className='d-none d-md-block col-md-7 text-start'>
                <p>Employees: {props.employees}</p>
                <p>Industry: {props.industry}</p>
              </div>
              <div className='col-12 col-md-5 text-end align-self-end'>
                <a href="#" className='btn btn-primary px-4 py-2'>Open</a> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;