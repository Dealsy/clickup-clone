# Clickup Board clone

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

The idea of this project is to create a clone of the Clickup board app, to help me learn tRPC with React Query in Next JS, with Drizzle as the ORM.

## Learnings

- I learned in this app, that tRPC can be called in the server with a form action, however I didn't realise this until I had finished.

You can call tRPC in a server side component like this

```tsx
import { api } from '@/trpc/server'

export default async function Home() {
  const posts = await api.post.getLatest()

  return (
    <main>
      {posts.map(post => (
        <div key={post.id}>
          <p>{post.name}</p>
        </div>
      ))}
    </main>
  )
}
```

- I learned that Drizzle is fantastic, and I'm now using it in my projects, Type safe queries and mutations and a nice ORM, The studio is also really nice. This makes SQL easy.

## What's next?

I'm not to sure, I'm deciding on whether to continue with this project or not, I do want to create something using tRPC server side. Which might be done in a new project rather than trying to refactor this one.
