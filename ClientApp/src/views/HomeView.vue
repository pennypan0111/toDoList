<script setup>
import { ref, onMounted, computed } from 'vue'
import customButton from '../components/CustomButton.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

const listData = ref([])
const dataId = ref(0)
const newItemTitle = ref('')

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

onMounted(() => {
  initData()
})

const toDo = computed(() => listData.value.filter(item => !item.isDone))
const done = computed(() => listData.value.filter(item => item.isDone))

async function initData() {
  try {
    const response = await apiClient.get('/Todoes')
    const responseData = response.data

    if (Array.isArray(responseData)) {
      if (responseData.length > 0) {
        dataId.value = parseInt(responseData[responseData.length - 1].id)
        listData.value = responseData
      } else {
        listData.value = []
      }
    } else {
      console.error('資料格式不正確:', responseData)
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

  await apiClient.post('/Todoes', newListData)
  newItemTitle.value = ''
  initData()
}

async function removeToDoItem (item) {
  try {
    await ElMessageBox.confirm(
      '是否確定刪除代辦事項?',
      '刪除事項',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }
    )

    await apiClient.delete(`/Todoes/${item.id}`)

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

async function removeDoneItem (item) {
  try {
    await ElMessageBox.confirm(
      '是否確定不再保留此完成事項?',
      '保留事項',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }
    )

    await apiClient.delete(`/Todoes/${item.id}`)

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
    const { value } = await ElMessageBox.prompt('請輸入修改後的事項', '編輯事項', {
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

    await apiClient.put(`/Todoes/${item.id}`, item)

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
  await apiClient.put(`/Todoes/${item.id}`, item)
}
</script>

<template>

  <h1 class="text-center text-g font-weight-bold mb-3">計畫清單</h1>

  <div class="row">

    <div class="col-lg-6 col-12">
      <div class="bg-one list-title text-center mb-2 p-2">代辦事項</div>

      <div class="border p-2 mb-2 d-flex align-items-center">
        <input class="border-0 w-100 addItem" placeholder="請輸入欲新增事項" v-model="newItemTitle" data-cy="addItemInput">
        <customButton iconClass="fa-solid fa-plus" iconColor="bg-one" @click="createItem"></customButton>
      </div>

      <ul class="p-0">
        <li class="toDoArea border p-2 mb-2 d-flex align-items-center" v-for="item in toDo" :key="item.id">
            <input type="checkbox" v-model="item.isDone" class="mr-2" @change="updateItemStatus(item)">
            <span class="w-100">{{ item.title }}</span>
            <customButton iconClass="fa-solid fa-pen" iconColor="bg-one" class="mr-2" @click="editItem(item)"></customButton>
            <customButton iconClass="fa-solid fa-trash-can" iconColor="bg-one" @click="removeToDoItem(item)"></customButton>
        </li>
      </ul>
    </div>

    <div class="col-lg-6 col-12">
      <div class="doneArea bg-two list-title text-center mb-2 p-2">完成事項</div>
      <ul class="p-0">
        <li class="border p-2 mb-2 delete-line" v-for="item in done" :key="item.id">
          <div class="d-flex align-items-center">
            <input type="checkbox" v-model="item.isDone" class="mr-2" @change="updateItemStatus(item)">
            <span class="w-100">{{ item.title }}</span>
            <customButton iconClass="fa-solid fa-xmark" iconColor="bg-two" @click="removeDoneItem(item)"></customButton>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
