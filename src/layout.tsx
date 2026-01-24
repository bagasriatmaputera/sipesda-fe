import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Toaster } from "sonner"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
        <SidebarProvider>
            <AppSidebar />
            <Toaster position="top-center" richColors closeButton />
            <main className="w-flex-1 overflow-y-auto overflow-x-hidden bg-zinc-50/50">
                <div className="p-2 md:hidden">
                    <SidebarTrigger />
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 overflow-x-hidden">
                    {children}
                </div>
            </main>
        </SidebarProvider>
        </div>
    )
}