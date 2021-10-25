import {useToast} from 'vue-toastification'
import { authService } from '../components/auth'
const toast = useToast()
export function handleError(error) {
    let message = typeof(error.response.data.message) === 'undefined' ? "" : error.response.data.message
    if(error.response.status === 404) toast.error(`Backend error (Not Found) ${message}`)
    if(error.response.status === 409) toast.error(`Backend error (Conflict) ${message}`)
    if(error.response.status === 401) {
        authService.logout()
        location.reload(true)
    }
    if(error.response.status === 500) toast.error(`Backend error (500) ${message}`)
}