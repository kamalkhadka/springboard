describe('Payments test (with setup and tear-down)', function(){

    beforeEach(function(){
        billAmtInput.value = 20;
        tipAmtInput.value = 2;
    });

    it('should submit payment info submitPaymentInfo()', function(){
        submitPaymentInfo();
        expect(allPayments.payment1.billAmt).toEqual('20');
        expect(allPayments.payment1.tipAmt).toEqual('2');
        expect(allPayments.payment1.tipPercent).toEqual(10);
    });

    it('should create payment, createCurPayment()', () => {
        let payment = createCurPayment();
        let expectedPayment = {
            billAmt: '20',
            tipAmt: '2',
            tipPercent: 10
        }

        expect(expectedPayment).toEqual(payment);
    });

    it('should append table to #paymentTbody,  appendPaymentTable(curPayment)', function(){
        let curPayment = createCurPayment();
        appendPaymentTable(curPayment);
        let tds = document.querySelectorAll('#paymentTable tbody tr td');
        expect(tds[0].innerText).toEqual('$'+curPayment.billAmt);
        expect(tds[1].innerText).toEqual('$'+curPayment.tipAmt);
        expect(tds[2].innerText).toEqual(curPayment.tipPercent+'%');
    });

    afterEach(function(){
        billAmtInput.value = '';
        tipAmtInput.value = '';
        allPayments = {};
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';        
        summaryTds[1].innerHTML = '';        
        summaryTds[2].innerHTML = '';
        paymentId = 0;
    });
});