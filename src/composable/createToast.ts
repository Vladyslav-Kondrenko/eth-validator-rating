import { toast, useToast } from '@/components/ui/toast/use-toast'

export function createToast(title:string, description:string, variant: 'success' | 'error' | 'default' = 'default' ) {
  const toastSettings = {
    title: title,
    description: description,
    variant: variant
  };
  toast(toastSettings);
}