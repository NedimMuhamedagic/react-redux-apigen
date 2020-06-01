# React Redux APIGEN
This project is used for bootstraping a React + Redux + Redux Saga project. The project is set up so it automatically generates Redux stores for API calls required in the app.

## Using the API Factory
In `modules/api/config` set your base url under `endpoints.api`

In `modules/api/endpoints/` create your endpoint and define it's method. _Bear in mind that you can use template strings here, eg `posts/{id}` will be replaced with the post ID when the call is fired and convert it to `/posts/32`_

In your component, import the `useFetch` hook and use it in the following way:

```const [posts, fetchPosts] = useFetch<ResponseType>('get_posts')```
```const [todos, fetchTodos] = useFetch<ResponseType>('get_todos')```
_Response type is a Typescript interface or type which will propagate through the rest of the store to keep type validation_

Leverage the `useEffect` hook to fire off a request, or use it programmatically.

```
useEffect(() => {
  getTodos()
}, [getTodos])
```

*Notes*
- if the endpoint contains template strings, you need to pass that data to the hook trigger:

> `todos/{id}` needs to be called with `getTodos({ id: 32 })` so the endpoint is converted to `todos/32`

- if the request is a `GET` request, all of the data passed to the `getTodos` hook (which is not a template tag) will be converted to query parameters.

> `todos/{id}` called with `getTodos({ id: 32, page: 3, offset: 10})` will generate `/todos/32?page=3&offset=10`

- if the request is a `POST` or `PUT` request, the passed data to the hook trigger will first try to replace any template tags and any unused properties will be sent through the request body

> PUT `todos/{id}` called with `updateTodo({ id: 32, title: 'foo'})` will be called with the following payload:

```
PUT todos/32
body: {
  title: 'foo'
}
```
- the property names returned from `useFetch` aren't set in stone, they follow the same pattern as React's `useState`, so feel free to name those variables anything you like
- JWT Bearer authentication is also supported, all you need is to store the token under the same key as set in the config file and it will be sent through the `Authorization` header

## Roadmap
- Add support for form data requests
- Update the examples


_Note: This is not meant to be used as a plug-and-play library, it was made for personal use on projects. I'm fine sharing this and having anyone use it, but please bear in mind that this was created for usage with REST Apis and patterns I usually use at the workplace, so it might not fit your needs. I'm open to any discussion regarding this codebase and always looking for inputs! Happy coding! <3_
