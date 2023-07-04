export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  specialItems: Array<string>;

  constructor(items = [] as Array<Item>) {
    this.CheckItemInput(items);
    this.items = items;
    this.specialItems = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros']
  }

  // TODO
  // conjured items degrade in quality twice as fast 

  updateQuality() {
    for(let i = 0; i < this.items.length; i++)
    {
      // edge cases
      if(this.specialItems.includes(this.items[i].name))
      {
        // handle Aged Brie
        if(this.items[i].name == 'Aged Brie')
        {
          // decrement sellin date and increase quality; CAN BRIE QUALITY GO ABOVE 50?
          this.items[i].sellIn -= 1;
          if(this.items[i].quality < 50)
          {
            this.items[i].quality += 1;
          }
        }
        
        // handle tickets
        if(this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert')
        {
          // decrement sellin date and increase quality; CAN BRIE QUALITY GO ABOVE 50?
          this.items[i].sellIn -= 1;
          if(this.items[i].sellIn < 0)
          {
            this.items[i].quality = 0;
          }
          else if(this.items[i].sellIn <= 10 && this.items[i].sellIn > 5)
          {
            this.items[i].quality += 2;
          }
          else if(this.items[i].sellIn <= 5 && this.items[i].sellIn >= 0)
          {
            this.items[i].quality += 3;
          }
          else
          {
            this.items[i].quality += 1;
          }

          // cap quality
          if(this.items[i].quality > 50)
          {
            this.items[i].quality = 50;
          }
        }
        
        // note that sulfuras doesnt need any handling. It is perceived through time as it should
      }

      // normal cases
      else
      {
        // decrement sellin date
        this.items[i].sellIn -= 1;

        //based on time left, reduce quality either by 1 or by 2
        if(this.items[i].sellIn >= 0)
        {
          this.items[i].quality -= 1;
        }
        else
        {
          this.items[i].quality -= 2;
        }

        // cap quality at 0
        if(this.items[i].quality < 0)
        {
          this.items[i].quality = 0;
        }

      }
    }
    
    return this.items;
  }

  CheckItemInput(inputItems){
    // input quality is less than 50 and greater than 0

    for(let i = 0; i < inputItems.length; i++)
    {
      // check sulfuras
      if(inputItems[i].name == 'Sulfuras, Hand of Ragnaros')
      {
        if(inputItems[i].quality != 80)
        {
          throw 'Sulfuras has to have a quality of 80';
        }
      }
      
      // check tickets
      else if(inputItems[i].name == 'Backstage passes to a TAFKAL80ETC concert')
      {
        if(inputItems[i].sellIn < 0 && inputItems[i].quality != 0)
        {
          throw 'Tickets are worthless after the concert';
        }
      }

      // check the rest
      else
      {
        if(inputItems[i].quality < 0 || inputItems[i].quality > 50)
        {
          throw 'An item has to a have a non-negative quality less than or equal to 50';
        }
      }
    }
  }
}


