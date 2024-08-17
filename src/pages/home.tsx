
import { useEffect, useState } from "react";

import Timer from "../component/timer";
import TasksList from "@/component/tasklist";
import CurrentTask from "@/component/currenttask";

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


export default function Home() {
    const [taskList , setTaskList] = useState<TaskType[]>([]);
    
    
    useEffect(()=>{
        document.title= 'Home';
        
    },[])
    
        
    
    const tasklist =(tasklist:[])=>{
        setTaskList(tasklist)
    }   

    return(
        <div className={'flex flex-wrap  max-md:w-full  max-sm:p-20 md:px-20 py-10 justify-end bg-background-image1 bg-cover bg-center w-full h-screen'}>
            <div className="w-[45%] ">
                <TasksList tasklist={tasklist} />
            </div>
            <div className="flex flex-col gap-3 p-3  w-[50%]  justify-start">
              
                <CurrentTask />
               
               <Timer taskList={taskList} />
               
            </div>
        </div>
    )
}
 


//set HTTPS_PROXY=http://172.16.0.1:44355
//set HTTP_PROXY=http://172.16.0.1:44355




git config --global user.name "ravindu091"
git config --global user.email "diluparavindu091@gmil.com"
