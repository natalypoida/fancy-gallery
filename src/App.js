import React, { useState, useEffect, useRef } from "react";
import { accessKey, apiUrl } from "./credentials";
import "./App.css";
import axios from "axios";
import Pagination from './components/Pagination';
import PaginateImages from "./components/Pagination";

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [imagesPerPage] = useState(5);
  const loader = useRef(null);
  const [total, setTotal] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const handleClick = (newQuery) => {
    if (newQuery !== query) {
      setImages([]);
      setPage(1)
    }
    setQuery(newQuery)
  };
  const fetchImages = () => {
    axios
      .get(`${apiUrl}photos/?client_id=${accessKey}&per_page=30&page=${page}`)
      .then((response) => setImages(response.data));
  };
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.intersectionRatio > 0) {
      setPage((page) => page + 1);
    }
  };
  const searchImages = () => { 
    axios
      .get(`${apiUrl}search/photos/?client_id=${accessKey}&per_page=30&page=${page}&query=${query}`)
    
      .then((response) => setImages(response.data.results))
      
  }; 
  const getData = () => { 
    axios
      .get(`${apiUrl}search/photos/?client_id=${accessKey}&per_page=30&page=${page}&query=${query}`)
    
      .then((response) => setTotal(response.data.total))
      
  }; 
  const getDataPages = () => { 
    axios
      .get(`${apiUrl}search/photos/?client_id=${accessKey}&per_page=30&page=${page}&query=${query}`)
    
      .then((response) => setTotalPages(response.data.total_pages))
      
  }; 

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      treshold: 1.0,
    };

   // const observer = new IntersectionObserver(handleObserver, options);
    //if (loader.current) {
    //  observer.observe(loader.current);
    //}
  }, []);
  useEffect(() => {
    if (query) {
      searchImages();
      getData();
      getDataPages()
      
    }
    else {
      fetchImages()
    }
  } , [page, query]);
const paginate = pageNumber => setPage(pageNumber);
  return (
    <div className="container">
      <header className="header">
        <h1>Fancy Gallery</h1>
      </header>
      <div className="tags">
        <button onClick={() => handleClick('cats')}>CATS</button>
        <button onClick={() => handleClick('dogs')}>DOGS</button>
        <button onClick={() => handleClick('sea')}>SEA</button>
        <button onClick={() => handleClick('')}>RANDOM</button>
        <h3>total images: {total}</h3> 
  <h3>total pages: {totalPages}</h3>
      </div>
      < PaginateImages imagesPerPage={imagesPerPage}
      totalImages = {total}
     />
      <div className="image-grid">
        {images.map((image) => {
          const { id, alt_description, urls, color } = image;

          return (
            <div className="image-item" key={id}>
              <img src={urls.small} alt={alt_description} style={{backgroundColor:color}} />
            </div>
          );
        })}
      </div>
      
      
    </div>
  );
}