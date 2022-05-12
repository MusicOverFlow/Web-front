import { computed, reactive } from 'vue'
import AuthService, {LoginProps, LoginResponse} from "@/api/services/AuthService";

const state = reactive({
    name: '',
    username: '',
    id: '',
    token:'',
    error: ''
})

const getters = reactive({
    isLoggedIn: computed(() => state.id !== '')
})

const actions = {
    async login(userDetails:LoginProps) {
        const user:LoginResponse|undefined = await AuthService.login(userDetails)

        console.log("dd" + user)
        if (user == undefined) {
            state.error = 'Could not find user.'
            return false
        }

        state.id = user.id
        state.token = user.token
        state.error = ''
        console.log(state)
        return true
    },
    async register(userDetails:LoginProps) {
        const user:LoginResponse|undefined = await AuthService.login(userDetails)

        console.log("dd" + user)
        if (user == undefined) {
            state.error = 'Could not find user.'
            return false
        }

        state.id = user.id
        state.token = user.token
        state.error = ''
        console.log(state)
        return true
    },
    async logout() {
        state.name = ''
        state.username = ''
    }
}

export default { state, getters, ...actions }