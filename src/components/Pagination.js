import React from "react";
import Pagination from '@material-ui/lab/Pagination';

const PaginateImages = ({ imagesPerPage, totalImages}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalImages / imagesPerPage); i++) {
    pageNumbers.push(i);
  }
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
      setPage(value);
  }
  return (
    <Pagination className="my-3"
    count={totalImages}
    page={page}
    siblingCount={1}
    boundaryCount={1}
    variant='outlined'
    shape='rounded'
    onChange= {handleChange}
    />
       // {pageNumbers.map((number) => (
         // <li key={number} className="page-item">
           // <a onClick={() => paginate(number) }href="!#" className="page-link is-active">
             // {number}
            //</a>
         // </li>
       // ))}
     // </ul>
    //</nav>
  );
};

export default PaginateImages;
