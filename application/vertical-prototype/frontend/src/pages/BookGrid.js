import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import './BuyBooks.css';

import { setCartItem } from '../redux/actions/userActions';

const BookGrid = ({ id, title, author, department, isbn, price, image }) => {
  const dispatch = useDispatch();

  const handleAddCart = () => {
    // console.log(itemsArray.title);
    dispatch(
      setCartItem({
        id,
        title,
        author,
        department,
        isbn,
        price,
        image,
      })
    );
  };

  return (
    <div>
      {/* <div className="post__book__grid"> */}
      <div className="post__book__details">
        <img
          style={{ height: 200, width: 200 }}
          src={image}
          alt="book_image"
          className="post__book__image"
        />
        <Button className="buy__book__button" onClick={handleAddCart}>
          Add to cart
        </Button>

        <p className="post__book__price">{price}</p>
      </div>
      {/* </div> */}
    </div>
  );
};

export default BookGrid;
