import { generate } from '../docs/.vuepress/components/fake-names'
import Triejs from '../src/lib/trie'

describe('Trie', () => {
  let trie = new Triejs()
  beforeEach(() => {
    trie = new Triejs()
    const testNames = ['Aaaaaaa', 'aaaaaaa', 'zzzzzzz']

    generate(1000).forEach(name => trie.add(name))
    testNames.forEach(name => trie.add(name))
  })

  describe('#find', () => {
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

  describe('#contains', () => {
    it('should contain Aaaaaaa', () => {
      expect(trie.contains('Aaaaaaa')).toBe(true)
    })

    it('should contain zzzzzzz', () => {
      expect(trie.contains('zzzzzzz')).toBe(true)
    })

    it('should not contain zzzzzzzz', () => {
      expect(trie.contains('zzzzzzzz')).toBe(false)
    })
  })

  describe('#add', () => {
    it('should add a new item to the trie', () => {
      trie.add('/help')

      // should still find zzz
      const items = trie.find('/')
      expect(items.pop()).toBe('/help')

      expect(trie.contains('/help')).toBe(true)
    })
  })
})
