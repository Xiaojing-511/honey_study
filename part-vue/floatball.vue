<template>
  <div>
    <div
      id="box"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mouseover="handleMouseOver"
      @mouseout="handleMouseOut"
      :style="{right: right + 'px',bottom: bottom + 'px'}"
      v-if="isFloatBallShow"
      :class="[floatBallStatus ? 'active' : 'default']"
      class="floatBall"
    >
      <!-- <template v-if="floatBallStatus">帮助</template> -->
      <!-- <template>帮助</template> -->
      帮助
      <!-- 弹窗 -->
      <div
        id="floatWindow"
        v-show="isFloatWindowShow"
        :style="{right: floatWindowRight + 'px',bottom: floatWindowBottom + 'px'}"
      >
        <div id="floatWindowTop" class="space-between">
          <span class="hint-font">帮助</span>
          <img src="./image/close.png" alt="close图标" @click="closeFloatWindow" class="close" />
        </div>

        <!-- <div id="floatWindowDocList" v-show="isDocListShow">
          <div class="space-between">
            <span class="hint-font">帮助教程</span>
            <a href>更多&lt;&lt;</a>
          </div>
          <ul>
            
            <li v-for="(item) in helpDocList" :key="item.id">
              <a href="item.url">{{item.title | ellipsis}}</a>
               {{item.title}}
            </li>
          </ul>
        </div>
        <span class="hint-font">人工服务</span>-->

        <div id="floatWindowOther">
          <img :src="imgUrl" alt class="QR-code-img" />
          <p class="hintText">使用知音楼App扫码入群</p>

          <!-- <button @click="setimgUrl" class="btn">add</button> -->
          <!-- <button @click="getChatid" class="btn">get</button> -->
          <!-- <button class="btn">
          <a :href="baseUrlid+chatid" class="font-link">pc端快速进群</a>
          </button>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GetOptConfig } from "@/api/server";
import { ossTrackActivityCenter } from "@/library/js/track.js"; // 埋点
export default {
  name: "floatBall",
  props: {
    itemWidth: {
      type: Number,
      default: 54,
    },
    itemHeight: {
      type: Number,
      default: 54,
    },
    floatWindowWidth: {
      type: Number,
      default: 196,
    },
    floatWindowHeight: {
      type: Number,
      default: 260,
    },
    limitRight: {
      type: Number,
      default: 25,
    },
    limitBottom: {
      type: Number,
      default: 82,
    },
  },
  data() {
    return {
      isClick: false,
      hasMove: false,
      disX: 0,
      disY: 0,
      right: 200,
      bottom: 50,
      floatWindowRight: 0,
      floatWindowBottom: 0,
      clientW: document.documentElement.clientWidth, //视口宽
      clientH: document.documentElement.clientHeight, //视口高
      floatBallStatus: false,
      isFloatBallShow: true,
      isFloatWindowShow: false,
      imgUrl: "",
      baseUrlid: "yach://yach.zhiyinlou.com/session/sessiongroup?sessionid=",
      // isDocListShow: true,
      // helpDocList: [
      //   {
      //     title:
      //       "标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1",
      //     url: "",
      //   },
      //   {
      //     title: "标题2标题2",
      //     url: "",
      //   },
      //   {
      //     title: "标题3标题3",
      //     url: "",
      //   },
      // ],
    };
  },
  // filters: {
  //   //超过20位显示 ...
  //   ellipsis: function (value) {
  //     if (!value) return "";
  //     if (value.length > 10) {
  //       return value.slice(0, 10) + "...";
  //     }
  //     return value;
  //   },
  // },
  methods: {
    handleMouseOver() {
      //悬停
      if (!this.hasMove) this.floatBallStatus = true;
    },
    handleMouseOut() {
      if (!this.hasMove && !this.isClick) {
        this.floatBallStatus = false;
      }
    },
    handleMouseDown(e) {
      var event = e || window.event;
      var target = event.target;
      this.hasMove = false;
      const clientX = event.clientX; //手指相对视口x
      const clientY = event.clientY;
      this.disX = this.itemWidth - (clientX - target.offsetLeft); //鼠标距离元素右边界的距离
      this.disY = this.itemHeight - (clientY - target.offsetTop);
      document.onmousemove = (ev) => {
        this.clientW = document.documentElement.clientWidth;
        this.clientH = document.documentElement.clientHeight;
        this.hasMove = true;
        var event = ev || window.event;
        if (
          this.clientW - event.clientX - this.disX < this.limitRight ||
          this.clientH - event.clientY - this.disY < this.limitBottom ||
          event.clientX - (this.itemWidth - this.disX) - 180 < 0 ||
          event.clientY - (this.itemHeight - this.disY) < 50
        ) {
          return false;
        }
        this.right = this.clientW - event.clientX - this.disX;
        this.bottom = this.clientH - event.clientY - this.disY;
        this.floatWindowRight =
          this.clientW - this.right < this.floatWindowWidth + 16 + 180
            ? this.right - this.floatWindowWidth - 16
            : this.right + this.itemWidth + 16;
        this.floatWindowBottom =
          this.clientH - this.bottom < this.floatWindowHeight + this.limitBottom
            ? this.bottom - this.floatWindowHeight + this.itemHeight
            : this.bottom;
      };
    },
    handleMouseUp() {
      // 仿click事件
      if (!this.hasMove) {
        // 埋点
        if (!this.isFloatWindowShow) {
          console.log("-----埋点-------");
          var firstName =
            this.$store.state.menu.currentMenuData.url == "/"
              ? null
              : this.$store.state.menu.currentMenuData.page_name_3
              ? this.$store.state.menu.currentMenuData.page_name_3
              : this.$store.state.menu.currentMenuData.page_name_2;
          console.log(this.$store.state.menu.currentMenuData);
          ossTrackActivityCenter({
            event_name: "HELP_BUTTON_CLICK",
            first_level_tab: firstName, //	一级页面值
          });
          console.log("-----firstName-----", firstName);
        }
        if (this.floatBallStatus && !this.isFloatWindowShow) {
          this.isFloatWindowShow = true;
          this.isClick = true;
        } else if (this.floatBallStatus && this.isFloatWindowShow) {
          this.isFloatWindowShow = false;
          this.floatBallStatus = false;
          this.isClick = false;
        } else if (!this.floatBallStatus && !this.isFloatWindowShow) {
          this.isFloatWindowShow = true;
          this.floatBallStatus = true;
          this.isClick = true;
        }
      }
      this.hasMove = false;
      document.onmousemove = null;
    },
    closeFloatWindow() {
      this.floatBallStatus = false;
      this.isFloatWindowShow = false;
    },
    addData(key, value) {
      GetOptConfig({
        operation: "update",
        key,
        value,
      })
        .then((res) => {
          if (res.code === 0) {
            console.log(res);
          }
        })
        .catch((err) => console.log(err));
    },
    getData(key) {
      GetOptConfig({
        operation: "get",
        key,
      })
        .then((res) => {
          if (res.code === 0) {
            console.log(res.result);
            this[key] = res.result;
          }
        })
        .catch((err) => console.log(err));
    },
    // getCurrentMenu() {
    //   console.log(
    //     this.$store.state.menu.currentMenuData,
    //     this.$store.state.menu.pathMap
    //   );
    // },
  },
  created() {
    this.right = this.limitRight;
    this.bottom = this.limitBottom;
    this.floatWindowRight = this.right + this.itemWidth + 16;
    this.floatWindowBottom = this.bottom;
    // this.addData(
    //   "imgUrl",
    //   // "https://sszt-activity.oss-cn-beijing.aliyuncs.com/static/prod/1610422918637.png"
    //   "https://sszt-activity.oss-cn-beijing.aliyuncs.com/static/prod/1611803949609.jpeg"
    // );
    this.imgUrl = this.getData("imgUrl");
    // this.getCurrentMenu();
    // let list = this.helpDocList;
    // if (!list.length) this.isDocListShow = false;
  },
  mounted() {
    // 离开浏览器页面
    document.onmouseleave = () => {
      document.onmousemove = null;
    };
    // 点击目标元素之外的区域
    document.onclick = (e) => {
      document.onmousemove = null;
      if (!e.target.className || !e.target.className.includes("floatBall")) {
        this.isFloatWindowShow = false;
        this.floatBallStatus = false;
        this.isClick = false;
      }
    };
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
#box {
  position: fixed;
  width: 54px;
  height: 54px;
  text-align: center;
  box-shadow: 0px 3px 8px 0px rgba(48, 49, 51, 0.14);
  border-radius: 50%;
  z-index: 99;
  // color: #000;
  // cursor: pointer;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  font-size: 14px;
  line-height: 54px;
  #floatWindow {
    color: #000;
    z-index: 99;
    position: fixed;
    width: 196px;
    height: 260px; //255
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 8px 0px rgba(48, 49, 51, 0.18);
    border-radius: 2px;
    border: 1px solid rgba(220, 223, 230, 1);
    overflow: auto;
    padding: 0 16px 14px 16px;
    box-sizing: border-box;
    font-family: "PingFang-SC-Medium", "PingFang-SC";
    text-align: left;
    line-height: normal;
    p {
      margin: 0;
    }
    .hint-font {
      font-size: 14px;
      font-weight: 500;
      color: rgba(48, 49, 51, 1);
    }
    #floatWindowTop {
      line-height: 14px;
      background-color: rgba(255, 255, 255, 1);
      position: sticky;
      top: 0;
      padding-top: 16px;
      .close {
        width: 12px;
        height: 12px;
        cursor: pointer;
      }
    }
    #floatWindowDocList {
      // color: #000;
      margin: 10px 0;
      > ul {
        > li {
          list-style-type: disc;
          margin: 10px 0 10px 20px;
        }
      }
    }
    .space-between {
      display: flex;
      justify-content: space-between;
    }
    #floatWindowOther {
      text-align: center;
      line-height: normal;
      .QR-code-img {
        width: 162px;
        margin: 20px 0 9px 0;
      }
      .hintText {
        font-size: 12px;
        color: rgba(144, 147, 153, 1);
      }
      // .btn {
      //   width: 98px;
      //   height: 32px;
      //   border-radius: 3px;
      //   border: 1px solid rgba(59, 150, 249, 1);
      //   background: #ffffff;
      //   margin: 0 auto;
      //   .font-link {
      //     text-decoration: none;
      //     font-size: 12px;
      //     font-weight: 500;
      //     color: rgba(43, 139, 243, 1);
      //   }
      // }
    }
  }
}
.default {
  // background: #ffffff center no-repeat url("./image/question-mark.png");
  color: #303133;
  background: #fff;
  border: 1px solid rgba(224, 227, 235, 1);
  box-sizing: border-box;
}
.active {
  color: rgba(255, 255, 255, 1);
  background: rgba(43, 139, 243, 1);
}
</style>