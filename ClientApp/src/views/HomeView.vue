<script setup>
import { ref, onMounted, computed } from 'vue'
import customButton from '../components/customButton.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

const listData = ref([])
const dataId = ref(0)
const newItemTitle = ref('')

onMounted(() => {
  initData()
})

const toDo = computed(() => listData.value.filter(item => !item.isDone))
const done = computed(() => listData.value.filter(item => item.isDone))

async function initData() {
  try {
    const response = await axios.get('/api/Todoes')
    const responseData = response.data

    if (Array.isArray(responseData) && responseData.length > 0) {
      dataId.value = parseInt(responseData[responseData.length - 1].id)
      listData.value = responseData
    } else {
      console.error('資料格式不正確或是空的:', responseData)
    }
  } catch (error) {
    console.error('API 請求失敗:', error)
  }
}

async function createItem () {
  dataId.value++

  const newListData = {
    id: dataId.value.toString(),
    title: newItemTitle.value,
    isDone: false
  }

  if (!newListData.title) {
    ElMessage({
      type: 'warning',
      message: '尚無輸入欲新增事項'
    })
    return
  }

  await axios.post('/api/Todoes', newListData)
  newItemTitle.value = ''
  initData()
}

async function removeItem (item) {
  try {
    await ElMessageBox.confirm(
      '是否確定刪除代辦事項?',
      '刪除事項',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }
    )

    await axios.delete(`/api/Todoes/${item.id}`)

    ElMessage({
      type: 'success',
      message: '刪除成功'
    })

    initData()
  } catch {
    ElMessage({
      type: 'info',
      message: '已取消'
    })
  }
}

async function editItem (item) {
  try {
    const { value } = await ElMessageBox.prompt('請輸入修改後的標題', '編輯項目', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      inputValue: item.title
    })

    if (!value || value === item.title) {
      ElMessage({
        type: 'warning',
        message: '尚無編輯'
      })
      return
    }

    item.title = value

    await axios.put(`/api/Todoes/${item.id}`, item)

    ElMessage({
      type: 'success',
      message: '編輯成功'
    })
  } catch (status) {
    ElMessage({
      type: 'info',
      message: '取消編輯'
    })
  }
}

async function updateItemStatus (item) {
  await axios.put(`/api/Todoes/${item.id}`, item)
}
</script>

<template>

  <h1 class="text-center text-g font-weight-bold mb-3">計畫清單</h1>

  <div class="row">

    <div class="col-lg-6 col-12">
      <div class="bg-one list-title text-center mb-2 p-2">代辦事項</div>

      <div class="border p-2 mb-2 d-flex align-items-center">
        <input class="border-0 w-100 addItem" placeholder="請輸入欲新增事項" v-model="newItemTitle">
        <customButton buttonText="新增" type="success" @click="createItem"></customButton>
      </div>

      <ul class="p-0">
        <li class="toDoArea border p-2 mb-2 d-flex align-items-center" v-for="item in toDo" :key="item.id">
            <input type="checkbox" v-model="item.isDone" class="mr-2" @change="updateItemStatus(item)">
            <span class="w-100">{{ item.title }}</span>
            <customButton buttonText="編輯" type="primary" @click="editItem(item)"></customButton>
            <customButton buttonText="刪除" type="danger" @click="removeItem(item)"></customButton>
        </li>
      </ul>
    </div>

    <div class="col-lg-6 col-12">
      <div class="doneArea bg-two list-title text-center mb-2 p-2">完成事項</div>
      <ul class="p-0">
        <li class="border p-2 mb-2 delete-line" v-for="item in done" :key="item.id">
          <input type="checkbox" v-model="item.isDone" class="mr-2" @change="updateItemStatus(item)">
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
