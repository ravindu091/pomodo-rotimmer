import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";


export default function CurrentTask(){
    return(
        <div className="w-full ">
            <Card className="w-[100%] h-full py-0 border-0 bg-white bg-opacity-70">
                <CardHeader className="py-1" >
                    <CardTitle className="text-lg pt-0 text-segoeuii">Daily Progress</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                    <div className="flex flex-row">
                        <p className=" bg-blue-600 px-2 py-0 rounded-xl">0</p>
                        <p className="ps-3">Tasks was done</p>
                        
                    </div>
                    <p className="text-sm text-slate-500 pt-3">{Date()}</p>
                </CardContent>
                <CardFooter className="py-0">

                </CardFooter>
            </Card>
        </div>
    )
}