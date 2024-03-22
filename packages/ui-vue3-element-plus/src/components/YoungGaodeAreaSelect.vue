<!--
 * @Author: zhangyang
 * @Date: 2024-03-21 16:28:09
 * @LastEditTime: 2024-03-22 08:33:28
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
   * 1 = 省 2 = 市 3 = 区 4 = 街道
   */
  precision?: number

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
  precision: 4
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

declare global {
  interface Window {
    _AMapSecurityConfig: any
    AMap: any
  }
}

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

const LeafObj: Record<AMapResultItem['level'], number> = {
  province: 1,
  city: 2,
  district: 3,
  street: 4,
}

function parseArea(status: string, result: any, resolve: Function) {
  if (status == 'complete' && result.info == 'OK') {
    const arr = result.districtList[0].districtList.map(item => {
      return {
        value: item.adcode,
        label: item.name,
        leaf: LeafObj[item.level] >= props.precision
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

function update(args: string[]) {
  const pathLabels = cas.value.getCheckedNodes()[0].pathLabels as string[]

  emit('change', {
    adcode: args?.pop?.() ?? '',
    address: pathLabels
  })
}

defineExpose({
  initMap,
})
</script>

<template>
  <ElCascader ref="cas" :props="propsObj" class="w-260px" clearable placeholder="请选择地址" @change="update" />
</template>
