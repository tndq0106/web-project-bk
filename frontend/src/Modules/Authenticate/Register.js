import "../../assets/styles/css/base.css";
import "../../assets/styles/css/login.css";

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// @antd
import { Button, notification, Form, Modal, Input } from "antd";

const phoneRegex = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
const securePassword = /(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{5,})/;

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [isDisableSignUp, setIsDisableSignUp] = useState(true);
  const [loadingSignUp, setLoadingSignUp] = useState(false);

  const onFinishSignUp = async (value) => {
    const { confirmPassword, ...rest } = value || {};
    try {
      setLoadingSignUp(true);
      const { data } = await axios.post("http://localhost:3002/auth/signup", {
        ...rest,
      });
      if (data.retCode === 0) {
        notification.success({
          message: "Successfully",
          description: data?.retText,
          duration: 2,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        notification.error({
          message: "Fail",
          description: "Register unsuccessfully!",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoadingSignUp(false);
    }
  };

  const onFieldsChangeSignUp = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    const hasValues = form.getFieldsValue();
    setIsDisableSignUp(
      hasErrors ||
      !hasValues?.username ||
      !hasValues?.password ||
      !hasValues?.confirmPassword ||
      !hasValues?.fullName ||
      !hasValues?.phone ||
      !hasValues?.address
    );
  };

  return (
    <div className="login-body">
      <div className="form-box">
        <h1>Sign Up</h1>
        <Form
          form={form}
          onFinish={onFinishSignUp}
          onFieldsChange={onFieldsChangeSignUp}
          className="signup w-100"
        >
          <div className="row">
            <Form.Item
              className="col-12"
              label={false}
              required
              name={"fullName"}
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
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
              name={"phone"}
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number",
                },
                {
                  pattern: new RegExp(phoneRegex),
                  message: "Invalid phone number",
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
                  message: "Please enter your address",
                },
              ]}
            >
              <div className="field">
                <Input placeholder="Address" />
              </div>
            </Form.Item>

            <Form.Item
              label={false}
              required
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  max: 250,
                  message: "Your email must be limited to 250",
                },
                {
                  type: "email",
                  message: "Invalid email address",
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
                  message: "Please enter your password",
                },
                {
                  pattern: new RegExp(securePassword),
                  message: "Your password must have at least 6 characters, 1 number and 1 special symbol"
                }
              ]}
            >
              <div className="field">
                <Input.Password placeholder="Password" />
              </div>
            </Form.Item>

            <Form.Item
              label={false}
              required
              name={"confirmPassword"}
              rules={[
                {
                  required: true,
                  message: "Please enter your password again",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Password does not match")
                    );
                  },
                }),
              ]}
            >
              <div className="field">
                <Input.Password placeholder="Confirm password" />
              </div>
            </Form.Item>
          </div>

          <Button
            className="button"
            htmlType="submit"
            disabled={isDisableSignUp}
            loading={loadingSignUp}
          >
            Sign up
          </Button>
        </Form>
        <p>
          Already have an account? <Link to={"/login"} style={{ fontWeight: 'bold' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
