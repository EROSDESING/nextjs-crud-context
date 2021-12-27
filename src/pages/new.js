import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useTasks } from '../context/taskContext'
import { useRouter } from 'next/router'

const TaskFormPage = () => {
  const { createTask, updateTask, tasks } = useTasks()
  const { push, query } = useRouter()
  console.log(query)
  const [task, setTask] = useState({
    title: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setTask({ ...task, [name]: value })
  }

  const handleSudmit = (e) => {
    e.preventDefault()

    if (!query.id) {
      createTask(task.title, task.description)
    } else updateTask(query.id, task)
    push('/')
  }

  useEffect(() => {
    if (query.id) {
      const taskFound = tasks.find((task) => task.id === query.id)

      setTask({ title: taskFound.title, description: taskFound.description })
    }
  }, [query.id, tasks])

  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <form className="bg-gray-700 p-10 h-2/4" onSubmit={handleSudmit}>
          <h1 className="text-3xl mb-7">{query.id ? 'Update task ' : 'Create a new task'}</h1>
          <input
            type="text"
            placeholder="Write a title"
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
            name="title"
            onChange={handleChange}
            value={task.title}
          />
          <textarea
            placeholder="Write a description"
            rows="2"
            name="description"
            onChange={handleChange}
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
            value={task.description}
          ></textarea>
          <button
            className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-30"
            disabled={!task.title}
          >
            Save
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default TaskFormPage
