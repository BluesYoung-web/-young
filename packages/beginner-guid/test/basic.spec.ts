/*
 * @Author: zhangyang
 * @Date: 2022-05-20 11:50:46
 * @LastEditTime: 2022-05-20 16:17:31
 * @Description: 
 */
import { describe, it, expect } from 'vitest';
import { YoungBeginnerGuidController } from '../src';

describe('基础逻辑', () => {
  const guid = new YoungBeginnerGuidController([
    {
      el: '#step1',
      des: 'test1'
    },
    {
      el: '#step2',
      des: 'test2'
    },
    {
      el: '#step3',
      des: 'test3'
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
    const g2 = new YoungBeginnerGuidController([
      {
        el: '#step1',
        des: 'test1'
      },
      {
        el: '#step2',
        des: 'test2'
      }
    ], {
      immdiate: true,
      force: true
    });
    expect(g2.force).toBe(true);
    expect(g2.immdiate).toBe(true);
  });
});