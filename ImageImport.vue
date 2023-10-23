<template>
    <div id="canvasContainer" ref="canvasContainer"></div>
</template>
  
<script lang="ts">
import ImageImport from './ImageImport';
import { computed, onMounted, ref } from "vue";


export default {
    name: 'ImageImport',
    components: {},
    setup() {

        return {
            ...ImageImport(),
        };
    },
};
</script>

<style>
#canvasContainer {
    width: 500px;
    height: 560px;
}
</style>