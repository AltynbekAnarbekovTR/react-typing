import {
  configureStore,
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

export const fetchEnglishWords = createAsyncThunk(
  "words/fetchEnglishWords",
  async (parasNum: string = "1") => {
    // const response = await fetch(
    //   // `https://baconipsum.com/api/?type=all-meat&paras=5`
    //   // `https://baconipsum.com/api/?type=meat-and-filler&paras=1`
    //   `https://baconipsum.com/api/?type=meat-and-filler&paras=${parasNum}`
    // );
    // let data = await response.json();

    // // data = data[0].replace(/\s{2,}/g, " ");
    // data = data.join("").replace(/\s{2,}/g, " ");
    // return data;
    return "Hello";
  }
);

// Async thunk to fetch Russian words
export const fetchRussianWords = createAsyncThunk(
  "words/fetchRussianWords",
  async (parasNum: string = "1") => {
    const response = await fetch(
      `https://fish-text.ru/get?type=paragraph&number=${parasNum}`
    );
    let data = await response.json();
    let text = data.text;
    text = text.replace(/\n\n/g, " ");
    // console.log(data.text);
    return data.text;
  }
);

type AppState = "configure" | "start" | "run" | "finish";

interface TimerState {
  timePassed: number;
  timerRef: NodeJS.Timer | null;
}

interface AppSliceState {
  words: string;
  cursor: number;
  isCorrect: boolean;
  errors: number;
  totalTyped: number;
  phase: AppState;
  speed: number;
  // accuracy: string;
  accuracy: number;
  showModal: boolean;
  lang: string;
  timer: TimerState;
  isLoading: boolean;
  error: string | null;
  typed: string;
  remaining: string;
  paras: string;
}

const initialState: AppSliceState = {
  words: "",
  cursor: 0,
  isCorrect: true,
  errors: 0,
  totalTyped: 0,
  phase: "configure",
  speed: 0,
  // accuracy: "0%",
  accuracy: 0,
  showModal: true,
  lang: "eng",
  timer: {
    timePassed: 0,
    timerRef: null,
  },
  isLoading: false,
  error: null,
  typed: "",
  remaining: "",
  paras: "1",
};

const wordsSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    getTyped: (state) => {
      state.typed = state.words.substring(0, state.cursor);
    },
    setTyped: (state) => {
      // console.log("state.cursor: ", state.cursor);
      // console.log(
      //   "state.words.substring(0, state.cursor);: ",
      //   state.words.substring(0, state.cursor)
      // );
      // const subWords = state.words;
      state.typed = state.words.substring(0, state.cursor);
    },
    getRemaining: (state) => {
      state.typed = state.words.substring(state.cursor, state.words.length - 1);
    },
    setRemaining: (state) => {
      state.remaining = state.words.substring(state.cursor);
      // state.remaining = action.payload;
    },
    resetApp: (state) => {
      clearInterval(state.timer.timerRef!);
      return {
        ...initialState,
        words: state.words,
      };
    },
    setWords: (state, action: PayloadAction<string>) => {
      state.words = action.payload;
    },
    setCursor: (
      state
      // action: PayloadAction<number>
    ) => {
      // state.cursor = action.payload;
      state.cursor += 1;
    },
    setIsCorrect: (state, action: PayloadAction<boolean>) => {
      state.isCorrect = action.payload;
    },
    setErrors: (
      state
      // action: PayloadAction<number>
    ) => {
      // state.errors = action.payload;
      state.errors += 1;
    },
    setTotalTyped: (
      state
      // action: PayloadAction<number>
    ) => {
      // state.totalTyped = action.payload;
      state.totalTyped += 1;
    },
    setState: (state, action: PayloadAction<AppState>) => {
      state.phase = action.payload;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    setAccuracy: (state, action: PayloadAction<number>) => {
      state.accuracy = action.payload;
    },
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
    setTimePassed: (state) => {
      state.timer.timePassed += 1;
    },
    setTimerRef: (state, action: PayloadAction<NodeJS.Timer | null>) => {
      state.timer.timerRef = action.payload;
    },
    removeTimerRef: (state, action: PayloadAction<NodeJS.Timer | null>) => {
      state.timer.timerRef = action.payload;
    },
    setParas: (state, action: PayloadAction<string>) => {
      state.paras = action.payload;
    },
    stopTimer: (state) => {
      clearInterval(state.timer.timerRef!);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnglishWords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEnglishWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.words = action.payload;
      })
      .addCase(fetchEnglishWords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch English words.";
      })
      .addCase(fetchRussianWords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRussianWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.words = action.payload;
      })
      .addCase(fetchRussianWords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch Russian words.";
      });
  },
});

const store = configureStore({ reducer: wordsSlice.reducer });

export const wordsActions = wordsSlice.actions;
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
