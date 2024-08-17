import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Task {
  id: number;
  name: string;
} 
const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Task 1' },
    { id: 2, name: 'Task 2' },
    { id: 3, name: 'Task 3' },
  ]);

  const handleEdit = (id: number) => {
    console.log('Edit task:', id);
    // Implement edit logic here
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="p-4">
      {tasks.map(task => (
        <Task key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default TaskList;

interface TaskProps {
  task: Task;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, onEdit, onDelete }) => {
  return (
    <motion.div
      className="relative bg-white border p-4 rounded-md mb-2"
      whileTap={{ scale: 0.95 }}
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      dragElastic={0.3}
      onDragEnd={(event, info) => {
        if (info.point.x > 50) {
          onEdit(task.id);
        } else if (info.point.x < -50) {
          onDelete(task.id);
        }
      }}
    >
      <div className="flex justify-between items-center">
        <span className="text-lg">{task.name}</span>
      </div>

      {/* Edit Button */}
      <motion.div
        className="absolute left-0 top-0 h-full flex items-center bg-green-500 text-white p-2 rounded-md"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Edit
      </motion.div>

      {/* Delete Button */}
      <motion.div
        className="absolute right-0 top-0 h-full flex items-center bg-red-500 text-white p-2 rounded-md"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Delete
      </motion.div>
    </motion.div>
  );
};