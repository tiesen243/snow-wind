import Image from 'next/image'
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar'
import { AppSidebarClient } from './app-sidebar.client'
import { UserCard } from './user-card'

export const AppSidebar: React.FC = () => (
  <Sidebar>
    <SidebarHeader>
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="https://tiesen.id.vn/assets/logo.svg"
          alt="logo"
          width={28}
          height={28}
          className="dark:invert"
          priority
        />
        <span className="text-xl font-bold">Tiesen</span>
      </Link>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Your Notes</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <AppSidebarClient />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <UserCard />
    </SidebarFooter>
  </Sidebar>
)
