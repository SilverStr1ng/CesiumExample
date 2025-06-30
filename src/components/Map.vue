<template>
  <div id="container">

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'


Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN
onMounted(async() => {
  const viewer = new Cesium.Viewer('container', {
    homeButton: false,
    geocoder: false,
    timeline: false,
    navigationHelpButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    selectionIndicator: false,
    infoBox: false,
    animation: false,
  })

  window.__viewer = viewer

  // 优化地图表现
  viewer.scene.globe.depthTestAgainstTerrain = true
  viewer.scene.globe.enableLighting = true
  viewer.scene.postProcessStages.fxaa.enabled = true

  // 添加地形
  const terrain = await Cesium.CesiumTerrainProvider.fromIonAssetId(1)
  viewer.terrainProvider = terrain
})
</script>

<style scoped>

</style>