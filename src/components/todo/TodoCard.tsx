import { useAppDispatch } from "@/redux/hook";
import { Button } from "../ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { removeTodo, toggleComplete } from "@/redux/features/todoSlice";
import { useRemoveTodoMutation } from "@/redux/api/api";

interface TTodo {
  _id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  priority: string;
}

const TodoCard = ({ todo }: { todo: TTodo }) => {
  console.log(todo);

  // for local delete
  const dispatch = useAppDispatch();

  // for server delete
  const [removeTodo] = useRemoveTodoMutation();

  const handleRemoveTodo = (todoId: string) => {
    removeTodo(todoId);
    console.log("Todo deleted successfully");
  };

  const toggleState = () => {
    dispatch(toggleComplete(todo._id));
  };

  return (
    <div className="bg-white rounded-md flex justify-between items-center p-3 border">
      <input
        className="mr-3"
        onChange={toggleState}
        type="checkbox"
        name="complete"
        id="complete"
      />
      <p className="font-semibold flex-1">{todo.title}</p>

      <div className="flex-1 flex items-center gap-2">
        <div
          className={`size-3 rounded-full
           ${todo.priority === "high" && "bg-red-500"}
           ${todo.priority === "medium" && "bg-yellow-500"}
           ${todo.priority === "low" && "bg-green-500"}
          `}
        ></div>
        <p>{todo.priority}</p>
      </div>

      <div className="flex-1">
        {todo.isCompleted ? (
          <p className="text-green-500">Done</p>
        ) : (
          <p className="text-red-500">Pending</p>
        )}
      </div>

      <p className="flex-1">{todo.description}</p>
      <div className="space-x-5">
        <Button
          onClick={() => handleRemoveTodo(todo._id)}
          className="bg-red-500 "
        >
          {" "}
          <Trash2 />{" "}
        </Button>
        <Button className="bg-[#5C53FE]">
          <Edit2 />
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
