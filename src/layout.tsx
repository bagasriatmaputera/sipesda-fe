import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-flex-1 overflow-y-auto overflow-x-hidden bg-zinc-50/50">
                <div className="p-2 md:hidden">
                    <SidebarTrigger />
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 overflow-x-hidden">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}