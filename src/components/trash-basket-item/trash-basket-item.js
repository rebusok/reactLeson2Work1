import React from 'react';
import './trash-basket-item.css';


const TrashBasketItem = ({ label, onRestoreItem }) => {
  
  return (
    <span className="trash-basket-item">
      <span
          className="trash-basket-item-label"
        >
        { label }
      </span>

    <button type="button"
        className="btn btn-outline-info btn-sm float-right"
        onClick={ onRestoreItem }
      >
        <i className="fa fa-reply"></i>
    </button>

    </span>
  );
};


export default TrashBasketItem;