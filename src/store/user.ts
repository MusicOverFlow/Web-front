import { computed, reactive } from 'vue'
import AuthService, {LoginProps, LoginResponse, RegisterProps} from "@/api/services/AuthService";
import {RegisterResponse} from "@/api/services/AccountService";

const state = reactive({
    jwt: '',
    error: ''
})

const getters = reactive({
    isLoggedIn: computed(() => state.jwt !== '')
})

const actions = {
    async login(userDetails:LoginProps) {
        const user:LoginResponse|undefined = await AuthService.login(userDetails)

        if (user == undefined || user.jwt == undefined) {
            state.error = 'Could not find user.'
            return false
        }

        state.jwt = user.jwt
        state.error = ''
        console.log(state)
        return true
    },
    async register(userDetails:RegisterProps) {
        const user:RegisterResponse|undefined = await AuthService.register(userDetails)

        if (user == undefined) {
            state.error = 'error'
            return false
        }

        await this.login(userDetails)

        return true
    }
}

export default { state, getters, ...actions }