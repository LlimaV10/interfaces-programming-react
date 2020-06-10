import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import * as axios from "axios";

const Product = () => {
  const {id} = useParams();
  const [product, setProduct] = useState({});
  const [descriptionElements, setDescriptionElements] = useState(null);
  const [type, setType] = useState({})

  useEffect(() => {
    const getProductAndThenType = () => {
      axios.get("http://127.0.0.1:5000/product/" + id)
        .then((responce) => {
          setProduct(responce.data);

          setDescriptionElements(responce.data.description.split('<br>').map((item, index) => {
            return (
              <div
                className='description'
                key={index}
              >
                {item}
                <br/>
              </div>
            )
          }));

          getCategory(responce.data.type_id);
        })
    }

    const getCategory = (type_id) => {
      axios.get("http://127.0.0.1:5000/product_type/" + type_id)
        .then((responce) => {
          setType(responce.data)
        })
    }

    getProductAndThenType()
  }, [id])

  // const description = "Lenovo S145 — это 15. 6-дюймовый высокопроизводительный ноутбук, который отлично подойдет для работы и развлечений. Ноутбук оснащен производительным процессором, высокоскоростным модулем Wi-Fi и акустической системой высокого качества.<br><br>Динамический звук<br>Приготовьтесь окунуться в мир мультимедийных развлечений. Благодаря качественной аудиосистеме S145 обеспечивает громкое звучание музыки и фильмов.<br><br>Высокая скорость передачи данных<br>Ноутбук оборудован разъемом USB 3. 1, что позволяет обмениваться данными с другими устройствами со скоростью, которая в 10 раз превышает скорость интерфейсов USB более ранних версий.<br><br>Интернет на сверхвысоких скоростях<br>Ноутбук S145 оснащен встроенным модулем Wi-Fi 802. 11 ac, который обеспечивает молниеносную скорость для веб-серфинга, воспроизведения потокового видео и загрузки файлов. Скорость передачи данных стандарта Wi-Fi 802. 11 ac почти в три раза выше, чем 802. 11 b/g/n.<br><br>Внимание к деталям<br>S145 обладает простым, но в то же время элегантным дизайном. Несмотря на свою компактность, ноутбук может похвастать богатой функциональностью и поддержкой современных интерфейсов, включая USB 3. 1, HDMI и SD.";
  //
  // const descriptionElements = description.split('<br>').map((item, index) => {
  //     return (
  //         <div
  //             className='description'
  //             key={index}
  //         >
  //             {item}
  //             <br/>
  //         </div>
  //     )
  // });

  return (
    <div className='product'>
      <hr/>
      <div className='textDivider'>
                <span>
                    Перейти к категории:
                </span>
        <Link to={'/products/' + type.id}>
          {type.name}
        </Link>
      </div>
      <hr/>
      <div className='title'>
        {product.title}
      </div>
      <img
        src={product.image_url}
        alt="product"
      />
      <br/>
      <br/>
      <div className='description'>
        {descriptionElements}
      </div>
    </div>
  )
}

export default Product