<template>
  <div id="mobnavbar">
    <section :style="isMobNavbarShow ? 'transform: none; z-index: 1001' : 'translateX(-100%); z-index: 0'">
      <ul>
        <li v-for="(item, index) in navBarArr" :key="index">
          <div :class="[$route.path == item.path ? 'active-navbar' : '']" class="select-title" @click="item.children.length > 1 ? handleExpand('expand', item, index) : handleExpand('location', item, index)">
            <i :class="`iconfont ${item.icon}`"></i>
            <span class="navar-title">{{item.name}}</span>
            <i :class="item.isSelected? 'el-icon-arrow-up arrow' : 'el-icon-arrow-down arrow'" v-if="item.children.length > 1"></i>
          </div>
          <div class="select-content" :style="item.isSelected? 'display: block' : 'display: none'">
            <p v-show="item.children.length > 1" v-for="(itemChild, indexChild) in item.children" :key="indexChild"
              @click="PublicMethod.toPage(itemChild.path, ''); setMobNavbarShow()">
              <span :class="[$route.path == itemChild.path ? 'active-navbar' : '']">{{itemChild.name}}</span>
            </p>
          </div>
        </li>
      </ul>
    </section>
    <div class="mask" @click="setMobNavbarShow()"></div>
  </div>
</template>

<script>
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data () {
    return {
      navBarArr: []
    }
  },
  computed: {
    ...mapState(['isMobNavbarShow'])
  },
  methods: {
    ...mapMutations(['setMobNavbarShow']),
    /**
     * @description 侧边栏数据重置
     */
    resetNavData () {
      let routerObj = this.$router.options.routes.slice(2)
      routerObj.forEach(item => {
        if (item.children.length > 1) {
          item.isSelected = false
        };
        this.navBarArr.push(item)
      })
    },

    /**
     * @description 处理展开选择框
     */
    handleExpand (val, items, index) {
      switch (val) {
        case 'expand':
          this.navBarArr.forEach((item, indexs) => {
            if (index === indexs) {
              item.isSelected = !item.isSelected
            };
          })
          break
        case 'location':
          this.navBarArr.forEach((item, indexs) => {
            if (item.isSelected) {
              item.isSelected = false
            };
          })
          this.PublicMethod.toPage(items.path, '')
          this.setMobNavbarShow()
          break
      }
    }
  },
  mounted () {
    this.resetNavData()
  }
}
</script>

<style lang="scss" scoped>
// mixin scss
@import '@/style/mixin.scss';

#mobnavbar {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  section {
    background: #242a2e;
    width: 65%;
    flex: 1;
    z-index: -1;
    transform: translateX(-100%);
    transition: transform ease-in .15s;
    ul {
      overflow: auto;
      padding: 0;
      list-style: none;
      li {
        color: #fff;
        font-size: 14px;
        padding: 15px 30px;
        border-bottom: 1px solid #3a3e42;
        .el-icon-arrow-down {
          float: right;
        }
        p {
          margin: 0;
          padding: 12px 0 0 35px;
        }
        .select-title {
          @include flex-box(row, flex-start, center, nowrap);
          cursor: pointer;
        }
        .navar-title{
          margin-left: 10px;
        }
        .arrow{
          flex: 1;
          text-align: right
        }
        .select-content {
          p {
            cursor: pointer;
          }
        }
      }
    }
    .active-navbar {
      color: #78faff;
    }
  }
}
</style>
