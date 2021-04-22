import React, { useState } from 'react';
import './Modals.css';
import axios from 'axios';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';

const FreeBookModal = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [department, setDepartment] = useState('');
  const [isbn, setIsbn] = useState('');
  const [condition, setCondition] = useState('');
  const [image, setImage] = useState('');
  const imageRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const freeBook = {
      title: title,
      author: author,
      department: department,
      isbn: isbn,
      type: 'free',
      condition: condition,
      image: image.name,
    };

    console.log(freeBook);

    setTitle('');
    setAuthor('');

    setDepartment('');
    setIsbn('');
    setCondition('');
    setImage('');

    axios.post('http://localhost:3001/posts', freeBook).then((response) => {
      if (!response.data.bookPosted) {
        alert(response.data.msg);
      } else {
        store.addNotification({
          title: '',
          message: response.data.msg,
          type: 'success',
          insert: 'top',
          container: 'top-center',
          dismiss: {
            duration: 2000,
            showIcon: true,
          },
        });
      }
    });
  };

  return (
    <div>
      <ReactNotification />
      <div className="body">
        <div className="left-side">
          <p className="head-left">
            Donate Your Book To Help Your Friends For Easy Access
          </p>
          <img
            src="https://via.placeholder.com/150"
            alt="some-image"
            className="bookpic"
          />
        </div>
        <div className="box">
          <h1 className="head-right">Donate A Book</h1>
          <div className="form">
            <p>Title</p>
            <input
              type="text"
              name="title"
              placeholder="title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <p>Author</p>
            <input
              type="text"
              name="author"
              placeholder="author..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            ></input>
            <p>Department</p>
            <input
              type="text"
              name="department"
              placeholder="department..."
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            ></input>
            <p>ISBN</p>
            <input
              type="text"
              name="isbn"
              placeholder="ISBN..."
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            ></input>
            <p>Condition</p>
            <input
              type="text"
              name="condition"
              placeholder="condition..."
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            ></input>
            <p>Upload Image</p>
            <input
              id="input-image"
              type="file"
              name="image"
              accept=".jpg, .png, .jpeg"
              // value={image}
              className="form-control"
              ref={imageRef}
              onChange={(e) => setImage(e.target.files[0])}
              single="true"
            />
            {/* <button className="buttn" type="button">
              Upload Image
            </button> */}
            <button className="buttn" type="button" onClick={handleSubmit}>
              DONATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeBookModal;
