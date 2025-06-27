<template>
  <view class="content">
    <view style="width: 90%; text-align: center;">
      <div style="width: 100%;" >
        <div class="searchArea">
          <div class="searchAreaLabel">
            <div class="name"><label for="">姓名：</label></div>
            <input type="text" value={{tiaojianteacher.name}} @input="(x) => onInputChange(x, 'name')"></input>
          </div>
         

          <div class="searchAreaLabel">
            <div class="name"><label for="">生日：</label></div>
            <input type="text" value= {{tiaojian.birthday}} @input="(x) =>onInputChange(x,'birthday')"></input>
          </div>
          

          <div class="searchAreaLabel">
            <div class="name"><label for="">性别：</label></div>
            <picker mode="selector" 
            :range="genderOptions"
            range-key="label"
            @change="genderChange">
              <view class="picker">当前选择：{{genderOptions.find(x => x.value === tiaojian.gendertj)?.label}}</view>
            </picker>
          </div>
          

          <div class="searchAreaLabel">
            <div class="name"><label for="">毕业院校：</label></div>
            <input type="text"  value= {{tiaojian.graduatedSchool}} @input="(x) =>onInputChange(x,'graduatedSchool')"></input>
          </div>
          

          <div class="searchAreaLabel">
            <div class="name"><label for="">政治面貌：</label></div>
            <input type="text" value= {{tiaojian.political}} @input="(x) =>onInputChange(x,'political')"></input>
          </div>
          

         <div class="searchAreaLabel">
            <div class="name"><label for="">学位：</label></div>
            <input type="text" value= {{tiaojian.degree}} @input="(x) =>onInputChange(x,'degree')"></input>
          </div>
          

          <div class="searchAreaLabel">
            <div class="name"><label for="">身份证号：</label></div>
            <input type="text" value= {{tiaojian.idNumber}} @input="(x) =>onInputChange(x,'idNumber')"></input>
          </div>
          
          <button type="primary" @click="() =>chaxun()">查询</button>
          <button type="primary" @click="() =>addclick()">新增老师</button>
        </div>

      </div>
    </view>
  </view>
  <uni-load-more v-if="isLoading" status="loading" />
  
  <!-- 表格数据 -->
  <uni-table   v-if="!isLoading"width="100%" :border="false" stripe emptyText="暂无更多数据" class="custom-table">
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
            <div class="searchAreaLabel">
              <div class="name"><label>姓名：</label></div>
              <input :value="activeteacher?.name" @input="(e) => onInputChange(e, 'name')"></input>
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>生日：</label></div>
              <input :value="activeteacher?.birthday" @input="(e) => onInputChange(e, 'birthday')"></input>
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>性别：</label></div>
              <picker mode="selector" 
              :range="genderOptions"
              range-key="label"
              @change="(e: any) => onInputChange(e, 'gender')">
              <view class="picker">当前选择：{{genderOptions.find(x => x.value === activeteacher?.gender)?.label}}</view>
              </picker>
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>毕业学校：</label></div>
              <input :value="activeteacher?.graduatedSchool" @input="(e) =>onInputChange(e,'graduatedSchool')">
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>政治面貌：</label></div>
              <input :value="activeteacher?.political" @input="(e) =>onInputChange(e,'political')">
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>学位：</label></div>
              <input :value="activeteacher?.degree" @input="(e) =>onInputChange(e,'degree')">
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>身份证号：</label></div>
              <input :value="activeteacher?.idNumber" @input="(e) =>onInputChange(e,'idNumber')">
            </div>
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
  

  import { ref } from 'vue'
  import { baseUrl } from '@/data/resource'
  import { teacher, tiaojianteacher } from '@/model/myModel'

  const teachers = ref<teacher[]>([])
  const filterteachers = ref<teacher[]>()
  const activeteacher = ref<teacher>()
  const isLoading = ref<boolean>(false)

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
      if(thename ==="gender")
      {
        debugger
        let a: number = parseInt(e.detail.value)
        activeteacher.value.gender = genderOptions.value[a].value
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
      isLoading.value = true
      wx.request({
        url: `${baseUrl}/api/Teacher`,
        method: 'GET', // 或 'POST', 'PUT' 等
        data: {
          key: 'value'
        },
        success(res: any) {
          chaxun
          teachers.value = res.data
          isLoading.value = false
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
     wx.request({
      url: `${baseUrl}/api/teacher`,
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
      url: `${baseUrl}/api/Teacher?id=${activeteacher.value?.id}`,
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

<style lang="scss">
  .title 
  {
  }
</style>