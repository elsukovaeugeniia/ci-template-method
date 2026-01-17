import { Character, Bowman } from '../method.js';

describe('Character methods', () => {
  let character;

  beforeEach(() => {
    character = new Character('Герой', 'Bowman');
  });

  describe('levelUp', () => {
    test('повышает уровень на 1', () => {
      character.levelUp();
      expect(character.level).toBe(2);
    });

    test('увеличивает атаку на 20%', () => {
      const initialAttack = character.attack;
      character.levelUp();
      expect(character.attack).toBeCloseTo(initialAttack * 1.2);
    });

    test('увеличивает защиту на 20%', () => {
      const initialDefence = character.defence;
      character.levelUp();
      expect(character.defence).toBeCloseTo(initialDefence * 1.2);
    });

    test('восстанавливает здоровье до 100', () => {
      character.health = 50;
      character.levelUp();
      expect(character.health).toBe(100);
    });

    test('выбрасывает ошибку при мёртвом персонаже', () => {
      character.health = 0;
      expect(() => character.levelUp()).toThrow('Нельзя повысить уровень умершего персонажа');
    });
  });

  describe('damage', () => {
    test('корректно рассчитывает урон', () => {
      const initialHealth = character.health;
      character.damage(20);
      const expectedDamage = 20 * (1 - character.defence / 100);
      expect(character.health).toBeCloseTo(initialHealth - expectedDamage);
    });

    test('не позволяет здоровью упасть ниже 0', () => {
      character.health = 5;
      character.damage(100);
      expect(character.health).toBe(0);
    });

    test('игнорирует нулевой урон', () => {
      character.damage(0);
      expect(character.health).toBe(100);
    });

    test('работает с дробными значениями урона', () => {
      character.defence = 30;
      character.damage(15.5);
      const expectedDamage = 15.5 * (1 - 30 / 100);
      expect(character.health).toBeCloseTo(100 - expectedDamage);
    });
  });

  describe('наследование', () => {
    test('Bowman наследует методы', () => {
      const bowman = new Bowman('Лучник');
      
      bowman.damage(10);
      expect(bowman.health).toBeLessThan(100);
      
      bowman.levelUp();
      expect(bowman.level).toBe(2);
      expect(bowman.attack).toBeCloseTo(30);
      expect(bowman.defence).toBeCloseTo(30);
    });
  });
});