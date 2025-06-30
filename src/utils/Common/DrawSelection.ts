/**
 * @description 绘制选区，用于在地图上选择区域
 * @param {Cesium.Viewer} [viewer] - Cesium Viewer实例
 * @param {Object} [options] - 绘制选区的配置选项
 * @author rakuyou
 * @version 1.0.0
 * @returns {Array} [Cartesian3[]] - 返回绘制的选区坐标数组
 */

import * as Cesium from 'cesium'

interface DrawSelectionOptions {
  strokeColor?: Cesium.Color;
  fillOpacity?: number;
  strokeWidth?: number;
  showPreview?: boolean;
}

class DrawSelection {
  private _handler: Cesium.ScreenSpaceEventHandler | null = null
  private _activePoints: Cesium.Cartesian3[] = []
  private _isDrawing: boolean = false
  private _previewShape: Cesium.Entity | null = null

  viewer: Cesium.Viewer
  options: DrawSelectionOptions

  constructor(viewer: Cesium.Viewer, options: Partial<DrawSelectionOptions> = {}) {
    this.viewer = viewer
    this.options = {
      strokeColor: Cesium.Color.YELLOW,
      fillOpacity: 0.3,
      strokeWidth: 2,
      showPreview: true,
      ...options
    }

    this._handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)

    this.init()
  }

  /**
   * @description 初始化绘制功能
   */
  init() {
    this.setupEventHandlers()
  }

  /**
   * 设置事件处理器
   */
  private setupEventHandlers() {
    if (!this._handler) return

    // 左键点击事件，添加点
    this._handler.setInputAction((event: any) => {
      if (!this._isDrawing) return

      const pickedPosition = this.viewer.camera.pickEllipsoid(event.position, this.viewer.scene.globe.ellipsoid)

      if (pickedPosition) {
        this.addPoint(pickedPosition)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)

    // 鼠标移动事件，更新预览形状


    // 右键点击事件，结束绘制
    
  }
}

export default DrawSelection