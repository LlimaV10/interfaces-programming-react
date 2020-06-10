import React, {useEffect, useState} from 'react'
import ProductCard from "../components/ProductCard";
import {Container, Row, Col} from 'react-bootstrap'
import ProductType from "../components/ProductType";
import * as axios from "axios";

const Home = () => {
  const [types, setTypes] = useState(null);
  const [goods, setGoods] = useState(null);

  useEffect(() => {
    const getTypesAndThenProducts = () => {
      axios.get("http://127.0.0.1:5000/product_type")
        .then((responce) => {
          setTypes(responce.data.map((item) => {
            return (
              <Col key={item.id} sm={4}>
                <ProductType
                  name={item.name}
                  url={'/products/' + item.id}
                />
              </Col>
            );
          }));
          getProducts(responce.data)
        })
    }

    const getProducts = (types) => {
      axios.get("http://127.0.0.1:5000/products")
        .then((responce) => {
          setGoods(responce.data.map((item) => {
            const typeName = types.filter(type => type.id === item.type_id)[0].name;
            return (
              <Col key={item.id} lg={3} sm={4}>
                <ProductCard
                  img={item.image_url}
                  type={typeName}
                  title={item.title}
                  url={'/product/' + item.id}
                />
              </Col>
            );
          }));
        })
    }

    getTypesAndThenProducts();
  }, [])

  return (
    <div className='home'>
      <hr/>
      <div className='textDivider'>Товары по типам:</div>
      <Container fluid="md">
        <Row>
          {types}
        </Row>
      </Container>
      <hr/>
      <div className='textDivider'>Все товары:</div>
      <Container fluid="md">
        <Row>
          {goods}
        </Row>
      </Container>
    </div>
  )
}

export default Home