
"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Home, Briefcase, ClipboardList, Flame } from "lucide-react"

export default function Legend() {
  return (
    <div className="px-8 w-full max-w-lg">
        <Collapsible className="w-full">
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full flex justify-between items-center">
                    <h2 className="text-lg font-semibold">View Legend</h2>
                    <ChevronsUpDown className="h-4 w-4" />
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="p-4 border rounded-lg mt-2 bg-card">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  )
}
