/*
 * @Author: zhangyang
 * @Date: 2023-03-10 16:55:47
 * @LastEditTime: 2023-03-25 17:39:27
 * @Description:
 */
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';
import { shallowMount } from '@vue/test-utils';
import { useAutoLoad } from '..';

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

describe('基础逻辑', () => {
  it('应该正确渲染', () => {
    const TestComponent = defineComponent({
      setup() {
        const list = ref([]);
        const allData = ref([]);
        const { elArr } = useAutoLoad(list, allData);

        return () => (
          <div>
            <ul>
              {list.value.map((item, index) => <li key={index} ref={elArr}>{item}</li>)}
            </ul>
          </div>
        );
      }
    });

    const wrapper = shallowMount(TestComponent as unknown as JSX.Element);

    expect(wrapper.findAll('li')).toHaveLength(0);
  });

  it('当 pause 为 true 时应该暂停自动加载', async () => {
    const TestComponent = defineComponent({
      setup() {
        const list = ref([]);
        const allData = ref([1, 2, 3]);
        const pause = ref(true);
        const { elArr } = useAutoLoad(list, allData, 2, pause);
        return () => (
          <div>
            <ul>
              {list.value.map((item, index) => <li key={index} ref={elArr}>{item}</li>)}
            </ul>
          </div>
        );
      }
    });

    const wrapper = shallowMount(TestComponent as unknown as JSX.Element);
    await nextTick();
    expect(wrapper.findAll('li')).toHaveLength(0);
  });
});
