import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { actionPostOrder } from "../features/order/orderSlice";

export default function Order() {
  const dispatch = useDispatch();
  const [orderForm, setOrderForm] = useState({
    phone: '',
    address: '',
    agreement: false
  });

  const cardStyle = {
    maxWidth: "30rem",
    margin: "0 auto"
  };

  const handleOrderFormChange = (e) => {
    const {name, value} = e.target;
    //console.log('handleOrderFormChange', name, value);
    setOrderForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    dispatch(actionPostOrder(orderForm));
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
              value={orderForm.phone}
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
              value={orderForm.address}
              onChange={ handleOrderFormChange }
              />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
              name="agreement"
              value={orderForm.agreement}
              onChange={ () => setOrderForm(prevForm => ({ ...prevForm, agreement: !prevForm.agreement })) }
              />
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            onClick={ handleSubmitOrder }
            disabled={ orderForm.phone === '' || orderForm.address === '' || !orderForm.agreement } >Оформить</button>
        </form>
      </div>
    </section>
  );
};