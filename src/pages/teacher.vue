<template>
  <view class="content">
    <view style="width: 90%; text-align: center;">
      <div style="width: 100%;" >
        <div class="searchArea">
          <label for="">姓名：</label>
          <input type="text" value={{tiaojianteacher.name}} @input="(x) => onInputChange(x, 'name')"></input>

          <label for="">生日：</label>
          <input type="text" value= {{tiaojian.birthday}} @input="(x) =>onInputChange(x,'birthday')"></input>

          <label for="">性别：</label>
          <picker mode="selector" 
            :range="genderOptions"
            range-key="label"
            @change="genderChange">
              <view class="picker">当前选择：{{genderOptions.find(x => x.value === tiaojian.gendertj)?.label}}</view>
          </picker>

          <label for="">毕业学校：</label>
          <input type="text"  value= {{tiaojian.graduatedSchool}} @input="(x) =>onInputChange(x,'graduatedSchool')"></input>

          <label for="">政治面貌：</label>
         <input type="text" value= {{tiaojian.political}} @input="(x) =>onInputChange(x,'political')"></input> 

          <label for="">学位：</label>
          <input type="text" value= {{tiaojian.degree}} @input="(x) =>onInputChange(x,'degree')"></input>

          <label for="">身份证号码：</label>
          <input type="text" value= {{tiaojian.idNumber}} @input="(x) =>onInputChange(x,'idNumber')"></input>
          <button type="primary" @click="() =>chaxun()">查询</button>
        </div>

      </div>
    </view>
  </view>
  

    <uni-table width="100%" border stripe emptyText="暂无更多数据" >
    <!-- 表头行 -->
      
    <uni-tr >
      
      <uni-th align="center" width="100px">名字</uni-th>
      <uni-th align="center" width="60px">性别</uni-th>
      <uni-th align="center" width="100px">政治面貌</uni-th>
      <uni-th align="center" width="60px">学位</uni-th>
      <uni-th align="center" width="70px">操作</uni-th>
    </uni-tr>
    <!-- 表格数据行 -->
    <uni-tr v-for="(teacher, index) in (filterteachers||teachers)" :key="index" >
        <uni-td align="center">{{teacher.name}}</uni-td>
        <uni-td align="center">{{teacher.gender}}</uni-td>     
        <uni-td align="center">{{teacher.political}}</uni-td>
        <uni-td align="center">{{teacher.degree}}</uni-td>
        <uni-td align="center">
          <uni-icons @click="() => showDetails(teacher)" style="margin: 5px;" type="contact-filled" size="30"></uni-icons>
        </uni-td>
    </uni-tr>
  </uni-table>
  
  <view class="modal-mask" v-if="isEditOpen" @tap="detailCloseClick">
    <view class="modal-container" @tap.stop>
      <view class="modal-header">{{"老师详情"}}</view>
      <view class="modal-content">
        <slot>
          <div class="searchArea">
            <label>姓名：{{activeteacher?.name}}</label>
            <label>性别：{{activeteacher?.gender}}</label>
          </div>
        </slot>
      </view>
      <view class="modal-footer">
        <button @tap="detailCloseClick">取消</button>
      </view>
    </view>
  </view>

    
</template>

<script setup lang="ts">
export interface teacher{
    id? : number,
    name?: string,
    birthday?: string,
    gender?: string,
    graduatedSchool?: string,
    political?: string,
    degree?: string,
    idNumber?: number,
}

export interface  tiaojianteacher{
  idtj?: number,
  nametj?: string,
  birthdaytj?: string,
  gendertj?: string,
  graduatedSchooltj?: string,
  politicaltj?: string,
  degreetj?: string,
  idNumbertj?: number,  
}


import { ref } from 'vue' //另外为什么导入了学生的条件到老师页面使用？你应该使用  tiaojianteacher，哪个是学生了，我用的是老师
const teachers = ref<teacher[]>([])
const filterteachers = ref<teacher[]>()
const activeteacher = ref<teacher>()
const isEditOpen = ref<boolean>(false)
const tiaojian = ref<tiaojianteacher>({
  nametj: "",
  birthdaytj: "",
  gendertj: "",
  graduatedSchooltj: "",
  politicaltj: "",
  degreetj: "",
  idNumbertj: 0  
})

const genderOptions = ref([{value: "", label: "- 未选择 -"}, {value: "男", label: "男"}, {value: "女", label: "女"}])

const genderChange = (a: any) =>{
  let s:number = a.detail.value
  tiaojian.value.gendertj = genderOptions.value[s].value
}

const detailCloseClick = () => {
  isEditOpen.value = false
}

//在VUE 中， 改值用 .VALUE= 去改, 在 React 中, 用 Set参数名（） 去改
const showDetails = (s: teacher) =>{
  activeteacher.value = Object.assign({}, s)
  isEditOpen.value = true
}


const onInputChange = (e: any, thename: string) =>
{
  if(activeteacher.value)
  {
    if(thename === "name")
  {
    activeteacher.value.name = e.detail.value
  }
    if(thename === "birthday")
  {
    activeteacher.value.birthday = e.detail.value 
  }
    if(thename ==="graduatedSchool")
  {
    activeteacher.value.graduatedSchool = e.detail.value 
  }
    if(thename === "political")
  {
    activeteacher.value.political = e.detail.value
  }
  if(thename === "degree")
  {
    activeteacher.value.degree = e.detail.value
  }
  if(thename === "idNumber")
  {
    activeteacher.value.idNumber = e.detail.value
  }
  }
} 
const chaxun = () =>{
  //React 参数直接拿来用的， 而 VUE 需要用 .value 来获取真实的值
  //被筛选的数组是谁？
  let arr = teachers.value
  //用来筛选的条件是谁?
  let tj = tiaojian.value

  if(tj.nametj)
  {
    arr = arr.filter(x => x.name === tj.nametj)
  }

  if(tj.birthdaytj)
  {
    arr = arr.filter(x => x.birthday === tj.birthdaytj)
  }

  if(tj.gendertj)
  {
    arr = arr.filter(x => x.gender === tj.gendertj)
  }

  if(tj.graduatedSchooltj)
  {
    arr =arr.filter(x => x.graduatedSchool === tj.graduatedSchooltj)
  }

  if(tj.politicaltj)
  {
    arr = arr.filter(x => x.political === tj.politicaltj)
  }

  if(tj.degreetj)
  {
    arr = arr.filter(x => x.degree === tj.degreetj)
  }

  if(tj.idNumbertj)
  {
    arr = arr.filter(x => x.idNumber === tj.idNumbertj)
  }
  //filteachers 有没有替换所有 teachers 去绑定？ 要用 filterteachers || teachers
  filterteachers.value =arr
}


const fetchteachers = () =>{
    // //微信不认识 fetch， 用 wx
    // fetch()
    // .then((s) =>{return s.json()})her'
    // .then((s) =>{
    //     teachers.value = s
    // })

    //用下面这个, 你自己弄， 稍微改改，有的报错不用管
    wx.request({
      url: 'https://schoolapi-fqd0d0hhftajfkdv.eastasia-01.azurewebsites.net/api/Teacher',
      method: 'GET', // 或 'POST', 'PUT' 等
      data: {
        key: 'value'
      },
      success(res: any) {
        
        teachers.value = res.data
      },
      fail(err: any) {
        console.error('请求失败', err)
      },
      complete() {
        console.log('请求完成')
      }
    })
}
 fetchteachers()

</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .searchArea label{
    text-align: center;
    font-weight: bolder;
    line-height: 35px;
    
  }

  input{
    border: 1px solid gray;
    height: 50px;
  }

  .picker {
    padding: 15px;
    border: 1px solid gray;
    border-radius: 5px;
  }

  /* 以下是弹出框的样式 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-container {
  width: 80%;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.modal-header {
  padding: 15px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}

.modal-content {
  padding: 20px;
}

.modal-footer {
  display: flex;
  border-top: 1px solid #eee;
}

.modal-footer button {
  flex: 1;
  margin: 0;
  border-radius: 0;
  border: none;
  line-height: 44px;
}

.modal-footer button:first-child {
  border-right: 1px solid #eee;
}
</style>