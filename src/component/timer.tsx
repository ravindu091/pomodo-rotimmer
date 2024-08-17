import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";
import { Timer as TimerIcon, Coffee, RefreshCcw, Square, SkipForward, Play,ClipboardList } from 'lucide-react';
import { Button } from "./ui/button";

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

export default function Timer({taskList}:{taskList:TaskType[]}) {
    const [isOngoing, setIsOngoing] = useState<boolean>(false);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [time, setTime] = useState<number>(1500);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
     
    const timePeriod =[
        {name:'ongoing' , time:1500},
        {name:'break' , time:300},
        {name:'ongoing' , time:1500},
        {name:'break' , time:300},
        {name:'ongoing' , time:1500},
        {name:'break' , time:300},
        {name:'ongoing' , time:1500},
        {name:'lbreak' , time:900},
    ]

    useEffect(()=>{
        taskList.map(task=>console.log(task)
        )
        MasterControler()
    },[taskList])
    
    const [task, setTask] = useState<TaskType>({id: 0,
        title: 'string',
        note: 'string',
        completed:false,
        category:'string',
        sessions:0,
        state:"string",
        csessions:0})
  
     var intervelFn ;
    
    const MasterControler = ()=>{
       while (true) {
         timePeriod.map(time=>{
            setTime(time.time)
            taskList.filter(task=>task.csessions !== task.sessions && setTask(task))
            intervelFn = setInterval(()=>{
                console.log(10);
                
            },1000)
         })
       } 
    }

    const TimerFun = (command: string) => {
        

        const startTimer = () => {
            
            if (!isRunning) {
                setIsOngoing(true);
                setIsRunning(true);
                timerRef.current = setInterval(() => {
                    setTime((time) => {
                        if (time <= 1) {
                            clearInterval(timerRef.current!);
                            setIsRunning(false);
                            return 0;
                        }
                        return time - 1;
                    });
                }, 1000);
            }
        };
        
        const pauseTimer = () => {
            if (isRunning && timerRef.current) {
                clearInterval(timerRef.current);
                setIsRunning(false);
            }
        };

        const resetTimer = () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            setTime(1500); // Resetting to 25 minutes (example)
            setIsOngoing(false);
            setIsRunning(false);
        };

        if (command === "start") {
            startTimer();
        } else if (command === "pause") {
            pauseTimer();
        } else if (command === "reset") {
            resetTimer();
        }
    };

    return (
        <div className="h-full">
            <Card className="h-full flex flex-col justify-between bg-white bg-opacity-70 border-0">
                <CardHeader>
                    <div className="flex flex-row justify-between bg-white bg-opacity-15 rounded-3xl h-10">
                        <h1
                            className={cn(
                                'm-0 w-[50%] h-full rounded-3xl font-semibold text-center flex flex-row justify-center items-center',
                                isOngoing ? 'bg-white bg-opacity-50' : 'bg-opacity-50 opacity-25'
                            )}
                        >
                            <TimerIcon className="mr-1" />
                            Ongoing
                        </h1>
                        <h1
                            className={cn(
                                'm-0 w-[50%] h-full rounded-3xl font-semibold text-center flex flex-row justify-center items-center',
                                isOngoing ? 'bg-opacity-50 opacity-25' : 'bg-white bg-opacity-50'
                            )}
                        >
                            Break
                            <Coffee className="ml-1" />
                        </h1>
                    </div>
                </CardHeader>
                <CardContent>
                    <h1 className="text-6xl text-center">
                        {`${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`}
                    </h1>
                    <div className="w-full py-1 mt-3 bg-slate-50 bg-opacity-50 rounded-lg px-3">
                        <h1 className="flex flex-row font-semibold"><ClipboardList/>{task.title}</h1>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-row justify-between w-full px-5">
                        <Button variant="white" size="icon" className="rounded-3xl" onClick={() => TimerFun('reset')}>
                            <RefreshCcw />
                        </Button>
                        <Button
                            onClick={() => TimerFun(isRunning ? 'pause' : 'start')}
                            variant="green"
                            className="flex flex-row justify-center items-center text-center h-full font-semibold text-white text-lg"
                        >
                            {isRunning ? (
                                <>
                                    <Square className="text-white fill-current mr-2" /> stop
                                </>
                            ) : (
                                <>
                                    <Play className="text-white fill-current mr-2" /> Start
                                </>
                            )}
                        </Button>
                        <Button variant="white" size="icon" className="rounded-3xl">
                            <SkipForward />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
