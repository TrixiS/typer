import Image from "next/image";
import { useRouter } from "next/router";
import { Typography, Button, Input, Form } from "antd";
import { Screen } from "../components/Layout";

interface SignUpProps {
  email: string;
}

export default function Home() {
  const router = useRouter();

  const handleFinish = (values: SignUpProps) =>
    router.push({ pathname: "/register", query: { email: values.email } });

  return (
    <Screen first className="items-center justify-center">
      <div className="flex flex-col w-1/2 gap-6 md:gap-8 mx-5">
        <Typography.Text strong className="h1 text-3xl md:text-4xl lg:text-8xl">
          The game based on typing speed
        </Typography.Text>

        <Typography.Text className="text-1xl md:text-2xl lg:text-4xl">
          Show your typing speed in single/multiplayer mode. Create and play
          your own typing maps
        </Typography.Text>

        <Form
          className="flex flex-wrap gap-2 lg:flex-row lg:flex-nowrap"
          onFinish={handleFinish}
        >
          <Form.Item name="email" rules={[{ required: true }]} noStyle>
            <Input
              className="w-full lg:w-2/3"
              placeholder="Email"
              size="large"
            />
          </Form.Item>
          <Form.Item noStyle>
            <Button
              className="w-full lg:w-1/3"
              type="primary"
              htmlType="submit"
              size="large"
            >
              Sign up for Typer
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="flex flex-col w-1/2 mx-5">
        <Image
          src="/svg/keyboard.svg"
          height="full"
          width="full"
          layout="responsive"
        />
      </div>
    </Screen>
  );
}
