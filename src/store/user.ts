import { computed, reactive } from 'vue'
import AuthService, {LoginProps} from "@/api/services/AuthService";

const state = reactive({
    name: '',
    username: '',

    error: ''
})

const getters = reactive({
    isLoggedIn: computed(() => state.username !== '')
})

const actions = {
    async login(userDetails:LoginProps) {
        const user = await AuthService.login(userDetails)
        if (user == null) {
            state.error = 'Could not find user.'
            return false
        }

        /*state.name = user.name
        state.username = username
        state.error = ''*/

        return true
    },
    async logout() {
        state.name = ''
        state.username = ''
    }
}

export default { state, getters, ...actions }