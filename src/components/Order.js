import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { selectCartDataAsArray } from "../features/cart/cartSlice";
import { actionPostOrder } from "../features/order/orderSlice";

export default function Order({ data, actions }) {
  const dispatch = useDispatch();
  const orderItems = useSelector(selectCartDataAsArray);
  console.log('orderItems = ', orderItems);

  const cardStyle = {
    maxWidth: "30rem",
    margin: "0 auto"
  };

  const handleOrderFormChange = (e) => {
    const {name, value} = e.target;
    //console.log('handleOrderFormChange', name, value);
    dispatch(actions.setData({ ...data, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const order = {
      owner: {
        phone: data.phone,
        address: data.address,
      },
      items: orderItems
    };
    dispatch(actionPostOrder({ order }));
  };

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={ cardStyle } >
        <form className="card-body">
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Ваш телефон"
              value={data.phone}
              onChange={ handleOrderFormChange }
              />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              id="address"
              name="address"
              placeholder="Адрес доставки"
              value={data.address}
              onChange={ handleOrderFormChange }
              />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
              name="agreement"
              value={data.agreement}
              onChange={ () => dispatch(actions.setData({ ...data, agreement: !data.agreement })) }
              />
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            onClick={ handleSubmitOrder }
            disabled={ data.phone === '' || data.address === '' || !data.agreement } >Оформить</button>
        </form>
      </div>
    </section>
  );
};