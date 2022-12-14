import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, selectOwner } from "../app/services/cart/cartSlice";

export default function Order() {
  const dispatch = useDispatch();
  const [agreement, setAgreement] = useState(false);
  const owner = useSelector(selectOwner);
  const { phone, address } = owner;

  const cardStyle = {
    maxWidth: "30rem",
    margin: "0 auto"
  };

  const handleOrderFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    dispatch(cartActions.setOwnerData({ ...owner, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(cartActions.postOrder());
  };

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={ cardStyle } >
        <form className="card-body" onSubmit={ handleSubmitOrder }>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Ваш телефон"
              value={phone}
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
              value={address}
              onChange={ handleOrderFormChange }
              />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
              name="agreement"
              checked={agreement}
              onChange={ () => setAgreement(prevAgreement => !prevAgreement) }
              />
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            disabled={ phone === '' || address === '' || !agreement } >Оформить</button>
        </form>
      </div>
    </section>
  );
};