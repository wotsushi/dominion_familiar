import assert from 'assert'
import pick from '@/pick-supplies'

describe('getExpansionsString', () => {
  it('For cards enclosed in 2 editions', () => {
    assert.strictEqual(
      pick.getExpansionsString(
        {
          name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
        }
      ),
      '基本 #1,2'
    )
    assert.strictEqual(
      pick.getExpansionsString(
        {
          name: '拷問人', expansion: '陰謀', cost: '5', type: 'kingdom', editions: [1, 2]
        }
      ),
      '陰謀 #1,2'
    )
  })
  it('For cards enclosed only in the 1st edition', () => {
    assert.strictEqual(
      pick.getExpansionsString(
        {
          name: '宰相', expansion: '基本', cost: '3', type: 'kingdom', editions: [1]
        }
      ),
      '基本'
    )
    assert.strictEqual(
      pick.getExpansionsString(
        {
          name: '破壊工作員', expansion: '陰謀', cost: '5', type: 'kingdom', editions: [1]
        }
      ),
      '陰謀'
    )
  })
  it('For cards enclosed only in the 2nd edition', () => {
    assert.strictEqual(
      pick.getExpansionsString(
        {
          name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
        }
      ),
      '基本 #2'
    )
    assert.strictEqual(
      pick.getExpansionsString(
        {
          name: '身代わり', expansion: '陰謀', cost: '5', type: 'kingdom', editions: [2]
        }
      ),
      '陰謀 #2'
    )
  })
})

describe('filterCards', () => {
  const cards = [
    {
      name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
    },
    {
      name: '宰相', expansion: '基本', cost: '3', type: 'kingdom', editions: [1]
    },
    {
      name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
    },
    {
      name: '施し', expansion: '冒険', cost: '0', type: 'event', editions: [1]
    }
  ]
  it('Using all the expansions', () => {
    const filter = pick.filterCards(
      [
        { name: '基本', edition: 1, isUsed: true },
        { name: '基本', edition: 2, isUsed: true },
        { name: '冒険', edition: 1, isUsed: true }
      ]
    )
    assert.deepStrictEqual(
      filter(cards),
      [
        {
          name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
        },
        {
          name: '宰相', expansion: '基本', cost: '3', type: 'kingdom', editions: [1]
        },
        {
          name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
        },
        {
          name: '施し', expansion: '冒険', cost: '0', type: 'event', editions: [1]
        }
      ]
    )
  })
  it('Using no expansion', () => {
    const filter = pick.filterCards(
      [
        { name: '基本', edition: 1, isUsed: false },
        { name: '基本', edition: 2, isUsed: false },
        { name: '冒険', edition: 1, isUsed: false }
      ]
    )
    assert.deepStrictEqual(
      filter(cards),
      []
    )
  })
  it('Using some expansions', () => {
    const filter = pick.filterCards(
      [
        { name: '基本', edition: 1, isUsed: false },
        { name: '基本', edition: 2, isUsed: true },
        { name: '冒険', edition: 1, isUsed: true }
      ]
    )
    assert.deepStrictEqual(
      filter(cards),
      [
        {
          name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
        },
        {
          name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
        },
        {
          name: '施し', expansion: '冒険', cost: '0', type: 'event', editions: [1]
        }
      ]
    )
  })
})

describe('pickSuppliedCards', () => {
  it('Pick only kingdom cards', () => {
    assert.deepStrictEqual(
      pick.pickSuppliedCards(
        [
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          },
          {
            name: '銀行', expansion: '繁栄', cost: '7', type: 'kingdom', editions: [1]
          }
        ]
      ),
      [
        {
          name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
        },
        {
          name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
        },
        {
          name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
        },
        {
          name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
        },
        {
          name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
        },
        {
          name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
        },
        {
          name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
        },
        {
          name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
        },
        {
          name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
        },
        {
          name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
        }
      ]
    )
  })
  it('Pick one event card', () => {
    assert.deepStrictEqual(
      pick.pickSuppliedCards(
        [
          {
            name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
          },
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          },
          {
            name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
          }
        ]
      ),
      [
        {
          name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
        },
        {
          name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
        },
        {
          name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
        },
        {
          name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
        },
        {
          name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
        },
        {
          name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
        },
        {
          name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
        },
        {
          name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
        },
        {
          name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
        },
        {
          name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
        },
        {
          name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
        }
      ]
    )
  })
  it('Pick an event card and a landmark card', () => {
    assert.deepStrictEqual(
      pick.pickSuppliedCards(
        [
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
          },
          {
            name: '寄付', expansion: '帝国', cost: '-8', type: 'event', editions: [1]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          }
        ]
      ),
      [
        {
          name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
        },
        {
          name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
        },
        {
          name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
        },
        {
          name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
        },
        {
          name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
        },
        {
          name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
        },
        {
          name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
        },
        {
          name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
        },
        {
          name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
        },
        {
          name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
        },
        {
          name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
        },
        {
          name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
        }
      ]
    )
  })
  it('Pick two event cards', () => {
    assert.deepStrictEqual(
      pick.pickSuppliedCards(
        [
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '寄付', expansion: '帝国', cost: '-8', type: 'event', editions: [1]
          },
          {
            name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          }
        ]
      ),
      [
        {
          name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
        },
        {
          name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
        },
        {
          name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
        },
        {
          name: '寄付', expansion: '帝国', cost: '-8', type: 'event', editions: [1]
        },
        {
          name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
        },
        {
          name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
        },
        {
          name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
        },
        {
          name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
        },
        {
          name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
        },
        {
          name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
        },
        {
          name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
        },
        {
          name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
        }
      ]
    )
  })
})

describe('filterKingdomCards', () => {
  it('For cards containing only kingdom cards', () => {
    assert.deepStrictEqual(
      pick.filterKingdomCards(
        [
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          }
        ]
      ),
      [
        {
          name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
        },
        {
          name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
        },
        {
          name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
        },
        {
          name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
        },
        {
          name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
        },
        {
          name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
        },
        {
          name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
        },
        {
          name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
        },
        {
          name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
        },
        {
          name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
        }
      ]
    )
  })
  it('For cards containing not only kingdom cards', () => {
    assert.deepStrictEqual(
      pick.filterKingdomCards(
        [
          {
            name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
          },
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          },
          {
            name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
          }
        ]
      ),
      [
        {
          name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
        },
        {
          name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
        },
        {
          name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
        },
        {
          name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
        },
        {
          name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
        },
        {
          name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
        },
        {
          name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
        },
        {
          name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
        },
        {
          name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
        },
        {
          name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
        }
      ]
    )
  })
})

describe('filterEventCards', () => {
  it('For cards containing no event card', () => {
    assert.deepStrictEqual(
      pick.filterEventCards(
        [
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          }
        ]
      ),
      []
    )
  })
  it('For cards containing an event card and a landmark card', () => {
    assert.deepStrictEqual(
      pick.filterEventCards(
        [
          {
            name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
          },
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          }
        ]
      ),
      [
        {
          name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
        }
      ]
    )
  })
  it('For cards containing two event cards', () => {
    assert.deepStrictEqual(
      pick.filterEventCards(
        [
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '寄付', expansion: '帝国', cost: '-8', type: 'event', editions: [1]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          }
        ]
      ),
      [
        {
          name: '寄付', expansion: '帝国', cost: '-8', type: 'event', editions: [1]
        },
        {
          name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
        }
      ]
    )
  })
})

describe('filterLandmarkCards', () => {
  it('For cards containing no landmark card', () => {
    assert.deepStrictEqual(
      pick.filterLandmarkCards(
        [
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          }
        ]
      ),
      []
    )
  })
  it('For cards containing an event card and a landmark card', () => {
    assert.deepStrictEqual(
      pick.filterLandmarkCards(
        [
          {
            name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
          },
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          }
        ]
      ),
      [
        {
          name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
        }
      ]
    )
  })
  it('For cards containing two landmark cards', () => {
    assert.deepStrictEqual(
      pick.filterLandmarkCards(
        [
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '塔', expansion: '帝国', type: 'landmark', editions: [1]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          }
        ]
      ),
      [
        {
          name: '塔', expansion: '帝国', type: 'landmark', editions: [1]
        },
        {
          name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
        }
      ]
    )
  })
})

describe('pickBaneSupply', () => {
  it('For cards containing no young witch', () => {
    assert.strictEqual(
      pick.pickBaneSupply(
        [
          {
            name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
          },
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          },
          {
            name: '宰相', expansion: '基本', cost: '3', type: 'kingdom', editions: [1]
          }
        ]
      ),
      null
    )
  })
  it('For cards containing a young witch', () => {
    assert.deepStrictEqual(
      pick.pickBaneSupply(
        [
          {
            name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
          },
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '魔女娘', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          },
          {
            name: '拷問人', expansion: '陰謀', cost: '5', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '宰相', expansion: '基本', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: '堀', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          }
        ]
      ),
      {
        name: '宰相', expansion: '基本', cost: '3', type: 'kingdom', editions: [1]
      }
    )
  })
})

describe('computeOptions', () => {
  it('Thre is no option', () => {
    assert.deepStrictEqual(
      pick.computeOptions(
        [
          {
            name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
          },
          {
            name: '石切場', expansion: '繁栄', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '密猟者', expansion: '基本', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: '肉屋', expansion: 'ギルド', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '地下牢', expansion: '冒険', cost: '3', type: 'kingdom', editions: [1]
          },
          {
            name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          }
        ]
      ),
      []
    )
  })
  it('There are all the options', () => {
    assert.deepStrictEqual(
      pick.computeOptions(
        [
          {
            name: '石切場', expansion: '繁栄', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: '魔女娘', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          },
          {
            name: '大学', expansion: '錬金術', cost: '2P', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          }
        ]
      ),
      [
        'ポーション',
        '植民地・白金貨',
        '共同墓地・草茂る屋敷・納屋'
      ]
    )
  })
  it('There are some options', () => {
    assert.deepStrictEqual(
      pick.computeOptions(
        [
          {
            name: '借入', expansion: '冒険', cost: '0', type: 'event', editions: [1]
          },
          {
            name: '石切場', expansion: '繁栄', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '地下貯蔵庫', expansion: '基本', cost: '2', type: 'kingdom', editions: [1, 2]
          },
          {
            name: '策士', expansion: '海辺', cost: '5', type: 'kingdom', editions: [1]
          },
          {
            name: '風車', expansion: '陰謀', cost: '4', type: 'kingdom', editions: [2]
          },
          {
            name: '馬商人', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '品評会', expansion: '収穫祭', cost: '6', type: 'kingdom', editions: [1]
          },
          {
            name: '魔女娘', expansion: '収穫祭', cost: '4', type: 'kingdom', editions: [1]
          },
          {
            name: '闘技場', expansion: '帝国', type: 'landmark', editions: [1]
          },
          {
            name: 'パトリキ/エンポリウム', expansion: '帝国', cost: '2/5', type: 'kingdom', editions: [1]
          },
          {
            name: '大学', expansion: '錬金術', cost: '2P', type: 'kingdom', editions: [1]
          },
          {
            name: 'ネズミ', expansion: '暗黒時代', cost: '4', type: 'kingdom', editions: [1]
          }
        ]
      ),
      [
        'ポーション',
        '共同墓地・草茂る屋敷・納屋'
      ]
    )
  })
})

describe('pickParticipants', () => {
  it('There is no participant', () => {
    assert.deepStrictEqual(
      pick.pickParticipants([
        { name: 'atsushi', isParticipated: false },
        { name: 'etsushi', isParticipated: false },
        { name: 'wotsushi', isParticipated: false }
      ]),
      []
    )
  })
  it('There is all the participant', () => {
    assert.deepStrictEqual(
      pick.pickParticipants([
        { name: 'atsushi', isParticipated: true },
        { name: 'etsushi', isParticipated: true },
        { name: 'wotsushi', isParticipated: true }
      ]),
      [
        { name: 'atsushi', isParticipated: true },
        { name: 'etsushi', isParticipated: true },
        { name: 'wotsushi', isParticipated: true }
      ]
    )
  })
  it('There is some participants', () => {
    assert.deepStrictEqual(
      pick.pickParticipants([
        { name: 'atsushi', isParticipated: true },
        { name: 'etsushi', isParticipated: true },
        { name: 'wotsushi', isParticipated: false }
      ]),
      [
        { name: 'atsushi', isParticipated: true },
        { name: 'etsushi', isParticipated: true }
      ]
    )
  })
})
