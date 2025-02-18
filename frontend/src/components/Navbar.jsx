import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export function Navbar() {

    const [selectValue,setSelectValue] = useState("Faculty")

    return (
        <div
            className="w-full flex justify-center"
        >
            <Select
                value={selectValue}
                onValueChange={(value)=>{
                    setSelectValue(value)
                }}
            >
                <SelectTrigger
                    className="min-w-[200px] w-1/4"
                >
                    <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Faculty">
                        <a href="/faculty">Faculty</a>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
