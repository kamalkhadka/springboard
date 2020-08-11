const {mean, mode, median} = require('./central')

describe("test for mean function", function(){
    test('mean for [1,2,3,4,5,6]', function(){
        const result = mean([1,2,3,4,5,6]);
        expect(result).toEqual(3.5);
    });
});


describe("test for median function", function(){
    test("median for even length of numbers array", function(){
        const result = median([1,2,3,4,5]);
        expect(result).toEqual(3);
    });

    test("median for odd length of numbers array", function(){
        const result = median([1,2,3,4,5,6,7]);
        expect(result).toEqual(4);
    });
});


describe("test for mode function", function(){
    test("mode for non repeating numbers array", () => {
        const result = mode([1,2,3,4,5,6]);
        expect(result).toEqual("none");
    });

    test("mode for repeating numbers array", () => {
        const result = mode([1,2,3,4,5,6,1,1]);
        expect(result).toEqual(1);
    });
});