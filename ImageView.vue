<template>
    <div class="containerBody">
        <div id="canvasContainer" ref="canvasContainer"></div>
        <div>
            <ul>
                <li v-for="item in listBodyParts">
                    {{ item.value }}
                </li>
            </ul>
        </div>
    </div>

</template>
  
<script lang="ts">
import ImageView from './ImageView';
import { computed, onMounted, ref } from "vue";


export default {
    name: 'ImageView',
    components: {},
    setup() {
        ///comentarios
        onMounted(()=>{
            
        });

        return {
            ...ImageView(),
        };
    },
};
</script>

<style>
#canvasContainer {
    width: 300px;
    height: 500px;
    border: solid 2px cornflowerblue;
}

.containerBody{
    display: flex;
    flex-direction: row;
}
</style>
  
  