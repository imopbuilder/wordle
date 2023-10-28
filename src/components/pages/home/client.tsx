'use client';

import { dispatch, useAppSelector } from '@/client/store';
import { setwordle } from '@/client/store/slices/client-slice';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils/cn';
import confetti from 'canvas-confetti';
import { Fragment, MouseEvent, useEffect } from 'react';

const useResult = () => {
	const { board, word, tries } = useAppSelector((state) => state.clientSlice.wordle);

	const isWinner = board[(tries - 1) as keyof typeof board] === word;
	const isLoser = tries > 4;

	return { isWinner, isLoser };
};

const HELPER = 'rahul';

export function Board() {
	const { board, word, tries } = useAppSelector((state) => state.clientSlice.wordle);

	return (
		<Fragment>
			{Object.values(board).map((val, index) => {
				return (
					<Fragment key={`${index}`}>
						<div className='flex items-center justify-center gap-3'>
							{HELPER.split('').map((_, index2) => {
								return (
									<p
										key={`${index2}`}
										className={cn(
											`w-14 h-14 border-2 rounded-xl flex items-center justify-center capitalize ${
												tries > index &&
												(word[index2] === val[index2]
													? 'bg-green-400 text-background font-semibold'
													: word.includes(val[index2])
													? 'bg-yellow-200 text-background font-semibold'
													: 'opacity-50')
											}`,
										)}
									>
										{val[index2] ?? ' '}
									</p>
								);
							})}
						</div>
					</Fragment>
				);
			})}
		</Fragment>
	);
}

export function RevealWord() {
	const { word } = useAppSelector((state) => state.clientSlice).wordle;
	const { isWinner, isLoser } = useResult();

	if (isWinner || isLoser) {
		if (isWinner)
			confetti({
				particleCount: 300,
				spread: 100,
				origin: { y: 0.5 },
			});

		return (
			<p className={cn(`py-5 text-center text-lg uppercase ${isWinner && 'text-green-400'} ${isLoser && 'text-destructive font-semibold'}`)}>
				{word}
			</p>
		);
	}

	return null;
}

const KEYS = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	'←',
	'↳',
];

export function Keyboard() {
	const { board, tries, word } = useAppSelector((state) => state.clientSlice.wordle);
	const { isWinner, isLoser } = useResult();
	const { toast } = useToast();

	function handleClick(e: MouseEvent<HTMLButtonElement>) {
		const letter = (e.target as HTMLButtonElement).innerText;

		// When backspace is pressed
		if (letter === '←') return dispatch(setwordle({ board: { ...board, [tries]: board[tries as keyof typeof board].slice(0, -1) } }));

		// TODO: When enter key pressed
		if (letter === '↳') {
			if (board[tries as keyof typeof board].length <= 4)
				return toast({
					title: 'Not allowed',
					description: 'Word should contain atleast 5 letters',
				});

			return dispatch(setwordle({ tries: tries + 1 }));
		}

		if (board[tries as keyof typeof board].length <= 4) {
			dispatch(setwordle({ board: { ...board, [tries]: board[tries as keyof typeof board].concat(letter.toLowerCase()) } }));
			return;
		}

		// Toast for input-word containing more than five letters
		toast({
			title: 'Not allowed',
			description: 'Word can contain atmost 5 letters',
		});
	}

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key;

			if (key === 'Enter') {
				if (board[tries as keyof typeof board].length <= 4)
					return toast({
						title: 'Not allowed',
						description: 'Word should contain atleast 5 letters',
					});

				return dispatch(setwordle({ tries: tries + 1 }));
			}

			if (!key.toLowerCase().match(/^[a-z]$/)) return;

			const beforeBoard = Object.values(board).slice(0, tries);
			if (
				(word.includes(key.toLowerCase()) ? false : !!beforeBoard.length && beforeBoard.reduce((a, b) => a + b).includes(key.toLowerCase())) ||
				isLoser ||
				isWinner
			)
				return;

			e.preventDefault();
			if (board[tries as keyof typeof board].length <= 4) {
				dispatch(setwordle({ board: { ...board, [tries]: board[tries as keyof typeof board].concat(key.toLowerCase().toLowerCase()) } }));
				return;
			}

			// Toast for input-word containing more than five letters
			toast({
				title: 'Not allowed',
				description: 'Word can contain atmost 5 letters',
			});
		};

		document.addEventListener('keypress', handler);

		return () => {
			document.removeEventListener('keypress', handler);
		};
	}, [tries, board, word, toast, isWinner, isLoser]);

	return (
		<Fragment>
			{KEYS.map((letter, index) => {
				const beforeBoard = Object.values(board).slice(0, tries);

				return (
					<button
						key={`${index}`}
						onClick={handleClick}
						type='button'
						className={cn(
							'uppercase border-2 rounded-xl aspect-square font-semibold text-muted-foreground hover:bg-muted duration-200 disabled:hover:bg-transparent disabled:opacity-50',
						)}
						disabled={
							(word.includes(letter) ? false : !!beforeBoard.length && beforeBoard.reduce((a, b) => a + b).includes(letter)) || isLoser || isWinner
						}
					>
						{letter}
					</button>
				);
			})}
		</Fragment>
	);
}
