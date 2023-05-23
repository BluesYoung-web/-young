/*
 * @Author: zhangyang
 * @Date: 2022-12-26 09:03:46
 * @LastEditTime: 2023-05-22 16:41:49
 * @Description: 
 */
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    titleStyle: {
      type: Object,
      default: () => ({
        fontSize: '24px',
        width: '220px'
      })
    },
    activeStyle: {
      type: [Object, String],
      default: () => ({
        color: '#409eff',
        cursor: 'pointer',
        borderBottom: '2px solid #409eff',
        marginBottom: '20px'
      })
    },
    inactiveStyle: {
      type: [Object, String],
      default: () => ({
        cursor: 'pointer',
        marginBottom: '20px'
      })
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