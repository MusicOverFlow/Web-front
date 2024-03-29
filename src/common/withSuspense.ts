import {h} from 'vue'
import SuspenseComponent from '../components/SuspenseComponent.vue'

const withSuspense = (component, propsComponent = []) => {
    return {
        props: [...propsComponent],
        components: {
            SuspenseComponent,
        },
        setup(props) {
            return () => h(SuspenseComponent, [h(component, {...props})])
        },
    }
}

export default withSuspense