/*
 * @Author: zhangyang
 * @Date: 2022-06-08 16:37:10
 * @LastEditTime: 2022-06-08 16:37:23
 * @Description: 
 */
import { describe, it, expect } from 'vitest';
import { YoungBeginnerGuidControllerNext } from '../src/next';

describe('基础逻辑', () => {
  const guid = new YoungBeginnerGuidControllerNext([
    {
      el: '#step1',
      content: 'test1',
      title: 't1'
    },
    {
      el: '#step2',
      content: 'test2',
      title: 't2'
    },
    {
      el: '#step3',
      content: 'test3',
      title: 't3'
    }
  ]);

  it('basic', () => {
    expect(guid).toBeDefined();
    expect(guid.index).toBe(0);
    expect(guid.force).toBe(false);
    
    guid.show();

    guid.show(2);
    expect(guid.index).toBe(2);

    guid.next();
    expect(guid.index).toBe(2);

    guid.prev();
    expect(guid.index).toBe(1);
    guid.prev();
    expect(guid.index).toBe(0);
    guid.prev();
    expect(guid.index).toBe(0);
  });

  it('options', () => {
    const g2 = new YoungBeginnerGuidControllerNext([
      {
        el: '#step1',
        content: 'test1',
        title: 't1'
      },
      {
        el: '#step2',
        content: 'test2',
        title: 't2'
      }
    ], {
      immdiate: true,
      force: true
    });
    expect(g2.force).toBe(true);
    expect(g2.immdiate).toBe(true);
  });

  it('expect error', () => {
    expect(() => new YoungBeginnerGuidControllerNext([])).toThrowErrorMatchingInlineSnapshot('"guids array can\'t be null"');
  });
});