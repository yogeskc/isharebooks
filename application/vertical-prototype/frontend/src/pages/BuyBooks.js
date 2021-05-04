import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import './BuyBooks.css';
import axios from 'axios';
import DialogBox from '../components/DialogBox';
import { useDispatch, useSelector } from 'react-redux';
import BuyBookModal from './BuyBookModal';
import BookGrid from './BookGrid';

import {setSearchField } from '../redux/actions/userActions';
import {DropdownButton, Dropdown} from 'react-bootstrap'

const BuyBooks = () => {
  const [open, setOpen] = React.useState(false);
  const [hasOpened, setHasOpened] = React.useState(false);

  const [filterBy, setFilterBy] = React.useState('Filter');
  const [searchMessage, setSearchMessage] = React.useState("Books to Buy");
  const search = useSelector((state) => state.userReducer.searchField);
  

  const searchData = {
    searchTable: 'paidbooks',
    searchType: filterBy,
    searchField: search,
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.innerText);

  }


  const dispatch = useDispatch();
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log(searchData);
      axios.post(`http://${window.location.hostname}:3001/search`, searchData).then((response) => {
        console.log(response);
        if (!response.data.msg) {
          setPaidBooks(response.data);
          setSearchMessage(`Showing results for ${search}`);
        }
        else {
          setPaidBooks(response.data.results);
          setSearchMessage(`Sorry, no results were found. Suggestions: `);
        }
      });
    }
  };
  const handleSearch = (e) => {
    console.log(search);
  };

  const [paidBooks, setPaidBooks] = useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `http://${window.location.hostname}:3001/paidbooks`
      );
      console.log(res.data.results);
      setPaidBooks(res.data.results);
    }
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setHasOpened(true);
  };

  const click1 = () => {
    console.log("!");
  }

  if (!open && hasOpened) {
    console.log("...d");
    setHasOpened(false);
    axios.get(`http://${window.location.hostname}:3001/paidbooks`).then((res) => {
      console.log(res.data.results);
      setPaidBooks(res.data.results);
    });
  }

  return (
    <div className="buybooks">
      <Navigation />

      <div className="buybooks__page">
        <div className="buybooks__container">
        <DropdownButton className="dropdown" title={filterBy}  size="lg">
              <Dropdown.Item className="opt" as="button" onClick={handleFilterChange}>All</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="opt" as="button" onClick={handleFilterChange}>Title</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="opt" as="button" onClick={handleFilterChange}>Author</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="opt" as="button" onClick={handleFilterChange}>Department</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="opt" as="button" onClick={handleFilterChange}>ISBN</Dropdown.Item>
            </DropdownButton>
          <div className="search__content">
            
            <input
              className="searchBar"
              type="text"
              placeholder="Search by textbook name, department..."
              required
              onKeyDown={handleKeyDown}
              onChange={(e) => dispatch(setSearchField(e.target.value))}
            />
          
            <button onClick={handleSearch} className="search__btn">
              <SearchIcon className="search__icon" />
            </button>
            
            
          
          
            </div>

            
          <div className="post__book">
            <div className="post__book__container">
              <p className="post__book__text">POST YOUR BOOK FOR SELL</p>
              <Button className="post__book__button" onClick={handleClickOpen}>
                POST
              </Button>
              <DialogBox
                open={open}
                setOpen={setOpen}
                title="SELL YOUR BOOK"
                button="DONE"
                onClick={click1}
              >
                <BuyBookModal />
              </DialogBox>
            </div>
          </div>
          <div className="post__book__content">
            <h2 className="post__book__title">{searchMessage}</h2>
          </div>
        </div>
        <div className="post__book__grid">
          {paidBooks.map((book, index) => {
            return (
              <BookGrid
                key={index}
                id={book.book_id}
                title={book.title}
                author={book.author}
                department={book.department}
                isbn={book.isbn}
                condition={book.condition}
                image={book.image}
                price={book.cost}
                type="paid"
                name={book.name}
                sellerid={book.user_id}
                sellerEmail={book.email}
                defaultImage="default"
              />
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuyBooks;
