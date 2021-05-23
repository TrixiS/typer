import * as React from "react";
import { useRouter } from "next/router";
import { Form, Input, Button } from "antd";
import { Screen } from "../components/Layout";
import { PageHeading } from "components/Typography";
import { AccountForm } from "components/AccountForm";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const router = useRouter();

  const handleFinish = async (values: RegisterFormValues) => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(values),
    });

    // TODO: push to the router source path
    if (res.ok) await router.push("/");
  };

  return (
    <Screen first center>
      {/* TODO: Message for username/email/password errors */}
      {/* TODO: validate fields using form inst */}
      <PageHeading title="Register">Create your Typer account</PageHeading>
      <AccountForm
        initialValues={router.query}
        onFinish={handleFinish}
        submitButtonText="Create account"
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
      </AccountForm>
    </Screen>
  );
}
