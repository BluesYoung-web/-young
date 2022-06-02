/*
 * @Author: zhangyang
 * @Date: 2022-05-29 14:48:12
 * @LastEditTime: 2022-06-02 15:59:13
 * @Description: 
 */
import type { GroupItemProps } from '@aomao/toolbar-vue';

export const defaultContent = '<h1>Hello Wolrd from YoungEditor !</h1>';

export const getDefaultStyle = () => ({
  height: '480px',
  width: '800px',
  margin: '50px',
  padding: '0',
  background: 'rgb(249, 249, 249)',
  border: '1px solid #ccc',
  overflowY: 'auto',
  boxShadow: 'rgba(158, 161, 165, 0.4) 0px 2px 12px 0px',
  minHeight: '480px',
  fontFamily: 'SimSun, 宋体, "Songti SC", NSimSun, STSong, serif'
});

export const defaultPCToolbarItems: GroupItemProps[] = [
  ['collapse'],
  ['undo', 'redo', 'paintformat', 'removeformat'],
  ['heading', 'fontfamily', 'fontsize'],
  ['bold', 'italic', 'strikethrough', 'underline', 'moremark'],
  ['fontcolor', 'backcolor'],
  ['alignment'],
  ['unorderedlist', 'orderedlist', 'tasklist', 'indent', 'line-height'],
  ['link', 'quote', 'hr'],
];

export const defaultMobileToolbarItems: GroupItemProps[] = [
  ['undo', 'redo'],
  {
    icon: 'text',
    items: ['bold', 'italic', 'strikethrough', 'underline', 'moremark'],
  },
  [
    {
      type: 'button',
      name: 'image-uploader',
      icon: 'image',
    },
    'link',
    'tasklist',
    'heading',
  ],
  {
    icon: 'more',
    items: [
      {
        type: 'button',
        name: 'video-uploader',
        icon: 'video',
      },
      {
        type: 'button',
        name: 'file-uploader',
        icon: 'attachment',
      },
      {
        type: 'button',
        name: 'table',
        icon: 'table',
      },
      {
        type: 'button',
        name: 'math',
        icon: 'math',
      },
      {
        type: 'button',
        name: 'codeblock',
        icon: 'codeblock',
      },
      {
        type: 'button',
        name: 'orderedlist',
        icon: 'orderedlist',
      },
      {
        type: 'button',
        name: 'unorderedlist',
        icon: 'unorderedlist',
      },
      {
        type: 'button',
        name: 'hr',
        icon: 'hr',
      },
    ],
  },
];

export const getDefaultToolbarItems = (isMobile: boolean): GroupItemProps[] => {
  return isMobile ? [...defaultMobileToolbarItems] : [...defaultPCToolbarItems];
};