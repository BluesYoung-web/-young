/*
 * @Author: zhangyang
 * @Date: 2022-05-29 07:59:21
 * @LastEditTime: 2022-05-29 08:27:43
 * @Description: 
 */
import { createBtn, Icons } from './../core/create';
import type Engine from '@aomao/engine';


export default (engine: Engine) => {
  const card = createBtn({
    icon: Icons.card,
    title: '更多',
    cmd: ''
  }, engine);

  return card;
}