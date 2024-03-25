/* eslint-env mocha */
import pkg from 'chai';

import sinon from 'sinon';
import Block from './Block';

const { expect } = pkg;

describe('Block', () => {
  class Component extends Block {
    constructor(props: Record<string, unknown>) {
      super('div', props);
    }

    public override render() {
      const element = document.createElement('template');
      return element.content;
    }
  }
  it('Created Component is correct', () => {
    const block = new Component({
      text: 'text',
      settings: { withInternalID: true },
    });
    expect(block.getContent()).not.equal(null);
  });
  it('Created Component has PROPS', () => {
    const block = new Component({
      text: 'text',
      settings: { withInternalID: true },
    });
    expect(block.props).not.equal(null);
    expect(block.props).to.have.nested.property('text');
  });
  it('Created Component has ID', () => {
    const block = new Component({
      text: 'text',
      settings: { withInternalID: true },
    });
    expect(block.props).to.have.nested.property('id');
  });
  it('Component should render again after change props', () => {
    const block = new Component({ text: 'text' });
    const render = sinon.spy(block, 'render');
    expect(render.calledOnce);
    block.props.text = 'new text';
    block.setProps(block.props);
    expect(render.called);
  });
});
