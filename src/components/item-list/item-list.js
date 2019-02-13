import React from 'react';
import './item-list.css';

const ItemList = (props) => {
  const { data, children: renderItem, onItemSelected } = props;

  const elements = data.map((item) => {
    const { id } = item;
    const label = renderItem(item);

    return (
      <li className="list-group-item" 
          key={id}
          onClick={() => onItemSelected(id)}>
        {label}
      </li>
    )
  });

  return (
    <ul className="item-list list-group mb-3">
      {elements}
    </ul>
  )
}

ItemList.defaultProps = {
  onItemSelected: () => {}
}

export default ItemList;