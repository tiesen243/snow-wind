'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSession } from '@/hooks/use-session'

export const UserCard: React.FC = () => {
  const session = useSession()
  if (!session) return null
  const { user } = session

  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm transition-all">
      <Avatar className="h-7 w-7 rounded-md">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="grid flex-1">
        <div className="font-medium">{user.name}</div>
        <div className="overflow-hidden text-xs text-muted-foreground">
          <div className="line-clamp-1">{user.email}</div>
        </div>
      </div>
    </div>
  )
}
