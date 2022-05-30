/*
 * @Author: zhangyang
 * @Date: 2022-05-29 14:44:54
 * @LastEditTime: 2022-05-29 14:47:33
 * @Description: 
 */
export type {
  ChangeInterface,
  NodeInterface,
  RangeInterface,
} from '@aomao/engine';
import { EngineInterface } from '@aomao/engine';
import { Ref } from 'vue';


export type { Ref, EngineInterface };

export type { GroupItemProps } from '@aomao/toolbar-vue';

export interface StyleOption {
  height: number | string;
  width: number | string;
  margin: string;
  padding: string;
  background: string;
  border: string;
  minHeight: string | number;
};

export type NODES = string | undefined | (string | {})[];

export interface Message {
  type: 'success' | 'warning' | 'error';
  msg: string;
};

export interface ChangePayload {
  html: string;
  json: NODES;
};

export interface EditorInstance {
  engine: EngineInterface;
  container: Ref<HTMLElement | null>;
};
