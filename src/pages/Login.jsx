import { useForm } from "react-hook-form";
import { loginUser } from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    const res = await loginUser(data);
    if (res.data.success) {
      login(res.data.token);
      window.location.href = "/eventos";
    } else {
      alert(res.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", { required: true })} placeholder="Email" />
      <input {...register("password", { required: true })} type="password" placeholder="Password" />
      <button type="submit">Ingresar</button>
    </form>
  );
}