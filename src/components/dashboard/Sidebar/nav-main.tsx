// "use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { MenuItem } from "@/types/navigation"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
    items,
}: {
    items: MenuItem[]
}) {
    return (
        <SidebarGroup className="">
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu className="gap-3">
                {items.map((item, index) => (
                    (!item.submenu) ? <>
                        <SidebarMenuItem  key={index} className={`${item.isActive ? 'bg-blue-400 rounded-md text-white': ''} hover:bg-blue-400 rounded-md `}>
                            <SidebarMenuButton tooltip={item.title} >
                                {item.icon && <item.icon size='33px' />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </> :
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={item.isActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem >
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>

                                        {item.submenu?.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <a href={subItem.url}>
                                                        <span>{subItem.title}</span>
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
