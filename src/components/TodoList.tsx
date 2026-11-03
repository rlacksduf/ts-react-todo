import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};
export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  function addTodo(): void {
    if (input.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  }
  function toggleTodo(id: number): void {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }
  function deleteTodo(id: number): void {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }
  function startEdit(id: number): void {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;
    setEditingText(target.text);
    setEditingId(id);
  }
  function saveEdit(id: number): void {
    if (editingText.trim() == "") {
      return alert("내용 처 넣어");
    }
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: editingText.trim() } : todo,
      ),
    );
    setEditingId(null);
  }
  function cancelEdit(): void {
    setEditingId(null);
    setEditingText("");
  }
  return (
    <div>
      <h1>TodoList</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력하세요"
      />

      <button onClick={addTodo}>추가</button>

      {todos.map((t) => (
        <div key={t.id}>
          <h2>{t.text}</h2>
          <input
            type="checkbox"
            checked={t.done}
            onChange={() => toggleTodo(t.id)}
          />
          <button onClick={() => startEdit(t.id)}>수정</button>
          <button onClick={() => deleteTodo(t.id)}>삭제</button>

          {editingId === t.id && (
            <div>
              <input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                placeholder="수정할 내용 입력"
              />
              <button onClick={() => saveEdit(t.id)}>저장</button>
              <button onClick={cancelEdit}>수정 취소</button>
            </div>
          )}
        </div>
      ))}
      <h1>수정중인 아이디 {editingId ?? "없음"}</h1>
    </div>
  );
}
