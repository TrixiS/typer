import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Input, Form } from "antd";
import { Screen } from "../components/Layout";

interface SignUpProps {
  email: string;
}

export default function Home() {
  const router = useRouter();

  const handleFinish = (values: SignUpProps) =>
    router.push({ pathname: "/register", query: { email: values.email } });

  return (
    <Screen first className="items-center justify-items-center">
      <div className="flex flex-col w-3/4 gap-6 md:gap-12 items-center mx-3 lg:mx-5 pt-24">
        <div className="h1 leading-none font-extrabold text-center text-5xl md:text-6xl lg:text-8xl">
          The game based on typing speed
        </div>

        <div className="h3 leading-relaxed font-normal text-gray-600 text-center text-base md:text-lg lg:text-xl mb-3 lg:w-5/6">
          Show your typing speed in single/multiplayer mode. Create and play
          your own typing maps
        </div>

        <Form
          className="flex flex-wrap lg:flex-row lg:flex-nowrap w-4/6 lg:w-5/6 gap-2"
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

      <div className="flex flex-col w-full mx-5">
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
