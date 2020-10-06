import React from "react";
//import Pagination from '@material-ui/lab/Pagination';




const ImagesPagination = ({ imagesPerPage, totalImages, paginate}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalImages / imagesPerPage); i++) {
    pageNumbers.push(i);
  }
  //const [page, setPage] = React.useState(1);
//const handlePageChange = (event, value) => {
    //  pageNumbers.map((value) => (
          //setPage(value)
      //))};
    //setPage(pageNumber)
    //setPage(value)
  //};
  //const handlePageChange = (entities) => {
    //const target = entities[0];
    //if (target.intersectionRatio > 0) {
    //  setPage((page) => page + 1);
   // }
  //};
  return (
    //<Pagination 
    //className="my-3"
    //count={totalPages}
    //page={page}
    //siblingCount={1}
    //boundaryCount={1}
    //variant='outlined'
    //shape='rounded'
    //onChange={handlePageChange}
    
   // />
    <nav>
        <ul className="pagination">
       {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number) }href="!#" className="page-link is-active">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};



export default ImagesPagination;
