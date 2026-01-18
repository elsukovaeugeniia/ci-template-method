export class Character {
  constructor(name, type) {
    if (name.length < 2 || name.length > 10) {
      throw new Error('Имя должно быть от 2 до 10 символов');
    }

    const validTypes = [
      'Bowman', 'Swordsman', 'Magician',
      'Daemon', 'Undead', 'Zombie'
    ];

    if (!validTypes.includes(type)) {
      throw new Error('Некорректный тип персонажа');
    }

    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.attack = undefined;   // значение задаётся в дочерних классах
    this.defence = undefined; // значение задаётся в дочерних классах
  }

  levelUp() {
    if (this.health === 0) {
      throw new Error('Нельзя повысить уровень умершего персонажа');
    }
    
    this.level += 1;
    this.attack *= 1.2;
    this.defence *= 1.2;
    this.health = 100;
  }

  damage(points) {
    const damage = points * (1 - this.defence / 100);
    this.health -= damage;
    
    if (this.health < 0) {
      this.health = 0;
    }
  }
} 