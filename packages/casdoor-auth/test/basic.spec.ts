import { YoungAuth } from './../src/index';
import { describe, expect, it } from 'vitest';

describe('鉴权 SDK 的基础使用', () => {
  it('登录', async () => {
    const auth = new YoungAuth();
  
    await auth.init();
    expect(window.location.href).toContain('/login/oauth/authorize');
  });

  it('注册', async () => {
    const auth = new YoungAuth();
  
    await auth.init('register');
    expect(window.location.href).toContain('/signup');
  });
});