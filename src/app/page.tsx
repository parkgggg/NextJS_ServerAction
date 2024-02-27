import Image from "next/image";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

export default function ServerComponent() {
  //서버 액션은 사용할 "서버 컴포넌트" 내부에서 or 별도의 파일을 만들어서(재사용 가능) 정의 가능
  //전자의 경우
  /*async function myAction() {
    "use server"
    //....
  }*/

  return (
    <div>
      <Form />
      <TodoList />
    </div>


  )
}
