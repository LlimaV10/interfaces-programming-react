import React from "react";
import {Link} from "react-router-dom";

const ProductCard = props => {
    const {
        type,
        img,
        title,
        url
    } = props;

    return (
        <Link
            to={url}
            className='productCard'
        >
            <img src={img} alt={type}/>
            <div className='typeName'><div>{type}</div></div>
            <div className='title'><div>{title}</div></div>
        </Link>
    )
}

export default ProductCard