import Block from '../Block';

describe('core/Block', () => {
    class TestComponents extends Block<object>{
        static componentName = 'TestComponent';
        render() {
            return '<span>test</span>';
        }
    }

    const testComponent = new TestComponents({});

    it('should return html', () => {
        console.log(testComponent)
        // expect(testComponent.getContent().outerHTML).toStrictEqual('<span>test</span>');
    });
});
