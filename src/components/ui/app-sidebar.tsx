import {
    BarChart3,
    ChevronRight,
    ClipboardList,
    FileWarning,
    GraduationCap,
    LayoutDashboard,
    Scale,
    UserCheck,
    Users,
    History,
    UserPlus,
    List,
    PlusCircle,
    AlertCircle
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Link, useLocation } from "react-router-dom"

export function AppSidebar() {
    const location = useLocation();

    // Menu Utama dengan Sub-menu (Accordion)
    const menuGroups = [
        {
            title: "Kelola Siswa",
            icon: GraduationCap,
            subItems: [
                { title: "Data Siswa", url: "/siswa" },
                { title: "Tambah Siswa", url: "/siswa/create" },
            ]
        },
        {
            title: "Kelola Guru",
            icon: UserCheck,
            subItems: [
                { title: "Data Guru", url: "/guru" },
                { title: "Tambah Guru", url: "/guru/create" },
            ]
        },
        {
            title: "Kelola Pelanggaran",
            icon: FileWarning,
            subItems: [
                { title: "Data Pelanggaran", url: "/pelanggaran" },
                { title: "Input Pelanggaran Siswa", url: "/pelanggaran/input-pelanggaran" },
                { title: "Jenis Pelanggaran", url: "/pelanggaran/jenis-pelanggaran" },
                { title: "Tambah Jenis Pelanggaran", url: "/pelanggaran/create-jenis-pelanggaran" },
            ]
        }
    ];

    const SAWMenuItems = {
        title: "Metode SAW",
        icon: Scale,
        items: [
            { title: "Kriteria, Tahap, dan Bobot Rule", url: "/saw/kriteria-tahap-bobot-rule" },
            { title: "Hasil Ranking", url: "/saw/ranking" },
            { title: "Riwayat", url: "/saw/history" },
        ],
    };

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-bold text-black text-lg mb-4 uppercase tracking-wider">
                        SIPESDA
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* Dashboard (Single Menu) */}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    className={location.pathname === "/" ? "bg-black text-white hover:bg-black hover:text-white" : ""}
                                >
                                    <Link to="/">
                                        <LayoutDashboard className={location.pathname === "/" ? "text-white" : ""} />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* Render Kelola Siswa, Guru, Pelanggaran (Accordion) */}
                            {menuGroups.map((group) => (
                                <Collapsible key={group.title} asChild className="group/collapsible">
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                <group.icon />
                                                <span>{group.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {group.subItems.map((sub) => {
                                                    const isActive = location.pathname === sub.url;
                                                    return (
                                                        <SidebarMenuSubItem key={sub.title}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                className={isActive ? "bg-black text-white hover:bg-black hover:text-white" : ""}
                                                            >
                                                                <Link to={sub.url}>
                                                                    <span>{sub.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    );
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}

                            {/* Menu Saw (Accordion) */}
                            <Collapsible asChild className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <SAWMenuItems.icon />
                                            <span>{SAWMenuItems.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {SAWMenuItems.items.map((subItem) => {
                                                const isActive = location.pathname === subItem.url;
                                                return (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            className={isActive ? "bg-black text-white hover:bg-black hover:text-white" : ""}
                                                        >
                                                            <Link to={subItem.url}>
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                )
                                            })}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}