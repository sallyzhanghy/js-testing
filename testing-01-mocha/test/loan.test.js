import {expect} from 'chai';
import Loan from '../js/dist/Loan';
let l = null;

describe('Loan', function() {
    beforeEach(function() {
        l = new Loan();
    });
    describe("#Loan constructor", function() {
        it('should set default properties title, principal, rate, and term', function() {
            expect(l.title).to.be.a('string');
            expect(l.principal).to.be.a('number');
            expect(l.rate).to.be.a('number');
            expect(l.term).to.be.a('number');
            // could also check for initial value
        });
        it('should allow for initializing all default properties', function() {
        	l = new Loan({
        		title: 'Title',
        		principal: 1,
        		rate: 0.01,
        		term: 1
        	});
        	expect(l.title).to.equal('Title');
        	expect(l.principal).to.equal(1);
        	expect(l.rate).to.equal(0.01);
        	expect(l.term).to.equal(1);
        });
    });
    describe('#set()', function() {
        it('should set the desired property on the loan', function() {
            l.set('term', 1);
            expect(l.term).to.equal(1);
        });
        it.skip('should trigger the \'change\' event', function() {
            // how can we test for this?
        });
    });
    describe('#get()', function() {
        it('should get the desired property from the loan', function() {
            l.term = 1;
            expect(l.get('term')).to.equal(1);
        });
    });
    describe('#payment', function() {
        it('should return the correct payment amount', function() {
            l.principal = 1000;
            l.term = 1;
            l.rate = 0.05;
            expect(l.payment()).to.be.within(85.61, 85.63);
        });
    });
});
