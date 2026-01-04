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
                { title: "Tambah Siswa", url: "/siswa/tambah" },
            ]
        },
        {
            title: "Kelola Guru",
            icon: UserCheck,
            subItems: [
                { title: "Data Guru", url: "/guru" },
                { title: "Tambah Guru", url: "/guru/tambah" },
            ]
        },
        {
            title: "Kelola Pelanggaran",
            icon: FileWarning,
            subItems: [
                { title: "Data Pelanggaran", url: "/pelanggaran" },
                { title: "Input Pelanggaran Siswa", url: "/pelanggaran/input" },
                { title: "Jenis Pelanggaran", url: "/pelanggaran/jenis" },
                { title: "Tambah Jenis Pelanggaran", url: "/pelanggaran/jenis/tambah" },
            ]
        }
    ];

    const ahpMenuItems = {
        title: "Metode AHP",
        icon: Scale,
        items: [
            { title: "Kriteria", url: "/ahp/kriteria" },
            { title: "Perbandingan", url: "/ahp/perbandingan" },
            { title: "Hasil Ranking", url: "/ahp/ranking" },
            { title: "Riwayat", url: "/ahp/history" },
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

                            {/* Menu AHP (Accordion) */}
                            <Collapsible asChild className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <ahpMenuItems.icon />
                                            <span>{ahpMenuItems.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {ahpMenuItems.items.map((subItem) => {
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