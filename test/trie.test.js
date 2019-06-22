import { generate } from '../docs/.vuepress/components/fake-names'
import Triejs from '../src/lib/trie'

describe('Trie', () => {
  let trie = new Triejs()
  beforeAll(() => {
    const testNames = ['Aaaaaaa', 'aaaaaaa', 'zzzzzzz', 'John']

    generate(1000).forEach(name => trie.add(name))
    testNames.forEach(name => trie.add(name))
  })

  it('should find Aaaaaaa', () => {
    const items = trie.find('A')
    expect(items[0]).toBe('Aaaaaaa')
  })

  it('should find Aaaaaaa and aaaaaaa', () => {
    const items = trie.find('Aaa')
    expect(items).toEqual(['Aaaaaaa', 'aaaaaaa'])
  })

  it('should find zzzzzzz', () => {
    const items = trie.find('z')
    expect(items.pop()).toBe('zzzzzzz')
  })
})
