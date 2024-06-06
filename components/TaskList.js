import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const TaskList = () => {
  const { data, error } = useSWR('/api/tasks', fetcher);

  if (error) return <div className="text-red-500">Failed to load tasks</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Task List</h1>
      <ul className="space-y-2">
        {data.map((task) => (
          <li key={task._id} className="border-b py-2 flex items-center justify-between">
            <span>{task.title}</span>
            {/* <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
