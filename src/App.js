import React, { useState, useEffect, useRef } from "react";
import { ACCESS_KEY,  API_URL } from "./credentials";
import "./App.css";
import axios from "axios";
import ImagesPagination from "./components/Pagination";

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const loader = useRef(null);
  const [total, setTotal] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const handleClick = (newQuery) => {
    if (newQuery !== query) {
      setImages([]);
      setPage(1);
    }
    setQuery(newQuery);
  };
  const fetchImages = () => {
    axios
      .get(`${ API_URL}photos/?client_id=${ACCESS_KEY}&per_page=30&page=${page}`)
      
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
      .get(
        `${ API_URL}search/photos/?client_id=${ACCESS_KEY}&per_page=30&page=${page}&query=${query}`)
      .then((response) => setImages(response.data.results));
      
  };
  const getData = () => {
    axios
      .get(
        `${ API_URL}search/photos/?client_id=${ACCESS_KEY}&per_page=30&page=${page}&query=${query}`
      )
      .then((response) => setTotal(response.data.total));
  };
  const getDataPages = () => {
    axios
      .get(
        `${ API_URL}search/photos/?client_id=${ACCESS_KEY}&per_page=30&page=${page}&query=${query}`
      )
      .then((response) => setTotalPages(response.data.total_pages));
  };

  

   
  
  useEffect(() => {
    if (query) {
      searchImages();
      getData();
      getDataPages();
    } else {
      fetchImages();
    }
  }, [page, query]);
  const paginate = (pageNumber) => setPage(pageNumber);
  const DisplayTotal = () => {
    if (query) {
      return (
        <>
          <h3 className="text-info">total images: {total}</h3>
          <h3 className="text-info">total pages: {totalPages}</h3>
        </>
      );
    } else {
      return ''    
    }
  };
  return (
    <div className="container">
      <header className="header">
        <h1 className="text-info">Fancy Gallery</h1>
      </header>
      <div className="tags">
        <button type="button" className="btn btn-outline-info" onClick={() => handleClick("cats")}>CATS</button>
        <button type="button" className="btn btn-outline-info" onClick={() => handleClick("dogs")}>DOGS</button>
        <button type="button" className="btn btn-outline-info" onClick={() => handleClick("sea")}>SEA</button>
        <button type="button" className="btn btn-outline-info" onClick={() => handleClick("")}>RANDOM</button>
        <DisplayTotal />
      </div>
      <div className="pagination">
        <ImagesPagination
          totalImages={total}
          totalPages={totalPages}
          totalPages={totalPages}
          imagesPerPage={30}
          paginate={paginate}
        />
      </div>
      <div className="image-grid">
        {images.map((image) => {
          const { id, alt_description, urls, color } = image;
          return (
            <div className="image-item" key={id}>
              <img
                src={urls.small}
                alt={alt_description}
                style={{ backgroundColor: color }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
