import Link from "next/link";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import { Typography, Form, Input } from "antd";
import { Screen } from "components/Layout";
import { PageHeading } from "components/Typography";
import { AccountForm } from "components/AccountForm";

export default function Login() {
  const router = useRouter();
  const { mutateUser } = useUser();

  const handleFinish = async (values: { sub: string; password: string }) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (!res.ok) return;

    await mutateUser(await res.json());
    await router.push("/");
  };

  return (
    <Screen first center>
      <PageHeading title="Sign in">
        Sign in to Typer or{" "}
        {
          <Link href="/signup">
            <Typography.Link>create an account</Typography.Link>
          </Link>
        }
      </PageHeading>
      <AccountForm onFinish={handleFinish} submitButtonText="Sign in">
        <Form.Item
          name="sub"
          label="Username or Email"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </AccountForm>
    </Screen>
  );
}
