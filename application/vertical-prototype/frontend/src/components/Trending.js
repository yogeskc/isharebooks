import React, { useState } from 'react';
import './Trending.css';
import Carousel from 'react-elastic-carousel';
import Card from './Card';
import { useSelector } from 'react-redux';
import defaultImage from './book1.jpg';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const Trending = () => {
  const [trendingBooks, setTrendingBooks] = useState([]);
  React.useEffect(async () => {
    Aos.init({ duration: 1600 });

    const res = await axios.get(
      'http://' + window.location.hostname + ':3001/fire',
      {
        // searchField: '',
        // searchType: 'any',
      }
    );
    console.log(res.data);
    setTrendingBooks(res.data.results);
  }, []);

  const searchField = useSelector((state) => state.userReducer.searchField);
  const posts = useSelector((state) => state.userReducer.posts);
  const randomMsg = useSelector((state) => state.userReducer.randomMsg);

  // console.log(trendingBooks);
  const breakPoints = [
    { width: 500, itemsTo0how: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 4 },
    { width: 1500, itemsToShow: 4 },
  ];

  return (
    <div className="trending__container" data-aos="fade-right" id="trending">
      {randomMsg && posts.length > 0 && (
        <div className="trending__container">
          <div className="trending__title">
            <h3 className="trending"> {randomMsg}</h3>
          </div>

          <Carousel breakPoints={breakPoints}>
            {posts.map((post, index) => {
              return (
                <Card
                  key={index}
                  number={index}
                  image={post.image}
                  defaultImage={defaultImage}
                />
              );
            })}
          </Carousel>
        </div>
      )}
      {!randomMsg && posts.length > 0 && (
        <div className="trending__container">
          <div className="trending__title">
            <h3 className="trending"> Showing Results for {searchField}</h3>
          </div>

          <Carousel breakPoints={breakPoints}>
            {posts.map((post, index) => {
              return (
                <Card
                  key={index}
                  number={index}
                  image={post.image}
                  defaultImage={defaultImage}
                />
              );
            })}
          </Carousel>
        </div>
      )}

      {posts.length === 0 && (
        <div className="trending__container">
          <div className="trending__title">
            <h3 className="trending">Trending Books!</h3>
          </div>
          <Carousel breakPoints={breakPoints}>
            {trendingBooks.map((post, index) => {
              return (
                <Card
                  key={index}
                  // number={index}
                  id={post.id}
                  title={post.title}
                  author={post.author}
                  department={post.department}
                  isbn={post.isbn}
                  condition={post.condition}
                  image={post.image}
                  price={34.33}
                  defaultImage="default"
                />
              );
            })}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default Trending;
