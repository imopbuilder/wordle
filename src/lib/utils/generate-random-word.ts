import { WORDLE_BANK } from '@/constants/wordle-bank';

export function generateRandomWord() {
	return WORDLE_BANK[Math.floor(Math.random() * WORDLE_BANK.length)];
}
