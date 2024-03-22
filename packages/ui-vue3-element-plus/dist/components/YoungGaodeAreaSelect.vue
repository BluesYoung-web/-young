<!--
 * @Author: zhangyang
 * @Date: 2024-03-21 16:28:09
 * @LastEditTime: 2024-03-22 14:42:22
 * @Description: 地址选择组件
-->
<script lang="ts" setup>
import { ElCascader } from 'element-plus'
import type { CascaderProps } from 'element-plus'
import { onMounted, ref } from 'vue'
import { initAMapSDK } from '..'

interface Props {
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
}

interface AMapResultItem {
  adcode: string
  name: string
  level: 'province' | 'city' | 'district' | 'street'
}

const props = withDefaults(defineProps<Props>(), {
  level: 'street'
})

const emit = defineEmits<{
  (e: 'change', args: {
    /**
     * 地址编码
     * @eg 420902
     */
    adcode: string
    /**
     * 地址中文名称数组
     */
    address: string[]
  }): void
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
        //返回下一级行政区
        subdistrict: 1,
        //最后一级返回街道信息
        showbiz: false,
      });
    })
}

function parseArea(status: string, result: any, resolve: Function) {
  if (status == 'complete' && result.info == 'OK') {
    const arr = result.districtList[0].districtList.map((item: AMapResultItem) => {
      return {
        value: item.adcode,
        label: item.name,
        leaf: item.level === props.level
      }
    })

    resolve(arr)
  } else {
    resolve([])
  }
}

const cas = ref()


const propsObj: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const { level } = node

    if (level === 0) {
      await initMap()
      district.value?.search('中国', (status, result) => parseArea(status, result, resolve))
    } else {
      district.value?.search(node.value.toString(), (status, result) => parseArea(status, result, resolve))
    }
  },
}

function update(args: string[] | null) {
  if (args) {
    emit('change', {
      adcode: args?.pop?.() ?? '',
      address: cas.value.getCheckedNodes()?.[0]?.pathLabels ?? []
    })
  } else {
    emit('change', {
      adcode: '',
      address: []
    })
  }
}

defineExpose({
  initMap,
})
</script>

<template>
  <ElCascader ref="cas" :props="propsObj" class="w-260px" placeholder="请选择地址" @change="update" />
</template>
