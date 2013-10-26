describe('$$$ must:', function() {

    it('exists in window', function() {
        window.$$$.must.exist();
    });

    it('be an instance of Function', function() {
        $$$.must.be.an.instanceOf(Function);
    });

    it('have property "prototype"', function() {
        $$$.must.have.property('prototype');
    });

});

describe('$$$(selector):', function() {

    describe('empty/invalid selector must return nothing', function() {

        it('empty', function() {
            $$$().must.have.length(0);
        });

        it('\'\'', function() {
           $$$('').must.have.length(0);
        });

        it('true', function() {
           $$$(true).must.have.length(0);
        });

        it('false', function() {
           $$$(false).must.have.length(0);
        });

        it('0', function() {
           $$$(0).must.have.length(0);
        });

        it('undefined', function() {
           $$$(undefined).must.have.length(0);
        });

        it('null', function() {
           $$$(null).must.have.length(0);
        });

    });

    describe('valid selectors:', function() {

        it('unknown selector must return nothing', function() {
            $$$('-unknown-selector-').must.have.length(0);
        });

        it('\'*\' must return all the elements in "result" property', function() {
            $$$('*').length.must.be.above(10);
        });

        it('\'body\' must return an instance of Array', function() {
            $$$('body').must.be.an.instanceOf(Array);
        });

        it('\'body\' must return an instance of Yocto', function() {
            $$$('body').must.be.an.instanceOf(Yocto);
        });

    });

    describe('must collect all the nodes:', function() {

        describe('$$$(\'#test span\').childNodes()', function() {

            var test = $$$('#test span');

            it('must have length of 4', function() {
                test.childNodes().must.have.length(4);
            });

            it('[0].tagName must equal "I"', function() {
                test.childNodes()[0].tagName.must.equal('I');
            });

            it('[1].tagName must equal "I"', function() {
                test.childNodes()[1].tagName.must.equal('I');
            });

            it('[2].tagName must equal "I"', function() {
                test.childNodes()[2].tagName.must.equal('I');
            });

            it('[3].tagName must equal "STRONG"', function() {
                test.childNodes()[3].tagName.must.equal('STRONG');
            });

        });


        describe('$$$(\'#test i\').parentNode()', function() {

            var test = $$$('#test i');

            it('must have length of 3', function() {
                test.parentNode().must.have.length(3);
            });

            it('[0].tagName must equal "SPAN"', function() {
                test.parentNode()[0].tagName.must.equal('SPAN');
            });

            it('[1].tagName must equal "SPAN"', function() {
                test.parentNode()[1].tagName.must.equal('SPAN');
            });

            it('[2].tagName must equal "SPAN"', function() {
                test.parentNode()[2].tagName.must.equal('SPAN');
            });

        });

    });

    describe('must return the very first result:', function() {

        var test = $$$('#test > span');

        it('$$$(\'#test > span\').innerHTML() must return "<i></i>"', function() {
            test.innerHTML().must.equal('<i></i>');
        });

        it('$$$(\'#test > span\').getAttribute(\'attr2\') must return "val2"', function() {
            test.getAttribute('attr2').must.equal('val2');
        });

    });

    describe('must return Yocto if nothing else', function() {

        var test = $$$('#test').setAttribute('test-attr', 5);

        it('$$$(\'#test\').setAttribute(\'test-attr\', 5)', function() {
            test.must.be.instanceOf(Yocto);
            $$$('#test').getAttribute('test-attr').must.equal('5');
        });

    });

});
