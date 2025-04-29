<template>
  <div
    class="data-manage"
    v-loading="isPush"
    element-loading-text="热力图绘制中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="data-manage-bottom padding15">
      <div
        id="container0307"
        class="data-manage-buttons"
        style="
          background: #fff;
          border: 1px solid #ccc;
          height: calc(100vh - 150px);
        "
      ></div>

      <div style="position: fixed; top: 76px; right: 15px">
        <div class="tablecard2" style="width: 320px; z-index: 999">
          <div style="padding: 10px; box-sizing: border-box">
            <el-tag type="warning" v-if="isFile"
              >浏览器存储已上传遥感文件</el-tag
            >
            <el-tag type="danger" v-else>文件未上传</el-tag>
          </div>

          <div style="padding: 10px">
            <el-button type="primary" @click="drawPoly" v-if="isFile"
              >绘制茶园分布热力图</el-button
            >
            <br />
            <br />
            <el-button type="primary" @click="drawBounds"
              >展示行政区边界</el-button
            >

            <el-button type="primary" @click="fuwei">复位地图</el-button>
          </div>

          <div style="padding: 10px">
            <h3>图例</h3>

            <img style="height: 250px" src="../assets/hotlogo.jpg" alt="" />
          </div>
        </div>
        <el-card
          shadow="never"
          class="box-card"
          style="width: 120px; z-index: 9999"
        >
          <div slot="header" class="clearfix">
            <span>图层切换</span>
          </div>
          <el-radio-group v-model="mapType" @change="mapChange">
            <el-radio label="normal">标准</el-radio><br />
            <el-radio label="dark">幻影黑</el-radio><br />
            <el-radio label="light">月光银</el-radio><br />
            <el-radio label="yg">遥感图</el-radio>
          </el-radio-group>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=1.4.15&key=2eccb47b400c8ab58f2dc596dbfe9d53&plugin=AMap.MouseTool,AMap.DistrictSearch"
></script>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["markData2"]),
  },

  data() {
    return {
      markData: [],
      dialogTableVisible: false,

      mapType: "yg",
      map: "",
      marker: null, //点位
      title: "",
      content: [],
      infoWindow: null,
      markers: [],
      satellite: null,

      isPG: false,
      scelOption: {
        scl1: "杭州市",
        scl2: "原始影像",
      },

      dataList: [],
      polygons: [],
      pathArr: null,
      isFile: false,
      isPush: false,

      list: [],
      layer: null,
    };
  },

  mounted() {
    this.changePngMap();
    this.mapChange();
  },

  created() {
    if (sessionStorage.getItem("isfiled") === "文件已上传") {
      this.isFile = true;
    }
  },

  methods: {
    changeFile() {
      console.log("文件上传");
      this.isFile = true;
      sessionStorage.setItem("isfiled", "文件已上传");
    },
    // 裁剪边界
    drawBounds() {
      new AMap.DistrictSearch({
        // level:'district',
        extensions: "all",
        subdistrict: 1,
      }).search("341003", (status, result) => {
        console.log(status, result);
        // 外多边形坐标数组和内多边形坐标数组
        var outer = [
          new AMap.LngLat(-360, 90, true),
          new AMap.LngLat(-360, -90, true),
          new AMap.LngLat(360, -90, true),
          new AMap.LngLat(360, 90, true),
        ];
        var holes = result.districtList[0].boundaries;

        var pathArray = [outer];
        pathArray.push.apply(pathArray, holes);
        var polygon = new AMap.Polygon({
          pathL: pathArray,
          strokeColor: "#00eeff",
          strokeWeight: 1,
          fillColor: "#71B3ff",
          fillOpacity: 0.5,
        });
        polygon.setPath(pathArray);
        this.map.add(polygon);
      });
    },

    drawPoly() {
      this.isPush = true;
      setTimeout(() => {
        this.isPush = false;
        this.addPol();
      }, 1000);
    },

    fuwei() {
      this.map.setZoomAndCenter(12, [118.271291, 30.16449]);
    },

    mapChange() {
      if (this.mapType === "yg") {
        this.satellite = new AMap.TileLayer.Satellite();
        this.map.add(this.satellite);
      } else {
        if (this.satellite) {
          this.map.remove(this.satellite);
        }
        var styleName = "amap://styles/" + this.mapType;
        this.map.setMapStyle(styleName);
      }
    },

    changePngMap() {
      this.map = new AMap.Map("container0307", {
        resizeEnable: true,
        zoom: 13, //级别
        zooms: [8, 30],
        center: [118.271291, 30.16449], //中心点坐标
        viewMode: "2D", //使用3D视图
        mapStyle: "amap://styles/normal",
        infoWindow: null,
      });
      this.mapType = "yg";
    },

    async addPol() {
      var res = await this.$axios.get("/ChaYuanDataGetData/ChaYuanDataGetData");
      this.dataList = res.data.data;

      this.list = [];

      for (let i = 0; i < this.dataList.length; i++) {
        var path = this.dataList[i].path.map((ele) => {
          return {
            coordinate: [ele.lng, ele.lat],
            count: i,
          };
        });
        this.list.push(...path);
      }
      // console.log(" this.list", this.list);
      this.layer = new Loca.HeatmapLayer({
        map: this.map,
        // fitView: true,
      });
      console.log("this.list", this.list);
      this.layer.setData(this.list, {
        lnglat: "coordinate",
        value: "count",
      });

      //  radius为热力半径，由于初期数据未录入，故设置的较大，默认为16，后续数据全部录入后再进行修改。
      this.layer.setOptions({
        style: {
          radius: 20,
          color: {
            0.5: "#2c7bb6",
            0.65: "#abd9e9",
            0.7: "#ffffbf",
            0.9: "#fde468",
            1.0: "#d7191c",
          },
        },
      });

      this.layer.render();
    },
  },
};
</script>

<style>
.el-upload-dragger {
  width: 300px;
}

.data-manage {
  background: #f7f7f7;
}

.tablecard2 {
  height: calc(100vh - 151px);
  background: #fff;
  border: 1px solid #ccc;
  z-index: 999;
}
.box-card {
  position: absolute;
  bottom: 0;
  right: 322px;
  border-radius: 0;
}
.box-card2 {
  position: absolute;
  bottom: 0;
  left: 0px;
  border-radius: 0;
  height: 140px;
}
</style>
