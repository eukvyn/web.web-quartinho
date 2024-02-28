import { defineRule, configure } from 'vee-validate'
import { required, min, regex, email } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import pt_BR from '@vee-validate/i18n/dist/locale/pt_BR.json'

defineRule('required', required)
defineRule('min', min)
defineRule('regex', regex)
defineRule('email', email)

configure({
    generateMessage: localize('pt_BR', {
        messages: {
            ...pt_BR.messages,
        },
    }),
})
