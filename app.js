import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [bookName, setBookName] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookName || !rating) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    const newReview = {
      bookName,
      rating,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      isFavorite: false
    };
    setReviews([...reviews, newReview]);
    setBookName('');
    setRating('');
    setErrorMessage('');
  };

  const handleFavoriteToggle = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].isFavorite = !updatedReviews[index].isFavorite;
    setReviews(updatedReviews);
  };

  const handleDelete = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  return (
    <div className="App">
      <h1>Book Review</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Book Name:</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Rating (1-10):</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="10"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="reviews">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>Book Name:</strong> {review.bookName}</p>
            <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Date:</strong> {review.date}</p>
            <p><strong>Time:</strong> {review.time}</p>
            <button onClick={() => handleFavoriteToggle(index)}>
              {review.isFavorite ? 'Unmark Favorite' : 'Mark Favorite'}
            </button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
