/* Component for displaying a book cover image. 
   This component receives the cover image URL and the book title as props.
   If the cover image URL is not provided, it displays a default book cover image.
   The BookCover component is used in the BookItem component to display the book cover image. */

import React from 'react';
import covernotavailable from '../../assets/images/covernotavailable.png';

const BookCover = ({ coverImage, title }) => (
    <div className="book-cover-container">
      <img 
        src={coverImage || covernotavailable} 
        alt={`Cover of ${title}`} 
        className="book-cover-large"
      />
    </div>
);
  
export default BookCover;
  