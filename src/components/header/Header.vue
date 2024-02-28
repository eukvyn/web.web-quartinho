<template>
    <Root>
        <logoIcon />
        <FormControl />
    </Root>
</template>

<script>
import Root from './Root.vue'
import LogoIcon from './LogoIcon.vue'
import FormControl from './FormControl.vue'

export default {
    name: 'HeaderComponent',
    components: {
        Root,
        LogoIcon,
        FormControl
    }
}
</script>
<style></style>