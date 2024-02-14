<script lang="ts">
import Buttons from '../UI/Buttons.vue';
import { authStore } from "../../stores/authStore";
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

export default defineComponent({
    props: [],
    components: { Buttons },
    computed: { ...mapStores(authStore) },
    methods: {
        validateAndRecover() {
          if (this.validateEmail(this.authStoreStore.form_data.email)) {
            this.onRecovery();
          } else {
            toast.error('Por favor ingrese un correo electrónico válido', 
            {
              position: 'top-right',
            });
          }
        },
        onRecovery() {
            this.authStoreStore.actionMainAuthStore("ACTION_RECOVERY", null);
        },
        validateEmail(email: string) {
          var re = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
          return re.test(String(email).toLowerCase());
        }
    }
});
</script>

<template>
        <div style="fontSize:2em; text-transform: uppercase;">
        Recuperar cuenta
    </div>

    <div class="content_form" style="margin:0 auto; margin-top: 15%; width: 80%;">
        <form class="px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="LABEL_INPUT_AUTH" for="email">
                    E-mail
                </label>
                <input class="INPUT_AUTH" id="email" type="email" placeholder="E-mail" maxlength="100" minlength="10"
                    v-model="authStoreStore.form_data.email">
            </div>

            <div style="text-align: center;">
                <button type="button" class="BTN_SUCCESS_1 py-2 px-4 rounded" @click="validateAndRecover">
                    Verificar
                </button>
                <div>
                    <RouterLink :to="{ name: 'auth-login' }" style="color:#005CD2; margin-top: 3%;"
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Ya la recuerdo
                    </RouterLink>
                    |
                    <RouterLink :to="{ name: 'auth-register' }" style="color:#005CD2; margin-top: 3%;"
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        No tienes una cuenta?
                    </RouterLink>
                </div>
            </div>
        </form>
    </div>
</template>