import { generateRandomWord } from '@/lib/utils/generate-random-word';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ClientState {
	wordle: {
		word: string;
		board: {
			0: string;
			1: string;
			2: string;
			3: string;
			4: string;
		};
		tries: number;
	};
}

const initialState: ClientState = {
	wordle: {
		word: generateRandomWord(),
		board: {
			0: '',
			1: '',
			2: '',
			3: '',
			4: '',
		},
		tries: 0,
	},
};

const slice = createSlice({
	name: 'client',
	initialState,
	reducers: {
		setwordle: (state, action: PayloadAction<Partial<ClientState['wordle']>>) => {
			state.wordle = {
				...state.wordle,
				...action.payload,
			};
		},
	},
});

export const { setwordle } = slice.actions;
export default slice.reducer;
