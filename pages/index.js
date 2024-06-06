// pages/index.js

import { useSession, signIn, signOut } from 'next-auth/react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold">Task Manager</h1>
        <button 
          onClick={() => signIn('github')}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Task Manager</h1>
      <button 
        onClick={() => signOut()}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
      >
        Sign out
      </button>
      <TaskForm />
      <TaskList />
    </div>
  );
}
