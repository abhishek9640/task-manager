import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSWRConfig } from 'swr';

const TaskForm = () => {
  const { mutate } = useSWRConfig();

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        mutate('/api/tasks');
        resetForm();
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-8"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 font-bold mb-2"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.errors.title ? (
          <div className="text-red-500 mt-2">{formik.errors.title}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
