import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ClientState {
	wordle: {
		word: string | null;
		board: {
			1: string;
			2: string;
			3: string;
			4: string;
			5: string;
		};
	};
}

const initialState: ClientState = {
	wordle: {
		word: null,
		board: {
			1: '',
			2: '',
			3: '',
			4: '',
			5: '',
		},
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
