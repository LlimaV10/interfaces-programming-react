import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import * as axios from "axios";

const Products = props => {
  const {type_id} = useParams();
  const [type, setType] = useState({})
  const [goods, setGoods] = useState(null)

  useEffect(() => {
    const getTypeAndThenGoods = () => {
      axios.get("http://127.0.0.1:5000/product_type/" + type_id)
        .then((responce) => {
          setType(responce.data)
          getGoods()
        })
    }

    const getGoods = () => {
      axios.get("http://127.0.0.1:5000/products/" + type_id)
        .then((responce) => {
          setGoods(
            responce.data.map((item) => {
              return (
                <Col key={item.id} lg={3} sm={4}>
                  <ProductCard
                    img={item.image_url}
                    type={type.name}
                    title={item.title}
                    url={'/product/' + item.id}
                  />
                </Col>
              )
            })
          )
        })
    }

    getTypeAndThenGoods()
  }, [type.name, type_id])

  return (
    <div className='products'>
      <hr/>
      <div className='textDivider'>{type.name}</div>
      <hr/>
      <Container fluid="md">
        <Row>
          {goods}
        </Row>
      </Container>
    </div>
  )
}

export default Products