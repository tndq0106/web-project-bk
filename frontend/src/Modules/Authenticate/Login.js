import "../../assets/styles/css/base.css";
import "../../assets/styles/css/login.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// @antd
import { Button, notification, Form, Modal, Input } from "antd";

const LoginPage = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const onFinishSignIn = async (value) => {
    // console.log(value);
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:3002/auth/signin", {
        ...value,
      });
      if (data.retCode === 0) {
        notification.success({
          message: "Successfully",
          description: data?.retText,
          duration: 2,
        });
        localStorage.setItem("userInfo", JSON.stringify(data.retData));
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        notification.error({
          message: "Fail",
          description: "Login unsuccessfully!",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false);
    }
  };

  const onFieldsChangeSignUp = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    const hasValues = form.getFieldsValue();
    setIsDisable(hasErrors || !hasValues?.username || !hasValues?.password);
  };

  return (
    <div className="form-box">
      <h1>Login</h1>
      <Form
        form={form}
        onFinish={onFinishSignIn}
        onFieldsChange={onFieldsChangeSignUp}
        className="login w-100"
      >
        <div className="row">
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
            name={"password"}
            rules={[
              {
                required: true,
                message: "Please enter your Password!",
              },
            ]}
          >
            <div className="field">
              <Input.Password placeholder="Password" />
            </div>
          </Form.Item>
        </div>
        <Button
          className="btn"
          htmlType="submit"
          disabled={isDisable}
          loading={loading}
        >
          Sign in
        </Button>
      </Form>
      <p>
        Don't have an account? <Link to={"/register"}>Signup</Link>
      </p>
    </div>
  );
};

export default LoginPage;
