import React from "react";
import {Link} from "react-router-dom";

const ProductType = props => {
    const {
        name,
        url
    } = props;

    return (
        <Link
            className='productType'
            to={url}
        >
            <div>
                {name}
            </div>
        </Link>
    )
}

export default ProductType