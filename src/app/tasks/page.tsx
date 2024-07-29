import { getAllTasks } from "@/actions";
import { Task as TaskInterface } from "@/utils/interfaces";
import { CreateTaskForm, ErrorMessage, LogOutButton } from "../components";
import { Task } from "../components/Task/Task";

export default async function Home() {
  const { tasks }: { tasks: TaskInterface[] } = await getAllTasks();
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-10">
      <div className="my-10 min-h-screen w-full">
        <div className="flex justify-between items-center">
          <h1 className=" text-5xl text-gray-700 ">Tareas</h1>
          <LogOutButton />
        </div>
        <CreateTaskForm />
        <ErrorMessage />
        <div className="grid grid-cols-1   xl:grid-cols-2  2xl:grid-cols-3 gap-5 mb-10">
          {tasks.map((task, index: any) => (
            <Task key={index} task={task} />
          ))}
        </div>
      </div>
    </main>
  );
}
