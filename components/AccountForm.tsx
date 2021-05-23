import * as React from "react";
import { Form, Input, Button, FormProps } from "antd";

export interface AccountFormProps extends FormProps {
  submitButtonText: string;
}

export function AccountForm({
  submitButtonText,
  children,
  ...rest
}: AccountFormProps) {
  const [form] = Form.useForm();

  return (
    <Form
      className="font-semibold w-11/12 md:w-3/6 lg:w-2/6"
      form={form}
      layout="vertical"
      scrollToFirstError
      {...rest}
    >
      {children}
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item className="mt-8">
        <Button
          className="w-full"
          type="primary"
          htmlType="submit"
          size="large"
        >
          {submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
}
