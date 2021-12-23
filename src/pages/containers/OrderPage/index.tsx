import "./index.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProceedOrder from "../../../components/common/ProceedOrder";
import router from "../../../router";
import { isNumeric } from "../../../utils";
import { ordersActions } from "../../../store/actions";
import { AccentWindowWrapper } from "../../../components/common/AccentWindowWrapper";

const OrderPage = () => {
  const { id } = router.getState().params;
  const dispatch = useDispatch();

  const ordersById = useSelector((state: any) => state.orders.ordersById);

  useEffect(() => {
    if (isNumeric(id)) {
      dispatch(ordersActions.getOrder({ orderId: id }));
    }
  }, []);

  if (!isNumeric(id)) {
    window.location.href = "/";
    return;
  }

  // eslint-disable-next-line consistent-return
  return (
    <AccentWindowWrapper title={"Proceed with the payment"}>
      {/* eslint-disable-next-line no-prototype-builtins */}
      {ordersById.hasOwnProperty(id) && <ProceedOrder {...ordersById[id]} />}
    </AccentWindowWrapper>
  );
};

export default OrderPage;
