/* eslint-disable react/prop-types */
import './styles.css';

function ItemList({title, description}) {
  return (
    <div className='item-list'>
        <strong>
            {title}
        </strong>
        <p>{description}</p>
    </div>
  )
}

export default ItemList;