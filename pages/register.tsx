import { useRouter } from "next/router";
import { Screen } from "../components/Layout";

export default function Register() {
  const router = useRouter();
  // TODO: register form
  // TODO: set initial values in form
  return <Screen first>{`Email: ${router.query.email}`}</Screen>;
}
