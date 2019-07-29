<template>
  <div class="elm-position-select">
    <form class="position-search">
      <input
        ref="searchIpt"
        v-model="searchText"
        placeholder="输入地址"
        @input="searchInput"
      />
      <elm-icon class="search-icon" type="search" />
    </form>
    <div id="amap" class="amap"></div>
    <div class="result-list">
      <dl
        v-for="position in searchData"
        :key="position.id"
        @click="selectPosition(position)"
      >
        <div class="result-name">{{ position.name }}</div>
        <div class="result-address">{{ position.address }}</div>
      </dl>
    </div>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
  name: "ElmPositionSelect",
  data() {
    return {
      center: [120, 30],
      placeSearch: null,
      amap: null,
      searchData: [],
      searchText: ""
    };
  },
  methods: {
    selectPosition(position) {
      this.$emit("select", position);
    },
    searchInput() {
      clearTimeout(this.searchSto);
      this.searchSto = setTimeout(() => {
        if (this.searchText === "") {
          this.placeSearch.searchNearBy(
            "",
            this.center,
            200,
            (status, result) => {
              this.searchHandle(status, result);
            }
          );
        } else {
          this.placeSearch.searchNearBy(
            this.searchText,
            this.center,
            1000,
            (status, result) => {
              this.searchHandle(status, result);
            }
          );
        }
      }, 300);
    },
    searchHandle(status, result) {
      if (status === "complete" && result.info === "OK" && result.poiList) {
        this.searchData = [...result.poiList.pois];
      }
    },
    init() {
      const amap = new AMap.Map("amap", {
        center: this.center,
        zoom: 18,
        lang: "zh_cn"
      });
      amap.plugin("AMap.Geolocation", () => {
        const geolocation = new AMap.Geolocation();
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", data => {
          this.center = [data.position.lng, data.position.lat];
          amap.setCenter([data.position.lng, data.position.lat]);
          AMap.plugin("AMap.PlaceSearch", () => {
            //构造地点查询类
            var placeSearch = new AMap.PlaceSearch({
              pageSize: 50,
              type:
                "汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施",
              city: data.addressComponent.city,
              citylimit: true,
              map: amap
            });
            this.placeSearch = placeSearch;
            var cpoint = [data.position.lng, data.position.lat]; //中心点坐标
            placeSearch.searchNearBy("", cpoint, 200, (status, result) => {
              this.searchHandle(status, result, amap);
            });
          });
        });
        AMap.event.addListener(geolocation, "error", err => {
          console.log(err);
        });
      });
      this.amap = amap;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.elm-position-select {
  position: absolute;
  left: 50%;
  margin-left: -3.75rem;
  top: 0.9rem;
  height: calc(100% - 0.9rem);
  width: 7.5rem;
  .position-search {
    position: relative;
    height: 0.9rem;
    background-color: @White;
    box-sizing: border-box;
    padding: 0.11rem @BaseSize;
    input {
      vertical-align: top;
      border: none;
      height: 0.66rem;
      width: 7.5rem - @BaseSize * 2;
      background-color: @Background;
      border-radius: 0.33rem;
      padding: 0 @BaseSize 0 @BaseSize * 3;
      box-sizing: border-box;
      outline: none;
    }
    .search-icon {
      left: @BaseSize * 2;
      top: 0.2rem;
      position: absolute;
      font-size: 0.48rem;
      color: @SecondaryText;
    }
  }
  .amap {
    width: 7.5rem;
    height: 4.2rem;
  }
  .result-list {
    height: calc(100% - 5.1rem);
    overflow: auto;
    dl {
      padding: @BaseSize;
      line-height: normal;
      height: auto;
      text-align: left;
      border-bottom: 1px solid @Border;
      .result-name {
        margin-bottom: @BaseSize;
        color: @Title;
        font-size: 0.24rem;
      }
      .result-address {
        color: @SecondaryText;
        font-size: 0.2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
