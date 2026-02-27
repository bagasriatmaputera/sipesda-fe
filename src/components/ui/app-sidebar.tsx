import {
    ChevronRight,
    FileWarning,
    GraduationCap,
    LayoutDashboard,
    Scale,
    UserCheck,
    LogOut
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
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
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

export function AppSidebar() {
    const location = useLocation();
    const { logout, loading } = useAuth();

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
                { title: "Input Pelanggaran", url: "/pelanggaran/input-pelanggaran" },
                { title: "Jenis Pelanggaran", url: "/pelanggaran/jenis-pelanggaran" },
            ]
        }
    ];

    const SAWMenuItems = {
        title: "Metode SAW",
        icon: Scale,
        items: [
            { title: "Kriteria & Bobot", url: "/saw/kriteria-tahap-bobot-rule" },
            { title: "Hasil Ranking", url: "/saw/ranking" },
            { title: "Riwayat", url: "/saw/history" },
        ],
    };

    // Helper untuk style active
    const activeClass = "bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white shadow-md shadow-emerald-200";
    const iconActiveClass = "text-white";

    return (
        <Sidebar className="border-r border-emerald-100">
            <SidebarContent className="bg-white">
                <SidebarGroup>
                    <SidebarGroupLabel className="flex items-center gap-2 px-2 py-6 mb-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold shadow-sm">
                            S
                        </div>
                        <span className="text-xl font-black bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent tracking-tight">
                            SIPESDA
                        </span>
                    </SidebarGroupLabel>
                    
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* Dashboard */}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    className={location.pathname === "/" ? activeClass : "text-emerald-900 hover:bg-emerald-50 hover:text-emerald-700"}
                                >
                                    <Link to="/">
                                        <LayoutDashboard className={location.pathname === "/" ? iconActiveClass : "text-emerald-600"} />
                                        <span className="font-medium">Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* Menu Groups (Accordion) */}
                            {menuGroups.map((group) => (
                                <Collapsible key={group.title} asChild className="group/collapsible">
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton className="text-emerald-900 hover:bg-emerald-50">
                                                <group.icon className="text-emerald-600" />
                                                <span className="font-medium">{group.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-emerald-400" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub className="border-l-emerald-100 ml-4">
                                                {group.subItems.map((sub) => (
                                                    <SidebarMenuSubItem key={sub.title}>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            className={location.pathname === sub.url ? activeClass : "text-emerald-700/80 hover:text-emerald-900 hover:bg-emerald-50"}
                                                        >
                                                            <Link to={sub.url}>
                                                                <span>{sub.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}

                            {/* Menu SAW */}
                            <Collapsible asChild className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="text-emerald-900 hover:bg-emerald-50">
                                            <SAWMenuItems.icon className="text-emerald-600" />
                                            <span className="font-medium">{SAWMenuItems.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-emerald-400" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub className="border-l-emerald-100 ml-4">
                                            {SAWMenuItems.items.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        className={location.pathname === subItem.url ? activeClass : "text-emerald-700/80 hover:text-emerald-900 hover:bg-emerald-50"}
                                                    >
                                                        <Link to={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 bg-emerald-50/50 border-t border-emerald-100">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                    onClick={(e) => logout(e)} 
                    disabled={loading}
                >
                    <LogOut className="h-4 w-4" />
                    <span className="font-semibold">{loading ? 'Keluar...' : 'Logout'}</span>
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}