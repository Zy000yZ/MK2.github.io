<template>
  <!--  -->
  <div class="getCoordinate">
    <div class="heritage-industry">
      <!-- 地图容器 -->
      <div id="container" class="container">
        <div class="map-buttons" style="z-index:999;position: absolute;top: 0px;right:0px;padding:10px">
          <el-button
            size="mini"
            type="primary"
            @click="drawGeometry"
            class="map-btn map-element"
            >拾取坐标</el-button
          >

          <el-button
            size="mini"
            type="primary"
            @click="getAgin"
            class="map-btn map-element"
            >清空</el-button
          >

          <el-button
            v-show="
              this.newCoordinate.length !== 0 ||
              this.applyCoordinate.length !== 0
            "
            size="mini"
            type="primary"
            @click="sub"
            class="map-btn map-element"
            >确定</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=1.4.15&key=2eccb47b400c8ab58f2dc596dbfe9d53&plugin=AMap.MouseTool,AMap.DistrictSearch"
></script>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "HeritageIndustry",

  data() {
    return {
      map: "",
      district: null,
      polygons: [],
      zoom: 10,
      marker: null, //

      geometrySearchType: "marker", //始终为点
      geometryBox: false, //几何查询面板隐藏展示
      mouseTool: null,
      overlays: [], //绘制好的覆盖物
      geometrySearchRes: [], //几何查询结果
      issearchRes: true, //查询结果图标显示隐藏

      // 类型查询
      options: [
        {
          type: "全部类型",
        },
      ],
      typeSelect: "全部类型",
    };
  },

  computed: {
    ...mapState(["newCoordinate", "CoordinateType", "applyCoordinate"]),
  },

  created() {
    console.log(this.CoordinateType);
  },

  mounted() {
    this.initMap(); //初始化地图
    this.mouseTool = new AMap.MouseTool(this.map);
  },

  methods: {
    ...mapMutations(["getCoordinate", "getapplyCoordinate"]),

    initMap() {
      //初始化地图
      this.map = new AMap.Map("container", {
        resizeEnable: true,
         zoom: 10, //级别
        zooms: [8, 30],
        center: [113.063112, 39.937461], //中心点坐标
        viewMode: "3D", //使用3D视图
        mapStyle: "amap://styles/normal",
        infoWindow: null,
      });
    },

    opengeometryBox() {
      this.geometryBox = !this.geometryBox;
    },
    closegeometryBox() {
      this.geometryBox = !this.geometryBox;
    },
    // 集合查询函数系列start
    drawGeometry() {
      // console.log(this.geometrySearchType);
      switch (this.geometrySearchType) {
        case "marker": {
          this.mouseTool.marker({
            //同Marker的Option设置
          });
          break;
        }
      }
      // this.mouseTool.close(); //关闭，并清除覆盖物
      this.mouseTool.on("draw", (e) => {
        this.overlays.push(e.obj);
        console.log("e.obj---------", e.obj.getPosition()); //获取点标记的位置

        var zb = e.obj.getPosition();
        if (this.CoordinateType === "add") {
          this.getCoordinate([zb.lng, zb.lat]);
        } else if (this.CoordinateType === "apply") {
          this.getapplyCoordinate([zb.lng, zb.lat]);
        }

        console.log(this.newCoordinate);

        this.mouseTool.close(); //关闭
      }); //解除绑定，
    },

    getAgin() {
      this.mouseTool.close(true);
      this.getCoordinate([]);
      this.getapplyCoordinate([]);
    },

    sub() {
      this.$router.push("/HeritageProPush/add");
    },
  },
};
</script>

<style scoped>
.heritage-industry #container {
  border-bottom: 1px solid #f9d5a7;
  height: calc(100vh - 62px);
  overflow: hidden;
  
}
</style>
