import Block from '../Block';

describe('core/Block', () => {
    class TestComponents extends Block<object> {
        static componentName = 'TestComponent';

        render() {
            return '<span>test</span>';
        }
    }

    const testComponent = new TestComponents({'prop1': 'prop1', 'prop2': 'prop2'});

    it('should return html', () => {
        expect(testComponent.getContent().outerHTML).toStrictEqual('<span>test</span>');
    });

    it('should set props', () => {
        expect(testComponent.props).toEqual({'prop1': 'prop1', 'prop2': 'prop2'})
    })
    it('should update props', ()=>{
        testComponent.setProps({'prop3': 'prop3'});
        expect(testComponent.props).toEqual({'prop1': 'prop1', 'prop2': 'prop2', 'prop3': 'prop3'})
    })
});
