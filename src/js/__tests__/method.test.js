import { Character } from '../method.js';
import { Bowman } from '../class/Bowman.js';
import { Swordsman } from '../class/Swordsman.js';
import { Magician } from '../class/Magician.js';
import { Daemon } from '../class/Daemon.js';
import { Undead } from '../class/Undead.js';
import { Zombie } from '../class/Zombie.js';

describe('Character methods', () => {
  let character;

  beforeEach(() => {
    
    character = new Bowman('Лучник');
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
});

describe('Наследование и специфика героев', () => {
  test('Bowman: начальные атака и защита', () => {
    const bowman = new Bowman('Стрелок');
    expect(bowman.attack).toBe(25);
    expect(bowman.defence).toBe(25);
  });

  test('Swordsman: начальные атака и защита', () => {
    const swordsman = new Swordsman('Воин');
    expect(swordsman.attack).toBe(40);
    expect(swordsman.defence).toBe(10);
  });

  test('Magician: начальные атака и защита', () => {
    const magician = new Magician('Маг');
    expect(magician.attack).toBe(10);
    expect(magician.defence).toBe(40);
  });

  test('Daemon: начальные атака и защита', () => {
    const daemon = new Daemon('Демон');
    expect(daemon.attack).toBe(10);
    expect(daemon.defence).toBe(40);
  });

  test('Undead: начальные атака и защита', () => {
    const undead = new Undead('Нежить');
    expect(undead.attack).toBe(25);
    expect(undead.defence).toBe(25);
  });

  test('Zombie: начальные атака и защита', () => {
    const zombie = new Zombie('Зомби');
    expect(zombie.attack).toBe(40);
    expect(zombie.defence).toBe(10);
  });

  
  const testHeroLevelUp = (hero, initialAttack, initialDefence) => {
    hero.levelUp();
    expect(hero.level).toBe(2);
    expect(hero.attack).toBeCloseTo(initialAttack * 1.2);
    expect(hero.defence).toBeCloseTo(initialDefence * 1.2);
    expect(hero.health).toBe(100);
  };

  test('Bowman наследует levelUp', () => {
    const bowman = new Bowman('Стрелок');
    testHeroLevelUp(bowman, 25, 25);
  });

  test('Swordsman наследует levelUp', () => {
    const swordsman = new Swordsman('Воин');
    testHeroLevelUp(swordsman, 40, 10);
  });

  test('Magician наследует levelUp', () => {
    const magician = new Magician('Маг');
    testHeroLevelUp(magician, 10, 40);
  });

  test('Daemon наследует levelUp', () => {
    const daemon = new Daemon('Демон');
    testHeroLevelUp(daemon, 10, 40);
  });

  test('Undead наследует levelUp', () => {
    const undead = new Undead('Нежить');
    testHeroLevelUp(undead, 25, 25);
  });

  test('Zombie наследует levelUp', () => {
    const zombie = new Zombie('Зомби');
    testHeroLevelUp(zombie, 40, 10);
  });
});