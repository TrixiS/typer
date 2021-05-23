import * as React from "react";
import { useRouter } from "next/router";
import { Form, Input, Button } from "antd";
import { Screen } from "../components/Layout";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const router = useRouter();
  const [form] = Form.useForm();

  const handleFinish = async (values: RegisterFormValues) => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(values),
    });

    // TODO: push to the router source path
    if (res.ok) router.push("/");
  };

  return (
    <Screen first className="items-center justify-items-center">
      <div className="flex flex-col items-center gap-4 mt-4 mb-10 md:mt-8">
        <div className="h2 font-bold text-4xl leading-tight">Register</div>
        <div className="h3 font-normal text-base leading-none">
          Create your Typer account
        </div>
      </div>

      {/* TODO: Message for username/email/password errors */}
      {/* TODO: validate fields using form inst */}
      <Form
        className="font-semibold w-11/12 md:w-3/6 lg:w-2/6"
        form={form}
        initialValues={router.query}
        layout="vertical"
        onFinish={handleFinish}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email address"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className="mt-8">
          <Button
            className="w-full"
            type="primary"
            htmlType="submit"
            size="large"
          >
            Create account
          </Button>
        </Form.Item>
      </Form>
    </Screen>
  );
}
