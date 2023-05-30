import "./style.css";

import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

// @antd
import { Button, notification, Form, Input } from "antd";

import { resetItem } from "../../Redux/actions/cartAction";

const phoneRegex = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;

const Checkout = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { dataCart } = useSelector((state) => state);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // console.log("dataCart", userInfo);

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const onFinish = async (values) => {
    // console.log("data", values);
    try {
      setLoading(true);
      const payload = {
        userId: userInfo?.id,
        infoOrder: values,
        listCart: dataCart,
      };
      const { data } = await axios.post(
        "http://localhost:3002/order/create-order",
        payload
      );
      if (data.retCode === 0) {
        notification.success({
          message: "Successfully",
          description: data?.retText,
          duration: 2,
        });
        dispatch(resetItem());
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        notification.error({
          message: "Fail",
          description: "Create Order unsuccessfully!",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false);
    }
  };

  const onFieldsChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    const hasValues = form.getFieldsValue();
    setIsDisable(
      hasErrors ||
        !hasValues?.username ||
        !hasValues?.fullName ||
        !hasValues?.phone ||
        !hasValues?.address
    );
  };

  const handleTotalMoney = () => {
    const listPrice = dataCart?.map((item) => {
      return item.totalPrice;
    });
    if (listPrice?.length === 0) {
      return 0;
    } else {
      const res =
        listPrice.reduce((total, currentValue) => {
          return total + currentValue;
        }) ?? 0;
      return res;
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <h1>Checkout Cart</h1>

        <div id="cart-items">
          {dataCart?.map((item, index) => {
            return (
              <div className="row p-3" key={`${index}-${item?._id}`}>
                <div className="col-3">
                  <img
                    style={{ width: 100, height: 100, objectFit: "contain" }}
                    src={item?.image}
                    alt=""
                  />
                </div>
                <div className="col-9">
                  <div className="d-flex flex-column justify-content-center align-items-start h-100">
                    <h5>
                      {item?.name} - x{item?.quantity}
                    </h5>
                    <p>${item?.totalPrice}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="user-details">
          <h2>User Details</h2>
          <Form
            form={form}
            onFinish={onFinish}
            onFieldsChange={onFieldsChange}
            className="w-100"
          >
            <div className="row">
              <Form.Item
                className="col-12 w-100"
                label={false}
                required
                name={"fullName"}
                rules={[
                  {
                    required: true,
                    message: "Please enter your Name!",
                  },
                ]}
              >
                <div className="field">
                  <Input placeholder="Name" />
                </div>
              </Form.Item>

              <Form.Item
                label={false}
                required
                name={"username"}
                rules={[
                  {
                    required: true,
                    message: "Please enter your Email!",
                  },
                  {
                    max: 250,
                    message: "Your email must be limited to 250",
                  },
                  {
                    type: "email",
                    message: "Please enter correct format of email!",
                  },
                ]}
              >
                <div className="field">
                  <Input placeholder="Email" />
                </div>
              </Form.Item>

              <Form.Item
                label={false}
                required
                name={"phone"}
                rules={[
                  {
                    required: true,
                    message: "Please enter your Phone!",
                  },
                  {
                    pattern: new RegExp(phoneRegex),
                    message: "Please enter your correct format of phone",
                  },
                ]}
              >
                <div className="field">
                  <Input placeholder="Phone" />
                </div>
              </Form.Item>

              <Form.Item
                label={false}
                required
                name={"address"}
                rules={[
                  {
                    required: true,
                    message: "Please enter your Address!",
                  },
                ]}
              >
                <div className="field">
                  <Input placeholder="Address" />
                </div>
              </Form.Item>
            </div>

            <Button
              className=""
              htmlType="submit"
              disabled={isDisable}
              loading={loading}
            >
              Confirm to Buy
            </Button>
          </Form>
        </div>

        <div className="cart-summary">
          <h2>Summary</h2>
          <div id="total-amount">Total: ${handleTotalMoney()}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
