import chai from "chai";
import sinon from "sinon";
import  * as helper from './helper.js';
import * as app from './index.js'
import chaiHttp from 'chai-http';

chai.use(chaiHttp);


const { expect, assert, request} = chai;

const h = new helper.helper()

describe("Test", () => {
  it("Basic Test", async () => {
    expect(1).to.equal(1);
  });
});

describe("getUserBalance", () => {
  it("test getting user balance", async () => {
    const test = h.getUserBalance('user-1');

    assert.deepEqual(test, {
        "balance": {
        "BTC": "0.5",
        "ETH": "2"
      }
    });
  });
});


// TODO: FIX
describe("Test", () => {
  it("Basic Test", async () => {
    const stub = sinon.stub(h, 'getCurrentPrice').callsFake(() => new Promise(function (resolve, _) {
          resolve("{\"last\": \"10\"}");
    }));
    const test = await h.getCurrentPrice();
    console.log('test', test)

    // Mock the app instead of running it
    request('http://localhost:8000') 
        .get('/balance')
        .query({userId: 'user-1'})
        .end((err, res) => {
              console.log('res', res.status)
              expect(res.text).be.a('string');
              expect(parseFloat(res.text)).be.a('number');
              expect(res).to.have.status(200);
        });
  });
});