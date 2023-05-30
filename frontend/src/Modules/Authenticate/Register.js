import "../../assets/styles/css/base.css";
import "../../assets/styles/css/login.css";

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// @antd
import { Button, notification, Form, Modal, Input } from "antd";

const phoneRegex = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;

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

          <Form.Item
            label={false}
            required
            name={"confirmPassword"}
            rules={[
              {
                required: true,
                message: "Please enter your password again to confirm!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Your confirm password is not correct")
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
          className="btn"
          htmlType="submit"
          disabled={isDisableSignUp}
          loading={loadingSignUp}
        >
          Sign up
        </Button>
      </Form>
      <p>
        Already have an account? <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
