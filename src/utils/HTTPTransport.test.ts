/* eslint-env mocha */
import pkg from 'chai';
import sinonChai from 'sinon-chai';
import { createSandbox, SinonStub } from 'sinon';
import { afterEach } from 'mocha';
import HTTPTransport from './HTTPTransport';

const { expect, use } = pkg;

describe('HTTP Transport', () => {
  use(sinonChai);
  const sandbox = createSandbox();
  let http: HTTPTransport;
  let request: SinonStub<any>;

  beforeEach(() => {
    http = new HTTPTransport();
    request = sandbox.stub(http, 'request' as keyof typeof http).callsFake(() => Promise.resolve());
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should GET request', () => {
    http.get('/url');
    expect(request).calledOnce; // eslint-disable-line no-unused-expressions
    expect(request).calledWithMatch('/url');
  });
  it('should PUT request', () => {
    http.PUT('/url');
    expect(request).calledOnce; // eslint-disable-line no-unused-expressions
    expect(request).calledWithMatch('/url');
  });
  it('should POST request', () => {
    http.POST('/url');
    expect(request).calledOnce; // eslint-disable-line no-unused-expressions
    expect(request).calledWithMatch('/url');
  });
  it('should DELETE request', () => {
    http.DELETE('/url');
    expect(request).calledOnce; // eslint-disable-line no-unused-expressions
    expect(request).calledWithMatch('/url');
  });
  it('should stringify query for GET request - strings', () => {
    http.get('url', { data: { a: '1', b: '2' } });
    expect(request).calledWithMatch('url?a=1&b=2', { method: 'GET' });
  });
  it('should stringify query for GET request - numbers', () => {
    http.get('url', { data: { a: 1, b: 2 } });
    expect(request).calledWithMatch('url?a=1&b=2', { method: 'GET' });
  });
});
