<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["classLabel", "label_name", "label_for_to_id"],
    components: {},
});
</script>

<template>
    <label :class="classLabel" :for="label_for_to_id">
        {{ label_name }}
    </label>
</template>