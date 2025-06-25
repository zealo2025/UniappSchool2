<template>
   <view class="content">
    <view style="width: 90%; text-align: center;">
      <div style="width: 100%;" >
        <div class="searchArea">
          <div class="searchAreaLabel">
            <div class="name"><label for="">名字：</label></div>
            <input type="text" value={{tiaojianmajor.name}} @input="(x) => onInputChange(x, 'name')"></input>
          </div>
          
          <div class="searchAreaLabel">
            <div class="name">
              <label for="">描述：</label>
            </div>
            <input type="text" value= {{tiaojianmajor.description}} @input="(x) =>onInputChange(x,'description')"></input>
          </div>
          
          <div class="searchAreaLabel">
            <div class=" name">
            <label for="">年限：</label>
          </div>
            <input type="text" value= {{tiaojianmajor.years}} @input="(x) =>onInputChange(x,'years')"></input>
          </div>

          <div class="searchAreaLabel">
            <div class="name">
              <label for="">开始日期：</label>
            </div>
            <input type="text"  value= {{tiaojianmajor.startTime}} @input="(x) =>onInputChange(x,'startTime')"></input>
          </div>

          <div class="searchAreaLabel">
            <div class="name">
              <label for="">是否重要：</label>
            </div>
            <picker mode="selector" 
            :range="isImportantOptions"
            range-key="label"
            @change="isImportantChange">
              <view class="picker">当前选择：{{isImportantOptions.find(x => x.value === tiaojianmajor.isImportanttj)?.label}}</view>
            </picker> 
          </div>                        
        </div>
        
        <div>
            <button class="anniu" type="primary" @click="() =>chaxun()">查询</button>
            <button class="anniu" type="primary" @click="() =>addclick()">新增专业</button>
        </div>

      </div>
    </view>

    <uni-table width="100%" :border="false" stripe>
      <uni-tr >    
          <uni-th align="center" width="40px">名字</uni-th>
          <uni-th align="center" width="60px">描述</uni-th>
          <uni-th align="center" width="60px">年限</uni-th>
          <uni-th align="center" width="100px">开始日期</uni-th>
          <uni-th align="center" width="100px">是否重要</uni-th>
          <uni-th align="center" width="50px">操作</uni-th>
      </uni-tr>

      <uni-tr v-for="(major, index) in (filtermajor||majors)" :key="index">
          <uni-td align="center">{{ major.name }}</uni-td>
          <uni-td align="center">{{ major.description }}</uni-td>
          <uni-td align="center">{{ major.years }} 年</uni-td>
          <uni-td align="center">{{ (new Date(major.startTime || "")).toLocaleDateString() }}</uni-td>
          <uni-td align="center">{{ major.isImportant === true ? "重要" : "次要" }}</uni-td>
          <uni-td align="center">
            <uni-icons @click="() => editClick(major)" style="margin: 5px;" type="gear-filled" size="30"></uni-icons>
            <uni-icons @click="() => isdeletetanchukuang(major)" style="margin: 5px;" type="trash-filled" size="30"></uni-icons>    
          </uni-td>
      </uni-tr>
  </uni-table>
  </view>

  <view class="modal-mask" v-if="isShuanchuOpen" @tap="deleteModalCloseClick">
    <view class="modal-container" @tap.stop>
      <view class="modal-header">{{"删除专业"}}</view>
      <view class="modal-content">
        <slot>
          <div class="searchArea">
            <label>是否确认要删除这个专业？ 姓名：{{activemajor?.name}}</label>
          </div>
        </slot>
      </view>
      <view class="modal-footer">
        <button @tap="deleteModalCloseClick">取消</button>
        <button @tap="deleteClick">{{"删除"}}</button>
      </view>
    </view>
  </view>

   <view class="modal-mask" v-if="isXiangqingOpen" @tap="detailCloseClick">
    <view class="modal-container" @tap.stop>
      <view class="modal-header">{{"专业详情"}}</view>
      <view class="modal-content">
        <slot>
          <view class="xiangqing">
            <label for="">名字：</label>
            <div>{{activemajor?.name}}</div>
            <label for="">描述：</label>
            <div>{{activemajor?.description}}</div>
            <label for="">年限：</label>
            <div>{{activemajor?.years}}</div>
            <label for="">开始日期：</label>
            <div>{{activemajor?.startTime}}</div>
            <label for="">是否重要：</label>
            <div>{{activemajor?.isImportant}}</div>
            
          </view>
        </slot>
      </view>
      <view class="modal-footer">
        <button @tap="detailCloseClick">确认</button>
      </view>
    </view>
  </view>

  <view class="modal-mask" v-if="isOpen" @tap="modalCloseClick">
    <view class="modal-container" @tap.stop>
      <view class="modal-header">{{isEdit?"修改专业":"新增专业"}}</view>
      <view class="modal-content">
        <slot>
          <div class="searchArea">
            <div class="searchAreaLabel">
              <div class="name"><label>姓名：</label></div>
              <input :value="activemajor?.name" @input="(e) => onInputChange(e, 'name')"></input>
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>描述：</label></div>
              <input :value="activemajor?.description" @input="(e) => onInputChange(e, 'description')"></input>
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>年限：</label></div>
              <input :value="activemajor?.years" @input="(e) =>onInputChange(e, 'years')">
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>开始日期：</label></div>
              <input :value="activemajor?.startTime" @input="(e) =>onInputChange(e,'startTime')">
            </div>

            <div class="searchAreaLabel">
              <div class="name"><label>是否重要：</label></div>  
              <picker mode="selector" 
              :range="isImportantOptions"
              range-key="label"
              @change="(e: any) => onInputChange(e, 'isImportant')">
              <view class="picker">当前选择：{{isImportantOptions.find(x => x.value === activemajor?.isImportant)?.label}}</view>
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
    
    
    
   
    

</template>

<script setup lang="ts">
export interface major{
    id?: number
    name?: string
    description?: string
    years?: number
    startTime?: string
    isImportant?: boolean
}

export interface tiaojianmajor{
    idtj?: number,
    nametj?: string,
    descriptiontj?: string,
    yearstj?: number,
    startTimetj?: string,
    isImportanttj?: boolean //

}

import { ref } from 'vue'

const majors = ref<major[]>([])
const filtermajor = ref<major[]>()
const activemajor = ref<major>()
const isEdit = ref<boolean>()
const isOpen = ref<boolean>(false)
const isXiangqingOpen =ref<boolean>(false)
const isShuanchuOpen = ref<boolean>(false)
const tiaojianmajor = ref<tiaojianmajor>({ 
    nametj: "",
    descriptiontj: "",
    yearstj: 0,
    startTimetj: "",
    isImportanttj:  undefined
})

const isImportantOptions = ref([{value: undefined, label: "- 未选择 -"}, {value: true, label: "重要"}, {value: false, label: "次要"}])
 const deleteModalCloseClick = () => {
    isShuanchuOpen.value = false
  }

   const detailCloseClick = () => {
    isXiangqingOpen.value = false
  }

const  fetchmajor = () =>{
     wx.request({
        url: 'https://schoolapi-fqd0d0hhftajfkdv.eastasia-01.azurewebsites.net/api/major',
        method: 'GET', 
        data: {
          key: 'value'
        },
        success(res: any) {
          chaxun
          majors.value = res.data
        },
        fail(err: any) {
          console.error('请求失败', err)
        },
        complete() {
          console.log('请求完成')
        }
      })
}

const deleteClick = () =>{
    wx.request({
      url: 'https://schoolapi-fqd0d0hhftajfkdv.eastasia-01.azurewebsites.net/api/major?id=' + activemajor.value?.id,
      method: 'DELETE',
      success:() => {
        fetchmajor()
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

const okClick = () =>{
     wx.request({
      url: 'https://schoolapi-fqd0d0hhftajfkdv.eastasia-01.azurewebsites.net/api/major',
      method: isEdit.value ? 'PUT' : 'POST',
      data: activemajor.value,
      header: { 
        'Content-Type': 'application/json',
      },
      success:() => {
        fetchmajor()
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

const isdeletetanchukuang = (ts : major) =>{
    activemajor.value = Object.assign({}, ts)
    isShuanchuOpen.value = true
  }
fetchmajor()

 const isImportantChange = (a: any) =>{
    let s:number = a.detail.value
    tiaojianmajor.value.isImportanttj = isImportantOptions.value[s].value
  }

  const editClick = (zuanye: major) =>{
    
    activemajor.value = Object.assign({},zuanye)
    isEdit.value = true
    isOpen.value = true
  }

  const modalCloseClick = () => {
    isOpen.value = false
  }

  const addclick = () =>{
    let konmajor: major ={
      name: "",
      description: "",
      years: 0,
      startTime: "",
      isImportant: undefined,
    }
    activemajor.value = konmajor
    isEdit.value = false
    isOpen.value = true
  }

const onInputChange = (a: any, thename: string) =>{
  if(activemajor.value)
  {
      if(thename === "name")
    {
      activemajor.value.name = a.detail.value
    }

      if(thename === "description")
    {
      activemajor.value.description = a.detail.value
    }

      if(thename === "years")
    {
      activemajor.value.years = a.detail.value
    }

      if(thename === "startTime")
    {
      activemajor.value.startTime = a.detail.value
    }

    if(thename === "isImportant")
    {
      let 角标: string = a.detail.value //角标 = “2”
      //声明一个叫B 的number 类型的变量， 值为 把 角标 字符串 转化为数字
      let B: number = parseInt(角标) //B = 2
      //从数组isImportantOptions 里面取出角标是 B 的项
      let theItem = isImportantOptions.value.find((x, index) => index === B)//B 已经是数字了， 可以用  ===， 如果是 “2”， 用  ==
      //有个更简单的方法
      //isImportantOptions.value[B]
      //通过如上find方法， 你得到了  {value: false, label: "次要"}， 然后你要取出 value
      activemajor.value.isImportant = theItem?.value
    }
  }
}

const chaxun = () =>{
  
 
    let arr = majors.value
    let tj = tiaojianmajor.value
   
    if(tj.nametj)
    {
        arr = arr.filter(s => s.name?.includes(tj.nametj  || "") )
    }

    if(tj.descriptiontj)
    {
        arr = arr.filter(s => s.description ===tj.descriptiontj  )
    }

   
   
     if(tj.yearstj)
    {
        arr = arr.filter(s => s.years == tj.yearstj)

    }

     if(tj.startTimetj)
    {
        arr = arr.filter(s => s.startTime === tj.startTimetj)
    }

    if(tj.isImportanttj != undefined)//因为当 isImportanttj  === false 的时候也要参加运算
    {
      arr = arr.filter(s => s.isImportant === tj.isImportanttj)
    }
    filtermajor.value = arr

}

</script>

<style lang="scss">
  input{
    border: 1px solid gray;
    height: 35px;
    border-radius: 5px;
  }
</style>