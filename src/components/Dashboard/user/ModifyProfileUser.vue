<script lang="ts">
import Inputs from "../../UI/Inputs.vue";
import Buttons from "../../UI/Buttons.vue";
import { defineComponent } from 'vue';

import { mapStores } from 'pinia';
import { userStore } from "@/stores/userStore";
import { useToast } from "vue-toast-notification";

const toast = useToast();

export default defineComponent({
    props: [],
    components: { Inputs, Buttons },
    computed: { ...mapStores(userStore) },
    methods: {
        validateAndModify() {
          if (this.validateEmail(this.userStoreStore.form_data.email)) {
            this.onSubmitModifyProfile();
          } else {
            toast.error('Por favor ingrese un correo electrónico válido', 
            {
              position: 'top-right',
            });
          }
        },
        onSubmitModifyProfile() {
            this.userStoreStore.actionMainUserStore("ACTION_UPDATE_PROFILE_USER", null);
        },
        validateEmail(email: string) {
          var re = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
          return re.test(String(email).toLowerCase());
        },
    }
});

</script>

<template>
    <div style="width: 70%; margin: 0 auto; margin-top: 5%; ">
        <div class="mb-4">
            <label class="LABEL_INPUT_AUTH" for="email">
                E-mail
            </label>
            <input class="INPUT_AUTH" id="email" type="email" placeholder="E-mail" maxlength="110" minlength="5"
                v-model="userStoreStore.form_data.email">
        </div>

        <div class="mb-4">
            <label class="LABEL_INPUT_AUTH" for="password">
                Contraseña
            </label>
            <input class="INPUT_AUTH" id="password" type="password" placeholder="******************"
                v-model="userStoreStore.form_data.password">
        </div>

        <div class="mb-4">
            <label class="LABEL_INPUT_AUTH" for="confirm_password">
                Confirmar contraseña
            </label>
            <input class="INPUT_AUTH" id="confirm_password" type="password" placeholder="******************"
                v-model="userStoreStore.form_data.confirm_password">
        </div>

        <div style="text-align: center;">
            <button type="button" class="BTN_SUCCESS_1 py-2 px-4 rounded" @click="validateAndModify">
                Modificar
            </button>
        </div>

    </div>
</template>