import { TooltipProvider } from '@/components/ui/tooltip'
import { PageClient } from './page.client'

const Page: React.FC = () => (
  <TooltipProvider>
    <PageClient />
  </TooltipProvider>
)

export default Page
