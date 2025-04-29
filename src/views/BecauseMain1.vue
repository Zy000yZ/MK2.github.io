<template>
  <div class="data-manage">
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
        <div
          class="tablecard2"
          style="
            width: 320px;
            z-index: 999;
            padding: 15px;
            box-sizing: border-box;
            overflow: auto;
          "
        >
          煤炭资源属性查询：
          <br />
          <br />
          <el-select
            class="typeSelect"
            v-model="typeSelect"
            placeholder="请选择目标煤炭资源"
            size="mini"
            filterable 
          >
            <el-option
              v-for="item in dataList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>

          <el-button
            id="selectBtn"
            class="selectBtn"
            size="mini"
            icon="el-icon-search"
            @click="searchTypeClick"
            style="margin-left: 5px"
          ></el-button>
          <el-divider></el-divider>
          相关属性资料：
          <br>
          <br>
          <p style="padding-bottom: 6px">采矿许可证编号：{{ markChe.ckid }}</p>
      <p style="padding-bottom: 6px">档案编号：{{ markChe.daid }}</p>
      <p style="padding-bottom: 6px">隶属企业：{{ markChe.company }}</p>
      <p style="padding-bottom: 6px">生产能力（万吨/年）：{{ markChe.num }}</p>
      <p style="padding-bottom: 6px">开拓方式：{{ markChe.type }}</p>
      <p style="padding-bottom: 6px">井筒数量：{{ markChe.jtnum }}个</p>
      <p style="padding-bottom: 6px">采煤工艺：{{ markChe.sctype }}</p>
      <p style="padding-bottom: 6px">瓦斯等级：{{ markChe.lev }}</p>
      <p style="padding-bottom: 6px">自燃倾向性：{{ markChe.dangerlev }}</p>
      <p style="padding-bottom: 6px">开采状态：{{ markChe.now }}</p>
      <el-divider></el-divider>
      <div class="input-card">
      <div class="input-item" style="font-size: 18px">
        <input type="radio" name="func" value="rule" /><span class="input-text"
          >距离测量</span
        >
        <input type="radio" name="func" value="measureArea" /><span
          class="input-text"
          >面积测量</span
        >
        <div class="input-item" style="display: inline-block;margin-left: 10px;">
        <input
          id="close"
          type="button"
          class="btn"
          @click="close"
          value="关闭"
        />
      </div>
      </div>
   
    </div>
        </div>
        <el-card
          shadow="never"
          class="box-card-tuceng"
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

      mapType: "normal",
      map: "",
      marker: null, //点位
      title: "",
      content: [],
      infoWindow: null,
      markers: [],
      satellite: null,

      // 弹框内容
      marker: null, //点位
      markers: [],
      title: "",
      content: [],
      infoWindow: null,
      dataList: [], // 数据
      typeSelect: "",

      markChe:{
        name: "暂无数据",
        ckid: "暂无数据",
        jing: 113.090685,
        wei: 39.936395,
        daid: "暂无数据",
        company: "暂无数据",
        num: '暂无数据',
        type: "暂无数据",
        jtnum: "暂无数据",
        sctype: "暂无数据",
        lev: "暂无数据",
        dangerlev: "暂无数据",
        now: "暂无数据",
      },

      mouseTool: null,
      radios: null,
    };
  },

  mounted() {
    this.changePngMap();
    this.mapChange();
    this.addMarker();
    this.mouseTool = new AMap.MouseTool(this.map);
    this.getRad();
  },

  created() {},

  methods: {
    // 绘制几何图形start
    draw(type) {
      switch (type) {
        case "rule": {
          this.mouseTool.rule({
            startMarkerOptions: {
              //可缺省
              icon: new AMap.Icon({
                size: new AMap.Size(19, 31), //图标大小
                imageSize: new AMap.Size(19, 31),
                image: "//webapi.amap.com/theme/v1.3/markers/b/start.png",
              }),
              offset: new AMap.Pixel(-9, -31),
            },
            endMarkerOptions: {
              //可缺省
              icon: new AMap.Icon({
                size: new AMap.Size(19, 31), //图标大小
                imageSize: new AMap.Size(19, 31),
                image: "//webapi.amap.com/theme/v1.3/markers/b/end.png",
              }),
              offset: new AMap.Pixel(-9, -31),
            },
            midMarkerOptions: {
              //可缺省
              icon: new AMap.Icon({
                size: new AMap.Size(19, 31), //图标大小
                imageSize: new AMap.Size(19, 31),
                image: "//webapi.amap.com/theme/v1.3/markers/b/mid.png",
              }),
              offset: new AMap.Pixel(-9, -31),
            },
            lineOptions: {
              //可缺省
              strokeStyle: "solid",
              strokeColor: "#FF33FF",
              strokeOpacity: 1,
              strokeWeight: 2,
            },
            //同 RangingTool 的 自定义 设置，缺省为默认样式
          });
          break;
        }
        case "measureArea": {
          this.mouseTool.measureArea({
            strokeColor: "#80d8ff",
            fillColor: "#80d8ff",
            fillOpacity: 0.3,
            //同 Polygon 的 Option 设置
          });
          break;
        }
      }
    },

    getRad() {
      this.radios = document.getElementsByName("func");
      for (var i = 0; i < this.radios.length; i += 1) {
        this.radios[i].onchange = (e) => {
          this.draw(e.target.value);
        };
      }
    },

    close() {
      this.mouseTool.close(true); //关闭，并清除覆盖物
      for (var i = 0; i < this.radios.length; i += 1) {
        this.radios[i].checked = false;
      }
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
        zoom: 10, //级别
        zooms: [8, 30],
        center: [113.063112, 39.937461], //中心点坐标
        viewMode: "2D", //使用3D视图
        mapStyle: "amap://styles/normal",
        infoWindow: null,
      });
      this.mapType = "normal";
    },

    // 添加点坐标
    async addMarker() {
      var res = await this.$axios.get(
        "/DaTongMeiTanMarkerGet/DaTongMeiTanMarkerGet"
      );
      this.dataList = res.data.data;
      console.log("请求结果", this.dataList);
      for (let i = 0; i < this.dataList.length; i++) {
        // 注意这里一定得用 let
        var iconUrl =
          "https://mp-b0bd9cd4-ad06-4cf0-b1a3-ea2e46e926bc.cdn.bspapp.com/cloudstorage/非煤矿山0427.png";

        let marker = new AMap.Marker({
          // 自定义图标
          icon: new AMap.Icon({
            image: iconUrl,
            size: new AMap.Size(40, 40),
            imageSize: new AMap.Size(40, 40),
          }),
          map: this.map,
          position: [this.dataList[i].jing, this.dataList[i].wei],
          extData: this.dataList[i],
        });

        this.markers.push(marker);

        AMap.event.addListener(marker, "click", () => {
          this.title = this.dataList[i].name;
          (this.content = [
            "采矿许可证：" + this.dataList[i].ckid,

            "档案编号：" + this.dataList[i].daid,
            "地理坐标：" + this.dataList[i].jing + "，" + this.dataList[i].wei,
          ]),
            (this.infoWindow = new AMap.InfoWindow({
              isCustom: true, //使用自定义窗体
              content: this.createInfoWindow(
                this.title,
                this.content.join("<br/>")
              ),
              offset: new AMap.Pixel(16, -45),
            }));
          this.infoWindow.open(this.map, marker.getPosition());
        });
      }
      // this.map.setFitView();
    },

    searchTypeClick() {
      this.map.clearInfoWindow();
      if (this.typeSelect === "") {
        alert("请选择煤炭资源");
      } else {
        var filEnd = this.dataList.find((ele) => ele.name === this.typeSelect);

        this.markChe=filEnd

        this.map.setZoomAndCenter(13, [filEnd.jing, filEnd.wei]); //设置地图中心点为当前位置
      }
    },

    //渲染弹框
    createInfoWindow(title, content) {
      var info = document.createElement("div");
      info.className = "custom-info input-card content-window-card";

      //可以通过下面的方式修改自定义窗体的宽高
      //info.style.width = "400px";
      // 定义顶部标题
      var top = document.createElement("div");
      var titleD = document.createElement("div");
      var closeX = document.createElement("img");
      top.className = "info-top";
      titleD.innerHTML = title;
      closeX.src = "https://webapi.amap.com/images/close2.gif";
      closeX.onclick = this.closeInfoWindow;

      top.appendChild(titleD);
      top.appendChild(closeX);
      info.appendChild(top);
      // 定义中部内容
      var middle = document.createElement("div");
      middle.className = "info-middle";
      middle.style.backgroundColor = "white";
      middle.innerHTML = content;
      info.appendChild(middle);

      // 定义底部内容
      var bottom = document.createElement("div");
      bottom.className = "info-bottom";
      bottom.style.position = "relative";
      bottom.style.top = "0px";
      bottom.style.margin = "0 auto";
      var sharp = document.createElement("img");
      sharp.src = "https://webapi.amap.com/images/sharp.png";
      bottom.appendChild(sharp);
      info.appendChild(bottom);
      return info;
    },

    // 关闭弹框
    closeInfoWindow() {
      this.map.clearInfoWindow();
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
.tablecard2 p{
  font-size: 14px;
}
.box-card-tuceng {
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
/* 弹框样式 */
.content-window-card {
  position: relative;
  box-shadow: none;
  bottom: 0;
  left: 0;
  width: auto;
  padding: 0;
}

.content-window-card p {
  height: 2rem;
}

.custom-info {
  border: solid 1px silver;
  width: 280px;
  background-color: white;
}

div.info-top {
  position: relative;
  background: none repeat scroll 0 0 #f9f9f9;
  border-bottom: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
}

div.info-top div {
  display: inline-block;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px;
}

div.info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
}

div.info-middle {
  font-size: 12px;
  padding: 10px 6px;
  line-height: 20px;
}
div.info-middle img {
  width: 100px;
  height: 70px;
  padding-bottom: 10px;
}

div.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}

div.info-bottom img {
  position: relative;
  z-index: 104;
}

span {
  margin-left: 5px;
  font-size: 11px;
}

.info-middle img {
  float: left;
  margin-right: 6px;
}

.xiangxi {
  color: #555;
}
</style>
