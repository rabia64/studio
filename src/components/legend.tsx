
"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Home, Briefcase, ClipboardList, Flame, Info } from "lucide-react"

export default function Legend() {
  return (
    <Collapsible className="relative">
        <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
                <span className="sr-only">View Legend</span>
            </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="absolute z-50 right-0 mt-2">
            <div className="p-4 border rounded-lg bg-card shadow-lg w-64">
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <h3 className="font-bold mb-2">Categories</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-pink-200" />
                                <Home className="h-4 w-4 text-pink-900" />
                                <span>Home</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-yellow-200" />
                                <Briefcase className="h-4 w-4 text-yellow-900" />
                                <span>Work</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-green-200" />
                                <ClipboardList className="h-4 w-4 text-green-900" />
                                <span>Miscellaneous</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Priorities</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <div className="flex">
                                    <Flame className="h-4 w-4 text-red-500" />
                                    <Flame className="h-4 w-4 text-red-500" />
                                    <Flame className="h-4 w-4 text-red-500" />
                                </div>
                                <span>High</span>
                            </li>
                            <li className="flex items-center gap-2">
                            <div className="flex">
                                    <Flame className="h-4 w-4 text-orange-400" />
                                    <Flame className="h-4 w-4 text-orange-400" />
                                </div>
                                <span>Medium</span>
                            </li>
                            <li className="flex items-center gap-2">
                            <div className="flex">
                                    <Flame className="h-4 w-4 text-yellow-400" />
                                </div>
                                <span>Low</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </CollapsibleContent>
    </Collapsible>
  )
}
