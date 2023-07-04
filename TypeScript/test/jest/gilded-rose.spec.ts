import { Item, GildedRose } from '@/gilded-rose';

// general functionality of the inn
describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

});

// sulfuras tests
describe('Sulfuras', () => {
  it('shouldnt degrade in quality over time', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });

  it('shouldnt be input with quality other than 80', () => {
    expect(() => {const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 70)]);}).toThrow();
  });
});

// brie test
describe('Brie', () => {
  it('should increase in quality but be capped at 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 3, 49)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('shouldnt be initialized with wrong quality', () => {
    expect(() => {const gildedRose = new GildedRose([new Item('Aged Brie', 0, -10)]);}).toThrow();
  });
});

// ticket test
describe('Ticket', () => {
  it('should increase in quality but be capped at 50', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 35)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(36);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(38);

    for(let i = 0; i < 5; i++)
    {
      items = gildedRose.updateQuality();
    }
    expect(items[0].quality).toBe(49);

    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('shouldnt be initialized with wrong quality', () => {
    expect(() => {const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', -1, 5)]);}).toThrow();
  });
});

// generic item tests
describe('Generic item', () => {
  it('shouldnt be initialized with wrong quality', () => {
    expect(() => {const gildedRose = new GildedRose([new Item('generic item', 0, 70)]);}).toThrow();
  });

  it('should reduce sellIn date of a generic item by 1 ', () => {
    const gildedRose = new GildedRose([new Item('generic item', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
  });

  it('should reduce quality of a generic item by 1 before sellin date', () => {
    const gildedRose = new GildedRose([new Item('generic item', 6, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(7);
  });

  it('should reduce quality of a generic item by 2 after sellin date', () => {
    const gildedRose = new GildedRose([new Item('generic item', -2, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });

  it('quality of a generic item is never negative', () => {
    const gildedRose = new GildedRose([new Item('generic item', -1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

});


// 
