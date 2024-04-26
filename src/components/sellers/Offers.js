// Promo.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { applyPromoCode, clearPromoCode } from '../actions/promoActions';

const Promo = () => {
  const dispatch = useDispatch();
  const promoCodeState = useSelector((state) => state.promoCode);

  useEffect(() => {
    // Start a countdown timer here and dispatch clearPromoCode when it ends.
    const countdownTimer = setTimeout(() => {
      dispatch(clearPromoCode());
    }, /* Your countdown duration in milliseconds */);

    return () => clearTimeout(countdownTimer);
  }, [dispatch]);

  const applyCodeHandler = () => {
    // Dispatch applyPromoCode action with the entered promo code.
    dispatch(applyPromoCode('WLC4735')); // Replace with user input
  };

  return (
    <div>
      {promoCodeState.promoCode ? (
        <p>Promo Code Applied: {promoCodeState.promoCode}</p>
      ) : (
        <button onClick={applyCodeHandler}>Apply Promo Code</button>
      )}
    </div>
  );
};

export default Promo;
