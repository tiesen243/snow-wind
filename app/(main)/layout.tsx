import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './_components/app-sidebar'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <SidebarProvider>
    <AppSidebar />
    <main className="container">
      <SidebarTrigger /> {children}
    </main>
  </SidebarProvider>
)

export default MainLayout
