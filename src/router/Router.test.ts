/* eslint-env mocha */
import pkg from 'chai';
import sinon from 'sinon';
import Router from './Router';
import Block from '../core/Block';

const { expect } = pkg;

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router('.app');
  });
  it('Object must be Singleton', () => {
    expect(router).equal(new Router('.app'));
  });
  it('Object should create correct', () => {
    expect(router).not.equal(null);
    expect(router._currentRoute).equal(null);
  });
  it('Object should create correct routs array', () => {
    router.use('/404', Component, { title: 'Страница не найдена' })
      .use('/505', Component, { title: 'Ошибка сервера' });
    expect(router.routes).to.be.an('array').that.lengthOf(2);
  });
  it('Correct GO method', () => {
    const pushState = sinon.spy(window.history, 'pushState');
    router.use('/404', Component, { title: 'Страница не найдена' })
      .use('/505', Component, { title: 'Ошибка сервера' });

    router.go('/404');
    if (router._currentRoute) {
      expect(router._currentRoute._pathname).equal('/404');
    }
    expect(pushState).calledOnce; // eslint-disable-line no-unused-expressions
    expect(window.location.pathname).equal('/404');
  });
  it('Correct FORWARD and BACK methods', () => {
    router.use('/404', Component, { title: 'Страница не найдена' })
      .use('/505', Component, { title: 'Ошибка сервера' });

    router.go('/404');
    router.forward();
    if (router._currentRoute) {
      expect(router._currentRoute._pathname).equal('/505');
    }

    expect(window.location.pathname).equal('/505');

    router.back();

    if (router._currentRoute) {
      expect(router._currentRoute._pathname).equal('/404');
    }

    expect(window.location.pathname).equal('/404');
  });
});

class Component extends Block {
  constructor(props: Record<string, unknown>) {
    super('div', props);
  }

  public override render() {
    const element = document.createElement('template');
    return element.content;
  }
}
