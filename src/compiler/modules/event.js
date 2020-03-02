/**
 * @file event
 * @author cxtom(cxtom2008@gmail.com)
 */

const prefixers = ['@', 'v-on:'];
const reEvent = /^(@|v-on:)/;

function postTransformNode(node) {
    const eventAttrs = node.attrsList.filter(n => reEvent.test(n.name));
    for (const attr of eventAttrs) {
        delete node.attrsMap[attr.name];
        const [name, ...modifiers] = attr.name.split('.');
        node.attrsMap[`on-${name.replace(reEvent, '')}`] = `${modifiers.join(':')}:${attr.value}`;
    }
}

export default {
    postTransformNode
};
