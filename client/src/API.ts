import axios, { AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:4000";

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const response = await axios.get(`${baseUrl}/todos`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<ITodo, "_id"> = {
      name: formData.name,
      desc: formData.desc,
      status: false,
    }
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/add-todo",
      todo
    )
    return saveTodo
  } catch (error) {
    throw error;
  }
}
export const updateTodo = async(todoId: ITodo): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoWhichUpate : Pick<ITodo, "status"> = {
      status: true
    }
    const updatedTodo = axios.put(`${baseUrl}/update-todo/${todoId._id}`, todoWhichUpate);
    return updatedTodo;
  } catch (error) {
    throw error
  }
}


export const deleteTodo =async (_id: string): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deleteTodoAPI = axios.delete(`${baseUrl}/delete-todo/${_id}`)
    return deleteTodoAPI;
  } catch (error) {
    throw error;
  }
}