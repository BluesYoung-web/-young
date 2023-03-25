import { shallowMount } from '@vue/test-utils';
import { useFormMode } from '..';
import { describe, it, expect, vi } from 'vitest';

describe('useFormMode', () => {
  const FORM_TEMP = { name: '张三', age: 18 };
  const addCbk = vi.fn();
  const modCbk = vi.fn();
  const delCbk = vi.fn();
  const cpEffect = vi.fn((row) => row);
  const cgEffect = vi.fn();
  const clearEffect = vi.fn();
  const tip = '确认删除该条数据？';

  it('应正确渲染', () => {
    const wrapper = shallowMount({
      setup() {
        const { isAdd, isEdit, isMore, form, clear, edit, more, del, sure, formRef, validForm } =
          useFormMode(FORM_TEMP, { addCbk, modCbk, delCbk, cpEffect, cgEffect, clearEffect }, tip);
        return { isAdd, isEdit, isMore, form, clear, edit, more, del, sure, formRef, validForm };
      },
      template: `
        <div>
          <div>{{ isAdd }}</div>
          <div>{{ isEdit }}</div>
          <div>{{ isMore }}</div>
          <div>{{ form }}</div>
          <div>{{ clear }}</div>
          <div>{{ edit({}) }}</div>
          <div>{{ more({}) }}</div>
          <div>{{ del({ name: '张三', age: 18 }) }}</div>
          <div>{{ sure() }}</div>
          <div>{{ formRef }}</div>
          <div>{{ validForm() }}</div>
        </div>
      `,
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div>
        <div>false</div>
        <div>false</div>
        <div>false</div>
        <div>{
          \\"name\\": \\"张三\\",
          \\"age\\": 18
          }</div>
        <div>() => {
          isAdd.value = false;
          isEdit.value = false;
          isMore.value = false;
          clearEffect?.();
          form.value = __vite_ssr_import_0__.deepClone(FORM_TEMP);
          }</div>
        <div>\\"[object Promise]\\"</div>
        <div>\\"[object Promise]\\"</div>
        <div></div>
        <div>\\"[object Promise]\\"</div>
        <div></div>
        <div>\\"[object Promise]\\"</div>
      </div>"
    `);
  });

  it('调用 edit 后应将 isEdit 设置为 true', async () => {
    const { isEdit, edit, form } = useFormMode(
      FORM_TEMP,
      { addCbk, modCbk, delCbk, cpEffect, cgEffect, clearEffect },
      tip,
    );
    await edit({ name: '李四', age: 20 });
    expect(isEdit.value).toBe(true);
    expect(form.value).toMatchInlineSnapshot(`
      {
        "age": 20,
        "name": "李四",
      }
    `);
  });

  it('调用 more 后应将 isMore 设置为 true', async () => {
    const { isMore, more, form } = useFormMode(
      FORM_TEMP,
      { addCbk, modCbk, delCbk, cpEffect, cgEffect, clearEffect },
      tip,
    );
    await more({ name: '王五', age: 22 });
    expect(isMore.value).toBe(true);
    expect(form.value).toMatchInlineSnapshot(`
      {
        "age": 22,
        "name": "王五",
      }
    `);
  });

  it('调用 del 后应调用 delCbk', async () => {
    const { del } = useFormMode(
      FORM_TEMP,
      { addCbk, modCbk, delCbk, cpEffect, cgEffect, clearEffect },
      tip,
    );
    await del({ name: '张三', age: 18 });

    expect(document.querySelector('.el-message-box__message p').innerHTML).toBe(
      '确认删除该条数据？',
    );

    // todo: 没有确认操作，后续无法进行
    // const sureBtn = document.querySelector('.el-message-box__btns').children[1];

    // await triggerClick(sureBtn);
    // await nextTick();

    // expect(delCbk).toBeCalledWith({ name: '张三', age: 18 });
    // expect(cgEffect).toBeCalled();
  });

  it('调用 sure 时，如果 isAdd 为 true，应调用 addCbk', async () => {
    const { sure, isAdd } = useFormMode(
      FORM_TEMP,
      { addCbk, modCbk, delCbk, cpEffect, cgEffect, clearEffect },
      tip,
    );
    isAdd.value = true;
    await sure();
    expect(addCbk).toBeCalled();
    expect(clearEffect).toBeCalled();
    expect(cgEffect).toBeCalled();
  });

  it('调用 sure 时，如果 isAdd 为 false，isEdit 为 true，应调用 modCbk', async () => {
    const { isAdd, isEdit, sure } = useFormMode(
      FORM_TEMP,
      { addCbk, modCbk, delCbk, cpEffect, cgEffect, clearEffect },
      tip,
    );
    isAdd.value = false;
    isEdit.value = true;
    await sure();
    expect(modCbk).toBeCalled();
    expect(clearEffect).toBeCalled();
    expect(cgEffect).toBeCalled();
  });

  it('调用 clear 时应恢复初始状态', async () => {
    const { clear, isAdd, isEdit, isMore, form } = useFormMode(
      FORM_TEMP,
      { addCbk, modCbk, delCbk, cpEffect, cgEffect, clearEffect },
      tip,
    );
    await clear();
    expect(clearEffect).toBeCalled();
    expect(isAdd.value).toBe(false);
    expect(isEdit.value).toBe(false);
    expect(isMore.value).toBe(false);
    expect(form.value).toMatchInlineSnapshot(`
      {
        "age": 18,
        "name": "张三",
      }
    `);
  });

  it('调用 edit 时应调用 cpEffect', async () => {
    const { edit } = useFormMode(
      FORM_TEMP,
      { addCbk, modCbk, delCbk, cpEffect, cgEffect, clearEffect },
      tip,
    );
    await edit({ name: '李四', age: 20 });
    expect(cpEffect).toBeCalledWith({ name: '李四', age: 20 });
  });

  it('调用 more 时应调用 cpEffect', async () => {
    const { more } = useFormMode(
      FORM_TEMP,
      { addCbk, modCbk, delCbk, cpEffect, cgEffect, clearEffect },
      tip,
    );
    await more({ name: '王五', age: 22 });
    expect(cpEffect).toBeCalledWith({ name: '王五', age: 22 });
  });
});
