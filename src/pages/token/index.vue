<template>
  <div class="about">
    <h1 class="about__title">代币详情</h1>
    <div class="about__content">
      <ul>
        <li> 
          详情
          <ul>
            <li>详情详情详情详情详情详情</li>
            <li>详情详情详情详情详情详情</li>
            <li>详情详情详情详情详情详情</li>
          </ul>
        </li>
        <li>详情</li>
        <li>详情</li>
        <li>详情</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        default: {
          title: '',
          content: []
        }
      }
    },

    watch: {
      '$route.params': function (val) {
        console.log(val)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .about
    position: relative;
    padding: 10px;
    margin: 0;
    margin-top: 20px;
    background-color: #fff;
    &__title
      margin: 0;
      font-size: 24px;
      padding: 0 0 20px;
      border-bottom: 1px solid #ebebeb
    &__content
      & > ul
        padding-top: 10px;
        list-style: decimal
        padding-left: 20px
        & ul
          list-style: none
          padding-left: 0
          > li 
            font-size: 14px;
            line-height: 1.5;
      & > li
        margin-top: 20px

</style>