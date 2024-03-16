import Block from './Block';
import store, { StoreEvents } from '../store/Store';

type Indexed<T = unknown> = {
    [key in string]: T;
};

export default function connect(Component: new (props: Record<string, unknown>) => Block, mapStateToProps: (state: Indexed) => Indexed) {
  // используем class expression
  return class extends Component {
    constructor(props: Record<string, unknown>) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // вызываем обновление компонента, передав данные из хранилища

        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
