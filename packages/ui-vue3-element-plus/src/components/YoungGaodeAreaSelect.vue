<!--
 * @Author: zhangyang
 * @Date: 2024-03-21 16:28:09
 * @LastEditTime: 2024-06-12 19:00:51
 * @Description: 地址选择组件
-->

<script lang="ts" setup>
import { ElCascader } from 'element-plus'
import type { CascaderProps } from 'element-plus'
import { ref, watch } from 'vue'
import type { SelectOptionItem } from '..'
import { initAMapSDK } from '..'
import { isArray, isString } from '@bluesyoung/utils'

interface Props {
  /**
   * ! level !== 'street' 时可用
   */
  modelValue?: string | string[]
  /**
   * 精度
   * 省 市 区 街道
   */
  level?: 'province' | 'city' | 'district' | 'street'

  /**
   * 密钥
   */
  sk: string
  secret: string
  /**
   * sdk 地址
   */
  sdkUrl?: string

  placeholder?: string | string[] | string[][]
  /**
   * 是否允许多选
   * ! 街道无法多选，故 multiple 设置为 true 时，level 至少会被设置为 district
   */
  multiple?: boolean
}

const LevelMap = {
  province: 1,
  city: 2,
  district: 3,
  street: 4,
} as const

interface AMapResultItem {
  adcode: string
  name: string
  level: keyof typeof LevelMap
  districtList?: AMapResultItem[]
}

const props = withDefaults(defineProps<Props>(), {
  level: 'street',
  multiple: false
})

const emit = defineEmits<{
  (e: 'change', args: {
    /**
     * 地址编码
     * @eg 420902
     */
    adcode: string | string[]
    /**
     * 地址中文名称数组
     */
    address: string[] | string[][]
  }): void
  (e: 'update:modelValue', args: string | string[]): void
}>()

const district = ref<{
  search: (
    query: string,
    callback: (status: string, result: any) => void
  ) => void
}>()

async function initMap() {
  console.log('------------map area select init------------')

  await initAMapSDK(props.sk, props.secret, props.sdkUrl)

  const AMap = window.AMap

  AMap.plugin(
    [
      'AMap.DistrictSearch',
    ],
    () => {
      console.log('search plugin init');

      district.value = new AMap.DistrictSearch({
        // hack 为了正确回显，全量搜索
        subdistrict: 3,
        //最后一级返回街道信息
        showbiz: false,
      });
    })
}

function isLeaf(l: Props['level']) {
  let level = props.level
  if (props.multiple && props.level === 'street') {
    level = 'district'
  }

  return l === level
}

function parseArea(status: string, result: any, resolve: Function) {
  if (status == 'complete' && result.info == 'OK') {

    function _parseDistrict(list?: AMapResultItem[]) {
      if (!list) {
        return undefined
      }

      return list.map((item: AMapResultItem) => {
        return {
          value: item.adcode,
          label: item.name,
          leaf: isLeaf(item.level),
          children: _parseDistrict(item.districtList)
        }
      })
    }


    const arr = result.districtList[0].districtList.map((item: AMapResultItem) => {
      return {
        value: item.adcode,
        label: item.name,
        leaf: isLeaf(item.level),
        children: _parseDistrict(item.districtList)
      }
    })

    resolve(arr)
  } else {
    console.warn('----------------------------高德地图行政区搜索失败----------------------------');
    console.log('status: ', status);
    console.log('result: ', result);
    console.warn('----------------------------高德地图行政区搜索失败----------------------------');

    resolve([])
  }
}

const cas = ref()

function model2data(m?: string | string[]) {
  let n = LevelMap[props.level]

  if (props.multiple && props.level === 'street') {
    n = LevelMap['district']
  }

  if (!m) {
    return undefined
  }

  if (isString(m)) {
    return m
  }

  if (isArray(m) && isString(m?.[0])) {
    return m.map(item => Array.from({ length: n }).map((_, i) => item.slice(0, i * 2 + 2).padEnd(6, '0')))
  }

  console.warn('error args: ', m)
}

function data2model(d?: string[] | string[][]) {
  if (!d) {
    return ''
  }

  if (isString(d?.[0])) {
    return d[d.length - 1]
  }

  if (isArray(d?.[0]) && isString(d?.[0]?.[0])) {
    return d.map((item) => item[item.length - 1] as string)
  }
}

const data = ref()

watch(() => props.modelValue, (v) => {
  data.value = model2data(v)
}, { immediate: true, deep: true })


function changeData(args) {
  const m = data2model(args)
  emit('update:modelValue', m)
}

const propsObj: CascaderProps = {
  multiple: props.multiple,
  lazy: true,
  async lazyLoad(node, resolve) {
    const { level, childrenData } = node

    if (level === 0) {
      await initMap()
      district.value?.search('中国', (status, result) => parseArea(status, result, resolve))
    } else if (props.multiple || level < 3) {
      resolve(childrenData)
    } else {
      district.value?.search(node.value.toString(), (status, result) => parseArea(status, result, resolve))
    }
  },
}

async function getAllData() {
  await initMap()
  const arr: SelectOptionItem[] = await new Promise(resolve => {
    district.value?.search('中国', (status, result) => parseArea(status, result, resolve))
  })

  for (const a of arr) {
    if (a.children) {
      for (const b of a.children) {
        if (b.children) {
          for (const c of b.children) {
            c.children = await new Promise(resolve => {
              district.value?.search(c.value.toString(), (status, result) => parseArea(status, result, resolve))
            })
          }
        }
      }
    }
  }

  return arr
}

const options = ref<SelectOptionItem[]>([])

function update(args: string[][] | string[] | null) {
  if (args) {
    if (isString(args[0])) {
      emit('change', {
        adcode: args?.pop?.() ?? '',
        address: cas.value.getCheckedNodes()?.[0]?.pathLabels ?? []
      })
    } else {
      emit('change', {
        adcode: args?.map(item => item[item.length - 1]) ?? [],
        address: cas.value.getCheckedNodes()?.map(item => item.pathLabels) ?? []
      })
    }

  } else {
    emit('change', {
      adcode: props.multiple ? [] : '',
      address: []
    })
  }
}


defineExpose({
  initMap,
  getAllData
})
</script>

<template>
  <ElCascader :model-value="data" :options="options" @update:model-value="changeData" ref="cas" :props="propsObj"
    collapse-tags collapse-tags-tooltip :max-collapse-tags="3" class="w-260px" placeholder="请选择地址" @change="update" />
</template>
