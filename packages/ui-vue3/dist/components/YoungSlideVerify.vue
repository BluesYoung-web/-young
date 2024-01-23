<!--
 * @Author: zhangyang
 * @Date: 2023-11-23 16:18:33
 * @LastEditTime: 2023-11-23 19:10:45
 * @Description:
-->
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'

interface Props {
  /**
   * 主 canvas 的宽
   * @default 310
   */
  canvasWidth?: number
  /**
   * 主 canvas 的高
   * @default 160
   */
  canvasHeight?: number
  /**
   * 是否出现，由父级控制
   * @default false
   */
  show?: boolean
  /**
   * 拼图块的大小缩放比例
   * @default 1
   */
  puzzleScale?: number
  /**
   * 滑块的大小
   * @default 50
   */
  sliderSize?: number
  /**
   * 允许的偏差值
   * @default 10
   */
  range?: number
  /**
   * 图片数组
   * 不传递则使用随机图片
   */
  imgs?: string[]
  /**
   * 验证成功的提示
   * @default '验证通过！'
   */
  successText?: string
  /**
   * 验证失败的提示
   * @default '验证失败，请重试'
   */
  failText?: string
  /**
   * 操作提示
   * @default '拖动滑块完成拼图'
   */
  sliderText?: string
  /**
   * 层级
   * @default 100001
   */
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  canvasWidth: 310,
  canvasHeight: 160,
  show: false,
  puzzleScale: 1,
  sliderSize: 50,
  range: 10,
  successText: '验证通过！',
  failText: '验证失败，请重试',
  sliderText: '拖动滑块完成拼图',
  zIndex: 100001,
})

const emits = defineEmits<{
  (e: 'success', n: number): void
  (e: 'fail', n: number): void
  (e: 'close'): void
}>()

interface State {
  /**
   * 鼠标是否在按钮上按下
   */
  mouseDown: boolean
  /**
   * 鼠标点下去时父级的 width
   */
  startWidth: number
  /**
   * 鼠标按下时的 X
   */
  startX: number
  /**
   * 鼠标当前的偏移 X
   */
  newX: number
  /**
   * 拼图的起始 X
   */
  pinX: number
  /**
   * 拼图的起始 Y
   */
  pinY: number
  /**
   * 是否正在加在中，主要是等图片 onload
   */
  loading: boolean
  /**
   * 是否可以拉动滑动条
   */
  isCanSlide: boolean
  /**
   * 图片加在失败会出现这个，提示用户手动刷新
   */
  error: boolean
  /**
   * 提示信息是否出现
   */
  infoBoxShow: boolean
  /**
   * 提示等信息
   */
  infoText: string
  /**
   * 是否验证失败
   */
  infoBoxFail: boolean
  /**
   * setTimout1
   */
  timer1: NodeJS.Timeout | undefined
  /**
   * 为了解决 Mac 上的 click BUG
   */
  closeDown: boolean
  /**
   * 验证成功
   */
  isSuccess: boolean
  /**
   * 用于自定义图片时不会随机到重复的图片
   */
  imgIndex: number
  /**
   * 是否正在判定，主要用于判定中不能点击重置按钮
   */
  isSubmting: boolean
}

const rangeSlider = ref<HTMLDivElement>()
const canvas1 = ref<HTMLCanvasElement>()
const canvas2 = ref<HTMLCanvasElement>()
const canvas3 = ref<HTMLCanvasElement>()

const state = reactive<State>({
  mouseDown: false,
  startWidth: 50,
  startX: 0,
  newX: 0,
  pinX: 0,
  pinY: 0,
  loading: false,
  isCanSlide: false,
  error: false,
  infoBoxShow: false,
  infoText: '',
  infoBoxFail: false,
  timer1: undefined,
  closeDown: false,
  isSuccess: false,
  imgIndex: -1,
  isSubmting: false,
})

// 每次出现都应该重新初始化
watch(
  () => props.show,
  (newV) => {
    if (newV) {
      document.body.classList.add('vue-puzzle-overflow')
      reset()
    }
    else {
      // 关闭的时候回到初始状态
      state.isSubmting = false
      state.isSuccess = false
      state.infoBoxShow = false
      document.body.classList.remove('vue-puzzle-overflow')
    }
  },
)

// styleWidth是底部用户操作的滑块的父级，就是轨道在鼠标的作用下应该具有的宽度
const styleWidth = computed(() => {
  const w = state.startWidth + state.newX - state.startX
  return w < sliderBaseSize.value
    ? sliderBaseSize.value
    : w > props.canvasWidth
      ? props.canvasWidth
      : w
})

// 图中拼图块的60 * 用户设定的缩放比例计算之后的值 0.2~2
const puzzleBaseSize = computed(() => {
  return Math.round(Math.max(Math.min(props.puzzleScale, 2), 0.2) * 52.5 + 6)
})

// 处理一下sliderSize，弄成整数，以免计算有偏差
const sliderBaseSize = computed(() => {
  return Math.max(
    Math.min(Math.round(props.sliderSize), Math.round(props.canvasWidth * 0.5)),
    10,
  )
})

// 私有-关闭
function onC() {
  if (!state.mouseDown) {
    state.timer1 && clearTimeout(state.timer1)
    emits('close')
  }
}

function onCloseMouseDown() {
  state.closeDown = true
}

function onCloseMouseUp() {
  if (state.closeDown)
    onC()

  state.closeDown = false
}

// 鼠标按下准备拖动
function onRangeMouseDown(e: Event) {
  if (state.isCanSlide) {
    state.mouseDown = true
    state.startWidth = rangeSlider.value?.clientWidth ?? 0
    state.newX
      = (e as MouseEvent).clientX || (e as TouchEvent).changedTouches[0].clientX
    state.startX
      = (e as MouseEvent).clientX || (e as TouchEvent).changedTouches[0].clientX
  }
}
// 鼠标移动
function onRangeMouseMove(e: Event) {
  if (state.mouseDown) {
    e.preventDefault()
    state.newX
      = (e as MouseEvent).clientX || (e as TouchEvent).changedTouches[0].clientX
  }
}

// 鼠标抬起
function onRangeMouseUp() {
  if (state.mouseDown) {
    state.mouseDown = false
    submit()
  }
}

/**
 * 私有-开始进行
 * @param withCanvas 是否强制使用canvas随机作图,只有图片加载错误后此值才会为真
 */
function init(withCanvas = false) {
  // 防止重复加载导致的渲染错误
  if (state.loading && !withCanvas)
    return

  state.loading = true
  state.isCanSlide = false
  const c = canvas1.value
  const c2 = canvas2.value
  const c3 = canvas3.value
  const ctx = c?.getContext('2d')
  const ctx2 = c2?.getContext('2d')
  const ctx3 = c3?.getContext('2d')

  if (!ctx || !ctx2 || !ctx3) {
    console.error('not found ctx / ctx2 / ctx3')
    return
  }

  const isFirefox
    = navigator.userAgent.includes('Firefox')
    && navigator.userAgent.includes('Windows') // 是windows版火狐

  const img = document.createElement('img')
  ctx.fillStyle = 'rgba(255,255,255,1)'
  ctx3.fillStyle = 'rgba(255,255,255,1)'
  ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
  ctx2.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
  // 取一个随机坐标，作为拼图块的位置
  state.pinX = getRandom(
    puzzleBaseSize.value + 20,
    props.canvasWidth - puzzleBaseSize.value - 10,
  ) // 留10的边距
  state.pinY = getRandom(20, props.canvasHeight - puzzleBaseSize.value - 10) // 主图高度 - 拼图块自身高度 - 10边距
  img.crossOrigin = 'anonymous' // 匿名，想要获取跨域的图片
  img.onload = () => {
    const [x, y, w, h] = makeImgSize(img)
    ctx.save()
    // 先画小图路径
    paintBrick(ctx)
    ctx.closePath()

    // 非火狐，在此画外阴影
    // 其他浏览器：先画阴影，阴影会按照路径的外围生成，再clip，会按照阴影的区域clip。如果先裁剪再画阴影，阴影显示不出来,因为阴影在clip区域外面去了
    // win版火狐，需要先clip，然后再画阴影，阴影可以超出clip的范围。不裁剪直接先画阴影的话，路径不生效，阴影会根据整个图片生成
    if (!isFirefox) {
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.shadowColor = '#000'
      ctx.shadowBlur = 3
      ctx.fill()
      ctx.clip() // 按照外阴影区域切割
    }
    else {
      ctx.clip()
      ctx.save()
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.shadowColor = '#000'
      ctx.shadowBlur = 3
      ctx.fill()
      ctx.restore()
    }

    ctx.drawImage(img, x, y, w, h)
    ctx3.fillRect(0, 0, props.canvasWidth, props.canvasHeight)
    ctx3.drawImage(img, x, y, w, h)

    // 设置小图的内阴影
    ctx.globalCompositeOperation = 'source-atop'

    paintBrick(ctx)

    ctx.arc(
      state.pinX + Math.ceil(puzzleBaseSize.value / 2),
      state.pinY + Math.ceil(puzzleBaseSize.value / 2),
      puzzleBaseSize.value * 1.2,
      0,
      Math.PI * 2,
      true,
    )
    ctx.closePath()
    ctx.shadowColor = 'rgba(255, 255, 255, .8)'
    ctx.shadowOffsetX = -1
    ctx.shadowOffsetY = -1
    ctx.shadowBlur = Math.min(Math.ceil(8 * props.puzzleScale), 12)
    ctx.fillStyle = '#ffffaa'
    ctx.fill()

    // 将小图赋值给ctx2
    // ctx2.drawImage(
    //   c,
    //   state.pinX - 3,
    //   state.pinY - 20,
    //   state.pinX + puzzleBaseSize.value + 5,
    //   state.pinY + puzzleBaseSize.value + 5,
    //   0,
    //   state.pinY - 20,
    //   state.pinX + puzzleBaseSize.value + 5,
    //   state.pinY + puzzleBaseSize.value + 5
    // );
    // 之所以要用getImageData，是因为safari中可能有问题，drawImage是异步的
    const imgData = ctx.getImageData(
      state.pinX - 3, // 为了阴影 是从-3px开始截取，判定的时候要+3px
      state.pinY - 20,
      state.pinX + puzzleBaseSize.value + 5,
      state.pinY + puzzleBaseSize.value + 5,
    )

    ctx2.putImageData(imgData, 0, state.pinY - 20)

    // 清理
    ctx.restore()
    ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight)

    // 画缺口
    ctx.save()
    paintBrick(ctx)
    ctx.globalAlpha = 0.8
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.restore()
    // 画缺口的内阴影
    ctx.save()
    ctx.globalCompositeOperation = 'source-atop'
    paintBrick(ctx)
    ctx.arc(
      state.pinX + Math.ceil(puzzleBaseSize.value / 2),
      state.pinY + Math.ceil(puzzleBaseSize.value / 2),
      puzzleBaseSize.value * 1.2,
      0,
      Math.PI * 2,
      true,
    )
    ctx.shadowColor = '#000'
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    ctx.shadowBlur = 16
    ctx.fill()
    ctx.restore()

    // 画整体背景图
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.drawImage(img, x, y, w, h)
    ctx.restore()
    state.loading = false
    state.isCanSlide = true
  }
  img.onerror = () => {
    init(true) // 如果图片加载错误就重新来，并强制用canvas随机作图
  }

  if (!withCanvas && props.imgs?.length) {
    let randomNum = getRandom(0, props.imgs.length - 1)
    if (randomNum === state.imgIndex) {
      if (randomNum === props.imgs.length - 1)
        randomNum = 0
      else
        randomNum++
    }
    state.imgIndex = randomNum
    img.src = props.imgs[randomNum] as string
  }
  else {
    img.src = makeImgWithCanvas()
  }
}

// 工具 - 范围随机数
function getRandom(min: number, max: number): number {
  return Math.ceil(Math.random() * (max - min) + min)
}

// 工具 - 设置图片尺寸cover方式贴合canvas尺寸 w/h
function makeImgSize(img: HTMLImageElement) {
  const imgScale = img.width / img.height
  const canvasScale = props.canvasWidth / props.canvasHeight
  let x = 0
  let y = 0
  let w = 0
  let h = 0
  if (imgScale > canvasScale) {
    h = props.canvasHeight
    w = imgScale * h
    y = 0
    x = (props.canvasWidth - w) / 2
  }
  else {
    w = props.canvasWidth
    h = w / imgScale
    x = 0
    y = (props.canvasHeight - h) / 2
  }
  return [x, y, w, h]
}

// 私有-绘制拼图块的路径
function paintBrick(ctx: CanvasRenderingContext2D) {
  const moveL = Math.ceil(15 * props.puzzleScale) // 直线移动的基础距离
  ctx.beginPath()
  ctx.moveTo(state.pinX, state.pinY)
  ctx.lineTo(state.pinX + moveL, state.pinY)
  ctx.arcTo(
    state.pinX + moveL,
    state.pinY - moveL / 2,
    state.pinX + moveL + moveL / 2,
    state.pinY - moveL / 2,
    moveL / 2,
  )
  ctx.arcTo(
    state.pinX + moveL + moveL,
    state.pinY - moveL / 2,
    state.pinX + moveL + moveL,
    state.pinY,
    moveL / 2,
  )
  ctx.lineTo(state.pinX + moveL + moveL + moveL, state.pinY)
  ctx.lineTo(state.pinX + moveL + moveL + moveL, state.pinY + moveL)
  ctx.arcTo(
    state.pinX + moveL + moveL + moveL + moveL / 2,
    state.pinY + moveL,
    state.pinX + moveL + moveL + moveL + moveL / 2,
    state.pinY + moveL + moveL / 2,
    moveL / 2,
  )
  ctx.arcTo(
    state.pinX + moveL + moveL + moveL + moveL / 2,
    state.pinY + moveL + moveL,
    state.pinX + moveL + moveL + moveL,
    state.pinY + moveL + moveL,
    moveL / 2,
  )
  ctx.lineTo(
    state.pinX + moveL + moveL + moveL,
    state.pinY + moveL + moveL + moveL,
  )
  ctx.lineTo(state.pinX, state.pinY + moveL + moveL + moveL)
  ctx.lineTo(state.pinX, state.pinY + moveL + moveL)

  ctx.arcTo(
    state.pinX + moveL / 2,
    state.pinY + moveL + moveL,
    state.pinX + moveL / 2,
    state.pinY + moveL + moveL / 2,
    moveL / 2,
  )
  ctx.arcTo(
    state.pinX + moveL / 2,
    state.pinY + moveL,
    state.pinX,
    state.pinY + moveL,
    moveL / 2,
  )
  ctx.lineTo(state.pinX, state.pinY)
}

// 私有-用canvas随机生成图片
function makeImgWithCanvas() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    console.error('not found ctx')
    return ''
  }
  canvas.width = props.canvasWidth
  canvas.height = props.canvasHeight
  ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(
    100,
    255,
  )},${getRandom(100, 255)})`
  ctx.fillRect(0, 0, props.canvasWidth, props.canvasHeight)
  // 随机画10个图形
  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(
      100,
      255,
    )},${getRandom(100, 255)})`
    ctx.strokeStyle = `rgb(${getRandom(100, 255)},${getRandom(
      100,
      255,
    )},${getRandom(100, 255)})`

    if (getRandom(0, 2) > 1) {
      // 矩形
      ctx.save()
      ctx.rotate((getRandom(-90, 90) * Math.PI) / 180)
      ctx.fillRect(
        getRandom(-20, canvas.width - 20),
        getRandom(-20, canvas.height - 20),
        getRandom(10, canvas.width / 2 + 10),
        getRandom(10, canvas.height / 2 + 10),
      )
      ctx.restore()
    }
    else {
      // 圆
      ctx.beginPath()
      const ran = getRandom(-Math.PI, Math.PI)
      ctx.arc(
        getRandom(0, canvas.width),
        getRandom(0, canvas.height),
        getRandom(10, canvas.height / 2 + 10),
        ran,
        ran + Math.PI * 1.5,
      )
      ctx.closePath()
      ctx.fill()
    }
  }
  return canvas.toDataURL('image/png')
}

// 私有-开始判定
function submit() {
  state.isSubmting = true
  // 偏差 x = puzzle的起始X - (用户真滑动的距离) + (puzzle的宽度 - 滑块的宽度) * （用户真滑动的距离/canvas总宽度）
  // 最后+ 的是补上slider和滑块宽度不一致造成的缝隙
  const x = Math.abs(
    state.pinX
    - (styleWidth.value - sliderBaseSize.value)
    + (puzzleBaseSize.value - sliderBaseSize.value)
    * ((styleWidth.value - sliderBaseSize.value)
      / (props.canvasWidth - sliderBaseSize.value))
    - 3,
  )
  if (x < props.range) {
    // 成功
    state.infoText = props.successText
    state.infoBoxFail = false
    state.infoBoxShow = true
    state.isCanSlide = false
    state.isSuccess = true
    // 成功后准备关闭
    state.timer1 && clearTimeout(state.timer1)
    state.timer1 = setTimeout(() => {
      // 成功的回调
      state.isSubmting = false
      emits('success', x)
    }, 800)
  }
  else {
    // 失败
    state.infoText = props.failText
    state.infoBoxFail = true
    state.infoBoxShow = true
    state.isCanSlide = false
    emits('fail', x)
    // 800ms后重置
    state.timer1 && clearTimeout(state.timer1)
    state.timer1 = setTimeout(() => {
      state.isSubmting = false
      reset()
    }, 800)
  }
}
// 重置 - 重新设置初始状态
function resetState() {
  state.infoBoxFail = false
  state.infoBoxShow = false
  state.isCanSlide = false
  state.isSuccess = false
  state.startWidth = sliderBaseSize.value // 鼠标点下去时父级的width
  state.startX = 0 // 鼠标按下时的X
  state.newX = 0 // 鼠标当前的偏移X
}

// 重置 - 重新加载
function reset() {
  if (state.isSubmting)
    return

  resetState()
  init()
}

onMounted(() => {
  document.addEventListener('mousemove', onRangeMouseMove, false)
  document.addEventListener('mouseup', onRangeMouseUp, false)

  document.addEventListener('touchmove', onRangeMouseMove, {
    passive: false,
  })
  document.addEventListener('touchend', onRangeMouseUp, false)
  if (props.show) {
    document.body.classList.add('vue-puzzle-overflow')
    reset()
  }
})

onUnmounted(() => {
  state.timer1 && clearTimeout(state.timer1)
  document.removeEventListener('mousemove', onRangeMouseMove, false)
  document.removeEventListener('mouseup', onRangeMouseUp, false)

  document.removeEventListener('touchmove', onRangeMouseMove)
  document.removeEventListener('touchend', onRangeMouseUp, false)
})
</script>

<template>
  <div v-bind="$attrs" :style="{
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex,
    opacity: show ? 1 : 0,
    pointerEvents: show ? 'auto' : 'none',
    transition: 'opacity 200ms',
  }" @mousedown="onCloseMouseDown" @mouseup="onCloseMouseUp" @touchstart="onCloseMouseDown" @touchend="onCloseMouseUp">
    <div :style="{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      background: '#fff',
      userSelect: 'none',
      borderRadius: '3px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    }" @mousedown.stop @touchstart.stop>
      <div :style="{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '3px',
        height: `${canvasHeight}px`,
      }">
        <canvas ref="canvas1" :width="canvasWidth" :height="canvasHeight" :style="{
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
        }" />
        <canvas ref="canvas3" :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: state.isSuccess ? 1 : 0,
          zIndex: 3,
          transition: 'opacity 600ms',
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
        }" :width="canvasWidth" :height="canvasHeight" />
        <canvas ref="canvas2" :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${puzzleBaseSize}px`,
          height: `${canvasHeight}px`,
          zIndex: 2,
          transform: `translateX(${styleWidth
            - sliderBaseSize
            - (puzzleBaseSize - sliderBaseSize)
            * ((styleWidth - sliderBaseSize) / (canvasWidth - sliderBaseSize))
            }px)`,
        }" :width="puzzleBaseSize" :height="canvasHeight" />

        <div :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 20,
          opacity: state.loading ? 1 : 0,
          pointerEvents: state.loading ? 'auto' : 'none',
          transition: 'opacity 100ms',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }">
          <div :style="{
            flex: 'none',
            height: '5px',
            lineHeight: 0,
          }">
            <span class="loading_item" :style="{ animationPlayState: state.loading ? '' : 'paused', marginLeft: 0 }" />
            <span class="loading_item" :style="{
              animationPlayState: state.loading ? '' : 'paused',
              animationDelay: '0.13s',
            }" />
            <span class="loading_item" :style="{
              animationPlayState: state.loading ? '' : 'paused',
              animationDelay: '0.26s',
            }" />
            <span class="loading_item" :style="{
              animationPlayState: state.loading ? '' : 'paused',
              animationDelay: '0.39s',
            }" />
            <span class="loading_item" :style="{
              animationPlayState: state.loading ? '' : 'paused',
              animationDelay: '0.52s',
            }" />
          </div>
        </div>
        <div :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: '24px',
          lineHeight: '24px',
          textAlign: 'center',
          overflow: 'hidden',
          fontSize: '13px',
          backgroundColor: state.infoBoxFail ? '#ce594b' : '#83ce3f',
          opacity: state.infoBoxShow ? 0.95 : 0,
          transform: `translateY(${state.infoBoxShow ? 0 : '24px'})`,
          transition: 'all 200ms',
          color: '#fff',
          zIndex: 10,
        }">
          {{ state.infoText }}
        </div>
        <div :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '30px',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          zIndex: 3,
          transform: `translateX(${state.isSuccess
            ? `${canvasWidth + canvasHeight * 0.578}px`
            : `-${canvasHeight * 0.578}px`
            }) skew(-30deg, 0)`,
          transition: state.isSuccess ? 'transform 600ms' : '',
        }" />
        <img data-not-lazy class="reset_" title="刷新"
          src="data:image/svg+xml;utf8,%3Csvg preserveAspectRatio='xMidYMid meet' viewBox='0 0 21 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='%2343CF96' d='m7.5 21l2.999-3v1.5a7.501 7.501 0 0 0 5.299-12.811l2.114-2.124A10.465 10.465 0 0 1 21 12.002C21 17.8 16.3 22.5 10.502 22.5H10.5V24zM0 12C.007 6.204 4.704 1.507 10.499 1.5h.001V0l3 3l-3 3V4.5h-.002a7.502 7.502 0 0 0-5.299 12.812l-2.112 2.124a10.397 10.397 0 0 1-3.088-7.407v-.03v.002z'/%3E%3C/svg%3E"
          @click="reset">
      </div>
      <div class="auth-control_">
        <div class="range-box" :style="{ height: `${sliderBaseSize}px` }">
          <div class="range-text">
            {{ sliderText }}
          </div>
          <div ref="rangeSlider" class="range-slider" :style="{ width: `${styleWidth}px` }">
            <div :class="[state.mouseDown ? 'range-btn isDown' : 'range-btn']" :style="{ width: `${sliderBaseSize}px` }"
              @mousedown="onRangeMouseDown" @touchstart="onRangeMouseDown">
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes load {
  0% {
    opacity: 1;
    transform: scale(1.3);
  }
  100% {
    opacity: 0.2;
    transform: scale(0.3);
  }
}
.loading_item {
  display: inline-block;
  width: 5px;
  height: 100%;
  margin-left: 2px;
  border-radius: 50%;
  background-color: #888;
  animation: load 1.04s ease infinite;
}

.reset_ {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 35px;
  height: auto;
  z-index: 12;
  cursor: pointer;
  transition: transform 200ms;
  transform: rotate(0deg);
}

.reset_:hover {
  transform: rotate(-90deg);
}

.auth-control_ .range-box {
  position: relative;
  width: 100%;
  background-color: #eef1f8;
  margin-top: 20px;
  border-radius: 3px;
  box-shadow: 0 0 8px rgba(240, 240, 240, 0.6) inset;
}

.auth-control_ .range-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #b7bcd1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  width: 100%;
}

.auth-control_ .range-slider {
  position: absolute;
  height: 100%;
  width: 50px;
  background-color: rgba(106, 160, 255, 0.8);
  border-radius: 3px;
}

.vue-puzzle-overflow {
  overflow: hidden !important;
}

.range-slider .range-btn {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  width: 50px;
  height: 100%;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 4px #ccc;
  cursor: pointer;
}

.range-slider .range-btn > div {
  width: 0;
  height: 40%;
  transition: all 200ms;
  border: solid 1px #6aa0ff;
}

.range-slider .range-btn > div:nth-child(2) {
  margin: 0 4px;
}

.range-slider .range-btn:hover > div:nth-child(1),
.range-slider .range-btn.isDown > div:nth-child(1) {
  border: solid 4px transparent;
  height: 0;
  border-right-color: #6aa0ff;
}

.range-slider .range-btn:hover > div:nth-child(2),
.range-slider .range-btn.isDown > div:nth-child(2) {
  border-width: 3px;
  height: 0;
  border-radius: 3px;
  margin: 0 6px;
  border-right-color: #6aa0ff;
}

.range-slider .range-btn:hover > div:nth-child(3),
.range-slider .range-btn.isDown > div:nth-child(3) {
  border: solid 4px transparent;
  height: 0;
  border-left-color: #6aa0ff;
}
</style>
