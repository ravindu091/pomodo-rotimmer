import { CircleCheckBig, EllipsisVertical, Eye, Minus, PenLine, Plus, Trash2, TriangleAlert} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "./ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Foodi from './svg/food.svg';
import Worki from './svg/work.svg';
import Playi from './svg/play.svg';
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
interface TaskProps {
    id: number;
    title: string;
    category: string;
    sessions: number;
    note: string;
    state: string;
    csessions: number;
    handleTask:any;
}

export default function Task({ id, title, category, sessions, note, state, csessions,handleTask }: TaskProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog,setOpenDeleteDialog] = useState(false)
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const [isEditing,setIsEditing] = useState(false)
    const [task,setTask] = useState({title:title,category:category,sessions:sessions,note:note})
    const[isNoteEditing,setIsNoteEditing] = useState(false)
    
    const deleteTask=()=>{
        setOpenDeleteDialog(false)
        handleTaskCommand(false)
    }
    const handleTaskCommand =(command:boolean)=>{
        if(command){
            handleTask(id,task)
        }else if(!command){
            handleTask(id,'delete')
        }
    }
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
           setTask({...task,note:value})
        } else {
            setIsNoteEditing(false);
        }
    };
    return (
        <div className="flex flex-row justify-between hover:bg-white hover:bg-opacity-40 p-2 rounded-md">
            <div>
                <h1 className="text-md font-semibold">{title}</h1>
                <p>Session {csessions}/{sessions}</p>
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus-visible:outline-none">
                        <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleOpenDialog}><Eye className="w-4 h-4 mr-2 " /> Task Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>setIsEditing(true)}><PenLine className="w-4 h-4 mr-2" /> Edit Task</DropdownMenuItem>
                        
                        <DropdownMenuItem onClick={()=>setOpenDeleteDialog(true)}><Trash2 className="w-4 h-4 mr-2" /> Delete Task</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
    <DialogContent aria-describedby={csessions === 0 ? undefined : "description"} className="w-[400px]">
        <DialogHeader>
            <DialogTitle>
                {title}
            </DialogTitle>
            
                <DialogDescription id="description" asChild>
                    <TaskInfo 
                        
                        category={category} 
                        sessions={sessions} 
                        note={note} 
                        state={state} 
                        csessions={csessions} 
                    />
                </DialogDescription>
          
        </DialogHeader>
        <div className="flex flex-row justify-end ml-4">
        <Button variant={'green'} onClick={handleCloseDialog} className="ml-4">
            OK
        </Button>
        </div>
    </DialogContent>
    
</Dialog>

        <Dialog open={openDeleteDialog}  onOpenChange={setOpenDeleteDialog}>
           <DialogContent aria-describedby={undefined}>
                <DialogHeader className="gap-3">
                    <DialogTitle asChild>
                        <div className="flex flex-row place-content-center"><Trash2 className=" w-8 h-8 p-1 text-red-400 rounded-3xl bg-[#d8c1c1]" /></div>
                    </DialogTitle>
                    <h1 className="text-center pt-3">Are you sure? You want to delete this?</h1>
                    <h1 className="text-xl text-center bg-slate-200 p-2 rounded-md">{title}</h1>
                    <p className="flex flex-row place-content-center"><TriangleAlert className="text-red-300 mr-2"/>This action cannot be undone</p>
                    <div className="flex flex-row justify-center">
                        <Button variant={'red'} className="  focus-visible:outline-none" onClick={deleteTask}>Delete</Button>
                    </div>
                </DialogHeader>
           </DialogContent>
        </Dialog>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
           
            <DialogContent>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <Input className="focus-visible:outline-blue-500" placeholder="Write here the title you are working on..." value={task.title} onChange={(e)=>setTask({...task,title:e.target.value})} />
                <h1 className="text-md font-semibold">Select Category</h1>
                <div className="flex flex-row justify-between px-6">
                    {categories.map(category => (
                        <div
                            key={category.name}
                            onClick={() => setTask({...task,category:category.name})}
                            className={cn(
                                "flex flex-col cursor-pointer items-center border-1 hover:bg-[#ffd1d1] bg-opacity-50 w-12 h-12 border-white place-content-center text-center rounded-md",
                                task.category === category.name && 'bg-[#7db463]'
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
                        <Button variant={'ghost'} onClick={() => setTask({...task,sessions:sessions+1})} size={'icon'}>
                            <Plus />
                        </Button>
                        <Input
                            type="number"
                            className="w-[20%]"
                            value={task.sessions}
                            onChange={(e) => setTask({...task,sessions:parseInt(e.target.value)})}
                        />
                        <Button variant={'ghost'} onClick={() => setTask({...task,sessions:sessions > 1 ? sessions - 1 : 1})} size={'icon'}>
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
                            <p className="raleway-regular">{task.note}</p>
                        </div>
                    ) : (
                        <AddNote handleNote={NoteHandlefun} savedNote={note} />
                    )}
                </div>
                
                <DialogFooter>
                   <DialogClose asChild>
                     <Button onClick={()=>handleTaskCommand(true)}>Save</Button>
                   </DialogClose>
                   <DialogClose asChild>
                   <Button variant="ghost" >Cancel</Button>
                   </DialogClose>
    
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </div>
    );
}

const TaskInfo = ({ category, sessions, note, state, csessions }:{ category:string, sessions:number, note:string, state:string, csessions:number } ) => {
    return (
        <div className="flex flex-col gap-3 pt-3">
            
            <div className="flex flex-row text-slate-500 text-sm justify-between px-5">
                <p className="flex flex-row place-items-center"><CircleCheckBig className="w-4 h-4 mr-2 text-green-600 "/> Sessions {csessions}/{sessions}</p>
                <p>{category}</p>
                <p>State: {state}</p>
            </div>
            <p>Notes</p>
            <p className="font-sans"> {note}</p>
           
        </div>
    );
};

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
