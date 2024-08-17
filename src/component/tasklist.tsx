import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from './ui/dialog';
import { Button } from "./ui/button";
import { Minus, Plus } from 'lucide-react';
import { Input } from "./ui/input";
import Foodi from './svg/food.svg';
import Worki from './svg/work.svg';
import Playi from './svg/play.svg';
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Reorder } from "framer-motion";
import Task from './task'
import { ScrollArea } from "./ui/scroll-area";


interface TaskType {
    id: number;
    title: string;
    note: string;
    completed:boolean;
    category:string;
    sessions:number;
    state:string;
    csessions:number;

}


export default function TasksList({tasklist}:{tasklist:any}) {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    //Load taks from local storage when start the app
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasklist');
        if (savedTasks) {
            console.log('Loading tasks from localStorage');
            setTasks(JSON.parse(savedTasks));
        }
        
    }, []);
    //save taks to local storage every time when change the task list
    useEffect(() => {
        console.log('Saving tasks to localStorage');
        localStorage.setItem('tasklist', JSON.stringify(tasks));
        tasklist(tasks)
        console.log('this is task list use effect is running twice');
        
    }, [tasks]);


    const AddNewTask =(name:string ,category:string,sessions:number,note:string)=>{
        const newTask = { id: Date.now(), title: name,category:category,sessions:sessions,note: note ,completed:false, state:'Pending',csessions:0  };
        console.log(newTask);
        setTasks([...tasks, newTask]);
        
    }
    const handleTask =(id:number,command:any)=>{
        if(command === 'delete'){
            setTasks(tasks.filter(task => task.id !== id));
        }else{
            setTasks(tasks.map(task=> task.id == id ? {...task,title:command.title,category:command.category,sessions:command.sessions,note:command.note} : task))
        }
    }
    return (
        <div className="p-3 h-full">
            <Card className="bg-white w-full bg-opacity-70 shadow-lg h-full flex flex-col  justify-between rounded-md border-0 gap-0 px-0">
                <CardHeader className="pt-1 px-3">
                    <CardTitle className="text-xl">
                        Task list
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[70vh] px-2">
                <ScrollArea className="h-full">
                 <div className="space-y-2">
                 {tasks.map(task => (
                            (task.state === 'ongoing' && 
                               
                                <Task key={task.id} handleTask={handleTask} id={task.id} title={task.title}  category={task.category} sessions={task.sessions} note={task.note} state={task.state} csessions={task.csessions} />
                            
                         )
                        ))}

                    <Reorder.Group values={tasks} onReorder={setTasks} layoutScroll>
                        {tasks.map(task => (
                            (task.state !== 'ongoing' && <Reorder.Item value={task} key={task.id}>
                               
                                <Task key={task.id} handleTask={handleTask} id={task.id} title={task.title}  category={task.category} sessions={task.sessions} note={task.note} state={task.state} csessions={task.csessions} />
                            
                        </Reorder.Item> )
                        ))}
                    </Reorder.Group>
                 </div>
                </ScrollArea>
                
                <div>
                   
                </div>

                </CardContent>
                <CardFooter className="flex place-content-center">
                    <AddTask addnewTask={AddNewTask} />
                </CardFooter>
            </Card>
        </div>
    );
}

const AddTask = ({addnewTask}:{addnewTask:any}) => {
    const [title,setTitle] = useState<string>('')
    const [Category, setCategory] = useState<string>('');
    const [sessions, setsessions] = useState<number>(1);
    const [note, setNote] = useState<string>('');
    const [isNoteEditing, setIsNoteEditing] = useState<boolean>(false);

    const categories = [
        { name: 'Work', icon: Worki },
        { name: 'Play', icon: Playi },
        { name: 'Food', icon: Foodi },
        { name: 'Learn', icon: '' },
        { name: 'Sport', icon: '' },
        { name: 'Other', icon: '' },
    ];

    const NoteHandlefun = (command: boolean, value: string) => {
        if (command) {
            setIsNoteEditing(false);
            setNote(value);
        } else {
            setIsNoteEditing(false);
        }
    };
    const  AddNewTask = async (command:boolean)=>{
        if(command){
            addnewTask(title,Category,sessions,note)
        }else if(!command){
            console.log('canceled');
            
        }
        setTitle('');
        setCategory('');
        setsessions(1);
        setNote('');
        
    }
   

    return (
        <Dialog>
            <DialogTrigger className="flex flex-row text-white font-semibold">
                
                    <Plus className="w-6 h-6 mr-2 text-white bg-green-500 rounded-xl" />
                    <h1 className="font-semibold text-white"> Add Task</h1>
                
            </DialogTrigger>
            <DialogContent>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <Input className="focus-visible:outline-blue-500" placeholder="Write here the title you are working on..." value={title} onChange={(e)=>setTitle(e.target.value)} />
                <h1 className="text-md font-semibold">Select Category</h1>
                <div className="flex flex-row justify-between px-6">
                    {categories.map(category => (
                        <div
                            key={category.name}
                            onClick={() => setCategory(category.name)}
                            className={cn(
                                "flex flex-col cursor-pointer items-center border-1 hover:bg-[#ffd1d1] bg-opacity-50 w-12 h-12 border-white place-content-center text-center rounded-md",
                                Category === category.name && 'bg-[#7db463]'
                            )}
                        >
                            {category.icon ? (
                                <img className="w-5 h-5" src={category.icon} alt={`${category.name} icon`} />
                            ) : (
                                <div className="w-5 h-5" />
                            )}
                            <h1>{category.name}</h1>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row justify-between">
                    <h1 className="font-semibold">Select sessions</h1>
                    <div className="flex flex-row place-content-end">
                        <Button variant={'ghost'} onClick={() => setsessions(sessions + 1)} size={'icon'}>
                            <Plus />
                        </Button>
                        <Input
                            type="number"
                            className="w-[20%]"
                            value={sessions}
                            onChange={(e) => setsessions(parseInt(e.target.value))}
                        />
                        <Button variant={'ghost'} onClick={() => setsessions(sessions > 1 ? sessions - 1 : 1)} size={'icon'}>
                            <Minus />
                        </Button>
                    </div>
                </div>
                <div>
                    {!isNoteEditing ? (
                        <div>
                            <Button onClick={() => setIsNoteEditing(true)} variant={'ghost'}>
                            <Plus className='mr-1' />Add Note
                            </Button>
                            <p className="raleway-regular">{note}</p>
                        </div>
                    ) : (
                        <AddNote handleNote={NoteHandlefun} savedNote={note} />
                    )}
                </div>
                
                <DialogFooter>
                   <DialogClose asChild>
                     <Button onClick={()=>AddNewTask(true)}>Save</Button>
                   </DialogClose>
                   <DialogClose asChild>
                   <Button variant="ghost" onClick={()=>AddNewTask(false)}>Cancel</Button>
                   </DialogClose>
    
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


const AddNote = ({ handleNote,savedNote }: { handleNote: (command: boolean, value: string) => void ,savedNote:string }) => {
    const [note, setNote] = useState<string>('');
    useEffect(()=>{
        setNote(savedNote)
    },[])
    const buttonHandle = (command: boolean) => {
        handleNote(command, command ? note : '');
    };

    return (
        <div className="mb-2">
            <Input
                placeholder="Add note here"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            <div className="flex flex-row justify-end gap-2">
                <Button onClick={() => buttonHandle(true)} variant={'green'} className="font-semibold">
                    Save
                </Button>
                <Button onClick={() => buttonHandle(false)} variant={'default'} className="font-semibold">
                    Cancel
                </Button>
            </div>
        </div>
    );
}
