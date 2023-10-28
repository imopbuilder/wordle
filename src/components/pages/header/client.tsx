'use client';

import { dispatch, useAppSelector } from '@/client/store';
import { setwordle } from '@/client/store/slices/client-slice';
import { Button } from '@/components/ui/button';
import { generateRandomWord } from '@/lib/utils/generate-random-word';
import { ReactNode } from 'react';

export function ResetBoard({
	children,
}: {
	children: ReactNode;
}) {
	const { word } = useAppSelector((state) => state.clientSlice).wordle;
	return (
		<Button
			type='button'
			variant='outline'
			className='text-sm text-muted-foreground hover:text-muted-foreground'
			onClick={() =>
				dispatch(
					setwordle({
						board: {
							0: '',
							1: '',
							2: '',
							3: '',
							4: '',
						},
						tries: 0,
						word: generateRandomWord(),
					}),
				)
			}
		>
			{children}
		</Button>
	);
}
