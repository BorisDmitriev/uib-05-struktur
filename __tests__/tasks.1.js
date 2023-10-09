const fs = require('fs');
const path = require('path');

describe("Excersie I", () => {
    
    test('index.html file should exist', () => {
        expect(fs.existsSync(path.join(__dirname, '../index.html'))).toBeTruthy();
    });
    test("`index.html` should contain a meta tag with `charset` attribute defined", () => {
        const htmlString = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        const dom = new DOMParser().parseFromString(htmlString, "text/xml");
        const metaElement = dom.querySelectorAll('meta');
        expect(metaElement.length).toBeGreaterThan(1);
        expect(metaElement[0].getAttribute('charset')).toBe('utf-8');
    });
    test("`index.html` should contain a meta tag with `name` `content` attributes defined", () => {
        const htmlString = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        const dom = new DOMParser().parseFromString(htmlString, "text/xml");
        const metaElement = dom.querySelectorAll('meta');
        expect(metaElement[1].getAttribute('name')).toBe('author');
        expect(metaElement[1].getAttribute('content')).toBeTruthy();
    });
    test("`index.html` should contain a title element that is not empty", () => {
        const htmlString = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        const dom = new DOMParser().parseFromString(htmlString, "text/xml");
        const titleElement = dom.querySelector('title');
        expect(titleElement.textContent).not.toBe('');
    });
    test("`index.html` should contain a body element", () => {
        const htmlString = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        const dom = new DOMParser().parseFromString(htmlString, "text/xml");
        const bodyElement = dom.querySelector('body');
        expect(bodyElement).toBeTruthy();
    });
    test("`index.html` should contain a lang attribute with a valid value", () => {
        const htmlString = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        const dom = new DOMParser().parseFromString(htmlString, "text/xml");
        const htmlElement = dom.querySelector('html');
        expect(htmlElement.getAttribute('lang')).toEqual(expect.any(String));
    });
});
describe('Exercise II`', () => {
    test('Eech of the lines in the <body>, should be wrapped with appropriate heading', () => {
        const htmlString = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        const dom = new DOMParser().parseFromString(htmlString, "text/xml");
        const htmlElement = dom.querySelector('h1');
        expect(htmlElement).toBeTruthy();
        expect(htmlElement.textContent).toEqual(expect.any(String));
        const htmlElement2 = dom.querySelector('h2');
        expect(htmlElement2).toBeTruthy();
        expect(htmlElement2.textContent).toEqual(expect.any(String));
        const htmlElement3 = dom.querySelector('h3');
        expect(htmlElement3).toBeTruthy();
        expect(htmlElement3.textContent).toEqual(expect.any(String));
    });
});
describe('Exercise III', () => {
    test('Each heading should contain additional info that is displayed on hover', () => {
        const htmlString = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        const dom = new DOMParser().parseFromString(htmlString, "text/xml");
        const headings = dom.querySelectorAll('h1, h2, h3');
        headings.forEach(h => {
            expect(h.getAttribute('title')).not.toBeNull()
        })
    })
})
describe('Exercise IV', () => {
    test('Document should contain brief comments about each HTML tag', () => {

        const findComments = (el) => {
            const arr = [];
            for (let i = 0; i < el.childNodes.length; i++) {
                const node = el.childNodes[i];
                if (node.nodeType === 8) {
                    arr.push(node);
                } else {
                    arr.push.apply(arr, findComments(node));
                }
            }
            return arr;
        };

        const htmlString = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        const dom = new DOMParser().parseFromString(htmlString, "text/xml");
        const comments = findComments(dom.documentElement);
        expect(comments.length).toBeGreaterThan(4);
    });
});

describe('Exercise V', () => {
    test('After each heading should follow a paragraph', () => {
        const htmlString = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        const dom = new DOMParser().parseFromString(htmlString, "text/xml");
        const head1 = dom.querySelector('h1');
        expect(head1).toBeTruthy();
        // check if there is p element after head1
        const p = head1.nextElementSibling;
        expect(p.tagName.toUpperCase()).toBe('P');
        const head2 = dom.querySelector('h2');
        expect(head2).toBeTruthy();
        // check if there is p element after head2
        const p2 = head2.nextElementSibling;
        expect(p2.tagName.toUpperCase()).toBe('P');
        const head3 = dom.querySelector('h3');
        expect(head3).toBeTruthy();
        // check if there is p element after head3
        const p3 = head3.nextElementSibling;
        expect(p3.tagName.toUpperCase()).toBe('P');
    });
});

describe('Exercise VI', () => {
    test('Document should contain a `pre` tag with provided text', () => {
        const htmlString = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        const dom = new DOMParser().parseFromString(htmlString, "text/xml");
        const pre = dom.querySelector('pre');
        expect(pre).toBeTruthy();
        const logoText = fs.readFileSync(path.join(__dirname, '../assets/logo.txt'), 'utf8');
        expect(pre.textContent).toContain(logoText);
    });
});