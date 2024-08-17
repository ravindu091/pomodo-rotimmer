import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import Task from "./task";
import { Input } from "./ui/input";

interface TaskType {
    id: number;
    name: string;
    completed: boolean;
    description: string;
}

export default function Tasks() {
    const [taskName, setTaskName] = useState<string>('');
    const [tasks, setTasks] = useState<TaskType[]>([]);

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasklist');
        if (savedTasks) {
            console.log('Loading tasks from localStorage');
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Save tasks to localStorage whenever tasks state changes
    useEffect(() => {
        console.log('Saving tasks to localStorage');
        localStorage.setItem('tasklist', JSON.stringify(tasks));
    }, [tasks]);

    const addNewTask = () => {
        if (taskName.trim() !== '') {
            const newTask = { id: Date.now(), name: taskName, completed: false, description: '' };
            setTasks([...tasks, newTask]);
            setTaskName('');
            console.log('New task added', newTask);
        } else {
            console.log('Task name is empty');
        }
    };

    const buttonHandle = (type:string, id: number) => {
        if (type === 'delete') {
            setTasks(tasks.filter(task => task.id !== id));
            console.log(`Task with id ${id} deleted`);
        } else if (type === 'complete') {
            setTasks(tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            ));
            console.log(`Task with id ${id} marked as ${tasks.find(task => task.id === id)?.completed ? 'incomplete' : 'complete'}`);
        }else{
            setTasks(tasks.map(task =>
                task.id === id ? { ...task, description:type } : task
            ));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addNewTask();
        }
    };

    return (
        <div>
            <h1>Task List</h1>
            <div className="m-3">
                <div className="flex flex-row py-3">
                    <Input
                        type="text"
                        name="task"
                        id="task"
                        onKeyDown={handleKeyDown}
                        onChange={e => setTaskName(e.target.value)}
                        value={taskName}
                    />
                    <button onClick={addNewTask} className="mx-1 px-2 py-1 bg-slate-700 hover:bg-slate-800 text-white rounded-md">Add</button>
                </div>

                <div className="space-y-2">
                    <Reorder.Group values={tasks} onReorder={setTasks} layoutScroll>
                        {tasks.map(task => (
                            <Reorder.Item value={task} key={task.id}>
                                {!task.completed && (
                                    <Task title={task.name} id={task.id} buttonHandle={buttonHandle} description={task.description} completed={task.completed} />
                                )}
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </div>

                <h1>Completed Tasks</h1>
                <div>
                    {tasks.map(task => (
                        task.completed && (
                            <Task title={task.name} key={task.id} id={task.id} buttonHandle={buttonHandle} description={task.description} completed={task.completed} />
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
