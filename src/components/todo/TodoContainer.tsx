import { useState } from "react";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";

const TodoContainer = () => {
  //* form local State ---------->
  // const { todos } = useAppSelector((state) => state.todos);
  const [priority, setPriority] = useState();

  // from server ---------->
  const { data: todos, isLoading, isError } = useGetTodosQuery(priority);
  console.log(todos);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-5">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl  p-1">
        <div className="bg-white p-5 w-full h-full rounded-xl space-y-3">
          {todos ? (
            todos?.data?.map((todo) => <TodoCard key={todo.id} todo={todo} />)
          ) : (
            <div className="bg-white p-5 text-2xl font-bold flex justify-center items-center rounded-xl">
              <p>There is no card pending...</p>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
