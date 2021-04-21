import React from 'react';
import './ViewBook.css';
import Navigation from '../components/Navigation';
import Button from '@material-ui/core/Button';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItem } from '../redux/actions/userActions';

const ViewBook = () => {
  const viewBooks = useSelector((state) => state.userReducer.viewBooks);
  const dispatch = useDispatch();

  // add to cart
  const handleAddCart = () => {
    // console.log(itemsArray.title);
    dispatch(
      setCartItem({
        id: viewBooks[viewBooks.length - 1].id,
        title: viewBooks[viewBooks.length - 1].title,
        author: viewBooks[viewBooks.length - 1].author,
        department: viewBooks[viewBooks.length - 1].department,
        isbn: viewBooks[viewBooks.length - 1].isbn,
        price: viewBooks[viewBooks.length - 1].price,
        image: viewBooks[viewBooks.length - 1].image,
        type: '',
      })
    );
  };

  return (
    <div className="viewbook_container">
      <Navigation />
      <div className="viewbook">
        <div className="viewbook_box">
          {/* <div className="viewbook_details">  */}
          <div className="viewbook_left">
            <img
              className="viewbook_image"
              style={{ height: 400, width: 300 }}
              src={viewBooks[viewBooks.length - 1].image}
              // src={viewBooks[0].image}

              alt="book"
            />
            {/* <p className="viewbook_description">Summary/Description of Book</p> */}
          </div>
          <div className="viewbook_information" id="info">
            {/* <h1 className="viewbook_title">TITLE{viewBooks[0].title}</h1>
            <p className="viewbook_author">by {viewBooks[0].author}</p>
            <p className="viewbook_department">
              <strong>Department:</strong> {viewBooks[0].department}
            </p>
            <p className="viewbook_condition">
              <strong>Condition:</strong> {viewBooks[0].condition}
            </p>
            <p className="viewbook_isbn">
              <strong>ISBN:</strong>
              {viewBooks[0].isbn}
            </p>
            <p className="viewbook_price">${viewBooks[0].price}</p> */}
            <h1 className="viewbook_title">
              {viewBooks[viewBooks.length - 1].title}
            </h1>
            <p className="viewbook_author">
              by {viewBooks[viewBooks.length - 1].author}
            </p>
            <p className="viewbook_department">
              <strong>Department:</strong>{' '}
              {viewBooks[viewBooks.length - 1].department}
            </p>
            <p className="viewbook_condition">
              <strong>Condition:</strong>{' '}
              {viewBooks[viewBooks.length - 1].condition}
            </p>
            <p className="viewbook_isbn">
              <strong>ISBN: </strong>
              {viewBooks[0].isbn}
            </p>
            <p className="viewbook_price">
              ${viewBooks[viewBooks.length - 1].price}
            </p>
            <Button onClick={handleAddCart} className="viewbook__button">
              Add to cart
            </Button>
          </div>
        </div>
        {/* </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default ViewBook;
