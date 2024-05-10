import ProductShowCase from "@/components/ProductShowCase";
import Container from "@/components/Container";
import { useContext, useEffect } from "react";
import UserContext from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const { admin }: any = useContext(UserContext);
  useEffect(() => {
    if (!admin) navigate("/");
  }, [admin]);
  return (
    <Container>
      <ProductShowCase />
    </Container>
  );
}
