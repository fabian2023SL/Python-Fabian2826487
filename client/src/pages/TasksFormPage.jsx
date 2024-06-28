import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTasks } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function TasksFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("Tarea Actualizada", {
        position: "bottom-right",
        style: { background: "#101010", color: "#fff" },
      });
    } else {
      await createTask(data);
      toast.success("Tarea Creada", {
        position: "bottom-right",
        style: { background: "#101010", color: "#fff" },
      });
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        console.log("obteniendo datos");
        const { data } = await getTasks(params.id);
        setValue("title", data.title);
        setValue("description", data.description);
      }
    }
    loadTask();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          {...register("title", { required: true })}
          className="bg-zinc-700 p-3 roundlg block w-full mb-3"
        />
        {errors.title && <span>El titulo es Requerido</span>}

        <textarea
          rows="3"
          placeholder="descripcion"
          {...register("descripcion", { required: true })}
          className="bg-zinc-700 p-3 roundlg block w-full mb-3"
        ></textarea>
        {errors.descripcion && <span>Descripcion es Requerido</span>}
        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          save
        </button>
      </form>
      {params.id && (
        <div className="flex justify-end ">
          <button
            className="bg-red-500 p-3 rouded-lg w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm("Estas Seguro?");
              if (accepted) {
                await deleteTask(params.id);
                toast.success("Tarea Eliminada", {
                  position: "bottom-right",
                  style: { background: "#101010", color: "#fff" },
                });
                navigate("/tasks");
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
