<template>
  <view style="background: url('../../static/bk.jfif');height: 100vh;">
    <navigator url="/pages/student" hover-class="navigator-hover" open-type="redirect">
      <div class="mainButton" >
        <uni-icons type="contact-filled" size="60" color="green"></uni-icons>
      </div>
      <label class="mainMenu" for="">学生管理</label>
    </navigator>

    <div class="mainButton">
      <uni-icons type="staff-filled" size="60" color="green"></uni-icons>
    </div>
    <label class="mainMenu" for="">老师管理</label>
    
    <navigator url="pages/student" hover-class="navigator-hover">
      <button>跳转到首页</button>
    </navigator>

    <navigator url="/pages/student" hover-class="navigator-hover">
      <button type="default">学生管理页面</button>
    </navigator>
  </view>
</template>

<script>
</script>

<style>
  .mainButton{
    border-radius: 50%;
    width: 80px;
    height: 80px;
    border: 3px solid green;
    text-align: center;
    vertical-align: middle;
    line-height: 80px;
    display: inline-block;
    margin: 100px 50px;
  }
  .mainMenu{
    font-size: 20px;
    font-weight: bolder;
    color: white;
  }
</style>