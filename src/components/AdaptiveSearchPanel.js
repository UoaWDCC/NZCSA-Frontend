import { getLunar } from "../utils/LunarCalendar"

export default function (){
    const test = ()=>{
        getLunar()
    }
    return <div onClick={test}>TEST</div>
}