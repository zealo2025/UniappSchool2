<template>
  <view class="content">
    <view style="width: 90%; text-align: center;">
      <div style="width: 100%;" >
        <div class="searchArea">
          <div class="searchAreaLabel">
            <label for="">姓名：</label>
          </div>
          <input type="text" value={{tiaojianteacher.name}} @input="(x) => onInputChange(x, 'name')"></input>

          <div class="searchAreaLabel">
            <label for="">生日：</label>
          </div>
          <input type="text" value= {{tiaojian.birthday}} @input="(x) =>onInputChange(x,'birthday')"></input>

          <div class="searchAreaLabel">
            <label for="">性别：</label>
          </div>
          <picker mode="selector" 
            :range="genderOptions"
            range-key="label"
            @change="genderChange">
              <view class="picker">当前选择：{{genderOptions.find(x => x.value === tiaojian.gendertj)?.label}}</view>
          </picker>

          <div class="searchAreaLabel">
            <label for="">毕业院校：</label>
          </div>
          <input type="text"  value= {{tiaojian.graduatedSchool}} @input="(x) =>onInputChange(x,'graduatedSchool')"></input>

          <div class="searchAreaLabel">
            <label for="">政治面貌：</label>
          </div>
         <input type="text" value= {{tiaojian.political}} @input="(x) =>onInputChange(x,'political')"></input> 

         <div class="searchAreaLabel">
            <label for="">学位：</label>
          </div>
          <input type="text" value= {{tiaojian.degree}} @input="(x) =>onInputChange(x,'degree')"></input>

          <div class="searchAreaLabel">
            <label for="">身份证号：</label>
          </div>
          <input type="text" value= {{tiaojian.idNumber}} @input="(x) =>onInputChange(x,'idNumber')"></input>
          <button class="anniu" type="primary" @click="() =>chaxun()">查询</button>
          <button class="anniu" type="primary" @click="() =>addclick()">新增老师</button>
        </div>

      </div>
    </view>
  </view>
  
  <!-- 表格数据 -->
  <uni-table width="100%" :border="false" stripe emptyText="暂无更多数据" class="custom-table">
    <!-- 表头行 -->
    <uni-tr >
      
      <uni-th align="center" width="120px">名字</uni-th>
      <uni-th align="center" width="60px">性别</uni-th>
      <uni-th align="center" width="60px">政治面貌</uni-th>
      <uni-th align="center" width="60px">学位</uni-th>
      <uni-th align="center" width="70px">操作</uni-th>
    </uni-tr>
    <!-- 表格数据行 -->
    <uni-tr v-for="(teacher, index) in (filterteachers||teachers)" :key="index" class="nr">
        <uni-td align="center">{{teacher.name}}</uni-td>
        <uni-td align="center">{{teacher.gender}}</uni-td>     
        <uni-td align="center">{{teacher.political}}</uni-td>
        <uni-td align="center">{{teacher.degree}}</uni-td>
        <uni-td align="center">
          <uni-icons @click="() => showDetails(teacher)" style="margin: 5px;" type="contact-filled" size="30"></uni-icons>
          <uni-icons @click="() => editClick(teacher)" style="margin: 5px;" type="gear-filled" size="30"></uni-icons>
          <uni-icons @click="() => isdeletetanchukuang(teacher)" style="margin: 5px;" type="trash-filled" size="30"></uni-icons>
        </uni-td>       
    </uni-tr>
  </uni-table>
  
  <!-- 详情框 -->
  <view class="modal-mask" v-if="isXiangqingOpen" @tap="detailCloseClick">
    <view class="modal-container" @tap.stop>
      <view class="modal-header">{{"老师详情"}}</view>
      <view class="modal-content">
        <slot>
          <view class="xiangqing">
            <label for="">姓名：</label>
            <div>{{activeteacher?.name}}</div>
            <label for="">性别：</label>
            <div>{{activeteacher?.gender}}</div>
            <label for="">生日：</label>
            <div>{{activeteacher?.birthday}}</div>
            <label for="">毕业学校：</label>
            <div>{{activeteacher?.graduatedSchool}}</div>
            <label for="">政治面貌：</label>
            <div>{{activeteacher?.political}}</div>
            <label for="">学位：</label>
            <div>{{activeteacher?.degree}}</div>
            <label for="">身份证号码：</label>
            <div>{{activeteacher?.idNumber}}</div>
          </view>
        </slot>
      </view>
      <view class="modal-footer">
        <button @tap="detailCloseClick">确认</button>
      </view>
    </view>
  </view>

  <!-- 修改新增框 -->
  <view class="modal-mask" v-if="isOpen" @tap="modalCloseClick">
    <view class="modal-container" @tap.stop>
      <view class="modal-header">{{isEdit?"修改老师":"新增老师"}}</view>
      <view class="modal-content">
        <slot>
          <div class="searchArea">
            <label>姓名：</label>
            <input :value="activeteacher?.name" @input="(e) => onInputChange(e, 'name')"></input>

            <label>生日：</label>
            <input :value="activeteacher?.birthday" @input="(e) => onInputChange(e, 'birthday')"></input>

            <label>性别：</label>
            <picker mode="selector" 
              :range="genderOptions"
              range-key="label"
              @change="(e: any) => onInputChange(e, 'gender')">
              <view class="picker">当前选择：{{genderOptions.find(x => x.value === activeteacher?.gender)?.label}}</view>
            </picker>

            <label>毕业学校：</label>
            <input :value="activeteacher?.graduatedSchool" @input="(e) =>onInputChange(e,'graduatedSchool')">

            <label>政治面貌：</label>
            <input :value="activeteacher?.political" @input="(e) =>onInputChange(e,'political')">

            <label>学位：</label>
            <input :value="activeteacher?.degree" @input="(e) =>onInputChange(e,'degree')">

            <label>身份证号码：</label>
            <input :value="activeteacher?.idNumber" @input="(e) =>onInputChange(e,'idNumber')">

          </div>
        </slot>
      </view>
      <view class="modal-footer">
        <button @tap="modalCloseClick">取消</button>
        <button @tap="okClick">{{isEdit ? "修改" : "新增"}}</button>
      </view>
    </view>
  </view>

  <!-- 删除确认框 -->
  <view class="modal-mask" v-if="isShuanchuOpen" @tap="deleteModalCloseClick">
    <view class="modal-container" @tap.stop>
      <view class="modal-header">{{"删除老师"}}</view>
      <view class="modal-content">
        <slot>
          <div class="searchArea">
            <label>是否确认要删除这个老师？ 姓名：{{activeteacher?.name}}</label>
          </div>
        </slot>
      </view>
      <view class="modal-footer">
        <button @tap="deleteModalCloseClick">取消</button>
        <button @tap="deleteClick">{{"删除"}}</button>
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
      idNumber?: string,
  }

  export interface  tiaojianteacher{
    idtj?: number,
    nametj?: string,
    birthdaytj?: string,
    gendertj?: string,
    graduatedSchooltj?: string,
    politicaltj?: string,
    degreetj?: string,
    idNumbertj?: string,  
  }

  import { ref } from 'vue'
  const teachers = ref<teacher[]>([])
  const filterteachers = ref<teacher[]>()
  const activeteacher = ref<teacher>()

  const isXiangqingOpen = ref<boolean>(false) //这个框名字改一下, 看名字感觉是 : 是否修改框打开 , 那么你是用在详情页面, 可以改成 isXiangqingOpen
  const isEdit = ref<boolean>()
  const isOpen = ref<boolean>(false)
  const isShuanchuOpen = ref<boolean>(false)
  const tiaojian = ref<tiaojianteacher>({
    nametj: "",
    birthdaytj: "",
    gendertj: "",
    graduatedSchooltj: "",
    politicaltj: "",
    degreetj: "",
    idNumbertj: ""
  })

  const genderOptions = ref([{value: "", label: "- 未选择 -"}, {value: "男", label: "男"}, {value: "女", label: "女"}])

  const deleteModalCloseClick = () => {
    isShuanchuOpen.value = false
  }

  const genderChange = (a: any) =>{
    let s:number = a.detail.value
    tiaojian.value.gendertj = genderOptions.value[s].value
  }

  const detailCloseClick = () => {
    isXiangqingOpen.value = false
  }

  const showDetails = (s: teacher) =>{
    activeteacher.value = Object.assign({}, s)
    isXiangqingOpen.value = true
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
      arr = arr.filter(x => x.name?.includes(tj.nametj || ""))
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
      arr = arr.filter(x => x.idNumber?.includes(tj.idNumbertj || ""))
    }
    //filteachers 有没有替换所有 teachers 去绑定？ 要用 filterteachers || teachers
    filterteachers.value =arr
  }


  const fetchteachers = () =>{
      wx.request({
        url: 'https://schoolapi-fqd0d0hhftajfkdv.eastasia-01.azurewebsites.net/api/Teacher',
        method: 'GET', // 或 'POST', 'PUT' 等
        data: {
          key: 'value'
        },
        success(res: any) {
          chaxun
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

  const okClick = () =>{
    //这个地方好像没拿到 activeTeacher的 value
    debugger
     wx.request({
      url: 'https://schoolapi-fqd0d0hhftajfkdv.eastasia-01.azurewebsites.net/api/teacher',
      method: isEdit.value ? 'PUT' : 'POST',
      data: activeteacher.value,
      header: { 
        'Content-Type': 'application/json',
      },
      success:() => {
        fetchteachers()
        isOpen.value = false
      },
      fail: (err) => {
        console.error('请求失败', err)
      },
      complete: () => {
        console.log('请求完成')
      }
    })
  }

  const deleteClick = () =>{
    wx.request({
      url: 'https://schoolapi-fqd0d0hhftajfkdv.eastasia-01.azurewebsites.net/api/Teacher?id=' + activeteacher.value?.id,
      method: 'DELETE',
      success:() => {
        fetchteachers()
        isShuanchuOpen.value = false
      },
      fail: (err) => {
        console.error('请求失败', err)
      },
      complete: () => {
        console.log('请求完成')
      }
    })
  }

  fetchteachers()

  const editClick = (laoshi: teacher) =>{
    activeteacher.value = Object.assign({},laoshi)
    isEdit.value = true
    isOpen.value = true
  }

  const modalCloseClick = () => {
    isOpen.value = false
  }

  const addclick = () => {
    let kongteache: teacher={
      name: "",
      birthday: "",
      gender: "",
      graduatedSchool: "",
      political: "",
      degree: "",
      idNumber: ""
    }
    activeteacher.value = kongteache
    isEdit.value = false
    isOpen.value = true
  }

  const isdeletetanchukuang = (ts : teacher) =>{
    activeteacher.value = Object.assign({}, ts)
    isShuanchuOpen.value = true
  }

</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .searchArea label{
    font-weight: bolder;
    line-height: 35px;
    margin-top: 10px;
  }
  .searchAreaLabel{
    text-align: left;
  }

  input{
    border: 1px solid gray;
    height: 35px;
    border-radius: 5px;
  }

  .picker {
    border: 1px solid gray;
    border-radius: 5px;
    height: 35px;
    vertical-align: middle;
    line-height: 30px;
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

.custom-table{
  background-color: red;
}

.custom-table ::v-deep .uni-table-th {
  background-color: #f5f7fa;
  color: #909399;
}

.xiangqing label{
  font-weight: bolder;
}

.xiangqing view{
  padding-bottom: 10px;
}

.anniu{
   margin: 10px 0 ;
  border-radius: 3px;
}

</style>