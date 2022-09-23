import { atom } from "recoil"

import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()


export const walletAtom = atom({
    key: "walletAtom",
    default: {
        wallet: null,
    },
    effects_UNSTABLE: [persistAtom],
})