import React, { useEffect } from 'react';
import { useFetch } from './hooks/fetch';
import { Api } from './react-app-env';

function App() {
  const [todos, getTodos] = useFetch<Api.Post[]>('get_posts');

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div className="App">
      <h1>APP</h1>
      {todos.loading && 'LOADING'}
      {todos.error && todos.error.data.message}
      {todos.data && todos.data.map((elem) => (
        <div>
          <h1>{elem.title}</h1>
          <p>{elem.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
