<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: [],
    components: {},
    data() {
        return {
            modeAdvanced: false,
            generate_str: "", longitud: 0, checkbox1: false, checkbox2: false, checkbox3: false, checkbox4: false, password_generate: "",
            cant_min_num: 0, cant_min_car: 0, optionalPublished: false, charsets: {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!”#$%&‘()ÑÁÉÍÓÚáéíóúñ*+,-./^ ´_`{|}~[\]:;=?'
          }
        }
    },
    methods: {
        onActiveModeAdvanced() {
            this.modeAdvanced = !this.modeAdvanced
            this.optionalPublished = false;
            if (!this.modeAdvanced) {
                this.longitud = 0;
                this.checkbox1 = false;
                this.checkbox2 = false;
                this.checkbox3 = false;
                this.checkbox4 = false;
            }
        },
        onCleanPassGenerated() {
            if (this.modeAdvanced) {
                this.optionalPublished = false;
                this.password_generate = "";
            } else {
                this.password_generate = "";
            }
        },
        onGenerateNow() {
            this.modeAdvanced = false;
            const STR_LONG = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!”#$%&‘()ÑÁÉÍÓÚáéíóúñ*+,-./^ ´_`{|}~[\]:;=?";

            let password = "";
            for (let x = 0; x < 30; x++) {
                let random = Math.floor(Math.random() * STR_LONG.length);
                password += STR_LONG.charAt(random);
            }
            this.password_generate = password;
        },
        handleSelectCheckbox(e: InputEvent & HTMLInputElement) {
            const n: string = (e.target as HTMLInputElement).name;
            this[n] = (e.target as HTMLInputElement).checked;
            if (n === "checkbox3") {
                this.cant_min_num = this.checkbox3 ? 1 : 0;
            } else if (n === "checkbox4") {
                this.cant_min_car = this.checkbox4 ? 1 : 0;
            }
        },
        completeMinimuns(password: string, cant_min: number, mapString: string, countCant: (_: string) => number){
          let random = Math.floor(Math.random() * mapString.length);
          const split = password.split("")
          split[random] = mapString.charAt(random)
          password = split.join("");

          if (countCant(password) < cant_min) {
              password = this.completeMinimuns(password, cant_min, mapString, countCant)
          }
          return password
        },
        validateMinimuns(password: string) {
          if(this.checkbox3)
            password = this.completeMinimuns(password, this.cant_min_num, this.charsets.numbers, (text: string) => text.match(/\d/g)?.length || 0)
          if(this.checkbox4)
            password = this.completeMinimuns(password, this.cant_min_car, this.charsets.symbols, (text: string) => text.match(/[^a-zA-Z0-9]/g)?.length || 0)
          return password
        },
        onOptionalGenerateNow(e: any) {
          if ((!this.checkbox1 && !this.checkbox2 && !this.checkbox3 && !this.checkbox4)) {
              alert("Necesitas seleccionar al menos un checkbox");
              return;
          } else if (this.longitud === 0) {
              alert("Necesitas establecer una longitud");
              return;
          } else if(this.longitud < this.cant_min_num + this.cant_min_car) {
              alert("Existe conflicto entre los parametros establecidos y la longitud deseada");
              return;
          }
          let selectedCharsets = '';
          if (this.checkbox1) selectedCharsets += this.charsets.uppercase;
          if (this.checkbox2) selectedCharsets += this.charsets.lowercase;
          if (this.checkbox3) selectedCharsets += this.charsets.numbers;
          if (this.checkbox4) selectedCharsets += this.charsets.symbols;

          let password = '';
          for (let i = 0; i < this.longitud; i++) {
            const randomIndex = Math.floor(Math.random() * selectedCharsets.length);
            password += selectedCharsets.charAt(randomIndex);
          }

          this.password_generate = this.validateMinimuns(password);
          // console.log("Numbers:", this.password_generate.match(/\d/g)?.length || 0)
          // console.log("Special:", this.password_generate.match(/[^a-zA-Z0-9]/g)?.length || 0)
          // console.log("Lower letters:", this.password_generate.match(/[a-z]/g)?.length || 0)
          // console.log("Upper letters:", this.password_generate.match(/[A-Z]/g)?.length || 0)
          // console.log("Lenght:", this.password_generate.length)
          // console.log("----------------------------------------")
        },
        async onClipboard() {
            try {
                await navigator.clipboard.writeText(this.modeAdvanced ? this.password_generate : this.password_generate);
                alert("La contraseña generada fue copiada con éxito. CTRL + V para pegar o Click derecho > pegar");
            } catch (err) {
                console.error('Error al copiar: ', err);
            }
        }
    }
});

</script>

<template>
    <div style="color: #355f27; text-align: center; font-size: 1.5em; padding: 2%;">
        Generador de contraseña
    </div>
    <div class="content_pass_generate">
        <p class="title">{{ password_generate || optionalPublished ? "Contraseña generada" : "Visualizador" }}</p>
        <p class="pass">{{ password_generate ? password_generate : (optionalPublished ? generate_str : "? ? ?") }}</p>
        <div class="btn_content_action_copy_generate">
            <button type="button" title="Limpiar"
                :style="{ visibility: password_generate || optionalPublished ? 'visible' : 'hidden' }"
                @click="onCleanPassGenerated">
                <i class="fa-solid fa-ban"></i></button>
            <button type="button" title="Copiar" @click="onClipboard"
                :style="{ visibility: password_generate || optionalPublished ? 'visible' : 'hidden' }"><i
                    class="fa-solid fa-copy"></i></button>
            <button type="button" title="Generar otra contraseña" @click="onGenerateNow"
                :style="{ visibility: !modeAdvanced ? 'visible' : 'hidden' }">
                <i class="fa-solid fa-shuffle"></i>
            </button>
        </div>
    </div>

    <div class="content_form">
        <div class="px-8 pt-6 pb-8 mb-4">
            <b style="color:#355f27">{{ modeAdvanced ? "Modo opcional activado" : "" }}</b>
            <div class="content_arrow_expand_generate_pass" @click="onActiveModeAdvanced">
                <i style="font-size: 2em;"
                    :class="[modeAdvanced ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up']"></i>
            </div>
            <div v-if="modeAdvanced">
                <div class="md:flex md:items-center mb-6" v-if="modeAdvanced">
                    <label title="Carácteres Mayúsculos" class="content_checkbox md:w-2/3 block text-gray-500 font-bold">
                        <input class="mr-2 leading-tight" type="checkbox" name="checkbox1"
                            @click="(event) => handleSelectCheckbox(event)">
                        <span class="text-sm">
                            A-Z
                        </span>
                    </label>
                    <label title="Carácteres Minúsculos" class="content_checkbox md:w-2/3 block text-gray-500 font-bold">
                        <input class="mr-2 leading-tight" type="checkbox" name="checkbox2"
                            @click="(event) => handleSelectCheckbox(event)">
                        <span class="text-sm">
                            a-z
                        </span>
                    </label>
                    <label title="Dígitos numéricos" class="content_checkbox md:w-2/3 block text-gray-500 font-bold">
                        <input class="mr-2 leading-tight" type="checkbox" name="checkbox3"
                            @click="(event) => handleSelectCheckbox(event)">
                        <span class="text-sm">
                            0-9
                        </span>
                    </label>
                    <label class="content_checkbox md:w-2/3 block text-gray-500 font-bold">
                        <input title="Carácteres especiales" class="mr-2 leading-tight" type="checkbox" name="checkbox4"
                            @click="(event) => handleSelectCheckbox(event)">
                        <span class="text-sm">
                            !@#&*...
                        </span>
                    </label>
                </div>
                <div class="mb-4">
                    <label class="LABEL_INPUT_AUTH" for="length">
                        Longitud
                    </label>
                    <input v-model="longitud" class="INPUT_AUTH" min="0"
                        max="30" id="length" type="number" placeholder="Longitud">
                </div>
                <div class="mb-4" v-if="checkbox3">
                    <label class="LABEL_INPUT_AUTH" for="cant_min_num">
                        Cantidad mínima de números
                    </label>
                    <input v-model="cant_min_num" name="cant_min_num"
                        class="INPUT_AUTH" min="1" max="9" id="cant_min_num" type="number"
                        placeholder="Cantidad mínima de números">
                </div>
                <div class="mb-4" v-if="checkbox4">
                    <label class="LABEL_INPUT_AUTH" for="cant_min_num">
                        Cantidad mínima de caracteres
                    </label>
                    <input v-model="cant_min_car" class="INPUT_AUTH"
                        min="1" max="23" id="cant_min_car" type="number" placeholder="Cantidad mínima de carácteres">
                </div>
                <div style="text-align: center;">

                    <div style="text-align: center; margin-bottom: 5%;">
                        <button type="button" class="BTN_SUCCESS_3 py-2 px-4 rounded" @click="onOptionalGenerateNow">
                            Generar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>