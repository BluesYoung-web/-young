import { DefaultMsg, Cbks, DefaultHttpConfig, Handlers, Prototype } from './index.js';
import 'axios';

declare const useHttp: <Msg extends Record<string, any> = DefaultMsg, Fns extends Cbks = Cbks>(config?: Partial<DefaultHttpConfig<Msg>>) => Handlers<Fns> & Prototype;

export { useHttp };
