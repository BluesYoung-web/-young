/*
 * @Author: zhangyang
 * @Date: 2022-12-26 09:03:46
 * @LastEditTime: 2022-12-26 09:27:58
 * @Description: 
 */
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    titleStyle: {
      type: Object,
      default: () => ({})
    },
    activeStyle: {
      type: [Object, String],
      required: true
    },
    inactiveStyle: {
      type: [Object, String],
      required: true
    },
    titles: {
      type: Array,
      required: true
    }
  },
  setup(props, { slots }) {
    const activeIndex = ref(0);
    return () => (
      <>
        <div style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          ...props.titleStyle
        }}>
          {
            props.titles.map((title, index) =>
              <div
                key={index + 'adjhskse'}
                style={index === activeIndex.value ? props.activeStyle : props.inactiveStyle}
                onClick={() => activeIndex.value = index}
              >{title}</div>
            )
          }
        </div>
        {
          slots[`index_${activeIndex.value}`]?.()
        }
      </>
    )
  }
});