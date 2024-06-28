import { useNavigate } from "react-router-dom";

export function TaskCard({ task }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-zinc-800 p3 hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => {
        navigate("/tasks/" + task.id);
      }}
    >
      <h1 className="font-blod uppercase">{task.title}</h1>
      <p className="textsl-400">{task.descripcion}</p>
    </div>
  );
}
