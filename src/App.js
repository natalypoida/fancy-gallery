import React, { useState, useEffect, useRef } from "react";
import { accessKey, apiUrl } from "./credentials";
import "./App.css";
import axios from "axios";

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const loader = useRef(null);
  const handleClick = (newQuery) => {
    if (newQuery !== query) {
      setImages([]);
      setPage(1)
    }
    setQuery(newQuery)
  };
  const fetchImages = () => {
    axios
      .get(`${apiUrl}photos/?client_id=${accessKey}&per_page=20&page=${page}`)
      .then((response) => setImages([...images, ...response.data]));
  };
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.intersectionRatio > 0) {
      setPage((page) => page + 1);
    }
  };
  const searchImages = () => {
    axios
      .get(`${apiUrl}search/photos/?client_id=${accessKey}&per_page=20&page=${page}&query=${query}`)
      .then((response) => setImages([...images, ...response.data.results]));
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      treshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);
  useEffect(() => {
    if (query) {
      searchImages()
    }
    else {
      fetchImages()
    }
  } , [page, query]);

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
      </div>
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
      <div ref={loader}>Loading...</div>
    </div>
  );
}
