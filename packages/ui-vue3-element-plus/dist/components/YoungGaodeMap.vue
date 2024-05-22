<!--
 * @Author: zhangyang
 * @Date: 2024-03-21 16:13:59
 * @LastEditTime: 2024-05-22 09:57:21
 * @Description: 
-->

<script lang="ts" setup>
import { ElTag, ElSelect, ElOption } from 'element-plus'
import { initAMapSDK, useRemoteSearch } from '..'
import { ref, onMounted } from 'vue'

interface Props {
  width?: string
  height?: string
  addr?: string
  longitude?: string | number
  latitude?: string | number
  city?: string | number
  /**
   * 只能看，不能操作
   */
  disabled?: boolean

  delay?: number

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

const props = withDefaults(defineProps<Props>(), {
  width: '580px',
  height: '360px',
  addr: '',
  longitude: '114.410386',
  latitude: '30.490946',
  city: '',
  delay: 500
})

const emit = defineEmits<{
  (e: 'getAddress', p: AddressLocation): void
}>()

interface AddressLocation {
  lng: string
  lat: string
  address: string
}



async function initMap() {
  console.log('------------map init------------')
  searchStr.value = ''

  await initAMapSDK(props.sk, props.secret, props.sdkUrl)

  const moutEl = document.querySelector('#gaode')
  const AMap = window.AMap
  const map: any = new AMap.Map(moutEl, {
    zoom: 11,
    viewMode: '3D',
    center: (props.longitude && props.latitude) ? [props.longitude, props.latitude] : undefined,
    resizeEnable: true,
  })

  AMap.plugin(
    [
      'AMap.ToolBar',
      'AMap.Scale',
      'AMap.HawkEye',
      'AMap.MapType',
      'AMap.Geolocation',
      'AMap.CitySearch',
      'AMap.Geocoder',
      'AMap.PlaceSearch',
    ],
    () => {
      // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
      map.addControl(new AMap.ToolBar())

      // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
      map.addControl(new AMap.Scale())

      // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
      map.addControl(new AMap.HawkEye({ isOpen: false }))

      // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
      map.addControl(
        new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量
          offset: [60, 20],
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          position: 'RB',
        }),
      )
    },
  )

  setTimeout(() => {
    placeSearch.value = new AMap.PlaceSearch({
      map,
      city: props.city.toString().substring(0, 6),
      pageSize: 5, // 单页显示结果条数
      pageIndex: 1, // 页码
      citylimit: false, // 是否强制限制在设置的城市内搜索
      autoFitView: true,
    })
  }, props.delay)

  map.on('click', (e: any) => {
    if (props.disabled)
      return

    const geocoder = new AMap.Geocoder({
      // 城市，默认：“全国”
      // radius: 1000 //范围，默认：500
    })
    map.clearMap()
    geocoder.getAddress(
      [e.lnglat.getLng(), e.lnglat.getLat()],
      (status: string, result: any) => {
        if (status === 'complete' && result.info === 'OK') {
          const address = result.regeocode.formattedAddress
          const marker = new AMap.Marker({
            position: new AMap.LngLat(e.lnglat.getLng(), e.lnglat.getLat()),
            offset: new AMap.Pixel(0, 0),
            // icon: '', // 添加 Icon 图标 URL
            anchor: 'bottom-center',
            icon: new AMap.Icon({
              image:
                '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
              imageSize: new AMap.Size(24, 24),
            }),
            title: address,
          })
          searchStr.value = ''
          map.add(marker)
          emit('getAddress', {
            lng: e.lnglat.getLng(),
            lat: e.lnglat.getLat(),
            address,
          })
        } else {
          console.warn('--------------------------高德地图获取地址失败--------------------------');
          console.log('status: ', status);
          console.log('result: ', result);
          console.warn('----------------------------------------------------------------------');
        }
      },
    )
  })

  if (props.addr && props.longitude && props.latitude)
    addMarker(AMap, map)
}

function addMarker(AMap: any, map: any) {
  const marker = new AMap.Marker({
    position: new AMap.LngLat(Number.parseFloat(props.longitude.toString()), Number.parseFloat(props.latitude.toString())),
    offset: new AMap.Pixel(0, 0),
    anchor: 'bottom-center',
    icon: new AMap.Icon({
      image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
      imageSize: new AMap.Size(24, 24),
    }),
    title: props.addr,
  })
  searchStr.value = ''
  map.add(marker)
}

const placeSearch = ref()

const {
  loading,
  options,
  search,
  searchStr,
} = useRemoteSearch(async (str: string) => {
  if (str && placeSearch.value) {
    placeSearch.value.setCity(props.city.toString().substring(0, 6))
    await placeSearch.value.search(str, (status: string, result: any) => {
      if (result && typeof result === 'object' && result.poiList) {
        const list = result?.poiList?.pois || []

        const arr = []
        const obj: Record<string, any> = {}
        for (const item of list) {
          arr.push({
            value: item.id,
            label: item.name,
          })
          obj[item.id] = item
        }

        options.value = arr
        mapList.value = obj
      } else {
        console.warn('--------------------------高德地图搜索结果为空--------------------------');
        console.log('status: ', status);
        console.log('result: ', result);
        console.warn('----------------------------------------------------------------------');
      }
    })
  } else {
    options.value = []
  }
})

const mapList = ref<Record<string, any>>({})

function searchChange(e: string) {
  if (e && placeSearch.value) {
    const position = mapList.value[e]
    if (position) {
      const name = position.name
      const address = position.pname + position.cityname + position.adname + position.address
      const lng = position.location.lng
      const lat = position.location.lat

      placeSearch.value.search(name)

      emit('getAddress', {
        lat,
        lng,
        address,
      })
    }
  }
}

onMounted(() => {
  initMap()
})

defineExpose({
  initMap,
})
</script>

<template>
  <div class="mapBox justify-items-start border" :class="[disabled ? 'pointer-events-none' : 'pointer-events-auto']">
    <div class="flex justify-between items-center ">
      <div>
        <ElTag>经度：{{ props.longitude }}</ElTag>
        <ElTag class="ml-2">
          纬度：{{ props.latitude }}
        </ElTag>
      </div>
      <ElSelect v-model="searchStr" :style="{ width }" class="!w-300px" placeholder="定位辅助搜索" filterable clearable remote
        :loading="loading" :remote-method="search" :disabled="disabled" @change="searchChange">
        <template #prefix>
          <div class="i-ph-magnifying-glass-bold" />
        </template>
        <ElOption v-for="(item, index) in options" :key="`${index}fsdr`" v-bind="item" />
      </ElSelect>
    </div>
    <div id="gaode" :style="{ width, height }" />
  </div>
</template>

<style scoped>
.mapBox {
  background-color: #F7F7F7;
}
</style>