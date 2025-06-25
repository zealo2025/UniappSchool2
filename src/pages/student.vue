<template>
  <view class="content">

    <!-- 搜索区域 -->
    <view style="width: 90%; text-align: center;">
      <div style="width: 100%;">
        <div class="searchArea">
          <div class="searchAreaLabel">
            <div class="name"><label for="">姓名：</label></div>
            <input type="text" :value="tiaojian.nameTj" @input="nameInputChange"></input>
          </div>
          

          <div class="searchAreaLabel">
            <div class="name"><label for="">性别：</label></div>
            <picker 
            mode="selector" 
            :range="genderOptions"
            range-key="label"
            @change="genderChange"
          >
            <view class="picker">当前选择：{{genderOptions.find(x => x.value === tiaojian.genderTj)?.label}}</view>
            </picker>
          </div>
           

          <div class="searchAreaLabel">
            <div class="name"><label for="">是否外籍：</label></div>
            <picker mode="selector" 
            :range="isFromAbroadOptions"
            range-key="label"
            @change="isFromAbroadChange">
            <view class="picker">当前选择：{{isFromAbroadOptions.find(x => x.value === tiaojian.isFromAbroadTj)?.label}}</view>
            </picker>
          </div>
          

          <button type="primary" @click="chaxun">查询</button>
          <button type="primary" @click="addClick">新增</button>
        </div>

        <!-- <view :wx:if="(filterXsm || xueshengmen).length > 0" class="table">
          <view class="tr">
            <view class="th">姓名</view>
            <view class="th">英文名</view>
            <view class="th">姓名</view>
            <view class="th">年级</view>
            <view class="th">班级</view>
            <view class="th">老外</view>
            <view class="th">操作</view>
          </view>
          <view  v-for="(xuesheng, index) in (filterXsm || xueshengmen)" :key="index" class="tr">
            <view class="td">{{xuesheng.name}}</view>
            <view class="td">{{xuesheng.englishName}}</view>
            <view class="td">{{xuesheng.gender}}</view>
            <view class="td">{{xuesheng.grade}}</view>
            <view class="td">{{xuesheng.class}}</view>
            <view class="td">{{xuesheng.isFromAbroad ? "是老外" : "中国人"}}</view>
            <view class="td">
              <button @click="() => editClick(xuesheng)">修改</button>
              <button @click="() => deleteQuerenkuang(xuesheng)">删除</button>
            </view>
          </view>
        </view>
        <view wx:else style="height: 100px;padding-top: 50px">没数据</view> -->
        
        <!-- <table style="width: 100%; background-color: 'red';">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>英文名</th>
              <th>性别</th>
              <th>年级</th>
              <th>班级</th>
              <th>是不是老外</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(xuesheng, index) in (filterXsm || xueshengmen)" :key="index">
              <td>{{xuesheng.id}}</td>
              <td>{{xuesheng.name}}</td>
              <td>{{xuesheng.englishName}}</td>
              <td>{{xuesheng.gender}}</td>
              <td>{{xuesheng.grade}}</td>
              <td>{{xuesheng.class}}</td>
              <td>{{xuesheng.isFromAbroad ? "是老外" : "中国人"}}</td>
              <td>
                <a-button @click="() => editClick(xuesheng)">修改</a-button>
                <a-button @click="() => deleteQuerenkuang(xuesheng)">删除</a-button>
              </td>
            </tr>
          </tbody>
        </table> -->
      </div>

      <!-- <a-modal title="编辑学生" okText="保存" v-model:open="isOpen" @ok="() => okClick()" @cancel="() => cancelClick()">
        Name: <a-input v-model:value="activeXs.name"></a-input>
        EnglishName: <a-input v-model:value="activeXs.englishName"></a-input>
        Class: 
        <select v-model="activeXs.class">
          <option :value="1">1年级</option>
          <option :value="2">2年级</option>
          <option :value="3">3年级</option>
          <option :value="4">4年级</option>
          <option :value="5">5年级</option>
          <option :value="6">6年级</option>
        </select>
        isFromAbroad: 
        <select v-model="activeXs.isFromAbroad">
          <option :value="true">是老外</option>
          <option :value="false">是中国人</option>
        </select>
        Gender: 
        <select v-model="activeXs.gender">
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </a-modal>
      
      <a-modal title="删除学生确认" okText="确认删除" @ok="() => deleteClick(activeXs)"
        v-model:open="isShanchuOpen">
        你是否要确认删除 {{activeXs.name}} 这个学生？
      </a-modal> -->
    </view>

    <uni-load-more v-if="isLoading" status="loading" />

    <!-- 表格数据（所有学生） -->
    <uni-table v-if="!isLoading" width="100%" border stripe emptyText="暂无更多数据" >
      <uni-tr>
        <uni-th align="center" width="80px">姓名</uni-th>
        <uni-th align="center" width="60px">性别</uni-th>
        <uni-th align="center" width="60px">年级</uni-th>
        <uni-th align="center" width="60px">班级</uni-th>
        <uni-th align="center" width="50px">操作</uni-th>
      </uni-tr>
      <uni-tr v-for="(xuesheng, index) in (filterXsm || xueshengmen)" :key="index">
        <uni-td align="center">{{xuesheng.name}}</uni-td>
        <uni-td align="center">{{xuesheng.gender}}</uni-td>         
        <uni-td align="center">{{xuesheng.grade}}</uni-td>
        <uni-td align="center">{{xuesheng.class}}</uni-td>
        <uni-td align="center">
          <uni-icons @click="() => editClick(xuesheng)" style="margin: 5px;" type="gear-filled" size="30"></uni-icons>
          <uni-icons @click="() => deleteQuerenkuang(xuesheng)" style="margin: 5px;" type="trash-filled" size="30"></uni-icons>
        </uni-td>
      </uni-tr>
    </uni-table>
  </view>
  
  <!-- 弹出框 修改和新增共用 -->
  <view class="modal-mask" v-if="isOpen" @tap="modalCloseClick">
    <view class="modal-container" @tap.stop>
      <view class="modal-header">{{isEdit?"修改学生":"新增学生"}}</view>
      <view class="modal-content">
        <slot>
          <div class="searchArea">
            <div class="searchAreaLabel">
              <div class="name"><label>姓名：</label></div>
              <input :value="activeXs?.name" @input="(e) => onInputChange(e, 'name')"></input>
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>英文名：</label></div>
              <input :value="activeXs?.englishName" @input="(e) => onInputChange(e, 'englishName')"></input>
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>性别：</label></div>
              <picker mode="selector" 
              :range="genderOptions"
              range-key="label"
              @change="(e: any) => onInputChange(e, 'gender')">
              <view class="picker">当前选择：{{genderOptions.find(x => x.value === activeXs?.gender)?.label}}</view>
              </picker>
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>年级：</label></div>
              <picker mode="selector" 
              :range="gradeOptions"
              range-key="label"
              @change="(e: any) => onInputChange(e, 'grade')">
              <view class="picker">当前选择：{{gradeOptions.find(x => x.value === activeXs?.grade)?.label}}</view>
              </picker>
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>班级：</label></div>
              <picker mode="selector" 
              :range="classOptions"
              range-key="label"
              @change="(e: any) => onInputChange(e, 'class')">
              <view class="picker">当前选择：{{classOptions.find(x => x.value === activeXs?.class)?.label}}</view>
              </picker>
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>是否外籍：</label></div>
              <picker mode="selector" 
                :range="isFromAbroadOptions"
                range-key="label"
                @change="(e: any) => onInputChange(e, 'isFromAbroad')">
                <view class="picker">当前选择：{{isFromAbroadOptions.find(x => x.value === activeXs?.isFromAbroad)?.label}}</view>
              </picker>
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
  <view class="modal-mask" v-if="isShanchuOpen" @tap="deleteModalCloseClick">
    <view class="modal-container" @tap.stop>
      <view class="modal-header">{{"删除学生"}}</view>
      <view class="modal-content">
        <slot>
          <div class="searchArea">
            <label>是否确认要删除学生？ 姓名：{{activeXs?.name}}</label>
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
  export interface xuesheng{
    id?: number,
    name?: string,
    grade?: number,
    class?: number,
    gender?: string,
    englishName?: string,
    isFromAbroad?: boolean
  }

  export interface tiaojianLeixing{
    nameTj?: string
    genderTj?: string,
    isFromAbroadTj?: boolean
  }

  import { ref } from 'vue'
  const xueshengmen = ref<xuesheng[]>([])
  const filterXsm = ref<xuesheng[]>()
  const activeXs = ref<xuesheng>()
  const isEdit = ref<boolean>()
  const isOpen = ref<boolean>(false)
  const isShanchuOpen = ref<boolean>(false)
  const tiaojian = ref<tiaojianLeixing>({
    nameTj: "",
    genderTj:"",
    isFromAbroadTj: undefined
  })
  const genderOptions = ref([{value: "", label: "- 未选择 -"}, {value: "男", label: "男"}, {value: "女", label: "女"}])
  const isFromAbroadOptions = ref([{value: undefined, label: '- 未选择 -'}, {value: true, label: '是'},{ value: false, label: '不是'}])
  const gradeOptions = ref([{value: undefined, label: '- 未选择 -'}, {value: 1, label: '一年级'},{ value: 2, label: '二年级'},
    {value: 3, label: '三年级'},{ value: 4, label: '四年级'},{value: 5, label: '五年级'},{ value: 6, label: '六年级'}])
  const classOptions = ref([{value: undefined, label: '- 未选择 -'}, {value: 1, label: '(1)班'},{ value: 2, label: '(2)班'},
    {value: 3, label: '(3)班'},{ value: 4, label: '(4)班'},{value: 5, label: '(5)班'},{ value: 6, label: '(6)班'}])
  const isLoading = ref<boolean>(false)

  const genderChange = (v: any) =>{
    let i: number = v.detail.value
    tiaojian.value.genderTj = genderOptions.value[i].value
  }

  const onInputChange = (e: any, theName: string) => {
    if(activeXs.value)
    {
      if(theName === "name")
      {
        activeXs.value.name = e.detail.value
      }
      if(theName === "englishName")
      {
        activeXs.value.englishName = e.detail.value
      }
      if(theName === "isFromAbroad")
      {
        let i: number = e.detail.value
        activeXs.value.isFromAbroad = isFromAbroadOptions.value[i].value
      }
      if(theName === "gender")
      {
        let i: number = parseInt(e.detail.value)
        activeXs.value.gender = genderOptions.value[i].value
      }
      if(theName === "grade")
      {
        let i: number = parseInt(e.detail.value)
        activeXs.value.grade = i
      }
      if(theName === "class")
      {
        let i: number = parseInt(e.detail.value)
        activeXs.value.class = i
      }
    }
  }

  const isFromAbroadChange = (v: any) =>{
    let i: number = v.detail.value
    tiaojian.value.isFromAbroadTj = isFromAbroadOptions.value[i].value
  }

  const nameInputChange = (v: any) => {
    tiaojian.value.nameTj = v.detail.value
  }

  const fetchXueshengmen = () =>{
    isLoading.value = true
    wx.request({
      //稍后可以将这个地址放到一个 url base 的变量里面, 可以直接使用 /api/Student
      url: 'https://schoolapi-fqd0d0hhftajfkdv.eastasia-01.azurewebsites.net/api/Student',
      method: 'GET', // 或 'POST', 'PUT' 等
      data: {
        key: 'value'
      },
      success(res) {
        chaxun(res.data)
        xueshengmen.value = res.data
        isLoading.value = false
      },
      fail(err) {
        console.error('请求失败', err)
      },
      complete() {
        console.log('请求完成')
      }
    })
  }

  const okClick = () => {
    // let ax: xuesheng = activeXs.value
    // debugger
    // fetch('/api/Student',
    //     {
    //       method: isEdit.value ? 'PUT' : 'POST',
    //       headers: {"content-type": "application/json"},
    //       body: JSON.stringify(ax)
    //     })
    //     .then(() =>{
    //       fetchXueshengmen()
    //     })
    // isOpen.value = false
    wx.request({
      url: 'https://schoolapi-fqd0d0hhftajfkdv.eastasia-01.azurewebsites.net/api/Student',
      method: isEdit.value ? 'PUT' : 'POST',
      data: activeXs.value,
      header: { // 请求头
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer token' // 如果需要token验证
      },
      success:() => {
        fetchXueshengmen()
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

  const deleteClick = () => {
    if(!activeXs.value)
    {
      return
    }
    // fetch('/api/Student?id=' + xs.id,
    //   {method: 'DELETE'}
    // )
    // .then(() => {
    //   isShanchuOpen.value = false
    //   fetchXueshengmen()
    // })

    wx.request({
      url: 'https://schoolapi-fqd0d0hhftajfkdv.eastasia-01.azurewebsites.net/api/Student?id=' + activeXs.value.id,
      method: 'DELETE',
      success:() => {
        fetchXueshengmen()
        isShanchuOpen.value = false
      },
      fail: (err) => {
        console.error('请求失败', err)
      },
      complete: () => {
        console.log('请求完成')
      }
    })
  }

  const editClick = (xs: xuesheng) => {
    activeXs.value = Object.assign({}, xs)
    isEdit.value = true
    isOpen.value = true
  }

  const deleteQuerenkuang = (xs: xuesheng) => {
    activeXs.value = Object.assign({}, xs)
    isShanchuOpen.value = true
  }

  const addClick = () => {
    let kongXuesheng : xuesheng = {
      name: "",
      englishName: "",
      gender: "男",
      isFromAbroad: false,
      class: 1, 
      grade: 1
    }
    activeXs.value = kongXuesheng
    isOpen.value = true
    isEdit.value = false
  }

  const chaxun = (zuixinXsm?: xuesheng[]) => {
    let xsm: xuesheng[] = zuixinXsm || xueshengmen.value
    let tj: tiaojianLeixing = tiaojian.value
    if(tj.genderTj)
    {
     xsm = xsm.filter(x => x.gender === tj.genderTj) 
    }

    if(tj.nameTj)
    {
      xsm = xsm.filter(x => x.name?.includes(tj.nameTj || ""))
    }

    if(tj.isFromAbroadTj === true || tj.isFromAbroadTj === false)
    {
      xsm = xsm.filter(x => x.isFromAbroad === tj.isFromAbroadTj)
    }

    filterXsm.value = xsm
  }

  fetchXueshengmen()

  const modalCloseClick = () =>{
    isOpen.value = false
  }

  const deleteModalCloseClick = () => {
    isShanchuOpen.value = false
  }

</script>

<style lang="scss">
  .title 
  {
  }
</style>
