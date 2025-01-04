// Component for displaying a book cover image
const BookCover = ({ coverImage, title }) => (
    <div className="book-cover-container">
      <img 
        src={coverImage || 'default-book-cover.jpg'} 
        alt={`Cover of ${title}`} 
        className="book-cover-large"
      />
    </div>
  );
  
  export default BookCover;
  