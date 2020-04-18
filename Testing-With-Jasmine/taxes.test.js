
describe('calculate taxes', function () {
    it('should calculate low-bracket', function () {
        expect(calculateTaxes(10000)).toEqual(1500);
        expect(calculateTaxes(20000)).toEqual(3000);
    });

    it('should calculate high-bracket', function () {
        expect(calculateTaxes(50000)).toEqual(7500);
        expect(calculateTaxes(80000)).toEqual(12000);
    });

})


it('should remove duplicates from an array', function () {
    expect(removeDupes([1, 1, 2, 2, 3, 4])).toBeInstanceOf(Array);
})

