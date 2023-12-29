import fs from 'fs';
import bcrypt from 'bcrypt';
import { IRandomgenerator } from '../../../usecaseLayer/interface/uniqueRepositroy';

export class RandomNumber implements IRandomgenerator {
  async generateUniqueRandomCode(): Promise<string> {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    let generatedNumbers = new Set();

    try {
      const data = fs.readFileSync('generatedNumbers.txt', 'utf8');
      const lines = data.split('\n');
      for (const line of lines) {
        generatedNumbers.add(await bcrypt.compare(line, data));
      }
    } catch (error) {
      console.log('File not found or empty. Starting with an empty set.');
    }

    while (true) {
      let code = '';

      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }

      if (!generatedNumbers.has(await bcrypt.hash(code, 10))) {
        generatedNumbers.add(await bcrypt.hash(code, 10));

        const hashedCode = await bcrypt.hash(code, 10);
        fs.writeFileSync('generatedNumbers.txt', hashedCode + '\n', { flag: 'a' });
        return code;
      }
    }
  }
}
