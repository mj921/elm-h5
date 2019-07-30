<template>
  <div
    class="elm-select"
    :style="{
      padding: (height - fontSize) / 200 + 'rem 0',
      fontSize: fontSize / 100 + 'rem'
    }"
    @click="listShow = !listShow"
  >
    <label>{{ label }}</label>
    <div class="right">
      <span class="elm-select-value">{{ showLabel }}</span>
      <elm-icon
        type="right"
        :style="{ marginTop: (fontSize - 40) / 200 + 'rem' }"
      />
    </div>
    <transition name="fade">
      <div
        class="elm-select-options"
        ref="options"
        v-show="listShow"
        @click="listShow = false"
      >
        <transition name="slide">
          <div
            class="options-main"
            v-show="listShow"
            @click="
              e => {
                e.stopPropagation();
              }
            "
          >
            <div class="options-header">
              请选择{{ label }}
              <elm-icon type="close" @click="listShow = false" />
            </div>
            <div class="options-list">
              <dl
                v-for="(item, i) in options"
                :key="i"
                :class="{ curr: value === item.value || value === item }"
                @click="optionClick(item)"
              >
                {{ item.label || item.value || item }}
              </dl>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ElmSelect",
  props: {
    options: {
      type: Array,
      default: () => [],
      required: true
    },
    value: {
      validator() {
        return true;
      },
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 28
    },
    height: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      showLabel: "",
      listShow: false
    };
  },
  methods: {
    optionClick(item) {
      this.showLabel = item.label || item.value || item;
      this.$emit("input", item.value || item);
      this.$emit("change", item.value || item, item);
      this.listShow = false;
    }
  },
  mounted() {
    document.body.appendChild(this.$refs.options);
  },
  created() {
    if (this.options.length > 0 && typeof this.options[0] === "object") {
      const o = this.options.find(item => item.value === this.value);
      this.showLabel = (o && o.label) || this.value;
    } else {
      this.showLabel = this.value;
    }
  },
  beforeDestroy() {
    document.body.removeChild(this.$refs.options);
  }
};
</script>

<style lang="less" scoped>
.elm-select {
  font-size: 0.28rem;
  line-height: 1em;
  overflow: hidden;
  label {
    float: left;
    color: @Title;
  }
  .right {
    float: right;
    .elm-select-value {
      display: inline-block;
      max-width: 4.5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: @BlueHover;
    }
    .elm-icon {
      font-size: 0.4rem;
      color: @PrimaryText;
    }
  }
}
.elm-select-options {
  position: fixed;
  top: 0;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 7.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99999;
  .options-main {
    position: absolute;
    bottom: 0;
    background-color: @White;
    font-size: 0.32rem;
    width: 100%;
    .options-header {
      position: relative;
      color: @Title;
      line-height: 1.1rem;
      border-bottom: 1px solid @Border;
      text-align: center;
      .elm-icon {
        position: absolute;
        right: @BaseSize;
        font-size: 0.6rem;
        top: 0.2rem;
      }
    }
    .options-list {
      padding: @BaseSize 0;
      max-height: 5rem;
      overflow: auto;
      dl {
        line-height: 1rem;
        color: @Title;
        text-align: center;
        &.curr {
          color: @Blue;
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(100%);
}
</style>
